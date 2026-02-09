FROM node:20-bookworm-slim

WORKDIR /app

# Instala openssl e certificados (Prisma precisa disso)
RUN apt-get update && apt-get install -y openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY . .

# Gera Prisma Client dentro do container
RUN npx prisma generate

EXPOSE 5003
CMD ["npm", "run", "dev"]
