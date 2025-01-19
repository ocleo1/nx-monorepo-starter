# https://docs.docker.com/language/nodejs/develop/#update-your-dockerfile-for-development

FROM node:20-alpine AS base

FROM base AS installer
WORKDIR /srv
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev
COPY . .

FROM installer AS builder
ENV NODE_ENV=production
RUN --mount=type=cache,target=/root/.nx \
    npm run build

FROM nginx:1.25
# https://stackoverflow.com/a/60320356/6277806
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /srv/apps/hello/dist /usr/share/nginx/html
COPY ./nginx/templates /etc/nginx/templates
