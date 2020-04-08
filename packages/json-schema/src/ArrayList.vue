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
      <el-button
        round
        size="middle"
        @click="removeItem(index)"
        class="removeButton_item"
        v-if="index !== 0"
        >删除</el-button
      >
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item :title="ArrayListDataCopy.items.title" :name="index">
          <el-row>
            <!-- 列表序号{{
            !ArrayListDataCopy.isNested ? index : ArrayListDataCopy.arrayIndex
          }} -->
            <el-col
              :span="tool.leftandright ? 1 : 2"
              v-if="ArrayListDataCopy.additionalItems"
              ><el-button round size="small" class="indexButton">{{
                index + 1
              }}</el-button></el-col
            >
            <el-col
              :span="
                ArrayListDataCopy.additionalItems
                  ? tool.leftandright
                    ? 23
                    : 22
                  : 24
              "
            >
              <div v-for="(i, id) in item" :key="id">
                <!-- 数组里面，如果是正常的输入框 -->
                <!-- 要带上序号-->
                <!-- arrayIndex: !ArrayListDataCopy.isNested
                      ? index
                      : ArrayListDataCopy.arrayIndex, -->
                <component
                  :is="upperFirst(i.extra && i.extra.component_type)"
                  :propData="{
                    ...i,
                    currentIndex: id,
                    [`arrayIndex${ArrayListDataCopy.level + 1}`]: index,
                    level: ArrayListDataCopy.level + 1,
                    isNested: ArrayListDataCopy.isNested
                  }"
                  :tool="tool"
                  @upData="upData"
                  v-if="i.extra"
                ></component>
                <!-- 数组里面如果还有数组isNested要设置为true -->
                <!-- arrayIndex: !ArrayListDataCopy.isNested
                      ? index
                      : ArrayListDataCopy.arrayIndex, -->
                <ArrayList
                  :ArrayListData="{
                    ...i,
                    [`arrayIndex${ArrayListDataCopy.level + 1}`]: index,
                    level: ArrayListDataCopy.level + 1,
                    isNested: true
                  }"
                  :tool="tool"
                  @upData="upData"
                  @deleteItem="deleteItem"
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
    },
    tool: {
      type: Object,
      default: () => {
        return {
          leftandright: true,
          canEdit: true
        };
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
      if (
        this.ArrayListDataCopy.maxItems &&
        this.ArrayListDataCopy.maxItems >= this.showArray.length + 1
      ) {
        this.showArray.push(this.showArray[0]);
        // 添加的时候要给最终生成的数组添加{}
        this.resultArray.push({});
      } else if (!this.ArrayListDataCopy.maxItems) {
        this.showArray.push(this.showArray[0]);
        // 添加的时候要给最终生成的数组添加{}
        this.resultArray.push({});
      } else {
        this.$message.error(
          `数组个数不能超过${this.ArrayListDataCopy.maxItems}`
        );
      }
    },
    removeItem(index) {
      if (
        this.ArrayListDataCopy.minItems &&
        this.ArrayListDataCopy.minItems <= this.showArray.length - 1
      ) {
        this.showArray.splice(index, 1);
        this.resultArray.slice(index, 1);
        this.$emit("deleteItem", [].concat(this.ArrayListDataCopy.key, index));
      } else if (!this.ArrayListDataCopy.minItems) {
        this.showArray.splice(index, 1);
        this.resultArray.slice(index, 1);
        this.$emit("deleteItem", [].concat(this.ArrayListDataCopy.key, index));
      } else {
        this.$message.error(
          `数组个数不能低于${this.ArrayListDataCopy.minItems}`
        );
      }
    },
    deleteItem(val) {
      this.$emit(
        "deleteItem",
        [
          this.ArrayListDataCopy.key,
          this.ArrayListDataCopy[`arrayIndex${this.ArrayListDataCopy.level}`]
        ].concat(val)
      );
    },
    handleChange() {
      //   console.log(val);
    },
    upData(val) {
      //   如果是最后一层，父层级的话
      if (!val.isNested) {
        // 如果是嵌套的ArrayList，携带的参数可能有arrayIndex和isNested
        Object.entries(val).forEach(item => {
          this.resultArray[val[`arrayIndex${val.level}`]] = {
            ...this.resultArray[val[`arrayIndex${val.level}`]], //原来对象已经有的数据
            [item[0]]: item[1] //新增的数据
          };
        });
        // 最后一层还要检测一下是不是有整个对象为空的情况，然后进行去除？
        delete this.resultArray[val[`arrayIndex${val.level}`]][
          `arrayIndex${val.level}`
        ];
        delete this.resultArray[val[`arrayIndex${val.level}`]].isNested;
        delete this.resultArray[val[`arrayIndex${val.level}`]].level;
        // 清除数组里面的arrayIndex，isNested和currentIndex，仅仅在这里清除子数组的参数还不太现实，因为有时候我们只触发了子数组的change
        Object.entries(this.resultArray[val[`arrayIndex${val.level}`]]).forEach(
          item => {
            // console.log(item);
            if (Array.isArray(item[1])) {
              item[1].forEach((i, idx) => {
                // console.log(item[0],i);
                delete this.resultArray[val[`arrayIndex${val.level}`]][item[0]][
                  idx
                ][`arrayIndex${val.level}`];
                delete this.resultArray[val[`arrayIndex${val.level}`]][item[0]][
                  idx
                ].level;
                delete this.resultArray[val[`arrayIndex${val.level}`]][item[0]][
                  idx
                ].isNested;
              });
            }
          }
        );
        // 最后一层上传给对象的数组
        this.$emit("upData", {
          [this.ArrayListDataCopy.key]: this.resultArray
        });
      } else {
        Object.entries(val).forEach(item => {
          this.resultArray[val[`arrayIndex${val.level}`]] = {
            ...this.resultArray[val[`arrayIndex${val.level}`]], //原来对象已经有的数据
            [item[0]]: item[1] //新增的数据
          };
        });
        delete this.resultArray[val[`arrayIndex${val.level}`]][
          `arrayIndex${val.level}`
        ];
        delete this.resultArray[val[`arrayIndex${val.level}`]].level;
        //   如果是嵌套的话，记得带上数组序号方便查找，这里的val.arrayIndex之所以能正常叠加，是因为在component的时候，有数据传入
        this.$emit("upData", {
          [this.ArrayListDataCopy.key]: this.resultArray,
          level: this.ArrayListDataCopy.level,
          [`arrayIndex${this.ArrayListDataCopy.level}`]: this.ArrayListDataCopy[
            `arrayIndex${this.ArrayListDataCopy.level}`
          ],
          isNested: true
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
    position: relative;
    width: 98%;
    margin-left: 2%;
    .removeButton_item {
      position: absolute;
      right: 40px;
      top: 5px;
    }
  }
  .indexButton {
    margin-top: 15px;
  }
}
</style>
