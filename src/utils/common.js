// import store from "@/store";
import { getToken } from "@/utils/token";
import myConfig from "@/setting";

/**
 * 判断是否拥有权限
 * 示例：
 *    this.$utils.hasPermission('user:add')
 * @param value
 * @returns {boolean}
 */
export function hasPermission(value) {
  const buttons = store.getters.buttons;
  if (buttons.length) {
    return buttons.indexOf(value) >= 0;
  } else {
    console.warn("没有权限资源数据，请更换账号！");
    return false;
  }
}

/**
 * 获取文件服务完整地址
 * 自动添加static/config/web中的fileServiceURL地址
 * 示例：
 *    this.$utils.getUploadUrl('/api/uploadFile')
 */
export function getUploadUrl(value) {
  if (!value) return "";
  if (value.indexOf("://") >= 0) {
    // 完整的http地址原样返回
    return value;
  }
  if (value.indexOf("/") === 0) {
    return myConfig.fileServiceURL + value;
  }
  return myConfig.fileServiceURL + "/" + value;
}

/**
 * 给url拼接参数
 * @param url
 * @param params
 */
export function splicingParams(url, params) {
  if (!url) return "";
  if (!/\?/.test(url)) {
    url += "?";
  }
  Object.keys(params).forEach(key => {
    url += `${key}=${params[key]}&`;
  });
  return url.substring(0, url.length - 1);
}

/**
 * 获取基础后台服务完整地址
 * 自动添加static/config/web中的baseURL地址
 * 示例：
 *    this.$utils.getBaseUrl('/api/getUsers')
 */
export function getBaseUrl(value, params) {
  if (!value) return "";
  if (params) {
    if (!/\?/.test(value)) {
      value += "?";
    }
    Object.keys(params).forEach(key => {
      value += `${key}=${params[key]}&`;
    });
    value = value.substring(0, value.length - 1);
  }
  if (value.indexOf("://") >= 0) {
    // 完整的http地址原样返回
    return value;
  }
  if (value.indexOf("/") === 0) {
    return myConfig.baseURL + value;
  }
  return myConfig.baseURL + "/" + value;
}

/**
 * 给url添加token相关权限信息
 * @params {string} value, 是一个完整的url
 * 示例：
 *  this.$utils.getImageUrl('http://abc.jgp') // http://abc.jpg?authorization=****
 */
export function getImageUrl(value) {
  if (!value) return "";
  if (getToken()) {
    if (/\?/.test(value)) {
      value = value + "&authorization=" + getToken();
    } else {
      value = value + "?authorization=" + getToken();
    }
    if (sessionStorage.getItem("username")) {
      value = value + "&username=" + sessionStorage.getItem("username");
    }
    if (sessionStorage.getItem("deviceType")) {
      value = value + "&deviceType=" + sessionStorage.getItem("deviceType");
    }
  }
  return value;
}

export function getHeaders() {
  const myHeaders = new Headers();
  myHeaders.append("authorization", getToken());
  myHeaders.append("username", sessionStorage.getItem("username"));
  myHeaders.append("deviceType", sessionStorage.getItem("deviceType"));
  myHeaders.append("Content-Type", "application/json");
  return myHeaders;
}

/**
 * 模拟下载
 * @param {Blob} blob 文件流
 * @param {String} fileName 文件名称，包括后缀名
 */
