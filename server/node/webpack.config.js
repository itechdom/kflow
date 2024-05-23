const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './handler.js',
  target: 'node',
  mode: 'production',
  externalsPresets: { node: true }, // this makes sure the externals like 'fs', 'path' are not bundled
  externals: [nodeExternals({
    allowlist: ['serverless-http'] // make sure serverless-http is bundled
  })],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};