FROM node:24-slim AS builder

WORKDIR /app

# Copy package and Prisma
COPY package*.json ./
COPY prisma ./prisma

# Install deps
RUN npm install

# Copy source and tsconfig
COPY . .
COPY prisma.config.ts ./prisma.config.ts
COPY tsconfig*.json ./

ARG DATABASE_URL="postgres://dummy-string" # Dummy value so that it builds 
ENV DATABASE_URL=$DATABASE_URL

# Generate Prisma Client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Push Prisma schema to DB then start app
CMD ["sh", "-c", "npx prisma db push && node dist/server.js"]