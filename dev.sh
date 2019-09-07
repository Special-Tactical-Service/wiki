#!/bin/bash

# This file is for local development only!
# It configures and starts sts wiki for local development.

export STS_WIKI_LOGLEVEL=debug
export STS_WIKI_WATCH_BUILD_JS=true
export STS_WIKI_ALLOWED_ORIGINS=*
export STS_WIKI_HOST=localhost:8080

go run main.go
