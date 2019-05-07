const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const getHtmlConfig=(name,title)=>
    new HtmlWebpackPlugin({
        template:`./views/${name}.html`,
        title: title,
        filename: `${name}.html`,
        inject:true,
        hash:true,
        chunks: ["common",name]
    })
module.exports={
    mode: 'development',
    entry:{
        "index":"./js/main.js",
        "news":"./js/news.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    module:{
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                ],
            },
            // {
            //     test: /\.css$/,
            //     // use: ["style-loader","css-loader"],
            //     use: ExtractTextPlugin.extract({
            //         fallback: "style-loader",
            //         use: [{
            //             loader: 'css-loader',
            //         }],
            //         publicPath: 'css'
            //     }),
            //
            // },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader:"url-loader",
                    options:{
                        publicPath:"img",
                        name:"[name].[ext]",
                        outputPath: '/img',
                        limit: 8192
                    }
                }],
            },
            {
                test: /\.string$/,
                use: ["html-loader"],
            },
        ]
    },
    plugins: [
        // new ExtractTextPlugin("css/[name].css"),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css',
        }),
        getHtmlConfig("index","首页1"),
        getHtmlConfig("news","news")
    ],
    optimization:{
        splitChunks:{
            cacheGroups: {
                commons: {
                    name : 'common',
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    }
}
