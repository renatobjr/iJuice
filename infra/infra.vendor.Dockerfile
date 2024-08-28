FROM node:20.9.0
WORKDIR /var/www/vendor
COPY ../app/vendor .
EXPOSE 4000
RUN npm i -g nodemon
CMD [ "npm", "run", "dev" ]