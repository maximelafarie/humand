FROM node:14.1-alpine

RUN mkdir -p /home/app/application
RUN chown 1000:1000 /home/app/application

USER 1000

WORKDIR /home/app/application

# Prevent the reinstallation of node modules at every changes in the source code
COPY --chown=1000:1000 package.json yarn.lock ./

RUN yarn install

ENV PATH="./node_modules/.bin:$PATH"

COPY --chown=1000:1000 . ./

CMD [ "yarn", "start" ]
