
## Description

Playing with the [Nest](https://github.com/nestjs/nest) framework.

Run the following projects:

* [/microservice_tcp](microservice_tcp): will be listening for a { cmd: 'sum' } pattern event.

* [/microservice_api](microservice_api): will be listening for a GET on 'localhost:3000/test', which will cause the microservice_api to return the result of microservice_tcp sum computation.
