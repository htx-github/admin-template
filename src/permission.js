import router from "./router";
import store from "./store";
import { getToken, removeToken } from "./utils/token";
// import { hideSpinner } from "./utils/spinner";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const whiteNames = [
  "/login",
  "/home",
  "/localUpload",
  "/liveroom",
  "/flvMultiLive",
  "/fullscreenmap",
  "/replayroom"
];

// 拦截路由，进行授权判断
router.beforeEach((to, from, next) => {
  NProgress.start();
  document.body.scrollTop = 0;
  if (whiteNames.indexOf(to.path) >= 0) {
    console.log("是白名单");
    // 白名单路由直接跳过
    next();
  } else {
    console.log(getToken());
    if (getToken()) {
      console.log("有token");
      if (store.getters.menus.length === 0 && !store.getters.noPermission) {
        console.log("没有菜单");
        // 动态添加路由
        store.dispatch("getUserPermissionResource").then(routes => {
          console.log(routes);
          router.addRoutes(routes);
          console.log(router);
          next({
            ...to,
            replace: true
          });
        });
        // next({ ...to, replace: true });
      } else {
        console.log("有菜单");
        // if (
        //   from.fullPath === "/login" &&
        //   to.fullPath !== store.getters.backtrackPath &&
        //   sessionStorage.getItem("isSameUser") === "true"
        // ) {
        //   // 从登录页过来，优先回溯到上次访问页
        //   next(store.getters.backtrackPath);
        // }

        next();
      }
    } else {
      console.log("没有token");
      let random = new Date().getTime();
      next(`/login?redirect=${random}`); // 没有token
      // location.reload();
    }
  }
});

router.afterEach((to, from) => {
  NProgress.done();
  if (to.fullPath === "/" || from.fullPath === "/login") {
    // hideSpinner();
  }

  if (to.fullPath === "/login") {
    // store.dispatch("removeUserInfo").then(res => console.log(res));
    // 访问登录页，清除token信息
    removeToken();

    // 记录上次访问页，排除登录页、首页
    if (from && from.fullPath !== "/login") {
      // store.dispatch("backtrack", from.fullPath);
    }
  }
});
