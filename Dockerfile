FROM node:alpine

# Create the bot's directory
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# Copy package.json and install dependencies
COPY package.json /usr/src/bot
RUN npm install

# Copy the rest of the application code
COPY . /usr/src/bot

# Update package list and install ffmpeg
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    rm -rf /var/lib/apt/lists/*

# Start the bot
CMD ["node", "main.js"]
