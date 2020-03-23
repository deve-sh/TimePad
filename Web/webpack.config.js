const path = require("path");
const webpack = require("webpack");

module.exports = {
	entry: "./src",
	output: {
		filename: "TimePad.js",
		path: path.resolve(__dirname, "public")
	},
	plugins: [
		new webpack.DefinePlugin({
		    PRODUCTION: JSON.stringify(true),
		  })
	]
};
