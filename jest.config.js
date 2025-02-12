module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  testTimeout: 10000, // ✅ Increase timeout to 10 seconds
};
