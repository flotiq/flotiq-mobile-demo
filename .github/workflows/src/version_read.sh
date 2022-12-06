#!/bin/bash
VERSION=
cat ./VERSION > VERSION
if [ -z "$VERSION" ]
then
echo "\$var is empty"
else
echo "\$var is NOT empty"
fi
echo "VERSION=$VERSION" >> "$GITHUB_OUTPUT"