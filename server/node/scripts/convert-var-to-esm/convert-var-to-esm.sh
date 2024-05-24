#!/bin/bash

# Function to convert var require statements to import statements
convert_var_require_to_import() {
  local file_path=$1

  # Use sed to replace the var require statement with the import statement
  sed -i '' -E 's/var\s+([a-zA-Z0-9_]+)\s*=\s*require\("([^"]+)"\);/import \1 from "\2";/g' "$file_path"
}

# Function to find and convert all JavaScript files in the directory and subdirectories
convert_all_files() {
  local dir_path=$1

  # Find all JavaScript files and process each one
  find "$dir_path" -type f -name "*.js" | while read -r file; do
    echo "Processing $file"
    convert_var_require_to_import "$file"
  done
}

# Check if the directory path is provided as an argument
if [ -z "$1" ]; then
  echo "Usage: $0 <directory_path>"
  exit 1
fi

# Call the conversion function with the provided directory path
convert_all_files "$1"

echo "Conversion complete!"
