FROM node:14-alpine3.16 as builder
COPY . /app
WORKDIR /app
RUN npm install --frozen-lockfile

FROM builder as runner
WORKDIR /app
RUN chmod 777 ./docker-entrypoint.sh
RUN echo "{}" > signature.json
# CMD [ "docker-entrypoint.sh"]
CMD [ "node", "dist/app.js"]