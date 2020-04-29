/* eslint-disable no-unused-vars */
export default {
  /**
   * 参数说明:
   * @param el 指令所绑定的元素，可以用来直接操作 DOM
   * @param binding 一个对象，包含以下属性: name, value, oldValue, expression, arg, modifiers(修饰符对象)
   * @param vnode Vue 编译生成的虚拟节点。
   * @param oldVnode 上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
   */
  bind: function (el, binding, vnode) {
    // 只执行一次，指令第一次绑定到元素时调用。
    // do something.
  },
  /**
   * 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
   */
  inserted: function (el, binding, vnode) {
    // do something.
  },
  /**
   * 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。
   */
  update: function (el, binding, vnode, oldVnode) {
    // do something.
  },
  /**
   * 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
   */
  componentUpdated: function (el, binding, vnode, oldVnode) {
    // do something.
  },
  unbind: function (el, binding, vnode) {
    // 只执行一次
    // do something.
  }
};
