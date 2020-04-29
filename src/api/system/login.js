import axios from "axios";

/**
 * 登录
 * @param params
 */
export function login(params) {
  return axios.post("/login", params);
}

/**
 * 获取验证码
 */
export function getCaptcha() {
  return axios.get("/captcha");
}

/**
 * 获取动态key
 */
export function getDynamicKey() {
  return axios.get("/dynamicKey");
}

/**
 * 登出
 */
export function logout() {
  return axios.get("/logout");
}

/**
 * 检查用户状态
 */
export function checkSecurity(id) {
  return axios.get(`/api/sys/user/checkSecurity/${id}`);
}

/**
 * 检查用户状态
 */
export function getSmsCode(params) {
  return axios.post(`/api/sms/getSmsCode`, params);
}

/**
 * 第一次登陆系统强制修改密码
 * @param params
 */
export function changePasswordForce(params) {
  return axios.post("/api/sys/user/password/changePasswordForce", params);
}
