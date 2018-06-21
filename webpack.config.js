const path = require('path');  // getting the path.join method from node
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public'), // __dirname - returns the absolute path
            filename: 'bundle.js'
        },
    
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/    
            }, {
                test: /\.s?css$/,   // ? - make 's' optional
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {sourceMap: true}
                        }, {
                            loader:'sass-loader',
                            options: {sourceMap: true}
                        }
                    ]
                })                 
            }]
        },

        plugins: [
            CSSExtract
        ],
    
        devtool: isProduction ? 'source-map' : 'inline-source-map', // for handling errors in console by more good way . it shows the exact place of error
    
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true
          }
    };
};

// babel-loader  is a webpack plugin to teach webpack how to work with certain type of files 
// babel-core is much like babel-cli(command line interface) , which allows us to use babel with webpack . babel-cli allows us to use babel in the command line.
// use allows us to provide array of loaders
// node-sass  allows us to compile scss to css
// style-loader  is used for inlining css styles
// sass-loader  -  Loads a Sass/SCSS file and compiles it to CSS. 
// devServer.historyApiFallback -  When using the HTML5 History API, the index.html page will likely have to be served in place of any 404 responses. Enable this by passing: