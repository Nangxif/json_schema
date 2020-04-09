<template>
  <div class="timerpicker">
    <commonTemplate
      :propData="propData"
      :defaultVal="{ value: time }"
      :tool="tool"
      @upData="upData"
    >
      <template v-slot="{ attr, change, form }">
        <el-time-picker
          v-model="form[propDataCopy.key]"
          placeholder="任意时间点"
          @change="change(form[propDataCopy.key])"
          v-bind="attr"
        ></el-time-picker>
      </template>
    </commonTemplate>
  </div>
</template>
<script>
export default {
  name: 'timerpicker',
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
      time: new Date()
    };
  },
  methods: {
    upData(val) {
      this.$emit('upData', val);
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
