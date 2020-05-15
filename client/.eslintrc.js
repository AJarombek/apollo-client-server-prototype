/**
 * Linting configuration for the Apollo Client application.
 * @author Andrew Jarombek
 * @since 5/14/2020
 */

module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    eqeqeq: "warn"
  },
  settings: {
    react: {
      // Allows eslint-plugin-react to automatically detect the React.js version in use.
      version: 'detect'
    }
  }
};
