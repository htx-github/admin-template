/**
 * 自动添加api文件到 api对象，以文件名为key值，文件的导出为value值
 * 示例：
 *   this.$api.login.login() // 调用login模块中login()方法
 * 说明：
 *   $api 全局变量
 *   login 登录功能模块，即 ./system/login.js
 *   login() 登录方法
 * 注意：
 *   文件名不建议命名为index.js，因为处理时排除了该类文件
 */
const apiModules = require.context(
  // 相对当前目录下的所有文件
  "./",
  // 包含子目录
  true,
  // 选择以.js结尾的文件
  /\.js$/
);

const api = {};

apiModules.keys().forEach(fileName => {
  if (!/index/.test(fileName)) {
    // 获取api文件
    const apiFile = apiModules(fileName);

    // 获取模块名字
    const moduleName = getModuleName(fileName.replace(/^\.\/(.*)\.\w+$/, "$1"));

    // 如果这个文件是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    api[moduleName] = apiFile.default || apiFile;
  }
});

function getModuleName(fileName) {
  if (/\//.test(fileName)) {
    return fileName.substring(fileName.lastIndexOf("/") + 1);
  }
  return fileName;
}

export default Vue => {
  Vue.prototype.$api = api;
};
