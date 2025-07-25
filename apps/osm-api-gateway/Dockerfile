FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package.json and yarn.lock
COPY package.json yarn.lock ./

# Copy the project specific package.json
COPY apps/osm-api-gateway/package.json ./apps/osm-api-gateway/

# Install all dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the app
RUN yarn build osm-api-gateway

FROM node:20-alpine AS runner

WORKDIR /app

# Copy the built application
COPY --from=builder /app/dist/apps/osm-api-gateway ./dist
# Copy package files
COPY --from=builder /app/package.json /app/yarn.lock ./

# Install only production dependencies
RUN yarn install --production --frozen-lockfile

EXPOSE 3010

CMD ["node", "dist/main.js"]