# Stage 1: Build the application
FROM node:14.17.1-alpine AS builder

# Set working directory
WORKDIR /app


COPY package*.json ./

# Install dependencies
RUN npm install


COPY . .


RUN npm run build


RUN npm install serve

# Stage 2: Production
FROM gcr.io/distroless/nodejs:14

WORKDIR /app

# Copy the build output and necessary files from the previous stage
COPY --from=builder /app/build /app/build
COPY --from=builder /app/node_modules /app/node_modules


# Expose the application port
EXPOSE 3001

# Command to run the application
CMD ["node_modules/.bin/serve", "-s", "build", "-l", "3001"]
