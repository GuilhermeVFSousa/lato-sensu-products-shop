/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    "node_modules/(?!(react-router|react-router-dom|@remix-run)/)"
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"]
};