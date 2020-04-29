import myConfig from "@/setting";

const app = {
  state: {
    fullName: myConfig.appName,
    shortName: myConfig.appShortName,
    loading: false,
    sidebarCollapse: false,
    backtrackPath: ""
  },
  mutations: {
    CHANGE_LOADING(state, loading) {
      state.loading = loading;
    },
    sidebarCollapse: (state, status) => {
      state.sidebarCollapse = status;
    },
    backtrack: (state, path) => {
      state.backtrackPath = path;
    }
  },
  actions: {
    changeLoading({ commit }, loading) {
      commit("CHANGE_LOADING", loading);
    },
    sidebarCollapse({ commit }, status) {
      commit("sidebarCollapse", status);
    },
    backtrack({ commit }, path) {
      commit("backtrack", path);
    }
  }
};

export default app;
