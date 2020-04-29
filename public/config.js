"use strict";
/**
 * appName: 项目全名
 * appShortName: 项目短名，侧边栏折叠时显示
 * baseURL: api服务器地址
 *  示例：
 *    空字符串：baseURL: '', 表示访问当前容器地址例如：localhost:8080，这种设置可以用于和后台war包一起部署。
 *    具体地址：baseURL: 'http://172.16.17.155:9005', 表示访问你设定的服务器地址和端口，这种设置用于分开部署、需要后台支持跨域。
 * fileServiceURL: 文件服务地址
 * codeGenerationURL: 代码生成服务地址
 *  示例： 同上
 * 说明：
 *   webSite是全局变量，这里你不用担心项目运行中修改webSite值而导致请求失败。因为webSite在初始化时拷贝了一份。
 */

window.webSite = {
  appName: "现场作业可视化监督系统",
  appShortName: "VSS",
  httpRequestTimeout: 20, // 请求超时 单位秒
  // baseURL: 'http://106.58.165.182:15000', // 正式环境
  baseURL: "http://139.9.0.236:15000", // 测试环境
  // baseURL: 'http://95zcvt.natappfree.cc',
  fileServiceURL: "http://172.16.17.155:9006",
  codeGenerationURL: "http://172.16.17.155:18080",

  // 高德地图
  aMapKey: "e3e1c00979189a189bc9fd6116ae1952",
  aMapUrl: "//webapi.amap.com/maps?v=1.4.9",
  aMapUIUrl: "//webapi.amap.com/ui/1.0/main.js?v=1.0.11"
};
