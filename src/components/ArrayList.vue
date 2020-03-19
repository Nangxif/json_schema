<template>
  <div class="arraylist">
    <div role="button" tabindex="0" class="el-collapse-item__header">
      {{ ArrayListDataCopy.title }}
      <i class="el-collapse-item__arrow el-icon-plus" @click="addItem"></i>
    </div>
    <el-row v-for="(item, index) in resultArray" :key="index">
      <el-col :span="1">{{ index + 1 }}</el-col>
      <el-col :span="23">
        <div v-if="item.extra"></div>
        <component
          :is="upperFirst(i.extra && i.extra.component_type)"
          :propData="i"
          v-for="(i, id) in item"
          :key="id"
        ></component
      ></el-col>
    </el-row>
  </div>
</template>
<script>
import { upperFirst } from "lodash";
export default {
  name: "arraylist",
  props: {
    ArrayListData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      ArrayListDataCopy: this.ArrayListData,
      resultArray: []
    };
  },
  methods: {
    upperFirst,
    addItem() {
      this.resultArray.push(this.resultArray[0]);
    }
  },
  mounted() {
    if (this.ArrayListDataCopy.items.properties) {
      let arr = [];
      Object.entries(this.ArrayListDataCopy.items.properties).forEach(item => {
        arr.push({
          key: item[0],
          ...item[1]
        });
      });
      this.resultArray.push(arr);
    }
  }
};
</script>
<style lang="scss" scoped>
.arraylist {
}
</style>
