FROM node:26-alpine AS builder
RUN npm install -g pnpm@12.18.0
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
FROM node:26-alpine
RUN npm install -g pnpm@12.18.0
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "dist/index.js"]
