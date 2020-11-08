# Stage 1
FROM node:alpine as node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2
FROM nginx:alpine
COPY --from=node /usr/src/app/dist/angular /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf