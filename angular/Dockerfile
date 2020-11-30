# Stage 1
FROM node:alpine as node
WORKDIR /usr/proj/angular
COPY package*.json ./
RUN npm install
COPY . .
# RUN npm install -g npm@7.0.15
RUN npm run build

# Stage 2
FROM nginx:alpine
COPY --from=node /usr/proj/angular/dist/angular /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf