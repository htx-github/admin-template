/* eslint-disable */
const isProduction = process.env.NODE_ENV === "production";
console.log(isProduction)
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
// const CompressionPlugin = require("compression-webpack-plugin")
const Timestamp = new Date().getTime();
// console.log(CompressionPlugin);
// const cdn = {
//   css: ['//cdn.bootcss.com/element-ui/2.9.2/theme-chalk/index.css'],
//   js: [
//     '//cdn.bootcss.com/vue/2.6.10/vue.min.js',
//     '//cdn.bootcss.com/moment.js/2.24.0/moment.min.js',
//     '//cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
//     '//cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
//     '//cdn.bootcss.com/axios/0.18.1/axios.min.js',
//     '//cdn.bootcss.com/element-ui/2.9.2/index.js',
//     '//cdn.bootcss.com/video.js/5.20.5/video.min.js'
//   ]
// };
const cdn = {
  css: [],
  js: []
};
// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
// const port = process.env.port || process.env.npm_config_port || 9528; // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  productionSourceMap: false,
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: "/",
  lintOnSave: false,
  devServer: {
    // port: port,
    open: true
  },
  pwa: {
    iconPaths: {
      favicon32: "favicon.ico",
      favicon16: "favicon.ico",
      appleTouchIcon: "favicon.ico",
      maskIcon: "favicon.ico",
      msTileImage: "favicon.ico"
    }
  },
  pluginOptions: {
    // svgSprite: {
    //   dir: "src/icons/svg/",
    //   test: /\.(svg)(\?.*)?$/,
    //   loaderOptions: {
    //     extract: true,
    //     spriteFilename: "icons.[hash:8].svg" // or 'img/icons.svg' if filenameHashing == false
    //   },
    //   pluginOptions: {
    //     plainSprite: true
    //   }
    // },
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [resolve("src/styles/variables.less"),resolve("src/styles/mixin.less")] // 引入全局样式变量
    }
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false,
    extract: {
      filename: isProduction ? `css/[name].${Timestamp}.css` : `css/[name].css`,
      chunkFilename: isProduction
        ? `css/[name].${Timestamp}.css`
        : `css/[name].css`
    }
  },
  configureWebpack: config => {
    // console.log(config);
    if (isProduction) {
      // config.externals = {
      //   vue: 'Vue',
      //   vuex: 'Vuex',
      //   axios: 'axios',
      //   moment: 'moment',
      //   'vue-router': 'VueRouter',
      //   'element-ui': 'ELEMENT',
      //   'video.js': 'videojs'
      // };
      return {
        // 开启gzip压缩
        // plugins: [
        //   new CompressionPlugin({
        //     test: /\.js$|\.html$|\.css/,
        //     threshold: 10240,
        //     deleteOriginalAssets: false
        //   })
        // ],
        output: {
          // 输出重构  打包编译后的 文件名称  【模块名称.时间戳】
          filename: `js/[name].${Timestamp}.js`,
          chunkFilename: `js/[name].${Timestamp}.js`
        }
      };
    }
  },
  chainWebpack(config) {
    config.resolve.alias.set("@", resolve("src"));
    // config.plugins.delete("preload"); // TODO: need test
    // config.plugins.delete("prefetch"); // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
      config.module
      .rule("yml")
      .test(/\.yml$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("file-loader")
      .loader("file-loader")
    // set preserveWhitespace
    // config.module
    //   .rule("vue")
    //   .use("vue-loader")
    //   .loader("vue-loader")
    //   .tap(options => {
    //     options.compilerOptions.preserveWhitespace = true;
    //     return options;
    //   })
    //   .end();

    // config
    //   // https://webpack.js.org/configuration/devtool/#development
    //   .when(process.env.NODE_ENV === "development", config =>
    //     config.devtool("cheap-source-map")
    //   );

    // config.when(process.env.NODE_ENV !== "development", config => {
    //   config
    //     .plugin("ScriptExtHtmlWebpackPlugin")
    //     .after("html")
    //     .use("script-ext-html-webpack-plugin", [
    //       {
    //         // `runtime` must same as runtimeChunk name. default is `runtime`
    //         inline: /runtime\..*\.js$/
    //       }
    //     ])
    //     .end();
    //   config.optimization.splitChunks({
    //     chunks: "all",
    //     cacheGroups: {
    //       libs: {
    //         name: "chunk-libs",
    //         test: /[\\/]node_modules[\\/]/,
    //         priority: 10,
    //         chunks: "initial" // only package third parties that are initially dependent
    //       },
    //       elementUI: {
    //         name: "chunk-elementUI", // split elementUI into a single package
    //         priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
    //         test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
    //       },
    //       commons: {
    //         name: "chunk-commons",
    //         test: resolve("src/components"), // can customize your rules
    //         minChunks: 3, //  minimum common number
    //         priority: 5,
    //         reuseExistingChunk: true
    //       }
    //     }
    //   });
    //   config.optimization.runtimeChunk("single");
    // });
    // cdn 注入
    config.plugin("html").tap(args => {
      args[0].cdn = isProduction
        ? cdn
        : {
            css: [],
            js: []
          };
      return args;
    });
  }
};
