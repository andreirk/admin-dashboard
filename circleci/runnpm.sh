#
# Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
#

npm install --global rimraf
npm run clean
npm install --global webpack typescript
npm install
echo hello from build:prod

npm run build:prod

