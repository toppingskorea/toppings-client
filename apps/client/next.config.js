/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require("next-pwa")({
  dest: "public"
});

const config = require("@toppings/next-config/next.config");

module.exports = withPWA(config);
