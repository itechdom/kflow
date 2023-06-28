sudo podman run -d --name mongod -p 27017:27017 -v /var/lib/mongodb:/data/db:Z mongo
