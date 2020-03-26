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
          <PullDownList
            :schema="{
              ...item.properties,
              key: item.key
            }"
            @upData="upData"
          ></PullDownList>
        </el-collapse-item>
      </el-collapse>

      <!-- 如果是数组类型的话 -->
      <div class="child_list" v-else-if="item.items && !item.enum">
        <!-- 如果是array类型可拓展的话 -->
        <ArrayList
          :ArrayListData="{
            ...item,
            arrayIndex1: index,
            level: schemaCopy.level
          }"
          @deleteItem="deleteItem"
          @upData="upData"
        ></ArrayList>
      </div>

      <!-- 如果没有properties元素的话 -->
      <div class="child_list" v-else>
        <component
          :is="upperFirst(item.extra && item.extra.component_type)"
          :propData="item"
          @upData="upData"
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
      schemaData: [],
      resultObject: {},
      lastData: null
    };
  },
  methods: {
    upperFirst,
    handleChange() {},
    // 最后一个获取到删除索引的方法
    deleteItem(val) {
      if (this.lastData) {
        val
          .reduce((total, item, index) => {
            if (index < val.length - 1) {
              return total[item];
            }
            return total;
          }, this.lastData["main_key"])
          .splice(val[val.length - 1]);
        this.$emit("upData", { ...this.lastData.main_key });
      }
    },
    // 有时候upData是直接通过子数组的change传递上来的，没有经过处理
    removeOtherKey(data) {
      let dataCopy;
      if (!Array.isArray(data)) {
        dataCopy = { ...data };
        Object.entries(dataCopy).forEach(item => {
          if (Array.isArray(item[1])) {
            item[1].forEach((i, idx) => {
              delete dataCopy[item[0]][idx].level;
              delete dataCopy[item[0]][idx].isNested;
              dataCopy[item[0]][idx] = this.removeOtherKey(
                dataCopy[item[0]][idx]
              );
            });
          }
        });
      } else {
        // 第一次递归会到这里
        dataCopy = [...data];
        dataCopy.forEach((i, idx) => {
          delete dataCopy[idx].level;
          delete dataCopy[idx].isNested;
          dataCopy[idx] = this.removeOtherKey(dataCopy[idx]);
        });
      }
      return dataCopy;
    },
    upData(val) {
      // 记得删除isNested，因为会从Input带上来
      Object.entries(this.removeOtherKey(val)).forEach(item => {
        this.resultObject[item[0]] = item[1];
      });
      delete this.resultObject.isNested;
      delete this.resultObject.level;
      delete this.resultObject[`arrayIndex${val.level}`];
      if (this.schemaCopy.key) {
        this.lastData = {
          [this.schemaCopy.key]: { ...this.resultObject }
        };
        this.$emit("upData", {
          [this.schemaCopy.key]: { ...this.resultObject }
        });
      } else {
        // 最后上传的出口
        this.lastData = { ...this.resultObject };
        this.$emit("upData", { ...this.resultObject.main_key });
      }
    }
  },
  mounted() {
    let a = Object.keys(this.schemaCopy).find(item => {
      return !this.keys.includes(item);
    });
    let b = Object.keys(this.schemaCopy).find(item => {
      return this.keys.includes(item);
    });
    if (!this.schemaCopy.level) {
      this.schemaCopy.level = 1;
    }
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
}
</style>
