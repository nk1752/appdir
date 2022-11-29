FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=prod

COPY . .

ENV DEPLOY_ENV prod

RUN npm run build

FROM node:18-alpine AS deploy

#RUN addgroup -g 1001 viva && adduser -u 1001 -G viva -D viva
RUN addgroup -g 1001 -S viva && adduser -u 1001 -S viva -G viva
USER viva

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js


ENV NODE_ENV=production
# DEPLOY_ENV can also be set at runtime by passing env variable
# ex: docker run -e DEPLOY_ENV=test -p 3000:3000 container_name
ENV DEPLOY_ENV prod

EXPOSE 3000

CMD ["node", "server.js"]
