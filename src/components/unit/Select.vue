<template>
  <div class="sel">
    <commonTemplate
      :propData="propData"
      :defaultVal="{ value: finalSelect }"
      @upData="upData"
    >
      <template v-slot="{ attr, change }">
        <el-select
          v-model="finalSelect"
          placeholder="请选择"
          v-bind="attr"
          @change="
            change(
              typeof finalSelect == 'string'
                ? finalSelect.length == 0
                  ? []
                  : [finalSelect]
                : finalSelect
            )
          "
        >
          <el-option
            v-for="(item, index) in selectArr"
            :key="index"
            :label="item.value"
            :value="item.key"
          >
          </el-option>
        </el-select>
      </template>
    </commonTemplate>
  </div>
</template>
<script>
export default {
  name: "sel",
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
      finalSelect: [],
      selectArr: []
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
    if (this.propDataCopy.enum.length != this.propDataCopy.enumNames.length) {
      this.$message.error("Select的enum和enumNames数量不匹配");
    } else {
      this.propDataCopy.enum.forEach((item, index) => {
        this.selectArr = this.selectArr.concat({
          key: item,
          value: this.propDataCopy.enumNames[index]
        });
      });
    }
  }
};
</script>
