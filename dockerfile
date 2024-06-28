FROM node:18.17.1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    build-essential \
    libxi-dev \
    libglu1-mesa-dev \
    libglew-dev \
    pkg-config \
    libx11-dev \
    libxcursor-dev \
    libxinerama-dev \
    libxrandr-dev \
    libxxf86vm-dev \
    libasound2-dev \
    libpulse-dev \
    libudev-dev \
    mesa-utils \
    xvfb \
    x11vnc \
    libgl1-mesa-dri \
    libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

# Create a symlink for python
RUN ln -s /usr/bin/python3 /usr/bin/python

WORKDIR /usr/src/app

COPY package*.json ./

# Install node dependencies
RUN npm install

COPY . .

# Use build argument
ARG MONGO_URI
ENV MONGO_URI=$MONGO_URI

# Debug: Print environment variables
RUN echo "MONGO_URI is: $MONGO_URI"

# Copy the entrypoint script
COPY docker-entrypoint.sh /usr/src/app/docker-entrypoint.sh
RUN chmod +x /usr/src/app/docker-entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]