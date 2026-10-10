FROM node:22-bookworm-slim AS assets
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN node scripts/build_material_assets.cjs

FROM node:22-bookworm-slim
WORKDIR /app
COPY --from=assets /app/index.html ./index.html
COPY --from=assets /app/data ./data
COPY --from=assets /app/vendor ./vendor
COPY --from=assets /app/server ./server
COPY --from=assets /app/scripts/pilot_users.cjs ./scripts/pilot_users.cjs
USER node
ENV PORT=4174
EXPOSE 4174
CMD ["node", "server/private_pilot.cjs"]
