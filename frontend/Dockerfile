FROM node:20.11.1 AS build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
RUN npm run build

FROM nginx
COPY --from=build /app/build/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
