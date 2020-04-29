// import { equalForRoute, removeItems } from '@/utils/tabs';

export default {
  state: {
    tabs: [],
    refreshTabs: [],
    refreshForms: []
  },
  mutations: {
    addTab(state, route) {
      // 判断是否已经存在
      // if (!state.tabs.find(item => equalForRoute(item, route))) {
      //   state.tabs.push(route);
      // }
      // 维持这个长度不超过20
      if (state.tabs.length > 20) {
        state.tabs.shift();
      }
    },
    addRefreshTab(state, fullPath) {
      // 判断是否已经存在
      if (!state.refreshTabs.find(item => item === fullPath)) {
        state.refreshTabs.push(fullPath);
      }

      // 维持这个长度不超过50
      if (state.refreshTabs.length > 50) {
        state.refreshTabs.shift();
      }
    },
    addRefreshForm(state, fullPath) {
      // 判断是否已经存在
      if (!state.refreshForms.find(item => item === fullPath)) {
        state.refreshForms.push(fullPath);
      }

      // 维持这个长度不超过50
      if (state.refreshForms.length > 50) {
        state.refreshForms.shift();
      }
    },
    removeAllTabs(state) {
      state.tabs = [];
    },
    removeTabs(state, items) {
      // state.tabs = removeItems(state.tabs, items);

      // 移除refreshForms部分
      const paths = items.map(item => item.fullPath);
      state.refreshForms = state.refreshForms.filter(
        item => paths.indexOf(item) < 0
      );
    },
    removeRefreshTab(state, tab) {
      state.refreshTabs = state.refreshTabs.filter(item => tab !== item);
    }
  },
  actions: {
    addTab({ commit }, route) {
      let noNavigationTab = [
        "/liveroom",
        "/multilive",
        "/flvMultiLive",
        "/multiReplay",
        "/multiLiveControl",
        "/fullscreenmap",
        "/localUpload",
        "/replayroom"
      ];
      if (noNavigationTab.includes(route.path)) {
        // 不显示在导航菜单
        return false;
      }
      commit("addTab", route);
    },
    removeTabs({ commit }, items) {
      commit("removeTabs", items);
    },
    removeRefreshTab({ commit }, tab) {
      commit("removeRefreshTab", tab);
    },
    addRefreshTab({ commit }, fullPath) {
      commit("addRefreshTab", fullPath);
    },
    addRefreshForm({ commit }, fullPath) {
      commit("addRefreshForm", fullPath);
    }
  }
};
