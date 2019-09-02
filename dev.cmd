Rem This file is for local development only!
Rem It configures and starts sts wiki for local development.

set STS_WIKI_LOGLEVEL=debug
set STS_WIKI_WATCH_BUILD_JS=true
set STS_WIKI_ALLOWED_ORIGINS=*
set STS_WIKI_HOST=localhost:8888

go run main.go
