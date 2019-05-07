const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const getHtmlConfig=(name,title)=>
    new HtmlWebpackPlugin({
        template:`./views/${name}.html`,
        title: title,
        filename: `views/${name}.html`,
        inject:true,
        hash:true
    })
module.exports={
    mode: 'development',
    entry:"./js/main.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    module:{
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
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
        // new HtmlWebpackPlugin({
        //     template:"./views/index.html",
        //     title: 'index',
        //     filename: 'views/index.html',
        //     inject:true,
        //     hash:true
        // }),
        getHtmlConfig("index","首页1")
    ]
}
