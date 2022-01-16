# Introduction

This is a poof of concept project, the goal is a Nodejs/Express service that has an Apollo Federation gateway.

Not only is a ```/graphql``` endpoint needed but I also need various endpoint for:

- ```/pingz``` that my Kubernetes set up pings and expects a 200 status codd. Yes it could use any endpoint but all my CI/CD pipelines share common configuration and pingz is commonly used.

- There are other but that not relevant here

The actual server code is inside ```./app``` the route directory is used for project settings like build and release scripts.....

## Prerequisites

This project is built on top of Node 16

Install globally

```:bash
npm install -g @apollo/rover
```

## Clone and install

```:bash
git clone ................ apollo-fed-server
cd apollo-fed-server/app
npm ci

cp ./env.example ./env
# Add your own settings

cp ./supergraph-config-example.yaml ./supergraph-config.yaml
# Add your own GraphQL endpoints

rover supergraph compose --config ./supergraph-config.yaml > ./src/supergraph.graphql
# Rover scans the listed endpoints and builds a local schema. After this has been done once you can run ```npm run composeSchema``` to update

npm run dev
#Will run the server in development mode with hot reloading
```

More to follow......
