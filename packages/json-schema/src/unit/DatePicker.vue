<template>
  <div class="datepicker">
    <commonTemplate
      :propData="propData"
      :defaultVal="{ value: date }"
      :tool="tool"
      @upData="upData"
    >
      <template v-slot="{ attr, change, form }">
        <el-date-picker
          v-model="form[propDataCopy.key]"
          type="date"
          placeholder="选择日期"
          v-bind="attr"
          @change="change(form[propDataCopy.key])"
        >
        </el-date-picker>
      </template>
    </commonTemplate>
  </div>
</template>
<script>
export default {
  name: "datepicker",
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
      date: new Date()
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
