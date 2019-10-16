const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, 'src/index.tsx'),
	watch: true,
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: "bundle.js"
	},

	module: {
		rules: [{
			test: /\.tsx?$/,
			loader: 'awesome-typescript-loader'
		},
		{
			enforce: 'pre',
			test: /\.js?$/,
			loader: 'source-map-loader'

		},
		{
			test: /\.scss$/,
			use: ExtractTextWebpackPlugin.extract({
				use: [
					{
						loader: 'css-loader'
					},
					'sass-loader'
				]

			})
		}
		]
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx']
	},
	devtool: 'source-map',
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
		new ExtractTextWebpackPlugin('style.css')

	]
};