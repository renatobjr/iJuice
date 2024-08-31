## Badges

![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)
![Static Badge](https://img.shields.io/badge/Vue-3-42D392)
![Static Badge](https://img.shields.io/badge/Vuetify-3-2767C0)
![Static Badge](https://img.shields.io/badge/Node-20.9.0-056F00)
![Static Badge](https://img.shields.io/badge/Docker_Compose-1.29.2-blue)
![Static Badge](https://img.shields.io/badge/Prisma-5-red)
![Static Badge](https://img.shields.io/badge/TypeORM-0.3-6A9501)
![Static Badge](https://img.shields.io/badge/Mongoose-8-874523)

# iJuice

## Description

iJuice is a simple implementation of a Frontend where you can buy juices online. After purchase, the order "becomes available" for pickup from a machine installed anywhere in the world.

This project uses some basic concepts of microservices and messaging.

The front only has access to the Gateway-api, isolating the internal system, the this service communicates exclusively with the Customer and Order microservices using the gRPC protocol. Order uses RabbitMQ queues to process some information, avoiding blocking functions, such as: registering a new order in the Vendor Machine and creating a withdrawal code (created by the Vendor machine) and consumed by the Orders service.

In this project, different ORM's were used such as Prisma for the Orders service and TypeORM for the Customers service, the Vendor Machine uses MongoDB.

There are some points that must be observed:

1.  Vuetify load bug: there is a Veu + Vuetify error that in certain situations a dynamic page is not properly loaded.
2.  Improvements are needed regarding component stripping.
3.  It is necessary to implement more features such as: password recovery, profile editing and mocking for payment methods and Tests with Jest and Cypress.
4.  Create docs with Swagger.

## Run Locally

Clone the project

```bash
  git clone https://github.com/renatobjr/iJuice.git
```

Go to the project directory

```bash
  cd iJuice
```

When first running, follow the instructions and pay attention to a few points:

1. The Protos folder contains the files necessary for gRPC to work with Typescript, in case any changes are necessary to execute the command:

```bash
npm run proto
```

2. The routine for the first startup that includes copying the node modules and Prisma migrations must be executed before any other command with, if in doubt check the contents of the InitNpm.sh file

```bash
npm run init:npm
```

- Note: Before executing the file, check its execution permissions.
- Note: The environment variable files are in the Envs folder and separated by categories, if in doubt consult them.
- Note: All files related to the docker infrastructure and its initializations are in the Infra folder.

After installing the node modules and creating the databases, the script itself starts Docker.

Next times:

```bash
docker-compose up
```
