FROM node:18.19.1-alpine3.19
WORKDIR /usr/src
COPY package*.json ./
RUN npm install --ignore-scripts --force
COPY . .
RUN npm run build
EXPOSE 8000
CMD ["node", "dist/main.js"]