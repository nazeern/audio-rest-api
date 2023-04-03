# Audio REST API

A personal project to get involved in creating a REST API.

## Endpoints

### /post
* POST
* Eg: `$ curl -X POST --data-binary @myfile.wav http://localhost/post`

### /download
* GET
* Content of stored files
* Eg: `$ curl http://localhost/download?name=myfile.wav`

### /list
* GET
* List of stored files within maxDuration
* Eg: `$ curl http://localhost/list?maxduration=300`

### /info
* GET
* Metadata e.g. audio duration
* Eg: `$ curl http://localhost/info?name=myfile.wav`

