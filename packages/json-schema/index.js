import Jsonschema from "./src/PullDownList";
import "./plugins/importComponents";
Jsonschema.install = Vue => {
  Vue.component(Jsonschema.name, Jsonschema);
};

export default Jsonschema;
