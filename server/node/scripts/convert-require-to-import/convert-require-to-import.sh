#!/bin/bash

# Directory to search for .js files
DIRECTORY=${1:-.}

# Function to convert CommonJS to ESM
convert_to_esm() {
  local file="$1"

  # Use sed to find and replace require statements with import statements
  sed -i.bak -E "
  s|const ([a-zA-Z0-9_]+) = require\(['\"]([^'\"]+\.js)['\"]\);|import \1 from '\2';|g;
  s|const ([a-zA-Z0-9_]+) = require\(['\"]([^'\"]+)['\"]\);|import \1 from '\2';|g;
  s|const \{([a-zA-Z0-9_, ]+)\} = require\(['\"]([^'\"]+\.js)['\"]\);|import \{ \1 \} from '\2';|g;
  s|const \{([a-zA-Z0-9_, ]+)\} = require\(['\"]([^'\"]+)['\"]\);|import \{ \1 \} from '\2';|g;
  s|module\.exports\s*=\s*|export default |g;
  s|module\.exports\[\"([a-zA-Z0-9_]+)\"\]\s*=\s*|export const \1 = |g;
  s|module\.exports\.([a-zA-Z0-9_]+)\s*=\s*|export const \1 = |g;
  s|module\.exports\.{([a-zA-Z0-9_]+)}\s*=\s*|export const \1 = |g;
  " "$file"

  echo "Converted: $file"
}

# Export the function to use in find's -exec option
export -f convert_to_esm

# Find all .js files in the specified directory and subdirectories, excluding node_modules, and process them
find "$DIRECTORY" -type f -name "*.js" ! -path "*/node_modules/*" -exec bash -c 'convert_to_esm "$0"' {} \;

echo "Conversion completed."
