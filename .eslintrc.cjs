module.exports = {
  root: true, // Make sure eslint picks up the config at the root of the directory.
  settings: {
    react: {
      version: "detect", // Automatically detect the react version.
    },
  },
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jest/recommended",
    "plugin:react/recommended",
    "airbnb-typescript",
    "plugin:i18next/recommended",
    "plugin:prettier/recommended", // Make this the last element so prettier config overrides other formatting rules.
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "vite.config.ts"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
  plugins: [
    "@stylistic",
    "@typescript-eslint",
    "react",
    "import",
    "eslint-plugin-tsdoc",
    "react-refresh",
    "check-model-name",
  ],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "prettier/prettier": ["error", {}, { usePrettierrc: true }], // Use configured `.prettierrc` file as source.

    //eslint/react/rules
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    "react/jsx-pascal-case": "error",

    // scripts/eslint/rules
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/array-type": "error",
    "@stylistic/lines-between-class-members": [
      "error",
      "always",
      { exceptAfterSingleLine: true },
    ],

    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "typeLike",
        format: ["PascalCase"],
        filter: { regex: "^(__String|[A-Za-z]+_[A-Za-z]+)$", match: false },
      },
      {
        selector: "interface",
        format: ["PascalCase"],
        custom: { regex: "^I[A-Z]", match: false },
        filter: {
          regex: "^I(Arguments|TextWriter|O([A-Z][a-z]+[A-Za-z]*)?)$",
          match: false,
        },
      },
      {
        selector: "variable",
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
        leadingUnderscore: "allow",
        filter: {
          regex: "^(_{1,2}filename|_{1,2}dirname|_+|[A-Za-z]+_[A-Za-z]+)$",
          match: false,
        },
      },
      {
        selector: "function",
        format: ["camelCase", "PascalCase"],
        leadingUnderscore: "allow",
        filter: { regex: "^[A-Za-z]+_[A-Za-z]+$", match: false },
      },
      {
        selector: "parameter",
        format: ["camelCase"],
        leadingUnderscore: "allow",
        filter: { regex: "^(_+|[A-Za-z]+_[A-Z][a-z]+)$", match: false },
      },
      {
        selector: "method",
        format: ["camelCase", "PascalCase"],
        leadingUnderscore: "allow",
        filter: { regex: "^[A-Za-z]+_[A-Za-z]+$", match: false },
      },
      {
        selector: "memberLike",
        format: ["camelCase"],
        leadingUnderscore: "allow",
        filter: { regex: "^[A-Za-z]+_[A-Za-z]+$", match: false },
      },
      {
        selector: "enumMember",
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
        leadingUnderscore: "allow",
        filter: { regex: "^[A-Za-z]+_[A-Za-z]+$", match: false },
      },
      { selector: "property", format: null },
    ],

    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
        caughtErrors: "all",
        caughtErrorsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/switch-exhaustiveness-check": "error",

    "no-duplicate-imports": "error",

    "@typescript-eslint/no-inferrable-types": "error",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-this-alias": "error",

    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": [
      "error",
      { allowTernary: true },
    ],

    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/prefer-namespace-keyword": "error",
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/prefer-as-const": "error",

    "@stylistic/semi": "error",

    "@stylistic/space-before-function-paren": [
      "error",
      {
        asyncArrow: "always",
        anonymous: "always",
        named: "never",
      },
    ],

    "@typescript-eslint/triple-slash-reference": "error",
    "@typescript-eslint/type-annotation-spacing": "error",
    "@typescript-eslint/unified-signatures": "error",

    "react-hooks/exhaustive-deps": "error",

    // eslint
    "constructor-super": "error",
    curly: ["error", "multi-line"],
    "dot-notation": "error",
    eqeqeq: "error",
    "@stylistic/new-parens": "error",
    "no-caller": "error",
    "no-duplicate-case": "error",
    "no-empty": "error",
    "no-eval": "error",
    "no-extra-bind": "error",
    "no-fallthrough": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-sparse-arrays": "error",
    "no-template-curly-in-string": "error",
    "no-throw-literal": "error",
    "@stylistic/no-trailing-spaces": "error",
    "no-undef-init": "error",
    "no-unsafe-finally": "error",
    "no-unused-labels": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "prefer-const": "error",
    "prefer-object-spread": "error",
    "@stylistic/space-in-parens": "error",
    "unicode-bom": ["error", "never"],
    "use-isnan": "error",

    // eslint-plugin-import
    "import/first": "error", // disallow non-import statements appearing before import statements.
    "import/newline-after-import": "error", // Require a newline after the last import/require in a group.
    "import/no-absolute-path": "error", // Forbid import of modules using absolute paths.
    "import/no-amd": "error", // disallow AMD require/define.
    "import/no-default-export": "error", // forbid default exports.
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        peerDependencies: true,
        optionalDependencies: false,
        includeInternal: false,
      },
    ], // Forbid the use of extraneous packages.
    "import/no-mutable-exports": "error", // Forbid mutable exports.
    "import/no-named-default": "error", // Prevent importing the default as if it were named.
    "import/no-named-export": "off", // we want everything to be a named export.
    "import/no-self-import": "error", // Forbid a module from importing itself.
    "import/prefer-default-export": "off", // we want everything to be named.
    "check-model-name/model-name-required": "error",
  },
  overrides: [
    {
      files: ["*.js", "*.jsx"],
      rules: {
        "import/prefer-default-export": "error",
      },
    },
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "import/prefer-default-export": "off",
      },
    },
  ],
};
