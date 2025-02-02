# Use Node.js image for building
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code and build project
COPY . .
RUN npm run build

# Use Nginx for serving the frontend
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 5173

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
