FROM node:16-alpine

WORKDIR /usr/src/app

# Copia de "app" dentro do contexto (~/FACET/app)
COPY app/package*.json ./
RUN npm install

# Copia todo o conteúdo da pasta "app"
COPY app .

EXPOSE 3000
CMD ["npm", "start"]
