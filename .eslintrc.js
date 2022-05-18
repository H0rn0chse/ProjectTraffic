module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:vue/vue3-essential",
        "@vue/airbnb",
    ],
    parserOptions: {
        parser: "@babel/eslint-parser",
    },
    rules: {
        indent: ["error", 4, { SwitchCase: 1 }],
        quotes: ["error", "double"],
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "space-before-function-paren": ["error", "always"],
        "comma-dangle": "off",
        "max-len": "off",
        "func-names": "off",
        "arrow-body-style": "off",
        semi: ["warn", "always"],
        "no-warning-comments": "warn",
        "no-unused-vars": "warn",
        "prefer-destructuring": "off",
        "one-var": ["error", { initialized: "never" }],
        "one-var-declaration-per-line": ["error", "initializations"],
    },
};
