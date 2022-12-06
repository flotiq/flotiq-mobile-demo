#!/bin/bash
VERSION=$(cat ./VERSION)
echo "$VERSION"
echo "VERSION=$VERSION">> "$GITHUB_ENV"
if [ -z "$VERSION" ]
then
echo "There is no version available"
exit 1
else
echo "VERSION=$VERSION" >> "$GITHUB_OUTPUT"
fi
