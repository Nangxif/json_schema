<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="title">Json-schema</div>
        <div class="title_tip">
          请输入格式正确的json，点击“生成模板”，在模板上输入相应的数据，点击“生成JSON”，即可生成数据。
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
import PullDownList from "../components/PullDownList";
const dataJson = require("../files/data.json");
export default {
  name: "Home",
  data() {
    return {
      dataJson: {},
      JsonInputContent: JSON.stringify(dataJson),
      resultJSON: "还没生成过JSON",
      isShowJsonHtml: false
    };
  },
  components: {
    PullDownList
  },
  methods: {
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
    upData(val) {
      this.resultJSON = {};
      Object.assign(this.resultJSON, val);
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
  margin-top: 5px;
  color: rgba(0, 0, 0, 0.65);
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
    background: white;
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
