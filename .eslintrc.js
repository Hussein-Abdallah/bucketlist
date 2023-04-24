module.exports = {
  root: true,
  extends: [
    "plugin:@shopify/typescript",
    "plugin:@shopify/react",
    "plugin:@shopify/prettier",
    "plugin:@shopify/esnext",
    "plugin:@shopify/node",
  ],
  rules: {
    "prettier/prettier": 0,
  },
};
