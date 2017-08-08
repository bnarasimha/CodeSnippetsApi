set -x;
export NODE_ENV=$1; 
cd api; 
unzip -o ~/artifacts/api/deploy.zip; 
sudo chmod 777 node_modules; 
sudo chmod 777 config;
npm install; 
pm2 delete api;
pm2 start server.js --name api;