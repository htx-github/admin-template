<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="app.device === 'mobile' && app.sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: true }" class="main-container">
      <div :class="{ 'fixed-header': true }">
        <navbar />
        <tags-view v-if="true" />
      </div>
      <app-main />
      <!-- <right-panel v-if="showSettings">
        <settings />
      </right-panel> -->
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Navbar, Sidebar, AppMain, TagsView } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  mixins: [ResizeMixin],
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
    // fixedHeader() {
    //   return this.$store.state.settings.fixedHeader;
    // },
    classObj() {
      console.log(this.app);
      return {
        hideSidebar: !this.app.sidebar.opened,
        openSidebar: this.app.sidebar.opened,
        withoutAnimation: this.app.sidebar.withoutAnimation,
        mobile: this.app.device === "mobile"
      };
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("closeSideBar", { withoutAnimation: false });
    }
  }
};
</script>
<style lang="less" scoped>
.app-wrapper {
  .clearfix();
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - @sideBarWidth);
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
