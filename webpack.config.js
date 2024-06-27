const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  mode: 'development', // 'development' or 'production
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'BrowserCheckSum',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  devtool: 'source-map',
};
