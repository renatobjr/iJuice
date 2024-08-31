FROM node:20.9.0
WORKDIR /var/www/gateway
COPY ../app/api/gateway .
EXPOSE 3000
RUN npm i -g nodemon
CMD [ "npm", "run", "dev" ]