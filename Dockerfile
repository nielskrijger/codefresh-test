# Install and compile nodejs application
FROM node:8.9.4-alpine as builder
WORKDIR /app
COPY . .
RUN npm install --production

# Copy build artifacts to minimal Alpine image
FROM alpine:3.7
RUN apk add --no-cache 'nodejs<8.9.4-r1'
COPY --from=builder /app /app
EXPOSE  8080
CMD ["node", "/app/index.js"]
