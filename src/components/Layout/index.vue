<template>
  <div :class="classObj" class="app-wrapper"></div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(5).fill(item)
    };
  },
  computed: {
    ...mapGetters(["app"]),
    sidebar() {
      return this.app.sidebar;
    },
    device() {
      return this.app.device;
    },
    // fixedHeader() {
    //   return this.$store.state.settings.fixedHeader;
    // },
    classObj() {
      return {
        hideSidebar: !this.app.sidebar.opened,
        openSidebar: this.app.sidebar.opened,
        withoutAnimation: this.app.sidebar.withoutAnimation,
        mobile: this.app.device === "mobile"
      };
    }
  }
};
</script>
<style>
</style>
