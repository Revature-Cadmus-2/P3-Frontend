FROM node:16.3.0-alpine as build-step

WORKDIR /app

RUN npm cache clean --force

COPY /front-end/package.json /app

RUN npm install --legacy-peer-deps

# RUN echo ${{ secrets.S3_BUCKET_KEY }} > /front-end/src/assets/Key.txt

COPY /front-end/. /app

RUN npm run build

# Stage 2

FROM nginx:latest

COPY --from=build-step /app/dist/front-end /usr/share/nginx/html
# COPY /front-end/default.conf /etc/nginx/nginx.conf

EXPOSE 80
