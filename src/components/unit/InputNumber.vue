<template>
  <div class="inputnumber">
    <commonTemplate
      :propData="propData"
      :defaultVal="{ value: num }"
      @upData="upData"
    >
      <template v-slot="{ attr, change, form }">
        <el-input-number
          v-model="form[propDataCopy.key]"
          v-bind="attr"
          @change="change(form[propDataCopy.key])"
        ></el-input-number>
      </template>
    </commonTemplate>
  </div>
</template>
<script>
export default {
  name: "inputnumber",
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
      num: 0
    };
  },
  methods: {
    upData(val) {
      this.$emit("upData", val);
    }
  },
  created() {
    // 先拷贝一份
    this.propDataCopy = {
      ...this.propData
    };
  }
};
</script>
<style lang="scss" scoped>
.inputnumber {
  ::v-deep .el-button {
    border: none !important;
    padding: 0px !important;
  }
  ::v-deep .el-button:focus,
  .el-button:hover {
    color: #606266 !important;
    border-color: none !important;
    background-color: transparent !important;
  }
}
</style>
