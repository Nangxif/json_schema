<template>
  <div class="rad">
    <!-- 第几层：{{ propDataCopy.level }} 排序：{{
      propDataCopy[`arrayIndex${propDataCopy.level}`]
    }} -->
    <el-form ref="form" :model="form" :rules="rules" v-bind="setting">
      <el-form-item :label="form.title" :prop="propDataCopy.key">
        <el-radio v-model="radio" label="1">备选项</el-radio>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState } from "vuex";
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
      rules: {},
      setting: null,
      originAttrs: undefined,
      prepareAttrs: {}
    };
  },
  methods: {
    upData() {
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
    this.rules[this.propDataCopy.key] = this.propDataCopy.extra.validation.map(
      item => {
        if (item.type == "minLength") {
          let a = {
            ...item,
            min: Number(item.param)
          };
          delete a.type;
          return a;
        }
        if (item.type == "maxLength") {
          let b = {
            ...item,
            max: Number(item.param)
          };
          delete b.type;
          return b;
        }
        if (item.type == "pattern") {
          let c = {
            ...item,
            pattern: item.param
          };
          delete c.type;
          return c;
        }
        if (item.type == "required") {
          let d = {
            ...item,
            required: true
          };
          delete d.type;
          return d;
        }
        if (item.type == "customValidate") {
          let e = {
            validator: item.param.compiled
          };
          return e;
        }
        return item;
      }
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
.rad {
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
