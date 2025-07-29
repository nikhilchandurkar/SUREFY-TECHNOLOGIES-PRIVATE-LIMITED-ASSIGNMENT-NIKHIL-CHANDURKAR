
FROM node:20
WORKDIR /usr/src/app
RUN npm install -g prisma
COPY package*.json ./
RUN npm install
COPY . .
COPY prisma ./prisma
RUN prisma generate
EXPOSE 3000

ENV NODE_ENV=development
# CMD ["npx", "newman", "run", "postman/collection.json"]
CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]
