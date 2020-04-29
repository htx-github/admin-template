/**
 * 保留小数点后几位数, 四舍五入
 * 使用：
 *    {{12.2345434 | toFixed(3)}} // 12.235
 *    {{12.2345434 | toFixed}} // 12.23
 */
export const toFixed = function(value, maxLength = 2) {
  if (value) {
    return Number(value).toFixed(maxLength);
  } else if (value === 0) {
    return 0;
  } else {
    return "--";
  }
};

/**
 * 限制字符长度
 * 示例：
 *    {{'asdlfkjsd' | limitLength(4)}} // asdl...
 */
export const limitLength = function(value, maxLength = 15) {
  if (value && value.length > maxLength) {
    return value.substr(0, maxLength) + "...";
  } else {
    return value;
  }
};
