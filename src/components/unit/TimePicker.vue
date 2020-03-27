<template>
  <div class="timerpicker">
    <commonTemplate
      :propData="propData"
      :defaultVal="{ value: time }"
      @upData="upData"
    >
      <template v-slot="{ attr, change }">
        <el-time-picker
          v-model="time"
          placeholder="任意时间点"
          @change="change(time)"
          v-bind="attr"
        >
        </el-time-picker>
      </template>
    </commonTemplate>
  </div>
</template>
<script>
export default {
  name: "timerpicker",
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
      time: new Date()
    };
  },
  methods: {
    upData(val) {
      this.$emit("upData", val);
    }
  }
};
</script>
