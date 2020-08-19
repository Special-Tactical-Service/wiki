#!/bin/bash

# This file is for local development only!
# It configures and starts the wiki for local development.

export SM_WIKI_LOGLEVEL=debug
export SM_WIKI_WATCH_BUILD_JS=true
export SM_WIKI_ALLOWED_ORIGINS=*
export SM_WIKI_HOST=localhost:10000
export SM_WIKI_HOST_WWW=www.localhost:10000
export SM_WIKI_CLIENT_ID=J8U5aYxyfdW9Outof9DL
export SM_WIKI_CLIENT_SECRET=IEWlpiNJTlzZJgaPNxtKnyo4UjhQOsk4t6lNOBw8z2mTtcsXMXdfIkAfrGYlkfca
export SM_WIKI_ORGANIZATION=skalar

go run main.go
