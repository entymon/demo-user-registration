
FROM node:20-slim

## Nest API
WORKDIR /app

COPY ../../api/package.json .

RUN npm install

COPY ../../api/ .

# RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]