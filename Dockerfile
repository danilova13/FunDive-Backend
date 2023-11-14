# Use the Node.js 18 image from Docker Hub
FROM node:18

RUN apt update && apt install -y netcat-traditional

# Set the working directory inside the container to /fun_dive
# This will be the directory where your app's source code resides
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install the dependencies in the container
RUN npm ci

# Copy the rest of your application source code from your host to your container filesystem
# copies it only once when you build the image
COPY . .

# Compile TypeScript to JavaScript if needed
RUN npm run build 

#Command to run when the container starts
# If you're compiling TypeScript to JavaScript
# specify the output directory and main JS file
ENTRYPOINT ["node", "dist/app.js"]
