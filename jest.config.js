/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    "node_modules/(?!(react-router|react-router-dom|@remix-run)/)",
    "/node_modules/(?!(axios)/)"
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};