/* eslint-disable @typescript-eslint/no-var-requires */
const { withSentryConfig } = require("@sentry/nextjs");
const withPWA = require("next-pwa")({
  dest: "public",
  disableDevLogs: true
});

const config = require("@toppings/next-config/next.config");

const pwaConfig = withPWA(config);

module.exports = withSentryConfig(pwaConfig, {
  authToken: process.env.NEXT_PUBLIC_SENTRY_TOKEN,
  project: "toppings",
  silent: true // Suppresses all logs
});
