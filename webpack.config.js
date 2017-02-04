var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: {
        app: ["./index.js"]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/",
        filename: "[name].js"
    },
    module: {
    	loaders: [{
    		test: /\.js$/,
    		loader: "babel-loader"
    	}, {
			test: /\.styl$/,
			loaders: ["style-loader", "css-loader", "stylus-loader"]
		}]
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            
        })
    ]
};
