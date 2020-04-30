import Vue from "vue";
//引入normalize.css
import "normalize.css/normalize.css"; // A modern alternative to CSS resets
//加载elementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// global css
import "@/styles/main.less";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import "./http"; //  全局拦截器请求处理，基于axios
import "./permission"; // permission control
import api from "./api"; //全局调用接口函数，如：this.$api.login.getCaptcha()
import utils from "./utils"; //全局共用工具方法，可全局使用的函数，如：this.$utils.hasPermission
import filters from "./commons/filters"; //全局共用过滤器，可在所有.vue页面使用，如：{{ time | formatDate}}
import directives from "./commons/directives"; //全局共用指令，可在所有.vue页面使用，如：<button v-focus></button>
import validateTool from "./validate"; //用于封装一些表单的通用验证方法，如邮箱，手机号
import "./icons"; // 注册全局svg-icon组件

Vue.use(ElementUI);
Vue.use(filters);
Vue.use(directives);
Vue.use(utils);
Vue.use(validateTool);
Vue.use(api);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
