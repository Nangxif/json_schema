import Vue from "vue";
// 需要在这里先构建一下elementui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
import Jsonschema from "./src/Jsonschema.vue";
import "./plugins/importComponents.js";
export default Jsonschema;
