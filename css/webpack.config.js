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
                test: /\.(c|sa|sc)ss$/,
                use: ["style-loader","css-loader","sass-loader"],
                include: path.resolve(__dirname, 'css'),
                // exclude: path.resolve(__dirname, 'node_modules')
            },
        ]
    }
}
