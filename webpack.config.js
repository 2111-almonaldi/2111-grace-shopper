const { resolve } = require('path')


module.exports = {
  entry: ["babel-polyfill", "./client/index.js"],
  output: {
    path: __dirname,
    filename: "./public/bundle.js",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        include: resolve(__dirname, "./client"),
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
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
    port: "8080",
    allowedHosts: [".amazonaws.com"],
  }
};
