# Stage 1
# Create image based on the official Node 8 image from dockerhub
FROM node:14.15.1-alpine as node

# Create a directory where our app will be placed
RUN mkdir -p /usr/proj/angular

# Change directory so that our commands run inside this new directory
WORKDIR /usr/proj/angular

# Copy dependency definitions
COPY package*.json ./

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . .

# Run the angular in product
RUN npm run build


# Stage 2
FROM nginx:1.18.0-alpine

# Copy dist content to html nginx folder, config nginx to point in index.html
COPY --from=node /usr/proj/angular/dist/angular /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf




# # Stage 1
# FROM node:alpine as node
# WORKDIR /usr/proj/angular
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Stage 2
# FROM nginx:alpine
# COPY --from=node /usr/proj/angular/dist/angular /usr/share/nginx/html
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf