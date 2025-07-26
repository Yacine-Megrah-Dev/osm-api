FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package.json and yarn.lock
COPY package.json yarn.lock ./

# Copy the project specific package.json
COPY apps/auth-app/package.json ./apps/auth-app/

# Install all dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the app
RUN yarn build auth-app

FROM node:20-alpine AS runner

# Install netcat for health checks
RUN apk add --no-cache netcat-openbsd

WORKDIR /app

# Copy the built application
COPY --from=builder /app/dist/apps/auth-app ./dist
# Copy package files
COPY --from=builder /app/package.json /app/yarn.lock ./

# Install only production dependencies
RUN yarn install --production --frozen-lockfile

EXPOSE 3005

CMD ["node", "dist/main.js"] 