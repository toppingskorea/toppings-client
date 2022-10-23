module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./jest.setup.js"],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    "^~/(.*)$": "<rootDir>/src/$1",
    "^@images/(.*)$": "<rootDir>/src/assets/images/$1",
    "^@svgs/(.*)$": "<rootDir>/src/assets/svgs/$1",
    "^@stores/(.*)$": "<rootDir>/src/stores/ducks/$1",
    "^@typography": "<rootDir>/src/constants/Typography"
  },
  testMatch: ["<rootDir>/**/*/?(*.)+(spec|test).[jt]s?(x)"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  modulePaths: ["./"],
  collectCoverageFrom: ["**/*.{ts,tsx}"],
  coveragePathIgnorePatterns: ["/.next/", "/__tests__/", ".d.ts"]
};
