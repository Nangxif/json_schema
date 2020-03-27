<template>
  <div class="inputnumber">
    <el-form ref="form" :model="form" v-bind="setting">
      <el-form-item :label="form.title" :prop="propDataCopy.key">
        <span slot="label">
          <el-tooltip
            class="item"
            effect="dark"
            :content="propDataCopy.key || '无'"
            placement="top"
          >
            <el-button>{{ form.title }}</el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            :content="propDataCopy.description || '无'"
            placement="top"
          >
            <i class="el-icon-question"></i>
          </el-tooltip>
        </span>
        <el-input-number
          v-model="num"
          v-bind="propDataCopy.extra.component_attrs || prepareAttrs"
          @change="upData"
        ></el-input-number>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState } from "vuex";
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
  computed: {
    ...mapState(["leftandright", "canEdit"])
  },
  watch: {
    leftandright(val) {
      if (val) {
        this.setting = {
          "label-width": "150px"
        };
      } else {
        this.setting = {};
      }
    },
    canEdit(val) {
      if (val) {
        if (this.originAttrs) {
          this.propDataCopy.extra.component_attrs = { ...this.originAttrs };
        }
        this.prepareAttrs = {};
      } else {
        if (this.originAttrs) {
          this.propDataCopy.extra.component_attrs = {
            ...this.propDataCopy.extra.component_attrs,
            disabled: true
          };
        }
        this.prepareAttrs = {
          disabled: true
        };
      }
    }
  },
  data() {
    return {
      propDataCopy: {},
      form: {},
      setting: null,
      originAttrs: undefined,
      prepareAttrs: {},
      num: 0
    };
  },
  methods: {
    upData() {
      // 一旦修改了输入框的内容，要及时提交输入的信息，要区分有没有带数组的序号
      this.$emit(
        "upData",
        this.propDataCopy[`arrayIndex${this.propDataCopy.level}`] == undefined
          ? {
              [this.propDataCopy.key]: this.num
            }
          : {
              [this.propDataCopy.key]: this.num,
              [`arrayIndex${this.propDataCopy.level}`]: this.propDataCopy[
                `arrayIndex${this.propDataCopy.level}`
              ],
              level: this.propDataCopy.level,
              isNested: this.propDataCopy.isNested
            }
      );
    }
  },
  created() {
    // 先拷贝一份
    this.propDataCopy = {
      ...this.propData
    };

    // 配置项处理
    this.setting = this.leftandright
      ? {
          "label-width": "150px"
        }
      : {};
    if (this.propDataCopy.extra.component_attrs) {
      this.originAttrs = { ...this.propDataCopy.extra.component_attrs };
      if (!this.canEdit) {
        this.propDataCopy.extra.component_attrs = {
          ...this.propDataCopy.extra.component_attrs,
          disabled: true
        };
      }
    }
    if (!this.canEdit) {
      this.prepareAttrs = {
        disabled: true
      };
    }

    this.form = {
      [this.propDataCopy.key]: "",
      ...this.propDataCopy
    };
  },
  mounted() {
    // 创建完成之后要先把自己的JSON空数据格式全部先上传到父级
    this.upData();
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
