module.exports = {
    root: true,
    env: {
        node: true,
        es6: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'eslint:recommended',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        'react',
        'react-hooks',
    ],
    rules: {
        'linebreak-style': ['error', 'windows'],
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'no-use-before-define': ['error', { variables: false }],
        'object-curly-newline': ['error', { ImportDeclaration: 'never' }],
        'react/destructuring-assignment': 0,
        'react/prop-types': 0,
        'global-require': 0,
        indent: ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-props-no-spreading': 'off',
        'max-len': ['error', { code: 100 }],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
    },
};
