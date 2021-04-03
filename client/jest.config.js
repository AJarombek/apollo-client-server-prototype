/**
 * Setup Jest for client tests.
 * @author Andrew Jarombek
 * @since 4/3/2021
 */

module.exports = {
  displayName: 'client',
  testEnvironment: 'jsdom',
  testRegex: '.*/test/.*.test.ts$',
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  },
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
  maxConcurrency: 5,
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.tsx$': 'ts-jest'
  }
};
