<template>
  <div class="arraylist">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item
        :title="ArrayListDataCopy.title"
        :name="ArrayListDataCopy.key"
      >
        <el-row v-for="(item, index) in showArray" :key="index">
          <el-col :span="1" v-if="ArrayListDataCopy.additionalItems"
            ><el-button round size="small" class="indexButton">{{
              index + 1
            }}</el-button></el-col
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
                :propData="{
                  ...i,
                  arrayIndex: index,
                  isNested: ArrayListDataCopy.isNested
                }"
                @upData="upData"
                v-if="i.extra"
              ></component>
              <!-- 数组里面如果还有数组 -->
              <ArrayList
                :ArrayListData="{ ...i, isNested: true }"
                @upData="upData"
                v-else
              ></ArrayList>
            </div>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
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
      showArray: [],
      resultArray: [],
      resultObject: {} //这个用来先生成对象，然后再加入到resultArray里面
    };
  },
  methods: {
    upperFirst,
    addItem() {
      this.showArray.push(this.showArray[0]);
      this.resultArray.push({});
    },
    handleChange() {
      //   console.log(val);
    },
    upData(val) {
      Object.entries(val).forEach(item => {
        this.resultArray[val.arrayIndex] = {
          ...this.resultArray[val.arrayIndex],
          [item[0]]: item[1]
        };
      });
      //   如果是最后一层，父层级的话
      if (!val.isNested) {
        delete this.resultArray[val.arrayIndex].arrayIndex;
        delete this.resultArray[val.arrayIndex].isNested;
        this.$emit("upData", {
          [this.ArrayListDataCopy.key]: this.resultArray
        });
      } else {
        //   如果是嵌套的话，记得带上数组序号方便查找
        this.$emit("upData", {
          [this.ArrayListDataCopy.key]: this.resultArray,
          arrayIndex: this.resultArray[val.arrayIndex].arrayIndex
        });
      }
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
      this.showArray.push(arr);
    }
  }
};
</script>
<style lang="scss" scoped>
.arraylist {
  .indexButton {
    margin-top: 15px;
  }
  .addButton {
    position: relative;
    height: 65px;
    .addButton_item {
      margin: auto;
      position: absolute;
      right: 0px;
      top: 15px;
    }
  }
}
</style>
