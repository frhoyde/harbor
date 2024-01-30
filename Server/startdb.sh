#!/bin/bash


docker-compose up --build -d

sleep 5

docker exec mongo1 /scripts/rs-init.sh