<template>
  <div class="check">
    <commonTemplate
      :propData="propData"
      :defaultVal="{ value: finalCheckbox }"
      :tool="tool"
      @upData="upData"
    >
      <template v-slot="{ attr, change }">
        <el-checkbox-group
          v-model="finalCheckbox"
          @change="change(finalCheckbox)"
        >
          <el-checkbox
            :label="item.key"
            v-for="(item, index) in checkboxArr"
            :key="index"
            v-bind="attr"
          >
            {{ item.value }}
          </el-checkbox>
        </el-checkbox-group>
      </template>
    </commonTemplate>
  </div>
</template>
<script>
export default {
  name: 'check',
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
      finalCheckbox: [],
      checkboxArr: []
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
    if (this.propDataCopy.enum.length != this.propDataCopy.enumNames.length) {
      this.$message.error('Checkbox的enum和enumNames数量不匹配');
    } else {
      this.propDataCopy.enum.forEach((item, index) => {
        this.checkboxArr = this.checkboxArr.concat({
          key: item,
          value: this.propDataCopy.enumNames[index]
        });
      });
    }
  }
};
</script>
