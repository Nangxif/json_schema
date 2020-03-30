<template>
  <div class="common">
    <el-form ref="form" :model="form" :rules="rules" v-bind="setting">
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
        <slot
          :attr="propDataCopy.extra.component_attrs || prepareAttrs"
          :form="form"
          :change="upData"
        ></slot>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState } from "vuex";
import validationFilter from "../../util/validation";
export default {
  name: "common",
  props: {
    // 通过每个组件传递进来的json数据
    propData: {
      type: Object,
      default() {
        return {};
      }
    },
    // 每个组件通过公共组件传递的初始值
    defaultVal: {
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
    //   控制左右显示还是上下显示
    leftandright(val) {
      if (val) {
        this.setting = {
          "label-width": "150px"
        };
      } else {
        this.setting = {};
      }
    },
    // 控制是否屏蔽输入框等组件
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
      rules: {},
      setting: null,
      originAttrs: undefined,
      prepareAttrs: {}
    };
  },
  methods: {
    upData(data) {
      let upd = data || this.defaultVal.value;
      // 一旦修改了输入框的内容，要及时提交输入的信息，要区分有没有带数组的序号
      this.$emit(
        "upData",
        this.propDataCopy[`arrayIndex${this.propDataCopy.level}`] == undefined
          ? {
              [this.propDataCopy.key]: upd
            }
          : {
              [this.propDataCopy.key]: upd,
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
    // 定义规则
    this.rules[this.propDataCopy.key] = validationFilter(
      this.propDataCopy.extra.validation
    );
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
.common {
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
