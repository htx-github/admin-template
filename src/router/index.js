import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login"),
    hidden: true
  },
  {
    path: "/",
    component: () => import("@/components/Layout")
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },
  {
    path: "/",
    redirect: "/login",
    hidden: true
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
