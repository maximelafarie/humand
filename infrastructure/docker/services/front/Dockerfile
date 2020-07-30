FROM node:14.1-alpine

WORKDIR /home/app/application

# Prevent the reinstallation of node modules at every changes in the source code
COPY --chown=1000:1000 package.json yarn.lock ./

RUN yarn install

CMD [ "yarn", "start" ]
