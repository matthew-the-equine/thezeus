const airbnb = require('@neutrinojs/airbnb');
const react = require('@neutrinojs/react');
const jest = require('@neutrinojs/jest');

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    airbnb({
      eslint: {
        parser: '@typescript-eslint/parser',
        parserOptions: {
          project: './tsconfig.json',
        },
        plugins: [
          '@typescript-eslint',
          'graphql'
        ],
        baseConfig: {
          extends: [
            'plugin:@typescript-eslint/eslint-recommended',
            'plugin:@typescript-eslint/recommended',
          ],
          settings: {
            'import/resolver': {
              node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
              },
            },
          },
        },
        rules: {
          "import/extensions": [
            "error",
            "ignorePackages",
            {
              "js": "never",
              "jsx": "never",
              "ts": "never",
              "tsx": "never"
            }
          ],
          "react/jsx-filename-extension": [1, { "extensions": [".jsx", ".tsx"] }],
          "semi": ["error", "never"],
          "arrow-parens": ["error", "as-needed"],
          "babel/semi": 0,
          "react/prop-types": 0,
          "@typescript-eslint/explicit-function-return-type": [2, { "allowExpressions": true }],
          "@typescript-eslint/ban-ts-ignore": 0,
          "import/prefer-default-export": 0,
        }
      },
    }),
    react({
      babel: {
        presets: ['@babel/preset-typescript'],
      },
      html: {
        title: 'Thezeus',
        favicon: 'public/favicon.svg',
      },
      style: {
        test: /\.scss$/,
        modulesTest: /\.module\.scss$/,
        loaders: [
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')
              ]
            }
          },
          { loader: 'sass-loader', useId: 'sass' }
        ]
      }
    }),
    jest({
      'testRegex': '/__tests__/.*.test.tsx?$'
    }),
    neutrino => {
      neutrino.config.resolve.extensions.add('.tsx');
      neutrino.config.resolve.extensions.add('.ts');
      neutrino.config.module.rule('compile')
        .test(/\.(wasm|mjs|jsx|js|tsx|ts)$/);
    },
    neutrino => {
      neutrino.config.module.rule('graphql')
        .test(/\.(graphql|gql)$/)
        .use('file')
        .loader(require.resolve('graphql-tag/loader'))
    }
  ],
};
