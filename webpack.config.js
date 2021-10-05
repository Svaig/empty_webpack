const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const distPath = path.resolve(__dirname, 'dist');

module.exports = {
    entry: './src/code/index.js',
    mode: "development",
    output: {
        path: distPath,
        filename: 'resources/scripts/[name].bundle.js?[hash:5]',
        publicPath: '/',
        clean: true,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public')
        },
        port: 8080,
        client: {
            logging: 'verbose'
        }
    },
    devtool: 'source-map',
    target: ['web', 'es5'],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "resolve-url-loader"
                    }, {
                        loader: "sass-loader"
                    }
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/i,
                type: "asset/resource",
                generator: {
                    filename: 'resources/img/[name][ext]?[hash:5]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: 'resources/fonts/[name][ext]?[hash:5]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack App"
        }),
        new MiniCssExtractPlugin({
            filename: 'resources/css/[name].css?[hash:5]'
        }),
    ],
};
