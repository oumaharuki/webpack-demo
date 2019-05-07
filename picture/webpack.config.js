const path = require('path');
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
            // {
            //     test: /\.(png|svg|jpg|gif)$/,
            //     use: [{
            //         loader:"file-loader",
            //         options:{
            //             publicPath:"img",
            //             name:"[name].[ext]",
            //             outputPath: './img',
            //         }
            //     }],
            // },
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
    }
}
