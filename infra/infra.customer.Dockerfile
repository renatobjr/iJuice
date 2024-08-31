FROM node:20.9.0
WORKDIR /var/www/customer
COPY ../app/api/customer .
EXPOSE 50051
RUN npm i -g nodemon
CMD [ "npm", "run", "dev" ]