npm run nx -- run-many --target build --prod --all

ssh -t pi@192.168.178.32 "cd /home/pi/deployment/api; pm2 stop main.js; pm2 save"

scp -r dist/apps/* pi@192.168.178.32:/home/pi/deployment
scp package.json package-lock.json pi@192.168.178.32:/home/pi/deployment/api

# copy nginx config

ssh -t pi@192.168.178.32 "sudo service nginx restart; cd /home/pi/deployment/api; npm ci --only=production --no-progress --no-audit --prefer-offline; pm2 start main.js; pm2 save"

# pm2 restart api

# ssh -t pi@192.168.178.32 "cd /home/pi/deployment/api;"

# postgres migrations??