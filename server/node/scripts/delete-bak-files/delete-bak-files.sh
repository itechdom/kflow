#!/bin/bash

# Directory to search for .bak files
DIRECTORY=${1:-.}

# Function to delete .bak files
delete_bak_files() {
  local file="$1"

  if [ -f "$file" ]; then
    rm "$file"
    if [ $? -eq 0 ]; then
      echo "Deleted: $file"
    else
      echo "Failed to delete: $file"
    fi
  fi
}

# Export the function to use in find's -exec option
export -f delete_bak_files

# Find all .bak files in the specified directory and subdirectories, excluding node_modules, and delete them
find "$DIRECTORY" -type f -name "*.bak" ! -path "*/node_modules/*" -exec bash -c 'delete_bak_files "$0"' {} \;

echo "Deletion of .bak files completed."
