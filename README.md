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
    ├── docker-compose.yml
    └── credit-score.ipynb (model training)

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

- Client: 3000 on the host maps to 3000 in the client container.
- Server: 8000 on the host maps to 8000 in the server container.

### Choice of Dataset

Choice of dataset from Kaggle - [Credit Score Classification](https://www.kaggle.com/datasets/parisrohan/credit-score-classification/).

- After looking at many datasets and changing the dataset twice, I've decided to work on the Credit Score Classification dataset as it had many unclean columns and felt like it would be the closest to a real-life problem I might face.

- Methods included are removing the outliers, filling in the null columns based on inference, oversampling the inbalanced class, and preprocessing methods in general.

### Model

- Used Pytorch ANN
- Has 3 classifications
- 21 input features
- Trained over 600 epochs
