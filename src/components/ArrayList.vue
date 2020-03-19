<template>
  <div class="arraylist">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item
        :title="ArrayListDataCopy.title"
        :name="ArrayListDataCopy.key"
      >
        <el-row v-for="(item, index) in resultArray" :key="index">
          <el-col :span="1" v-if="ArrayListDataCopy.additionalItems"
            ><el-button round size="small">{{ index + 1 }}</el-button></el-col
          >
          <el-col :span="ArrayListDataCopy.additionalItems ? 23 : 24">
            <div v-for="(i, id) in item" :key="id">
              <div
                v-if="id == 0 && ArrayListDataCopy.additionalItems"
                class="addButton"
              >
                <el-button
                  round
                  size="middle"
                  @click="addItem"
                  class="addButton_item"
                  >添加</el-button
                >
              </div>
              <!-- 数组里面，如果是正常的输入框 -->
              <component
                :is="upperFirst(i.extra && i.extra.component_type)"
                :propData="i"
                v-if="i.extra"
              ></component>
              <!-- 数组里面如果还有数组 -->
              <ArrayList :ArrayListData="i" v-else></ArrayList>
            </div>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
    <!-- <div role="button" tabindex="0" class="el-collapse-item__header">
      {{ ArrayListDataCopy.title }}
    </div> -->
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
      activeNames: ["1"],
      ArrayListDataCopy: this.ArrayListData,
      resultArray: []
    };
  },
  methods: {
    upperFirst,
    addItem() {
      this.resultArray.push(this.resultArray[0]);
    },
    handleChange(val) {
      console.log(val);
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
  .addButton {
    position: relative;
    height: 60px;
    .addButton_item {
      margin: auto;
      position: absolute;
      right: 0px;
      top: 0px;
    }
  }
}
</style>
