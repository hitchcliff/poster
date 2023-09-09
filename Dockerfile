FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

ENV NODE_ENV production

RUN yarn build

EXPOSE 4000 

HEALTHCHECK CMD curl --fail http://localhost:4000/graphql || exit 1   

CMD [ "node", "dist/server.js" ]

USER node
