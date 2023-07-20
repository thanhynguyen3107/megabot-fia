const path = require('path');
const nodeExternals = require('webpack-node-externals');
require('dotenv').config();

const WebpackShellPluginNext = require('webpack-shell-plugin-next');

console.log('build mode: ', process.env.NODE_ENV);
const config = (env, argv) => {
  const isWatchMode = !!argv.watch;
  return {
    mode: process.env.NODE_ENV,
    entry: {
      index: './app.ts'
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          test: /\.(?:ts)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-typescript']],
              plugins: [
                [
                  'module-resolver',
                  {
                    alias: {
                      '~': './src'
                    }
                  }
                ]
              ]
            }
          }
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public')
    },
    plugins: [
      isWatchMode &&
        new WebpackShellPluginNext({
          onBuildEnd: {
            scripts: ['nodemon public/bundle.js'],
            blocking: false,
            parallel: true
          }
        })
    ].filter(Boolean)
  };
};

module.exports = config;
