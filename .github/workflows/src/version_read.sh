#!/bin/bash
VERSION=$(cat ./VERSION)
echo "$VERSION"
git featch origin
echo Master "$(git show origin/test_master:VERSION)"
git log --graph --pretty=oneline --abbrev-commit
echo "VERSION=$VERSION">> "$GITHUB_ENV"
if [ -z "$VERSION" ]
then
echo "There is no version available"
exit 1
else
echo "VERSION=$VERSION" >> "$GITHUB_OUTPUT"
fi
