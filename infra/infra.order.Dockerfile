FROM node:20.9.0
WORKDIR /var/www/order
COPY ../app/api/order .
EXPOSE 50052
RUN npm i -g nodemon
CMD [ "npm", "run", "dev" ]