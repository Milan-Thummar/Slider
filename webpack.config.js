const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/Slider.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "slider.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
