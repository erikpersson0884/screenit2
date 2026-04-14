FROM node:24-slim

WORKDIR /app

# Copy package and Prisma
COPY package*.json ./
COPY prisma ./prisma

# Install deps
RUN npm install

# Copy rest of app
COPY . .

ARG DATABASE_URL="postgres://dummy-string"
ENV DATABASE_URL=$DATABASE_URL

# Ensure uploads directory exists
RUN mkdir -p /app/uploads

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

CMD ["sh", "-c", "npx prisma db push && node dist/server.js"]