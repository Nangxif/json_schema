<template>
  <div class="inp">
    <!-- 第几层：{{ propDataCopy.level }} 排序：{{
      propDataCopy[`arrayIndex${propDataCopy.level}`]
    }} -->
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
        <el-input
          v-model="form[propDataCopy.key]"
          @change="upData"
          v-bind="propDataCopy.extra.component_attrs || prepareAttrs"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState } from "vuex";
import validationFilter from "../../util/validation";
// import Ajv from "ajv";
export default {
  name: "inp",
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
    // 实现左右上下排版的功能
    leftandright(val) {
      if (val) {
        this.setting = {
          "label-width": "150px"
        };
      } else {
        this.setting = {};
      }
    },
    // 是否屏蔽输入框
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
      ajv: null,
      setting: null,
      originAttrs: undefined,
      prepareAttrs: {}
    };
  },
  methods: {
    upData() {
      // 校验
      // let validate = this.ajv.compile(this.dataJson);
      // let valid = validate(val);
      // if (!valid) console.log(validate.errors);
      // 一旦修改了输入框的内容，要及时提交输入的信息，要区分有没有带数组的序号
      this.$emit(
        "upData",
        this.propDataCopy[`arrayIndex${this.propDataCopy.level}`] == undefined
          ? {
              [this.propDataCopy.key]: this.form[this.propDataCopy.key]
            }
          : {
              [this.propDataCopy.key]: this.form[this.propDataCopy.key],
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
    this.setting = this.leftandright
      ? {
          "label-width": "150px"
        }
      : {};
    // 如果一开始传递进来的component_attrs不是undefined的话
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
    // this.ajv = new Ajv();
    // 定义规则
    this.rules[this.propDataCopy.key] = validationFilter(
      this.propDataCopy.extra.validation
    );
    // console.log(this.rules);
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
.inp {
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
