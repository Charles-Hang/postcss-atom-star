module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "airbnb-base",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "indent": ["error", 4],
        "import/no-dynamic-require": "off",
        "global-require": "off",
        "no-param-reassign": "off",
        "arrow-body-style": "off"
    },
    "ignorePatterns": ["lib/**/*.js"]
};