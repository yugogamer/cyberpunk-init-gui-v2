FROM node:20-slim AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app
RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM nginx:alpine
WORKDIR /app
COPY --from=builder /app/dist ./static
COPY nginx.conf /etc/nginx/nginx.conf
