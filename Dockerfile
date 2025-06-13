# Build the React app
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies, src
COPY package.json ./
COPY vite.config.js ./
COPY index.html ./
COPY src ./src

# build
RUN npm install
RUN npm run build

# Serve the built app with a lightweight web server (nginx)
FROM nginx:stable-alpine

# Copy built files from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port and start nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
