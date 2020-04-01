import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Jsonschema from "../packages/index";
Vue.use(Jsonschema);
import store from "./store";
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
