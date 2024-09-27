module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false, // Disable config file checking
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Enable JSX parsing
    },
  },
  plugins: ['react'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {
    // Add any custom ESLint rules here
  },
};
