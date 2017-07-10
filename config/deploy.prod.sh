export NODE_ENV=prod; 
cd api; 
sudo rm -r node_modules; 
sudo unzip -o ~/artifacts/api/deploy.zip; 
sudo chmod 777 node_modules; 
sudo npm install; 
sudo pm2 restart api;