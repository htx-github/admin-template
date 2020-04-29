import myConfig from "@/setting";
import Cookies from "js-cookie";
const app = {
  state: {
    fullName: myConfig.appName,
    shortName: myConfig.appShortName,
    loading: false,
    backtrackPath: "",
    sidebar: {
      opened: Cookies.get("sidebarStatus")
        ? !!+Cookies.get("sidebarStatus")
        : true,
      withoutAnimation: false
    },
    device: "desktop"
  },
  mutations: {
    CHANGE_LOADING(state, loading) {
      state.loading = loading;
    },
    TOGGLE_SIDEBAR: state => {
      //开启\关闭侧栏
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
      if (state.sidebar.opened) {
        Cookies.set("sidebarStatus", 1);
      } else {
        Cookies.set("sidebarStatus", 0);
      }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      //关闭侧栏
      Cookies.set("sidebarStatus", 0);
      state.sidebar.opened = false;
      state.sidebar.withoutAnimation = withoutAnimation;
    },
    TOGGLE_DEVICE: (state, device) => {
      //设置是PC还是移动
      state.device = device;
    },
    backtrack: (state, path) => {
      state.backtrackPath = path;
    }
  },
  actions: {
    changeLoading({ commit }, loading) {
      commit("CHANGE_LOADING", loading);
    },
    toggleSideBar({ commit }) {
      commit("TOGGLE_SIDEBAR");
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit("CLOSE_SIDEBAR", withoutAnimation);
    },
    toggleDevice({ commit }, device) {
      commit("TOGGLE_DEVICE", device);
    },
    backtrack({ commit }, path) {
      commit("backtrack", path);
    }
  }
};

export default app;
