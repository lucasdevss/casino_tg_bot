# # Stage 1: Build the application
# FROM node:18 AS builder

# # Set the working directory inside the container
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Build the application
# RUN npm run build

# # Stage 2: Run the application
# FROM node:18

# # Set the working directory inside the container
# WORKDIR /app

# # Copy the built application from the builder stage
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/package*.json ./
# COPY ./assets ./assets
# COPY ./src/i18n/generated ./src/i18n/generated
# # Copy the entrypoint script from the build context
# COPY ./docker-entrypoint.sh ./

# # Set the necessary permissions for the entrypoint script
# RUN chmod +x docker-entrypoint.sh


# # Install production dependencies
# RUN npm install --only=production

# ENV TELEGRAM_BOT_TOKEN=7362824009:AAGDEoNh-K7cuGvZ7RNdHKxjy3Bz0hOV24U
# ENV TELEGRAM_WEB_APP_URL=https://duples.top/
# ENV TELEGRAM_COMMUNITY_URL=https://t.me/telegram 

# # Expose the port the app runs on
# EXPOSE 8080

# # Define the command to run the application
# CMD ["node", "dist/main.js"]

FROM node:20.3.1

WORKDIR /usr/src/app

COPY package*.json ./
# COPY entrypoint.sh /usr/local/bin/entrypoint.sh
# RUN chmod +x /usr/local/bin/entrypoint.sh

# ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

RUN npm ci

COPY . .

RUN npm run build

# Copy the entrypoint script
COPY entrypoint.sh /usr/local/bin/entrypoint.sh

# Set the necessary permissions for the entrypoint script
RUN chmod +x /usr/local/bin/entrypoint.sh


# Env variables
ENV TELEGRAM_BOT_TOKEN=7362824009:AAGDEoNh-K7cuGvZ7RNdHKxjy3Bz0hOV24U
ENV TELEGRAM_WEB_APP_URL=https://duples.top/
ENV TELEGRAM_COMMUNITY_URL=https://t.me/telegram 

EXPOSE 8080

# ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["node", "dist/main.js"]