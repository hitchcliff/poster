#!/bin/bash

echo What should the version be?
read VERSION

docker build -t hitchcliff/poster:$VERSION .
docker push hitchcliff/poster:$VERSION
ssh root@159.65.127.20 "docker pull hitchcliff/poster:$VERSION && docker tag hitchcliff/poster:$VERSION dokku/api:$VERSION && dokku tags:deploy api $VERSION"