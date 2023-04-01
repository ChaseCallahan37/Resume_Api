FROM node:16

WORKDIR /

COPY package*.json ./

RUN ls

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "prod"]