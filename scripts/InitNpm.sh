#!/bin/bash

echo -ne "Running NPM Install on containers... \n"

docker compose run gateway-api npm ci
docker compose run customer-service npm ci
docker compose run vendor-machine-service npm ci
docker compose run order-service npm ci

echo -ne "NPM Install complete! \n"

echo -ne "Running Prisma Migrations on Users gRPC Server \n"
docker compose run order-service npx prisma migrate dev --name init

echo -ne "Create a Prisma Client on Users gRPC Server \n"
docker compose run order-service npx prisma generate

docker compose run juice-web npm ci

docker compose up