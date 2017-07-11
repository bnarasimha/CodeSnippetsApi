set NODE_ENV=$1; 
cd api; 
sudo rm -r node_modules; 
sudo unzip -o ~/artifacts/api/deploy.zip; 
sudo chmod 777 node_modules; 
sudo chmod 777 config;
sudo npm install; 
sudo pm2 restart api;