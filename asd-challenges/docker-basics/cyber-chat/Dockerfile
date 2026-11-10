FROM node:26-alpine
RUN npm install -g pnpm@12.18.0
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --prod
COPY . .
EXPOSE 3000
CMD ["pnpm", "start"]
