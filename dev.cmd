Rem This file is for local development only!
Rem It configures and starts sts wiki for local development.

set STS_WIKI_LOGLEVEL=debug
set STS_WIKI_WATCH_BUILD_JS=true
set STS_WIKI_ALLOWED_ORIGINS=*
set STS_WIKI_HOST=localhost:8888
set STS_WIKI_CLIENT_ID=VDVCTHBt5AcM4rRLUJR5
set STS_WIKI_CLIENT_SECRET=KltFFSoXaZX7wysxIGdzvxW2KpArfar7G9EAzattw3CUgp1Y7UBkRQlnpCGKTwC0
set STS_WIKI_ORGANIZATION=sts

go run main.go
