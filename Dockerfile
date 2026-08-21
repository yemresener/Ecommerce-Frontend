FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

RUN apk add --no-cache dumb-init

COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm ci --legacy-peer-deps --omit=dev

EXPOSE 4000

CMD ["dumb-init", "node", "dist/frontend-ecommerce/server/server.mjs"]