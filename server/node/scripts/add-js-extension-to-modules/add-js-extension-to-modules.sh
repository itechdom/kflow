#!/bin/bash

# Directory to search for .js files
DIRECTORY=${1:-.}

# Function to add .js extension to import statements
add_js_extension_to_imports() {
  local file="$1"

  # Use sed to find and replace import statements without .js extension
  sed -i.bak -E "
  s|import ([^']+) from '(\./[^'.]+)';|import \1 from '\2.js';|g;
  s|import ([^']+) from \"(\./[^\".]+)\";|import \1 from \"\2.js\";|g;
  s|import ([^']+) from '(\../[^'.]+)';|import \1 from '\2.js';|g;
  s|import ([^']+) from \"(\../[^\".]+)\";|import \1 from \"\2.js\";|g;
  s|import ([^']+) from '(@markab\.io/[^'.]+)';|import \1 from '\2.js';|g;
  s|import ([^']+) from \"(@markab\.io/[^\".]+)\";|import \1 from \"\2.js\";|g;
  s|import ([^']+) from '(\./[^'.]+)'$|import \1 from '\2.js'|g;
  s|import ([^']+) from \"(\./[^\".]+)\"$|import \1 from \"\2.js\"|g;
  s|import ([^']+) from '(\../[^'.]+)'$|import \1 from '\2.js'|g;
  s|import ([^']+) from \"(\../[^\".]+)\"$|import \1 from \"\2.js\"|g;
  s|import ([^']+) from '(@markab\.io/[^'.]+)'$|import \1 from '\2.js'|g;
  s|import ([^']+) from \"(@markab\.io/[^\".]+)\"$|import \1 from \"\2.js\"|g;
  " "$file"

  echo "Processed: $file"
}

# Export the function to use in find's -exec option
export -f add_js_extension_to_imports

# Find all .js files in the specified directory and subdirectories, excluding node_modules, and process them
find "$DIRECTORY" -type f -name "*.js" ! -path "*/node_modules/*" -exec bash -c 'add_js_extension_to_imports "$0"' {} \;

echo "Conversion completed."
