'use strict';

module.exports = function (api) {
  api.cache(false);
  const presets = [
    ['@babel/preset-env', { useBuiltIns: 'entry', corejs: 3 }],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ];

  const plugins = [
    './node_modules/@umijs/babel-plugin-auto-css-modules',
    "@babel/plugin-proposal-class-properties",
    [
      'import',
      {
        'libraryName': '@hupu/tool',
        'libraryDirectory': 'es',
        'camel2DashComponentName': false,
        'style': false
      },
      '@hupu/tool'
    ],
    [
      'import', 
      {
        'libraryName': '@hupu/api-components',
        'libraryDirectory': 'lib',
        'camel2DashComponentName': false,
        'style': 'css'
      },
      '@hupu/api-components'
    ],
    [
      'import', 
      {
        'libraryName': '@hupu/rc-basic',
        'libraryDirectory': 'es',
        'camel2DashComponentName': false,
        'style': false,
        'customName': name => {
          if (name === 'RadioGroup') {
            return `@hupu/rc-basic/es/components/Radio/${name}`;
          } else if (name === 'CheckBoxGroup') {
            return `@hupu/rc-basic/es/components/CheckBox/${name}`;
          }
          return `@hupu/rc-basic/es/components/${name}`;
        }
      },
      '@hupu/rc-basic'
    ],
    [
      'import',
      {
        'libraryName': 'peeler-js',
        'libraryDirectory': 'es',
        'camel2DashComponentName': false,
        'transformToDefaultImport': false,
        'style': false,
        'customName': name => {
          if (name === 'Logger') {
            return 'peeler-js/es/logger';
          } else if (name === 'firstLetter' || name === 'lastLetter') {
            return 'peeler-js/es/handleStr';
          } else if (name === 'clearKeyboardListener') {
            return 'peeler-js/es/listenKeyboard';
          } else if (name === 'isNumLike' || name === 'numLikeToNum') {
            return 'peeler-js/es/numLike';
          }
          return `peeler-js/es/${name}`;
        }
      },
      'peeler-js'
    ]
  ];

  return {
    presets,
    plugins
  };
};
