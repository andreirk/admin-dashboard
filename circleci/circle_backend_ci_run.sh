#!/bin/bash
#
# Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
#

set -o errexit # Exit on error
branch=$1
curl -X POST --silent --show-error --header "Accept: application/json" https://circleci.com/api/v1/project/arammeem/backend-ci/tree/${branch}?circle-token=${BACKEND_CI_API_TOKEN}
