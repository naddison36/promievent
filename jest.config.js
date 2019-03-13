// jest.config.js
module.exports = {
  verbose: true,
  transform: {
    "^.+\\.tsx?$": 'ts-jest'
  },
  testPathIgnorePatterns: [
    "/node_modules/",
  ],
  testRegex: '/__tests__/.*\\.test\\.ts$',
  moduleFileExtensions: ['ts', 'js'],
  globals: {
    'ts-jest': {
      diagnostics: {
        // Do not fail on TS compilation errors
        // https://kulshekhar.github.io/ts-jest/user/config/diagnostics#do-not-fail-on-first-error
        warnOnly: true
      }
    }
  },
  testEnvironment: 'node'
}
