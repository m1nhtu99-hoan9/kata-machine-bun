module.exports = {
    "root": true,
    "extends": [
        "eslint:recommended",
        "prettier",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": { "project": ["./tsconfig.json"] },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "operator-linebreak": ["error", "none"],
        "@typescript-eslint/no-unused-vars": "off"
    },
    "ignorePatterns": ["src/__tests__/*.spec.ts"]
}