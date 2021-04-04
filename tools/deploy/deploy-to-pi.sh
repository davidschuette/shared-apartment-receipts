npm run nx -- run-many --target build --prod --all

scp -r dist/* pi@nairobi:/home/pi/deployment
scp package.json package-lock.json pi@nairobi:/home/pi/deployment/api

# copy nginx config

ssh -t pi@nairobi sudo service nginx restart

# pm2 restart api

# postgres migrations??