import { upperFirst, camelCase } from "lodash";
import Vue from "vue";

const requireComponent = require.context(
  // 其组件目录的相对路径
  "../src",
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /\w+\.(vue|js)$/
);

const initComponent = requireList => {
  requireList.keys().forEach(fileName => {
    const componentConfig = requireList(fileName);
    // 获取组件的 PascalCase 命名
    // 获取和目录深度无关的文件名
    const componentName = upperFirst(
      camelCase(
        fileName
          .split("/")
          .pop()
          .replace(/\.\w+$/, "")
      )
    );
    // 全局注册组件
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    Vue.component(componentName, componentConfig.default || componentConfig);
  });
};
initComponent(requireComponent);
