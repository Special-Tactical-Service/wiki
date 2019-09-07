FROM golang AS build
ADD . /go/src/github.com/special-tactical-service/wiki
WORKDIR /go/src/github.com/special-tactical-service/wiki
RUN apt update && \
	apt upgrade -y && \
	apt install curl -y
RUN curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh && bash nodesource_setup.sh
RUN apt-get install -y nodejs

# build backend
ENV GOPATH=/go
RUN go build -ldflags "-s -w" main.go

# build frontend
RUN cd /go/src/github.com/special-tactical-service/wiki/public && npm i && npm rebuild node-sass && npm run build

FROM ubuntu
COPY --from=build /go/src/github.com/special-tactical-service/wiki /app
WORKDIR /app

# default config
ENV STS_WIKI_LOGLEVEL=info
ENV STS_WIKI_WATCH_BUILD_JS=false
ENV STS_WIKI_ALLOWED_ORIGINS=*
ENV STS_WIKI_HOST=0.0.0.0:8080

CMD ["/app/main"]
