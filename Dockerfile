# Use the Node.js 18 image from Docker Hub
FROM node:18

# Set the working directory inside the container to /fun_dive
# This will be the directory where your app's source code resides
WORKDIR /FUN_DIVE

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install the dependencies in the container
RUN npm install 

# Copy the rest of your application source code from your host to your container filesystem
COPY . .

# Compile TypeScript to JavaScript if needed
RUN npm run build 

#Expose the port the app runs on
EXPOSE 8000

#Command to run when the container starts
# If you're compiling TypeScript to JavaScript
# specify the output directory and main JS file
ENTRYPOINT ["node", "dist/app.js"]