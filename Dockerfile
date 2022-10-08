FROM node:18

WORKDIR /app

COPY . .

RUN node -v

RUN npm install 


EXPOSE 6969

CMD ["npm", "run", "dev"]