export function simulationDownload(blob, fileName) {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onload = function(e) {
    const a = document.createElement("a");
    a.download = fileName;
    a.href = e.target.result;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  reader.onerror = function(e) {
    warn(`文件{${fileName}下载失败`, e);
  };
}

/**
 * 给url附加token等信息
 * @param url
 * @return {*}
 */
export function attachTokenForUrl(url) {
  if (!url) return "";
  if (getToken()) {
    if (/\?/.test(url)) {
      url = url + "&authorization=" + getToken();
    } else {
      url = url + "?authorization=" + getToken();
    }
    if (sessionStorage.getItem("username")) {
      url = url + "&username=" + sessionStorage.getItem("username");
    }
    if (sessionStorage.getItem("deviceType")) {
      url = url + "&deviceType=" + sessionStorage.getItem("deviceType");
    }
  }
  return url;
}

/**
 * 获取登陆用户的头像
 * @return {*|string}
 */
export function getAvatar() {
  let avatar = sessionStorage.getItem("avatar");
  if (avatar) {
    avatar = getImageUrl(avatar);
  } else {
    avatar = store.getters.currentUser.avatar;
  }
  return avatar;
}

/**
 * 判断当前路由，是否跟comparePath 是列表和详情的关系
 * @param {Object} route
 * @param {String} comparePath
 */
export function isListAndDetailsRelation(route, comparePath) {
  // 特殊情况
  // 字典数据路由: http://localhost:8080/#/system/dict/data/index?typeId=123&labelCode=china-school
  if (/\/index$/.test(route.path)) {
    // 1. 比较 route.path
    let flag1 = new RegExp(route.path.replace(/index$/, ""), "i").test(
      comparePath
    );

    // 2. 比较 route.query
    const queryStr = comparePath.substring(
      comparePath.indexOf("?") + 1,
      comparePath.length
    );
    let flag2 = true;
    if (route.query) {
      Object.keys(route.query).forEach(key => {
        flag2 =
          new RegExp(`${key}=${route.query[key]}`).test(queryStr) && flag2;
      });
    }

    return flag1 && flag2;
  }

  return new RegExp(route.fullPath, "i").test(comparePath);
}

/**
 * 判断该图片类型是否可以接受
 * 示例：
 *    this.$utils.isAcceptableImage('image/jpeg')
 *    this.$utils.isAcceptableImage('image/jpeg', ['image/png', 'image/jpg'])
 * @returns {boolean}
 */
export function isAcceptableImage(value, miniTypes) {
  if (!value) return false;
  miniTypes = miniTypes || ["image/jpeg", "image/png", "image/jpg"];
  return miniTypes.indexOf(value) >= 0;
}

/**
 * 获取请求headers
 * 示例：
 *  this.$utils.getRequestHeaders()
 * @returns {{headers: {}}}
 */
export function getRequestHeaders() {
  const headers = {};
  if (getToken()) {
    headers.authorization = getToken();
  }
  if (sessionStorage.getItem("username")) {
    headers.username = sessionStorage.getItem("username");
  }
  if (sessionStorage.getItem("deviceType")) {
    headers.deviceType = sessionStorage.getItem("deviceType");
  }
  return headers;
}

/**
 * 打印告警日志
 */
export function warn(...args) {
  console.error(`[KitSite warn]:`, ...args);
}

/**
 * 打印信息日志
 */
export function info(msg) {
  console.info(`[KitSite info]: ${msg}`);
}

/**
 * 设置主题
 *  示例：
 *  this.$utils.setTheme('skin-blue');
 *  this.$utils.setTheme('skin-blue').then(flag => {...})
 * @param theme
 */
export function setTheme(theme) {
  return new Promise(resolve => {
    let className = document.body.className;
    if (className) {
      let names = className.split(" ");
      names.forEach(item => {
        if (/skin-/.test(item)) {
          className = className.replace(item, theme);
        }
      });
      document.body.className = className;
      resolve(true);
    }
  });
}

/**
 * 将下滑线命名转为驼峰命名
 *  示例：
 *  this.$utils.camelCase('ROLE_NAME'); // roleName
 *  this.$utils.camelCase('role_name'); // roleName
 * @param str
 */
export function camelCase(str) {
  str = str.toLowerCase();
  return str.replace(/\_(\w)/g, function(all, letter) {
    return letter.toUpperCase();
  });
}

/**
 * 随机生成至少min位随机字符，波动范围为32，
 * @param min 最少位数
 */
export function generateRandomStr(min = 6) {
  const BASE_CHARS =
    "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890!@#$%^&()_+-=";
  const len = Math.floor(Math.random() * 64 + min);
  const randomStr = [];
  for (let i = 0; i < len; i++) {
    randomStr.push(BASE_CHARS[Math.floor(Math.random() * BASE_CHARS.length)]);
  }
  return randomStr.join("");
}

/**
 * 提交并下载文件
 * contentType: application/json
 * @param option - data, url, fileName
 */
export function sendAndDownloadFile(option) {
  if (typeof XMLHttpRequest === "undefined") {
    return;
  }
  const xhr = new XMLHttpRequest();
  const url = option.url;
  xhr.open("POST", url, true); // 也可以使用POST方式，根据接口
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.responseType = "blob"; // 返回类型blob
  // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑
  xhr.onload = function() {
    // 请求完成
    if (this.status === 200) {
      // 返回200
      const blob = this.response;
      const reader = new FileReader();
      reader.readAsDataURL(blob); // 转换为base64，可以直接放入a表情href
      reader.onload = function(e) {
        // 转换完成，创建一个a标签用于下载
        const a = document.createElement("a");
        a.download = option.fileName;
        a.href = e.target.result;
        $("body").append(a); // 修复firefox中无法触发click
        a.click();
        $(a).remove();
      };
    }
  };
  // 发送ajax请求
  xhr.send(option.data);
}
