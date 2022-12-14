#!/bin/bash
RED='\033[31;1m'
GREEN='\033[32;1m'
NC='\033[0m' # No Color
function echo_red () {
echo -e "${RED}\xE2\x9C\x98 ${*}${NC}"
}
function echo_green () {
echo -e "${GREEN}\xE2\x9C\x94${NC}" "${@}"
}
git fetch origin --quiet
npx -q semver-compare-cli --help > /dev/null || echo ""
if [ -f VERSION ]; then
    CURRENT_VERSION=$(cat ./BUILD_NUMBER)
else
    echo "No VERSION exists, assuming v1"
    CURRENT_VERSION="1"
fi
if ! OLD_VERSION=$(git show "$BASE_REF":BUILD_NUMBER); then
    echo "No remote BUILD_NUMBER exists, assuming v1"
    OLD_VERSION="1"
fi
echo "OLD_VERSION=$OLD_VERSION"
echo "CURRENT_VERSION=$CURRENT_VERSION"
echo "VERSION=$VERSION">> "$GITHUB_ENV"

if npx semver-compare-cli $CURRENT_VERSION gt "$OLD_VERSION";
    then echo_green VERSION increased on "$HEAD_REF"
    else echo_red VERSION needs to increase on "$HEAD_REF"; FAILED=true
fi

if [ -n "$FAILED" ]; then
    echo "Some checks for versioning failed"
    exit 1;
fi