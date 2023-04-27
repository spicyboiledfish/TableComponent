#! /bin/bash

dot="."

versionLine=$(grep \"version\" package.json)
version=$(echo ${versionLine} | tr -cd "[0-9].")

newVersion="${version%.*}.$((${version##*.} + 1))"
newVersionLine=$(echo "${versionLine/${version}/${newVersion}}")

sed -i "" "s/${versionLine}/${newVersionLine}/g" "package.json"

git add package.json
