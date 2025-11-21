# ETAPA 1 - Dependências completas
FROM node:18-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# ETAPA 2 - Build da aplicação
FROM deps AS build
RUN npm run build

# ETAPA 3 - Produção
FROM node:18-alpine AS prod
WORKDIR /app

#package.json e instala dependências de produção
COPY package*.json ./
RUN npm install --omit=dev

# Copia a pasta dist gerada no build
COPY --from=build /app/dist ./dist

# Copia o restante dos arquivos NECESSÁRIOS para produção
COPY --from=deps /app/.env ./
COPY --from=deps /app/package.json ./

CMD ["node", "dist/server.js"]

# ETAPA 4 - Desenvolvimento
FROM deps AS dev
WORKDIR /app
CMD ["npm", "run", "dev"]
