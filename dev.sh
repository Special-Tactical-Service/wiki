#!/bin/bash

# This file is for local development only!
# It configures and starts sts wiki for local development.

export STS_WIKI_LOGLEVEL=debug
export STS_WIKI_WATCH_BUILD_JS=true
export STS_WIKI_ALLOWED_ORIGINS=*
export STS_WIKI_HOST=localhost:8080
export STS_WIKI_HOST_WWW=www.localhost:8080
export STS_WIKI_CLIENT_ID=VDVCTHBt5AcM4rRLUJR5
export STS_WIKI_CLIENT_SECRET=KltFFSoXaZX7wysxIGdzvxW2KpArfar7G9EAzattw3CUgp1Y7UBkRQlnpCGKTwC0
export STS_WIKI_ORGANIZATION=sts

go run main.go
