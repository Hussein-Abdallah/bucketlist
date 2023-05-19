module.exports = {
  root: true,
  extends: [
    // "plugin:@shopify/typescript",
    'plugin:@shopify/react',
    'plugin:@shopify/prettier',
    'plugin:@shopify/esnext',
    'plugin:@shopify/node',
  ],
  rules: {
    'prettier/prettier': 0,
    'no-shadow': 'off',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
  },
};
