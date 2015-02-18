var path = require('path');
var webpack = require('webpack');

var config = {
  debug: true,
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server',
    './src/app/app.ts'
  ],
  output: {
    path: path.join(__dirname, "build"),
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  resolveLoader: {
    modulesDirectories: ['node_modules']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.ts$/, loaders: ['react-hot', 'ts-loader']}
    ]
  }
};

module.exports = config;
