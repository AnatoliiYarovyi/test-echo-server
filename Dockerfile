FROM node:18 as build

WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build

FROM --platform=linux/amd64 node:18-alpine
COPY --from=build /app/dist dist

CMD ["node", "dist"]