#!/bin/bash

# Directory to search for .js files
DIRECTORY=${1:-.}

# Function to convert module.exports to export statements
convert_exports() {
  local file="$1"

  # Use sed to find and replace module.exports statements with export statements
  sed -i.bak -E "
  s|module\.exports\s*=\s*|export default |g;
  s|module\.exports\[\"([a-zA-Z0-9_]+)\"\]\s*=\s*|export const \1 = |g;
  s|module\.exports\.([a-zA-Z0-9_]+)\s*=\s*|export const \1 = |g;
  " "$file"

  echo "Converted: $file"
}

# Export the function to use in find's -exec option
export -f convert_exports

# Find all .js files in the specified directory and subdirectories, excluding node_modules, and process them
find "$DIRECTORY" -type f -name "*.js" ! -path "*/node_modules/*" -exec bash -c 'convert_exports "$0"' {} \;

echo "Conversion completed."
