### STAGE 1: Build ###
FROM node:alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm ci &&  npm run build

### STAGE 2: Run ###
FROM nginx:alpine
COPY --from=build /app/dist/angular /usr/share/nginx/html
EXPOSE 80