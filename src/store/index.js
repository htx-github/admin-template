import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import modules from "./modules";

Vue.use(Vuex);
console.log(modules);
console.log(getters);
const store = new Vuex.Store({
  modules,
  getters
});
export default store;
