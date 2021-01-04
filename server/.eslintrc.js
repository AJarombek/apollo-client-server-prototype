/**
 * Linting configuration for the Apollo Server application.
 * @author Andrew Jarombek
 * @since 1/4/2021
 */

module.exports = {
    parser: "@typescript-eslint/parser",
    extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint'],
    plugins: ["prettier"],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {
        "eqeqeq": "warn",
        "max-len": ["error", { "code": 120 }],
        "quotes": ["error", "single", { "avoidEscape": true }],
        "prettier/prettier": ["error", {
            "singleQuote": true,
            "printWidth": 120,
            "trailingComma": "none",
        }]
    },
    ignorePatterns: ['webpack.config.js', '.eslintrc.js']
};
