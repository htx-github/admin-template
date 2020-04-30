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

const constantRoutes = [
  {
    path: "/login",
    component: _importViewsComponet("login"),
    hidden: true
  },
  // {
  //   path: "/home",
  //   component: () => import("layout")
  // },
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
          title: "Dashboard",
          roles: ["admin"] // or you can only set roles in sub nav
        }
      },
      {
        path: "role",
        component: _importViewsComponet("role"),
        name: "Role",
        meta: {
          title: "Role"
          // if do not set roles, means: this page does not require permission
        }
      }
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
