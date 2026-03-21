#!/bin/bash

DIR="public/files"
OUT="$DIR/data.json"

rm -f "$OUT"

files=()
while IFS= read -r file; do
  [[ "$file" == "data.json" ]] && continue
  files+=("$file")
done < <(find "$DIR" -maxdepth 1 -type f -printf '%f\n')

{
  printf '[\n'
  for i in "${!files[@]}"; do
    printf '  "%s"' "${files[i]}"
    [[ $i -lt $((${#files[@]} - 1)) ]] && printf ',\n'
  done
  printf '\n]\n'
} > "$OUT"
