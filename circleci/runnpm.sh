mkdir dist
 cd ./dist
 npm install --global rimraf 
 npm run clean 
 npm install --global webpack webpack-dev-server typescript@beta 
 npm install 
 npm run prebuild:prod 
 npm run build:prod
 cd ..
