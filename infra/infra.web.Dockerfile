FROM node:20.9.0
WORKDIR /var/www/web
COPY ../app/web .
CMD [ "npm", "run", "dev" ]
