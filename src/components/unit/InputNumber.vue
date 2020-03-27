<template>
  <div class="inputnumber">
    <commonTemplate
      :propData="propData"
      :defaultVal="{ value: num }"
      @upData="upData"
    >
      <template v-slot="{ attr, change }">
        <el-input-number
          v-model="num"
          v-bind="attr"
          @change="change(num)"
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
      num: 0
    };
  },
  methods: {
    upData(val) {
      this.$emit("upData", val);
    }
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
