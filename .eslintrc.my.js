module.exports = {
  env: {
    jest: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {

    // Disallow or enforce spaces inside of parentheses (space-in-parens)
    'space-in-parens': [ 'error', 'always' ],

    // require or disallow trailing commas (comma-dangle)
    'comma-dangle': [ 'error', 'never'],

    // require or disallow semicolons instead of ASI (semi)
    semi: [ 'error', 'always' ],

    // Require or disallow a space before function parenthesis (space-before-function-paren)
    'space-before-function-paren': [ 'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],

    // Enforce Usage of Spacing in Template Strings (template-curly-spacing)
    'template-curly-spacing': [ 'error', 'always' ],

    // enforce consistent spacing before and after keywords (keyword-spacing)
    'keyword-spacing': [ 'error',
      {
        before: true,
        after: true,
        overrides: { catch: { after: true } }
      }
    ],

    // disallow unnecessary parentheses (no-extra-parens)
    'no-extra-parens': [ 'error',
      'all',
      {
        nestedBinaryExpressions: false,
        returnAssign: false
      }
    ],

    // enforce consistent spacing inside braces (object-curly-spacing)
   'object-curly-spacing': [ 'error', 'always' ]
  }
}
