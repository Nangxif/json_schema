<template>
  <div class="datepicker">
    <commonTemplate
      :propData="propData"
      :defaultVal="{ value: date }"
      @upData="upData"
    >
      <template v-slot="{ attr, change }">
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="选择日期"
          v-bind="attr"
          @change="change(date)"
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
    }
  },
  data() {
    return {
      date: new Date()
    };
  },
  methods: {
    upData(val) {
      this.$emit("upData", val);
    }
  }
};
</script>
