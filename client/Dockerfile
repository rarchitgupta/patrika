FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy package.json and bunfig.toml
COPY package.json bun.lockb ./

# Install dependencies using Bun
RUN bun install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["bun", "dev"]
