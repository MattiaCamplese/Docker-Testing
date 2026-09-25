# Immagine a due stadi:
#   docker compose (sviluppo)  -> target "dev":  dipendenze di sviluppo + nodemon
#   docker build .             -> target "prod": solo dipendenze di produzione, utente non root
FROM node:22-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./
EXPOSE 3000
HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1

FROM base AS dev
RUN npm ci
COPY src ./src
CMD ["npm", "run", "dev"]

FROM base AS prod
ENV NODE_ENV=production
RUN npm ci --omit=dev
COPY src ./src
USER node
CMD ["node", "src/server.js"]
