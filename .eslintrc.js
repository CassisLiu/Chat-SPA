module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
  },
  'extends': [
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'sourceType': 'module',
    'ecmaVersion': 2018,
  },
  'rules': {
    "require-jsdoc": [2, {
      "require": {
          "FunctionDeclaration": false,
          "MethodDefinition": false,
          "ClassDeclaration": false,
          "ArrowFunctionExpression": false,
          "FunctionExpression": false
      }
  }]
  },
};
