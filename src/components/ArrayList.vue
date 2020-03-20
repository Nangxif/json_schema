<template>
  <div class="arraylist">
    <div class="arrayList_title">
      {{ ArrayListDataCopy.title }}
      <div v-if="ArrayListDataCopy.additionalItems" class="addButton">
        <el-button round size="middle" @click="addItem" class="addButton_item"
          >添加</el-button
        >
      </div>
    </div>
    <div class="child_list" v-for="(item, index) in showArray" :key="index">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item :title="ArrayListDataCopy.items.title" :name="index">
          <el-row>
            <!-- 列表序号{{
            !ArrayListDataCopy.isNested ? index : ArrayListDataCopy.arrayIndex
          }} -->
            <el-col :span="1" v-if="ArrayListDataCopy.additionalItems"
              ><el-button round size="small" class="indexButton">{{
                index + 1
              }}</el-button></el-col
            >
            <el-col :span="ArrayListDataCopy.additionalItems ? 23 : 24">
              <div v-for="(i, id) in item" :key="id">
                <!-- 数组里面，如果是正常的输入框 -->
                <!-- 要带上序号-->
                <component
                  :is="upperFirst(i.extra && i.extra.component_type)"
                  :propData="{
                    ...i,
                    currentIndex: index,
                    arrayIndex: !ArrayListDataCopy.isNested
                      ? index
                      : ArrayListDataCopy.arrayIndex,
                    isNested: ArrayListDataCopy.isNested
                  }"
                  @upData="upData"
                  v-if="i.extra"
                ></component>
                <!-- 数组里面如果还有数组isNested要设置为true -->
                <ArrayList
                  :ArrayListData="{
                    ...i,
                    arrayIndex: !ArrayListDataCopy.isNested
                      ? index
                      : ArrayListDataCopy.arrayIndex,
                    isNested: true
                  }"
                  @upData="upData"
                  v-else
                ></ArrayList>
              </div>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </div>
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
      activeNames: ["2"],
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
      // 添加的时候要给最终生成的数组添加{}
      this.resultArray.push({});
    },
    handleChange() {
      //   console.log(val);
    },
    upData(val) {
      //   如果是最后一层，父层级的话
      if (!val.isNested) {
        // 如果是嵌套的ArrayList，携带的参数可能有arrayIndex和isNested
        Object.entries(val).forEach(item => {
          this.resultArray[val.arrayIndex] = {
            ...this.resultArray[val.arrayIndex], //原来对象已经有的数据
            [item[0]]: item[1] //新增的数据
          };
        });
        // 最后一层还要检测一下是不是有整个对象为空的情况，然后进行去除？
        delete this.resultArray[val.arrayIndex].arrayIndex;
        delete this.resultArray[val.arrayIndex].isNested;
        delete this.resultArray[val.arrayIndex].currentIndex;
        // 清除数组里面的arrayIndex，isNested和currentIndex
        Object.entries(this.resultArray[val.arrayIndex]).forEach(item => {
          if (Array.isArray(item[1])) {
            item[1].forEach((i, idx) => {
              delete this.resultArray[val.arrayIndex][item[0]][idx].arrayIndex;
              delete this.resultArray[val.arrayIndex][item[0]][idx]
                .currentIndex;
              delete this.resultArray[val.arrayIndex][item[0]][idx].isNested;
            });
          }
        });
        this.$emit("upData", {
          [this.ArrayListDataCopy.key]: this.resultArray
        });
      } else {
        Object.entries(val).forEach(item => {
          this.resultArray[val.currentIndex] = {
            ...this.resultArray[val.currentIndex], //原来对象已经有的数据
            [item[0]]: item[1] //新增的数据
          };
        });
        //   如果是嵌套的话，记得带上数组序号方便查找，这里的val.arrayIndex之所以能正常叠加，是因为在component的时候，有数据传入
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
  .arrayList_title {
    width: 100%;
    height: 48px;
    line-height: 48px;
    position: relative;
    .addButton {
      margin: auto;
      position: absolute;
      right: 0px;
      top: 0px;
    }
  }
  .child_list {
    width: 98%;
    margin-left: 2%;
  }
  .indexButton {
    margin-top: 15px;
  }
}
</style>
