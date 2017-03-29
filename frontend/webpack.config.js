'use strict';
var webpack = require('webpack'),

  HtmlWebpackPlugin=require('html-webpack-plugin'),
  path = require('path')
 

module.exports = {
  //context: PATHS.app,
  entry: {
    app: './app/index.js',
    //vendor: 'angular'
  },
  output: {
   // path: PATHS.app,
    filename: './app/bundle.js'
  },
  
  module: {
  	loaders:[
   {
     test: /\.js$/,
     loader: 'babel?presets[]=es2015',
     exclude: /node_modules|bower_components/
   },
   {
    
      test: /\.scss$/,
      loader:"sass-loader"
   }
   ]
  },
  devServer: {
      hot: true,
      // enable HMR on the server

      contentBase:path.join(__dirname,"app"),
      // match the output path

     // publicPath: './app',
      // match the output `publicPath`

      inline:true,
    },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
    	template:path.join(__dirname,"app/index.html")
    }),
    /*new webpack.optimize.CommonsChunkPlugin({
                    name: 'vendor', // Specify the common bundle's name.
                    minChunks: function (module) {
                                       // this assumes your vendor imports exist in the node_modules directory
                                       return module.context && module.context.indexOf('node_modules') !== -1;
                                    }
                })*/
  ]
};
