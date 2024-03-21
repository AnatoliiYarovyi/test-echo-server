FROM node:18 as build

WORKDIR /app
COPY . .

ENV YARN_CACHE_FOLDER=/root/.yarn
RUN npm ci
RUN npm build

FROM --platform=linux/amd64 node:18-alpine
COPY --from=build /app/dist dist

CMD ["node", "dist"]