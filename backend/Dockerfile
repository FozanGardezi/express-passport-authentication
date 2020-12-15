FROM node:14.12-alpine
WORKDIR .
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8000
CMD ["node", "-r dotenv/config app.js"]