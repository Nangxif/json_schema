<template>
  <div class="inp">
    <!-- 以下这段注释绝对不能动 -->
    <!-- 第几层：{{ propDataCopy.level }} 排序：{{
      propDataCopy[`arrayIndex${propDataCopy.level}`]
    }} -->
    <commonTemplate
      :propData="propData"
      :defaultVal="{ value: originForm[propDataCopy.key] }"
      :tool="tool"
      @upData="upData"
    >
      <template v-slot="{ attr, change, form }">
        <el-input
          v-model="form[propDataCopy.key]"
          @change="change(form[propDataCopy.key])"
          v-bind="attr"
        ></el-input>
      </template>
    </commonTemplate>
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
      propDataCopy: {},
      originForm: {}
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
    this.originForm = {
      [this.propDataCopy.key]: "",
      ...this.propDataCopy
    };
  }
};
</script>
