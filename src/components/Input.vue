<template>
  <div class="inp">
    <!-- 列表序号{{ propDataCopy.arrayIndex }} -->
    <!-- 当前序号{{ propDataCopy.currentIndex }} -->
    <el-form ref="form" :model="form" label-width="130px">
      <el-form-item :label="form.title">
        <div class="inp_tooltip">
          <el-tooltip
            class="item"
            effect="dark"
            :content="propDataCopy.description || '无'"
            placement="right"
          >
            <el-button></el-button>
          </el-tooltip>
        </div>
        <el-input v-model="form[propDataCopy.key]" @change="upData"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "inp",
  props: {
    propData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      propDataCopy: {},
      form: {}
    };
  },
  methods: {
    upData() {
      // 一旦修改了输入框的内容，要及时提交输入的信息，要区分有没有带数组的序号
      this.$emit(
        "upData",
        this.propDataCopy.currentIndex == undefined
          ? {
              [this.propDataCopy.key]: this.form[this.propDataCopy.key],
              isNested: this.propDataCopy.isNested
            }
          : {
              [this.propDataCopy.key]: this.form[this.propDataCopy.key],
              currentIndex: this.propDataCopy.currentIndex,
              arrayIndex: this.propDataCopy.arrayIndex,
              isNested: this.propDataCopy.isNested
            }
      );
    }
  },
  created() {
    this.propDataCopy = {
      ...this.propData
    };
    this.form = {
      [this.propDataCopy.key]: "",
      ...this.propDataCopy
    };
  }
};
</script>
<style lang="scss" scoped>
.inp {
  .inp_tooltip {
    position: absolute;
    left: -130px;
    width: 130px;
    top: 0px;
    height: 100%;
    .el-tooltip {
      width: 130px;
      height: 100%;
      opacity: 0;
    }
  }
}
</style>
