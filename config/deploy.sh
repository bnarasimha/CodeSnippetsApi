set -x;
export NODE_ENV=$1; 
cd prod/api; 
sudo unzip -o ~/artifacts/prod/api/deploy.zip; 
sudo chmod 777 node_modules; 
sudo chmod 777 config;
npm install; 
pm2 delete prodapi;
pm2 start server.js --name prodapi;