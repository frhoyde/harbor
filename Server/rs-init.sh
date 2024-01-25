#!/bin/bash

echo "Starting replica set initialization"
until mongosh --host mongo1 --eval "print(\"waited for connection\")"
do
   sleep 2
done
echo "Connection finished"
echo "Creating replica set"

MONGO1IP=$(getent hosts mongo1 | awk '{ print $1 }')
MONGO2IP=$(getent hosts mongo2 | awk '{ print $1 }')
MONGO3IP=$(getent hosts mongo3 | awk '{ print $1 }')


read -r -d '' CMD <<EOF
var config = {
    "_id": "dbrs",
    "version": 1,
    "members": [
        {
            "_id": 1,
            "host": "${MONGO1IP}:27017",
            "priority": 3
        },
        {
            "_id": 2,
            "host": "${MONGO2IP}:27017",
            "priority": 2
        },
        {
            "_id": 3,
            "host": "${MONGO3IP}:27017",
            "priority": 1
        }
    ]
};
rs.initiate(config, { force: true });
rs.status();
EOF

echo $CMD | mongosh --host mongo1
echo "replica set created"