module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jest": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint", "spellcheck"
    ],
    "rules": {
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/no-explicit-any': 0,
        'react/no-unescaped-entities': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/member-delimiter-style': 0,
        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/no-namespace': 0,
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
        'no-unsafe-finally': 0,
        'no-useless-escape': 0,
        'no-console': ['error', { allow: ['info', 'warn', 'error'] }],    
        'spellcheck/spell-checker': [
            1,
            {
            comments: true,
            strings: true,
            identifiers: true,
            lang: 'en_GB',
            skipWords: [ 
                "duffel"
            ],
            skipIfMatch: [
                'http://[^s]*',
                'https://[^s]*',
                '/[^s]*',
                '&nbsp;',
                '^[-\\w]+/[-\\w\\.]+$',
                '^[a-z]{3}_[a-zA-Z0-9]{21,22}$',
            ],
            skipWordIfMatch: ['.*vh$', '.*vw$', '.*px$', '.*%$', '^[a-f0-9]{6}$', '^[a-z]{3}_*', '^[a-z]{4}_*'],
            minLength: 3
            }
        ]
    }
}
