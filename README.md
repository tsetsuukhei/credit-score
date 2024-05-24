## Credit Score Classifier

This repository contains a Docker Compose setup for a client-server application. The client is a front-end application, and the server is a back-end application.

### Project Structure

    .
    ├── client
    │   ├── Dockerfile
    │   └── ... (client application files)
    ├── server
    │   ├── Dockerfile
    │   └── ... (server application files)
    └── docker-compose.yml

### Prerequisites

- Docker installed on your local machine.
- Docker Compose installed on your local machine.

### Getting Started

- To build the Docker images for both the client and server, run the following command in the root directory of the project:

```
docker-compose build
```

Running the Containers

```
docker-compose up
```

### Ports

Client: 3000 on the host maps to 3000 in the client container.
Server: 8000 on the host maps to 8000 in the server container.
