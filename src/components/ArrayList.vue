<template>
  <div class="arraylist">
    <div role="button" tabindex="0" class="el-collapse-item__header">
      {{ ArrayListDataCopy.title }}
      <i class="el-collapse-item__arrow el-icon-plus" @click="addItem"></i>
    </div>
    <el-row v-for="(item, index) in resultArray" :key="index">
      <el-col :span="1">{{ index + 1 }}</el-col>
      <el-col :span="23">
        <div v-for="(i, id) in item" :key="id">
          <!-- 数组里面，如果是正常的输入框 -->
          <component
            :is="upperFirst(i.extra && i.extra.component_type)"
            :propData="i"
            v-if="i.extra"
          ></component>
          <!-- 数组里面如果还有数组 -->
          <div v-if="!i.extra && i.additionalItems">
            <ArrayList :ArrayListData="i"></ArrayList>
          </div>
        </div>
      </el-col>
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
  .el-collapse-item__header {
    margin-bottom: 15px;
  }
}
</style>
