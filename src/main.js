import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Jsonschema from "../packages/index";
Vue.use(Jsonschema);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
