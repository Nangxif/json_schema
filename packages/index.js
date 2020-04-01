import Jsonschema from "./json-schema/index";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

const components = [Jsonschema];
const install = Vue => {
  Vue.use(ElementUI);
  if (install.installed) return;
  install.installed = true;
  components.map(component => {
    Vue.component(component.name, component);
  });
};
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  // 导出的对象必须具备一个 install 方法
  install,
  // 组件列表
  ...components
};
