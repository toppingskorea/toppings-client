FROM node:16 as builder
WORKDIR /my-project
COPY . .
RUN yarn install 
# RUN node ./src/utils/site-map.mjs
RUN yarn build

FROM node:16
WORKDIR /my-project
ENV NODE_ENV production

COPY                .env.production                           .
COPY --from=builder /my-project/public                        ./public
COPY --from=builder /my-project/.next                         ./.next
COPY --from=builder /my-project/next.config.js                ./next.config.js
COPY --from=builder /my-project/next-i18next.config.js        ./next-i18next.config.js
COPY --from=builder /my-project/package.json                  ./package.json

COPY --from=builder /my-project/yarn.lock                     ./yarn.lock
COPY --from=builder /my-project/.yarnrc.yml                   ./.yarnrc.yml
COPY --from=builder /my-project/.pnp.cjs                      ./.pnp.cjs
COPY --from=builder /my-project/.yarn                         ./.yarn

EXPOSE 80
CMD ["yarn", "start", "-p", "80"]