module.exports = {
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "turbo",
    "prettier",
  ],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "import/extensions": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true,
      },
    ],
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-empty-function": "off",
  },
  env: {
    node: true,
    browser: true,
  },
};
