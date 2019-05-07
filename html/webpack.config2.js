const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const getHtmlConfig=(name,title)=>
    new HtmlWebpackPlugin({
        template:`./views/${name}.html`,
        title: title,
        filename: `views/${name}.html`,
        inject:true,
        hash:true,
        chunks: [name]
    })
module.exports={
    mode: 'development',
    entry:{
        "index":"./js/main.js",
        "news":"./js/main.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
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
        getHtmlConfig("index","首页1"),
        getHtmlConfig("news","news")
    ]
}
