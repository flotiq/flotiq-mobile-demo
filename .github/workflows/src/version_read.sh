#!/bin/bash
if (VERSION=$(cat ./VERSION)) then
    echo "no version fille assuming v0.0.0"
    VERSION=0.0.0
fi
git fetch origin
echo "$BASE_REF"
echo "gh ref $GITHUB_HEAD_REF"
echo "$HEAD_REF"
echo Master "$(git show origin/test_master:VERSION)"
echo "VERSION=$VERSION">> "$GITHUB_ENV"
if [ -z "$VERSION" ]
then
echo "There is no version available"
exit 1
else
echo "VERSION=$VERSION" >> "$GITHUB_OUTPUT"
fi
