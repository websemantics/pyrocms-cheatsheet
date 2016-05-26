#!/usr/bin/env bash
# This bash file will deploy the demo folder to the project gh-page
set -e

# Base directory for this entire project
BASEDIR=$(cd $(dirname $0) && pwd)

bower install

# Create a new Git repo in demo folder
cd "$BASEDIR/demo"
git init

# Set user details
git config user.name "iAyeBot"
git config user.email "iayebot@websemantics.ca"

# First commit, .. horray!
git add .
git commit -m "Deploy to gh-pages"

# Force push ...
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
