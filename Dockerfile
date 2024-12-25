##########################################################################################
# Stage 1: Build
##########################################################################################
FROM node:14-alpine AS builder
WORKDIR /usr/src/app

# Metadata labels
LABEL maintainer="MIRLabs <no-reply@github.com>"
LABEL version="1.0.0"
LABEL description="A simple task manager application built with Node.js, Express, and MongoDB."

# Copy package.json and package-lock.json and install dependencies
COPY node/package*.json ./
RUN npm install

# Install Webpack globally for the build step
RUN npm install -g webpack webpack-cli dotenv-webpack

# Copy the rest of the application code and build it
COPY node/ .
COPY node/.env ./
RUN npm run build

##########################################################################################
# Stage 2: Runtime
##########################################################################################
FROM node:14-alpine
WORKDIR /usr/src/app

# Metadata labels
LABEL maintainer="MIRLabs <no-reply@github.com>"
LABEL version="1.0.0"
LABEL description="A simple task manager application built with Node.js, Express, and MongoDB."

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/dist ./
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copy static files
COPY public ./public

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "app.bundle.js"]