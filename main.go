package main

import (
	"github.com/caddyserver/certmagic"
	"github.com/emvi/logbuch"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"io/ioutil"
	"net/http"
	"os"
	"strings"
)

const (
	staticDir       = "public/static"
	staticDirPrefix = "/static/"
	buildJsFile     = "public/dist/build.js"
	buildJsPrefix   = "/dist/build.js"
	cssFile         = "public/dist/main.css"
	cssFilePrefix   = "/dist/main.css"
	indexFile       = "public/index.html"
	rootDirPrefix   = "/"
	logTimeFormat   = "2006-01-02_15:04:05"
	envPrefix       = "SM_WIKI_"
)

var (
	buildJs      []byte
	watchBuildJs = false
)

func configureLog() {
	logbuch.SetFormatter(logbuch.NewFieldFormatter(logTimeFormat, "\t\t"))
	logbuch.Info("Configure logging...")
	level := strings.ToLower(os.Getenv("SM_WIKI_LOGLEVEL"))

	if level == "debug" {
		logbuch.SetLevel(logbuch.LevelDebug)
	} else if level == "info" {
		logbuch.SetLevel(logbuch.LevelInfo)
	} else {
		logbuch.SetLevel(logbuch.LevelWarning)
	}
}

func logEnvConfig() {
	for _, e := range os.Environ() {
		if strings.HasPrefix(e, envPrefix) {
			pair := strings.Split(e, "=")
			logbuch.Info(pair[0] + "=" + pair[1])
		}
	}
}

func loadBuildJs() {
	logbuch.Info("Loading build.js...")
	watchBuildJs = os.Getenv("SM_WIKI_WATCH_BUILD_JS") != ""
	content, err := ioutil.ReadFile(buildJsFile)

	if err != nil {
		logbuch.Fatal("build.js not found", logbuch.Fields{"err": err})
	}

	buildJs = make([]byte, 0)
	/*buildJs = append(buildJs, []byte(fmt.Sprintf("var SM_WIKI_CLIENT_ID='%s';", os.Getenv("SM_WIKI_CLIENT_ID")))...)
	buildJs = append(buildJs, []byte(fmt.Sprintf("var SM_WIKI_CLIENT_SECRET='%s';", os.Getenv("SM_WIKI_CLIENT_SECRET")))...)
	buildJs = append(buildJs, []byte(fmt.Sprintf("var SM_WIKI_ORGANIZATION='%s';", os.Getenv("SM_WIKI_ORGANIZATION")))...)*/
	buildJs = append(buildJs, content...)
}

func setupRouter() *mux.Router {
	router := mux.NewRouter()

	// static content
	router.PathPrefix(staticDirPrefix).Handler(http.StripPrefix(staticDirPrefix, http.FileServer(http.Dir(staticDir))))
	router.PathPrefix(buildJsPrefix).Handler(http.StripPrefix(buildJsPrefix, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if watchBuildJs {
			loadBuildJs()
		}

		w.Header().Add("Content-Type", "text/javascript")

		if _, err := w.Write(buildJs); err != nil {
			w.WriteHeader(http.StatusNotFound)
		}
	})))
	router.PathPrefix(cssFilePrefix).Handler(http.StripPrefix(cssFilePrefix, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-Type", "text/css")
		http.ServeFile(w, r, cssFile)
	})))
	router.PathPrefix(rootDirPrefix).Handler(http.StripPrefix(rootDirPrefix, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, indexFile)
	})))

	return router
}

func configureCors(router *mux.Router) http.Handler {
	logbuch.Info("Configuring CORS...")

	origins := strings.Split(os.Getenv("SM_WIKI_ALLOWED_ORIGINS"), ",")
	c := cors.New(cors.Options{
		AllowedOrigins:   origins,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
		Debug:            strings.ToLower(os.Getenv("SM_WIKI_CORS_LOGLEVEL")) == "debug",
	})
	return c.Handler(router)
}

func start(handler http.Handler) {
	logbuch.Info("Starting server...")

	if strings.ToLower(os.Getenv("SM_WIKI_TLS")) == "true" {
		logbuch.Info("TLS enabled")
		certmagic.DefaultACME.Agreed = true
		certmagic.DefaultACME.Email = os.Getenv("SM_WIKI_TLS_EMAIL")
		certmagic.DefaultACME.CA = certmagic.LetsEncryptProductionCA

		if err := certmagic.HTTPS(strings.Split(os.Getenv("SM_WIKI_DOMAIN"), ","), handler); err != nil {
			logbuch.Fatal("Error starting server", logbuch.Fields{"err": err})
		}
	} else {
		if err := http.ListenAndServe(os.Getenv("SM_WIKI_HOST"), handler); err != nil {
			logbuch.Fatal("Error starting server", logbuch.Fields{"err": err})
		}
	}
}

func main() {
	configureLog()
	logEnvConfig()
	loadBuildJs()
	router := setupRouter()
	corsConfig := configureCors(router)
	start(corsConfig)
}
