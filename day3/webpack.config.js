// webpack.config.js

var path = require("path");
var webpack = require("webpack");
var isDev = false;
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: "./src/app.js",
	output: {
		path: path.join(__dirname, "build"),
		filename: "client.js"
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				loader: "style-loader!css-loader!sass-loader"
			},
			{
				test: /\.(eot|woff|woff2|svg|ttf)$/,
				loader: "file-loader"
			},
			{
				test: /\.css$/,
				// loader: "style-loader!css-loader"
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			}
		]
	},
	plugins: isDev? [] : [
		new webpack.optimize.UglifyJsPlugin(),
		new ExtractTextPlugin({
			filename: "mystyle.min.css"
		})
	]
};





