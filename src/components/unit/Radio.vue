<template>
  <div class="rad">
    <commonTemplate
      :propData="propData"
      :defaultVal="{ value: finalRadio }"
      @upData="upData"
    >
      <template v-slot="{ attr, change }">
        <el-radio
          v-model="finalRadio"
          :label="item.key"
          v-for="(item, index) in radioArr"
          :key="index"
          @change="change(finalRadio)"
          v-bind="attr"
          >{{ item.value }}
        </el-radio>
      </template>
    </commonTemplate>
  </div>
</template>
<script>
export default {
  name: "rad",
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
      finalRadio: "",
      radioArr: []
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
      this.$message.error("Radio的enum和enumNames数量不匹配");
    } else {
      this.propDataCopy.enum.forEach((item, index) => {
        this.radioArr.push({
          key: item,
          value: this.propDataCopy.enumNames[index]
        });
      });
    }
  }
};
</script>
