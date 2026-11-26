# ----------------------------------------------------
# Stage 1: Build NestJS application with Prisma
# ----------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Install OpenSSL for Prisma engine compatibility on Alpine
RUN apk add --no-cache openssl libc6-compat

# Copy dependency manifests
COPY package*.json ./

# Install dependencies for compilation
RUN npm ci

# Copy Prisma schema and generate client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy source code and build NestJS
COPY . .
RUN npm run build

# Prune devDependencies
RUN npm prune --production

# ----------------------------------------------------
# Stage 2: Production Runner
# ----------------------------------------------------
FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache openssl libc6-compat

ENV NODE_ENV=production
ENV PORT=5000

# Copy production node_modules, generated Prisma client, schema, and dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

EXPOSE 5000

# Automatically synchronize database schema with Neon / PostgreSQL, then start backend
CMD ["sh", "-c", "npx prisma db push && node dist/main"]
