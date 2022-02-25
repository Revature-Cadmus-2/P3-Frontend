FROM node:14-alpine as build-step

WORKDIR /app

COPY /front-end/package.json /app

RUN npm install

COPY /front-end/. /app

RUN npm run build

# Stage 2

FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist/front-end /usr/share/nginx/html
# COPY /front-end/default.conf /etc/nginx/nginx.conf

EXPOSE 80
