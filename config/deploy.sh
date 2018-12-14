set -x;
export NODE_ENV=$1; 
cd $1/api; 
sudo unzip -o ~/artifacts/$1/api/deploy.zip; 
sudo chmod 777 node_modules; 
sudo chmod 777 config;
pm2 delete $1api;
pm2 start server.js --name $1api;