<template>
  <div class="home">
    <el-container>
      <el-header style="height:auto;">
        <div class="title">Json-schema</div>
        <div class="title_tip">
          请输入格式正确的json，点击“生成模板”，在模板上输入相应的数据，点击“生成JSON”，即可生成数据。
        </div>
        <div class="btn_group">
          <el-switch
            v-model="which"
            active-text="左右排列"
            inactive-text="上下排列"
          >
          </el-switch>

          <el-switch
            v-model="which2"
            active-text="编辑"
            inactive-text="只读"
            style="margin-left:15px;"
          >
          </el-switch>
        </div>
      </el-header>
      <el-main
        ><el-row>
          <el-col :span="8">
            <textarea class="JsonInput" v-model="JsonInputContent"></textarea>
            <el-button round @click="operateHTML" class="homeButton"
              >生成模板</el-button
            >
          </el-col>
          <el-col :span="16">
            <el-row>
              <el-col :span="24">
                <div class="pulldown">
                  <PullDownList
                    :schema="dataJson"
                    @upData="upData"
                    v-if="isShowJsonHtml"
                  ></PullDownList>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <div class="pre_class">
            <div class="copy" @click="copy">
              复制<i class="el-icon-document-copy"></i>
            </div>
            <pre id="codeNum">{{ resultJSON }}</pre>
          </div>
        </el-row></el-main
      >
    </el-container>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import PullDownList from "../components/PullDownList";
// import Ajv from "ajv";
const dataJson = require("../files/data.json");
export default {
  name: "Home",
  data() {
    return {
      dataJson: {},
      JsonInputContent: JSON.stringify(dataJson),
      resultJSON: "还没生成过JSON",
      isShowJsonHtml: false,
      ajv: null,
      which: true,
      which2: true
    };
  },
  components: {
    PullDownList
  },
  watch: {
    which() {
      this.leftandrightM();
    },
    which2() {
      this.canEditM();
    }
  },
  methods: {
    ...mapMutations(["leftandrightM", "canEditM"]),
    // 复制功能
    copy() {
      const range = document.createRange();
      range.selectNode(document.getElementById("codeNum"));
      const selection = window.getSelection();
      if (selection.rangeCount > 0) selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      this.$message({
        message: "复制成功",
        type: "success"
      });
    },
    // 一旦有哪个数据更新了，就会触发这个方法
    upData(val) {
      this.resultJSON = {};
      Object.assign(this.resultJSON, val);
      // 校验
      // let validate = this.ajv.compile(this.dataJson);
      // let valid = validate(val);
      // if (!valid) console.log(validate.errors);
    },
    operateHTML() {
      try {
        this.dataJson = JSON.parse(this.JsonInputContent);
        this.isShowJsonHtml = false;
        this.isShowJsonHtml = true;
      } catch (e) {
        this.$message.error("输入的JSON格式有误");
      }
    }
  },
  mounted() {
    // this.ajv = new Ajv();
    // console.log(dataJson);
  }
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 30px;
  font-weight: 600;
  color: black;
}
.title_tip {
  margin: 5px auto;
  color: rgba(0, 0, 0, 0.65);
}
.btn_group {
  box-sizing: border-box;
  padding: 16px;
  color: rgba(0, 0, 0, 0.65);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
.JsonInput {
  width: 100%;
  height: 800px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  color: #9cdcfe;
  font-size: 18px;
  font-family: Consolas, "Courier New", monospace;
  background-color: #011627;
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #111111;
  }
  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
}
.pulldown {
  box-sizing: border-box;
  padding: 0px 20px;
  width: 100%;
  height: 800px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgb(184, 182, 182);
  }
  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
}
.homeButton {
  display: block;
  margin: 15px auto;
}
.pre_class {
  position: relative;
  box-sizing: border-box;
  height: 500px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 10px;
  font-size: 18px;
  font-family: Consolas, "Courier New", monospace;
  background-color: #011627;
  color: #9cdcfe;
  overflow-y: auto;
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #111111;
  }
  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
  .copy {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    color: white;
  }
}
</style>
