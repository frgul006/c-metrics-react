const webpack = require("webpack");
const path = require("path");
const webpackNotifierPlugin = require('webpack-notifier');

const config = {
    devServer: {
        noInfo: false,
        contentBase: path.resolve(__dirname, "src")
    },
    devtool: "eval-source-map",
    entry: [
        "react-hot-loader/patch",
        "webpack-hot-middleware/client?reload=true", //note that it reloads the page if hot module reloading fails.
        path.resolve(__dirname, "src/index")
    ],
    target: "web",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpackNotifierPlugin({ alwaysNotify: true })
    ],
    module: {
        rules: [
            { test: /\.(js|jsx)$/, include: path.join(__dirname, "src"), use: ["babel-loader"] },
            { test: /(\.css)$/, use: ["style-loader", "css-loader"] },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: "file-loader" },
            { test: /\.(woff|woff2)$/, use: "url-loader?prefix=font/&limit=5000" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: "url-loader?limit=10000&mimetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: "url-loader?limit=10000&mimetype=image/svg+xml" }
        ]
    }
};

module.exports = config;