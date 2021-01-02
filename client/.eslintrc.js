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
    'plugin:cypress/recommended',
    'prettier/@typescript-eslint'
  ],
  plugins: [
    "prettier",
    "react-hooks"
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      // Allows eslint-plugin-react to automatically detect the React.js version in use.
      version: 'detect'
    }
  },
  rules: {
    "eqeqeq": "warn",
    "max-len": ["error", { "code": 120 }],
    "quotes": ["error", "single", { "avoidEscape": true }],
    "react/prop-types": ["off"],
    "react/no-unescaped-entities": ["off"],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "prettier/prettier": ["error", {
      "singleQuote": true,
      "printWidth": 120,
      "trailingComma": "none",
    }]
  },
  ignorePatterns: ['webpack.config.js', '.eslintrc.js']
};
