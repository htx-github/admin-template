export default {
  /**
   * 当被绑定元素插入到 DOM中时，聚焦元素。
   */
  inserted: function(el) {
    el.focus();
  }
};
