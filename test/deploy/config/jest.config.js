module.exports = {
  displayName: 'deploy',
  rootDir: '../',
  setupTestFrameworkScriptFile: '<rootDir>/config/setup.js',
  testEnvironment: '<rootDir>/config/puppeteer_environment.js',
  testMatch: ['**/__tests__/**/*.js'],
};
