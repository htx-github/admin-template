import Vue from "vue";
import VueRouter from "vue-router";
export const _importLayoutComponet =
  process.env.NODE_ENV === "development"
    ? file => require("@/" + file).default
    : file => () => import("@/" + file);
export const _importViewsComponet =
  process.env.NODE_ENV === "development"
    ? file => require("@/views/" + file).default
    : file => () => import("@/views/" + file);
Vue.use(VueRouter);
/*在路由跳转的时候同一个路由多次添加是不被允许的
  解决方案一，添加以下：
*/
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err);
};
/*在路由跳转的时候同一个路由多次添加是不被允许的*
  解决方案二，vue-router安装回3.0版本即可
*/
const constantRoutes = [
  {
    path: "/login",
    component: _importViewsComponet("login"),
    hidden: true
  },
  {
    path: "/404",
    component: _importViewsComponet("404"),
    hidden: true
  }
];
export const asyncRoutes = [
  {
    path: "/",
    component: _importLayoutComponet("layout"),
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: _importViewsComponet("dashboard"),
        name: "Dashboard",
        meta: {
          title: "首页",
          icon: "dashboard",
          roles: ["admin"] // or you can only set roles in sub nav
        }
      },
      {
        path: "system/user",
        component: _importViewsComponet("system/user"),
        meta: {
          title: "用户管理"
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: "system/role",
        component: _importViewsComponet("system/role"),
        meta: {
          title: "角色管理"
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: "system/user/info",
        component: _importViewsComponet("system/user/Info"),
        meta: {
          title: "个人中心"
        },
        hidden: true
      }
    ]
  },
  // 404 page must be placed at the end !!!
  // { path: "*", redirect: "/404", hidden: true }
];
export const menus = [
  {
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        meta: {
          title: "首页",
          icon: "dashboard",
          roles: ["admin"] // or you can only set roles in sub nav
        }
      },
      {
        path: "/system",
        redirect: "/system/user",
        meta: {
          title: "系统管理",
          icon: "user"
          // if do not set roles, means: this page does not require permission
        },
        children: [
          {
            path: "/user",
            meta: {
              title: "用户管理"
              // if do not set roles, means: this page does not require permission
            },
            children: [
              {
                path: "/info",
                component: _importViewsComponet("system/user/Info"),
                meta: {
                  title: "个人中心"
                },
                hidden: true
              }
            ]
          },
          {
            path: "/role",
            component: _importViewsComponet("system/role"),
            meta: {
              title: "角色管理"
              // if do not set roles, means: this page does not require permission
            }
          }
        ]
      }
      // {
      //   path: "system/user/info",
      //   component: _importViewsComponet("system/user/Info"),
      //   meta: {
      //     title: "个人中心"
      //   },
      //   hidden: true
      // }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
];
const createRouter = () =>
  new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => {
      new Promise(resolve => {
        setTimeout(() => {
          resolve({
            x: 0,
            y: 0
          });
        }, 500);
      });
    },
    routes: constantRoutes
  });
const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}
export default router;
