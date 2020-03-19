<template>
  <div class="inp">
    <el-form ref="form" :model="form" label-width="130px">
      <el-form-item :label="propDataCopy.title">
        <el-input v-model="propDataCopy.Vmodal"></el-input>
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
  created() {
    this.propDataCopy = {
      Vmodal: "",
      ...this.propData
    };
    this.form = {
      [this.propDataCopy.title]: this.propDataCopy.Vmodal
    };
  }
};
</script>
<style lang="scss" scoped>
.inp {
}
</style>
