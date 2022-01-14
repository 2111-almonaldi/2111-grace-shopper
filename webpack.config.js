const { resolve } = require('path')

module.exports = {
  entry: [ "./client/index.js"],
  output: {
    path: __dirname,
    filename: "./public/bundle.js",
  },
  mode: 'development',
  context: __dirname,
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: resolve(__dirname, "./client"),
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.svg$|\.ttf?|\.woff$|\.woff2|\.eof|\.eot/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader:'url-loader',
            options: {
              limit: 10000
            }
          },
        ]
      }

    ],
  },
  devServer: {
  compress: true,
  inline: true,
  port:
    allowedHosts: [".amazonaws.com"]
  },
};
