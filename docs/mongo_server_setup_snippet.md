# Snippets

## The following command will redirect the output produced by lsof -i to a grep command that searches for a string named mongo:

`sudo lsof -i | grep mongo`

## If you aren’t sure of the trusted machine’s IP address, you can run the following curl command. This will access the website icanhazip.com, which will return the IP address of the machine from which you run the command:

`curl -4 icanhazip.com`

## Grant firewall access

`sudo ufw allow from trusted_machine_ip to any port 27017`

## Docker IP address

`docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' harbordb`

