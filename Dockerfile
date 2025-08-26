# Etapa 1: Build de la app Next.js
FROM node:20-alpine AS builder
WORKDIR /app

# Copiar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Build de la app
RUN npm run build

# Etapa 2: Imagen para producción
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copiamos los archivos necesarios desde el builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]
