// import {
//   getOrgTree
// } from '@/api/system/organization';
const orgTree = {
  state: {
    tree: []
  },
  mutations: {
    SAVE_TREE(state, data) {
      state.tree = data;
    },
    REMOVE_TREE(state) {
      state.tree = [];
    }
  },
  actions: {
    saveOrgTree({ commit }, data) {
      // 存组织树
      commit("SAVE_TREE", data);
    },
    removeOrgTree({ commit }) {
      commit("REMOVE_TREE");
    }
    // async getOrgTreeData({ commit, state }) {
    //   console.log(111);
    //   let data = await getOrgTree({ id: "root" });
    //   if (data.ok) {
    //     console.log(data);
    //     commit("SAVE_TREE", data.data);
    //     return data;
    //   }
    // }
  }
};
export default orgTree;
