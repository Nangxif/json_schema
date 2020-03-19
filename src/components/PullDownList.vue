<template>
  <div class="pull_down_list">
    <div v-for="(item, index) in schemaData" :key="index">
      <el-collapse
        v-model="activeNames"
        @change="handleChange"
        v-if="item.properties"
      >
        <el-collapse-item
          :title="item.title"
          :name="item.key"
          class="child_list"
        >
          <!-- 一般情况下的嵌套 -->
          <PullDownList :schema="item.properties"></PullDownList>
        </el-collapse-item>
      </el-collapse>

      <!-- 如果是数组类型的话 -->
      <div class="child_list-copy" v-else-if="item.items">
        <!-- 如果是array类型可拓展的话 -->
        <ArrayList :ArrayListData="item"></ArrayList>
      </div>

      <!-- 如果没有properties元素的话 -->
      <div class="child_list" v-else>
        <component
          :is="upperFirst(item.extra && item.extra.component_type)"
          :propData="item"
          v-if="item.extra"
        ></component>
      </div>
    </div>
  </div>
</template>
<script>
import { upperFirst } from "lodash";
export default {
  name: "PullDownList",
  props: {
    schema: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      activeNames: ["1"],
      schemaCopy: this.schema,
      keys: [
        "type",
        "title",
        "description",
        "default",
        "properties",
        "required",
        "additionalProperties",
        "minProperties",
        "maxProperties",
        "minItems",
        "maxItems",
        "uniqueItems",
        "items",
        "additionalItems",
        "minimum",
        "exclusiveMinimum",
        "maximum",
        "exclusiveMaximum",
        "multipleOf",
        "minLength",
        "maxLength",
        "pattern",
        "format"
      ],
      schemaData: []
    };
  },
  methods: {
    upperFirst,
    handleChange(val) {
      console.log(val);
    }
  },
  mounted() {
    let a = Object.keys(this.schemaCopy).find(item => {
      return !this.keys.includes(item);
    });
    let b = Object.keys(this.schemaCopy).find(item => {
      return this.keys.includes(item);
    });
    if (!a) {
      // 说明是第一层
      this.schemaData.push({
        key: "main_key",
        ...this.schemaCopy
      });
    } else if (!b) {
      Object.entries(this.schemaCopy).forEach(item => {
        this.schemaData.push({
          key: item[0],
          ...item[1]
        });
      });
    }
    console.log(this.schemaData);
  }
};
</script>
<style lang="scss" scoped>
.pull_down_list {
  overflow: hidden;
  .child_list {
    width: 98%;
    margin-left: 2%;
  }
  .child_list-copy {
    width: 98%;
    padding: 5px 0px;
    padding-left: 2%;
    border-bottom: 1px solid #ebeef5;
  }
}
</style>
