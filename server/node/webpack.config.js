const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./handler.js",
  target: "node",
  mode: "production",
  externalsPresets: { node: true },
  externals: [
    nodeExternals({
      allowlist: [
        "@aws-sdk/client-secrets-manager",
        "@markab.io/node",
        "@markab.io/orbital-api",
        "body-parser",
        "config",
        "cors",
        "express",
        "express-session",
        "mongoose",
        "morgan",
        "scrape-it",
        "sharp",
        "uuid",
        "x-ray",
        "serverless",
        "serverless-dotenv-plugin",
        "serverless-http",
        "serverless-offline",
        "serverless-webpack",
      ],
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
