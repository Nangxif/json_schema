<template>
  <div class="inp">
    <!-- 列表序号{{ propDataCopy.arrayIndex }} -->
    <!-- 当前序号{{ propDataCopy.currentIndex }} -->
    <el-form ref="form" :model="form" label-width="130px">
      <el-form-item :label="form.title">
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
}
</style>
