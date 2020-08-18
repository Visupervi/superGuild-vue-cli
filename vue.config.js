const path = require('path');
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
console.log("process.env.NODE_ENV:" + process.env.VUE_APP_MODE);
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: "/",
  outputDir: 'dist',
  assetsDir: 'assets',
  lintOnSave: true,
  runtimeCompiler: false,
  productionSourceMap: false,
  css: {
    extract: true,
    sourceMap: true,
    // loaderOptions: {},
    // requireModuleExtension: false
  },
  parallel: require('os').cpus().length > 1,
  pwa: {},
  devServer: {
    hot: process.env.VUE_APP_MODE === "development",
    host: "localhost",
    port: 9988,
    https: false,
    open: true,
    // proxy: {
    //   '/': {
    //     target: 'http://106.54.156.68:5015',
    //     changeOrigin: true,
    //     secure: false,
    //     pathRewrite: {
    //       '^/': ''
    //     }
    //   }
    // }
  },
  pluginOptions: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
      rootValue: 40,
      propList: ['*']
    }
  },
  chainWebpack: config => {
    config.resolve.symlinks(true);
    config.output.filename('[name].[hash].js').end();
    //修复 Lazy loading routes Error
    config.plugin('html').tap(args => {
      args[0].chunksSortMode = 'none';
      return args;
    });
    // 开启图片压缩
    // config.module.rule('images')
    //   .test(/\.(png|jpe?g|gif)(\?.*)?$/)
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({ bypassOnDebug: true })
    // // 开启js、css压缩
    // if (process.env.NODE_ENV === 'production') {
    //   config.plugin('compressionPlugin')
    //     .use(new CompressionPlugin({
    //       test:/\.js$|\.html$|\.css$/, // 匹配文件名
    //       threshold: 10240, // 对超过10k的数据压缩
    //       deleteOriginalAssets: false // 不删除源文件
    //     }))
    // }
  },
  configureWebpack: config => {
    if (process.env.VUE_APP_MODE === 'production') {
      const plugins = []
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              // warnings: true,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log'] //移除console
            },
            mangle: false,
            output: {
              beautify: true,//压缩注释
            }
          },
          sourceMap: false,
          parallel: true,
        })
      );
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.html$|\.css$/,
          threshold: 10240,
          minRatio: 0.8
        })
      );
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              // warnings: true,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log']//移除console
            }
          },
          sourceMap: false,
          parallel: true
        })
      );
      config.plugins = [...config.plugins, ...plugins]
    }
    // 打包分析
    if (process.env.IS_ANALYZ) {
      config.plugin('webpack-report')
        .use(BundleAnalyzerPlugin, [{
          analyzerMode: 'assets',
        }]);
    }
  }
};
