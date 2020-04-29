  // 手机号码规则
  export const validatePhone = (rule, value, callback) => {
    if (!value) {
      callback();
    } else if (!(/^1[3456789]\d{9}$/.test(value))) {
      callback(new Error('请输入正确的手机号码！'));
    }
    callback();
  };
  // 邮箱验证规则
  export const validateEmail = (rule, value, callback) => {
    if (!value) {
      callback();
    } else if (
      !/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(
        value
      )
    ) {
      callback(new Error('请输入正确的邮箱地址！'));
    }
    callback();
  };
