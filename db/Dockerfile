# Use the official MongoDB image as the base image
FROM mongo:latest

# Copy the generate-keyfile.sh script to the container
COPY generate-keyfile.sh /generate-keyfile.sh

# Create the keyfile directory and generate the keyfile during the image build
RUN mkdir -p /opt/keyfile && \
    /bin/bash /generate-keyfile.sh

CMD ["mongod", "--auth", "--bind_ip_all","--keyFile", "/opt/keyfile/mongo-keyfile", "--replSet", "rs0", "--port", "27017"]