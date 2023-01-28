const path = require("path");

module.exports = {
  stories: [
    "./*.stories.mdx",
    "../**/*.stories.mdx",
    "../**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5"
  },
  webpackFinal: async config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      util: false,
      "~": path.resolve(__dirname, "../"),
      "@emotion/core": require.resolve("@emotion/react"),
      "emotion-theming": require.resolve("@emotion/react")
    };

    return config;
  },
  babel: async options => ({
    ...options,
    presets: [
      [
        "next/babel",
        {
          "preset-react": {
            runtime: "automatic",
            importSource: "@emotion/react"
          }
        }
      ]
    ],
    plugins: ["react-require", "@emotion/babel-plugin"]
  })
};
