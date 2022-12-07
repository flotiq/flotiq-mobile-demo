#!/bin/bash
git fetch origin
npx -q semver-compare-cli --help > /dev/null || echo ""
(apt update && apt install -y jq) > /dev/null
if [ -f VERSION ]; then
    CURRENT_VERSION=$(cat ./VERSION)
else
    echo "No VERSION exists, assuming v0.0.0"
    CURRENT_VERSION="0.0.0"
fi
if ! OLD_VERSION=$(git show "$GITHUB_TARGET_REF":VERSION); then
    echo "No remote VERSION exists, assuming v0.0.0"
    REMOTE_VERSION="0.0.0"
fi
echo "REMOTE_VERSION=$REMOTE_VERSION"
echo "OLD_VERSION=$OLD_VERSION"
echo "CURRENT_VERSION=$CURRENT_VERSION"
echo "VERSION=$VERSION">> "$GITHUB_ENV"

if npx semver-compare-cli $CURRENT_VERSION gt "$OLD_VERSION";
    then echo_green VERSION increased on "$GITHUB_BASE_REF"
    else echo_red VERSION needs to increase on "$GITHUB_BASE_REF"; FAILED=true
fi

if [ -n "$FAILED" ]; then
    echo "Some checks for versioning failed"
    exit 1;
fi