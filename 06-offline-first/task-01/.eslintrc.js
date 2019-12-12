module.exports = {
    "env": {
        "browser": true,
        "amd": true,
        "node": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "$": "readonly",
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        'no-unused-vars': 0,
        "indent": [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'space-before-blocks': [
            "error",
            {"functions": "never", "keywords": "never", "classes": "never"}
        ],
        'no-var': [
            "error"
        ],
        'max-len': [
            "error",
            {"code": 60}
        ],
        'no-undef': 0,
        'no-case-declarations': 0
    }
};