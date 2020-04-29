// import { getUserResource } from "@/api/system/resource";
// import { removeToken } from "@/utils/token";
// import {
//   getImageUrl
// } from '@/utils/common';
// import {
//   transformMenus,
//   transformMenuTree,
//   transformAddRoutes
// } from "@/utils/resource";

const user = {
  state: {
    label: "入职时间",
    time: "2018-09-07",
    bodyBtns: [
      {
        to: "/system/update-password",
        text: "修改密码"
      }
    ],
    name: sessionStorage.getItem("name") || "系统管理员",
    username: sessionStorage.getItem("username") || "admin",
    deviceType: sessionStorage.getItem("deviceType") || 0,
    position: "用户",
    avatar: sessionStorage.getItem("avatar") || "",
    orgName: sessionStorage.getItem("orgName") || "",
    roleName: sessionStorage.getItem("roleName") || "",
    online: true,
    state: {
      color: "#3c763d",
      name: "在线"
    },
    token: "",
    menus: [],
    buttons: [],
    addRoutes: [],
    noPermission: false,
    createdAt: new Date()
  }
  // mutations: {
  //   SAVE_MENUS: function(state, menus) {
  //     state.menus = transformMenuTree(menus);
  //   },
  //   SAVE_BUTTONS: function(state, buttons) {
  //     state.buttons = buttons;
  //   },
  //   SAVE_ADD_RESOURCES: function(state, data) {
  //     if (data.length === 0) {
  //       state.noPermission = true;
  //     }
  //     state.addRoutes = transformAddRoutes(data);
  //   },
  //   SAVE_USER_INFO: function(state, userInfo) {
  //     state.name = userInfo.realname || "管理员";
  //     state.username = userInfo.username || "admin";
  //     state.deviceType = userInfo.deviceType || 0;
  //     // state.avatar = getImageUrl(userInfo.headImg);
  //     state.avatar = userInfo.headImg;
  //     state.orgName = userInfo.nameFullPath;
  //     state.roleName = userInfo.roleName;
  //   },
  //   REMOVE_MENUS: function(state) {
  //     state.menus = [];
  //     state.addRoutes = [];
  //     state.noPermission = false;
  //   }
  // },
  // actions: {
  //   removeUserInfo({ commit }) {
  //     sessionStorage.removeItem("name");
  //     sessionStorage.removeItem("deviceType");
  //     sessionStorage.removeItem("userId");
  //     removeToken();
  //     // 清空菜单
  //     commit("REMOVE_MENUS");
  //     // 清空tags
  //     commit("removeAllTabs");
  //     return null;
  //   },
  //   saveUserInfo({ commit }, userInfo) {
  //     sessionStorage.setItem("name", userInfo.realname);
  //     sessionStorage.setItem("username", userInfo.username);
  //     sessionStorage.setItem("deviceType", userInfo.deviceType || 0);
  //     sessionStorage.setItem("userId", userInfo.id);
  //     sessionStorage.setItem("avatar", userInfo.headImg);
  //     sessionStorage.setItem("orgName", userInfo.nameFullPath);
  //     sessionStorage.setItem("roleName", userInfo.roleName);
  //     commit("SAVE_USER_INFO", userInfo);
  //   },
  //   getUserPermissionResource({ commit, state }) {
  //     return new Promise((resolve, reject) => {
  //       getUserResource()
  //         .then(res => {
  //           if (res && res.ok) {
  //             const { menus, buttons } = transformMenus(res.data);
  //             commit("SAVE_BUTTONS", buttons);
  //             commit("SAVE_MENUS", menus);
  //             commit("SAVE_ADD_RESOURCES", res.data);
  //             resolve(state.addRoutes);
  //           }
  //         })
  //         .catch(err => {
  //           reject(err);
  //         });
  //     });
  //   }
  // }
};

export default user;
