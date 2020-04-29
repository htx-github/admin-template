/**
 * 应用配置
 *  说明：
 *    这里使用Object.assign({}), 新建一个对象，防止全局变量被修改
 * 隐患：
 *   在vue文件被引入前修改全局变量webSite还是会导致应用请求地址被恶意篡改。
 */
export default Object.assign({}, window.webSite);
