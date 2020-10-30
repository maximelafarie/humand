FROM node:14.7.0-alpine
ENV TERM xterm-256color

RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      freetype-dev \
      harfbuzz \
      ca-certificates \
      ttf-freefont

ENV CHROME_BIN /usr/bin/chromium-browser

WORKDIR /usr/src/app/client

# Prevent the reinstallation of node modules at every changes in the source code
COPY package*.json ./

# RUN npm install -g @angular/cli @angular-devkit/build-angular
RUN npm install

CMD npm start
