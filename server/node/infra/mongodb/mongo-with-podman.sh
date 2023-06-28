sudo podman run -d --name mongod -p 27017:27017 -v ./data/db:/data/db:Z mongo
