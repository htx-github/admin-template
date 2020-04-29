// import stroe from "@/store";

/**
 * 判断当前按钮的权限，有返回true，无返回false
 * 使用：
 *    {{'user:add' | hasPermission}}
 */
export const hasPermission = function(value) {
  const buttons = stroe.getters.buttons;
  if (buttons.length) {
    return buttons.indexOf(value) >= 0;
  } else {
    console.warn("hasPermission:\t请获取权限按钮数据！");
    return false;
  }
};
