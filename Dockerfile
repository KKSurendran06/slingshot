# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json ./

# @next/swc-darwin-arm64 is a mac-only binary hardcoded as a regular dep.
# Strip it before install so npm doesn't reject the linux environment,
# then install the correct linux swc binary in its place.
RUN apk add --no-cache jq && \
    jq 'del(.dependencies["@next/swc-darwin-arm64"])' package.json > package.tmp.json && \
    mv package.tmp.json package.json && \
    npm install --legacy-peer-deps && \
    npm install @next/swc-linux-arm64-musl --no-save --legacy-peer-deps

COPY frontend/ ./

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ── Stage 2: Run (distroless — no shell, no OS tools, just Node) ──────────────
FROM gcr.io/distroless/nodejs20-debian12 AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["server.js"]
