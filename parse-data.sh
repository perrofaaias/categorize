#!/bin/bash

DIR="./public/files"
OUT="./public/data.json"

if [ -z "$OUT" ]; then
  rm "$OUT"
fi

{
  printf '[\n'
  first=1
  find "$DIR" -maxdepth 1 -type f -printf '%f\n' | while IFS= read -r file; do
    file_escaped=$(printf '%s' "$file" | sed 's/"/\\"/g')
    
    if [ $first -eq 1 ]; then
      printf '  "%s"' "$file_escaped"
      first=0
    else
      printf ',\n  "%s"' "$file_escaped"
    fi
  done
  printf '\n]\n'
} > "$OUT"
