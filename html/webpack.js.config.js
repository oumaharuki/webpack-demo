const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

const getHtmlConfig=(name,title)=>
    new HtmlWebpackPlugin({
        template:`./views/${name}.html`,
        title: title,
        filename: `views/${name}.html`,
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
        filename: 'js/[name].js'
    },
    module:{
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader:"url-loader",
                    options:{
                        publicPath:"img",
                        name:"[name].[ext]",
                        outputPath: './img',
                        limit: 8192
                    }
                }],
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin("css/[name].css"),
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
