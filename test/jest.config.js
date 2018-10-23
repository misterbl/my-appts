module.exports = {
  reporters: [
    'default',
    [
      '<rootDir>/node_modules/jest-html-reporter',
      {
        pageTitle: 'Unit Test Report',
        outputPath: 'results/unit/test-report.html',
        includeFailureMsg: true,
        theme: 'darkTheme',
      },
    ],
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  transform: {
    '^.+\\.(js|tsx?)$': 'ts-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/helpers/fileTransformer.js',
  },
  moduleNameMapper: {
    '^.+\\.svg$': '<rootDir>/test/svgMock.js',
  },
  transformIgnorePatterns: ['node_modules/(?!@jg)'],
  rootDir: '../',
  roots: ['<rootDir>/src'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  setupTestFrameworkScriptFile: '<rootDir>/test/setup.js',
  coverageReporters: ['json', 'lcov', 'text', 'html'],
  coverageDirectory: '<rootDir>/results/coverage/',
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/src/server/index.ts',
    '<rootDir>/src/client/consts/',
    '<rootDir>/src/client/types/',
    '<rootDir>/src/client/publicPath.ts',
    '<rootDir>/src/client/index.tsx',
    '<rootDir>/src/client/testMocks/',
    '<rootDir>/src/client/.*.d.ts',
    '<rootDir>/src/client/history.ts',
  ],
  collectCoverage: true,
  globals: {
    describe: true,
    it: true,
    expect: true,
  },
  snapshotSerializers: ['<rootDir>/node_modules/enzyme-to-json/serializer'],
};
