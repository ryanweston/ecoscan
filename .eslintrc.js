module.exports = {
    // "env": {
    //     "es2021": true
    // },
    root: true,
    extends: [
        "plugin:react/recommended",
        "airbnb"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            "jsx": true
        },
        ecmaVersion: 13,
        sourceType: "module"
    },
    plugins: [
        "react",
        "@typescript-eslint"
    ],
    rules: {
    }
}

// {
//   "extends": [
//   "airbnb",
//   "prettier",
//   "prettier/react",
//   "plugin:prettier/recommended",
//   "eslint-config-prettier"
//   ],
//   "env": {
//     "es2021": true
// },
//   "parser": "babel-eslint",
//   "rules": {
//   "import/no-unresolved": "off",
//   "react/jsx-filename-extension": [
//   1,
//   {
//   "extensions": [".js", ".jsx"]
//   }
//   ],
//   "prettier/prettier": [
//   "error",
//   {
//   "trailingComma": "es5",
//   "singleQuote": true,
//   "printWidth": 100
//   }
//   ]
//   },
//   "plugins": ["prettier"]
//   }
