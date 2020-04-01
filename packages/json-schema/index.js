import Jsonschema from "./src/Jsonschema";
import "./plugins/importComponents";
Jsonschema.install = Vue => {
  Vue.component(Jsonschema.name, Jsonschema);
};

export default Jsonschema;
