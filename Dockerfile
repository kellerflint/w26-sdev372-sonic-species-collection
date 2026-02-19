# FrontEnd
FROM node:20-alpine AS builder

WORKDIR /app

COPY frontend/package*.json ./frontend/
RUN cd frontend && npm i

COPY frontend ./frontend
RUN cd frontend && npm run build

# BackEnd
FROM node:20-alpine

WORKDIR /app

COPY server/package*.json ./server/
RUN cd server && npm i

COPY server ./server

COPY --from=builder /app/frontend/dist ./server/public

EXPOSE 3001

CMD ["node", "server/server.js"]