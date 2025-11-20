# ETAPA 1 - Dependências completas (DEV + BUILD)
FROM node:18-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

FROM deps AS build
RUN npm run build


#Produção
FROM node:18-alpine AS prod
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=build /app/dist ./dist

CMD ["node", "dist/server.js"]


#Desenvolvimento
FROM deps AS dev
WORKDIR /app
CMD ["npm", "run", "dev"]
