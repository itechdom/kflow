#!/bin/bash

# Add submodules
# git submodule add https://github.com/markab-io/node-services server/node/Libs/node-services
# git submodule add https://github.com/markab-io/orbital-api server/node/Libs/orbital-api
# git submodule add https://github.com/markab-io/react-services src/Libs/orbital
# git submodule add https://github.com/markab-io/orbital-templates src/Libs/orbital-templates

# # Initialize and update submodules
git submodule init
git submodule update

# # Optionally, update submodules to the latest commit from their respective repositories
# # Uncomment the next line if you want to do this
git submodule update --remote

echo "Submodules added and initialized successfully."