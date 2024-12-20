# Use the official Node.js image to build the React application
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Serve the React app using a simple web server
FROM nginx:alpine

# Copy the build output from the previous step to Nginx's default directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx config file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
