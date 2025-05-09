# Dockerfile for cr-proxy
FROM node:lts

WORKDIR /app

COPY server.js ./

# Install dependencies directly (no package.json)
RUN npm install express node-fetch@2

EXPOSE 3000

CMD ["node", "server.js"]
