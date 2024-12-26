##########################################################################################
# Stage 1: Build
##########################################################################################
FROM node:23-alpine AS builder
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
COPY public/ ./public/
RUN npm run build

# Copy the built application to a build directory
RUN mkdir -p build                      && \
    cp -pr dist/*       ./build/        && \
    cp -pr node_modules ./build/        && \
    cp -pr public       ./build/

##########################################################################################
# Stage 2: Runtime
##########################################################################################
FROM node:23-alpine
WORKDIR /usr/src/app

# Metadata labels
LABEL maintainer="MIRLabs <no-reply@github.com>"
LABEL version="1.0.1"
LABEL description="A simple task manager application built with Node.js, Express, and MongoDB."

# Create a non-root user and switch to it
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/build ./

# Expose the application port
EXPOSE 3000

# Set the entrypoint to the node executable
ENTRYPOINT ["node"]

# Default command to run the application
CMD ["app.bundle.js"]