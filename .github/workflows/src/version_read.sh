#!/bin/bash
  # Define output functions

RED='\033[31;1m'
GREEN='\033[32;1m'
NC='\033[0m' # No Color
function echo_red () {
echo -e "${RED}\xE2\x9C\x98 ${*}${NC}"
}
function echo_green () {
echo -e "${GREEN}\xE2\x9C\x94${NC}" "${@}"
}
    # Install
git fetch origin
npx -q semver-compare-cli --help > /dev/null || echo ""
(apt update && apt install -y jq) > /dev/null
if [ -f VERSION ]; then
    CURRENT_VERSION=$(cat ./VERSION)
else
    echo "No VERSION exists, assuming v0.0.0"
    CURRENT_VERSION="0.0.0"
fi
if ! OLD_VERSION=$(git show "$TARGET_REF":VERSION); then
    echo "No remote VERSION exists, assuming v0.0.0"
    OLD_VERSION="0.0.0"
fi
echo "OLD_VERSION=$OLD_VERSION"
echo "CURRENT_VERSION=$CURRENT_VERSION"
echo "VERSION=$VERSION">> "$GITHUB_ENV"

if npx semver-compare-cli $CURRENT_VERSION gt "$OLD_VERSION";
    then echo_green VERSION increased on "$BASE_REF"
    else echo_red VERSION needs to increase on "$BASE_REF"; FAILED=true
fi

if [ -n "$FAILED" ]; then
    echo "Some checks for versioning failed"
    exit 1;
fi