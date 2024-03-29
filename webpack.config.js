const path = require(`path`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    path: path.join(__dirname, `public`),
    filename: `bundle.js`
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname, `public`),
    publicPath: `https://localhost:8080/`,
    compress: true,
    watchContentBase: true
  },
  plugins: [
    new MomentLocalesPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [`style-loader`, `css-loader`],
      }
    ]
  },
};
