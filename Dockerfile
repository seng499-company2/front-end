FROM node:lts-alpine AS dependencies
ENV NODE_ENV=production
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:lts-alpine AS builder
ENV NODE_ENV=development
ARG API_HOST
ENV NEXT_PUBLIC_API_HOST=${API_HOST}
WORKDIR /app
COPY . .
RUN echo "NEXT_PUBLIC_API_HOST=${NEXT_PUBLIC_API_HOST}" > .env
RUN npm ci && NODE_ENV=production npm run build

FROM node:lts-alpine AS production
WORKDIR /app
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production
COPY --chown=node --from=builder /app/.next ./.next
COPY --chown=node --from=builder /app/package-lock.json /app/package.json ./
COPY --chown=node --from=dependencies /app/node_modules ./node_modules
USER node
EXPOSE 3000
CMD [ "npm", "start" ]