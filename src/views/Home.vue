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

                <el-button round @click="getResult" class="homeButton"
                  >生成JSON</el-button
                >
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <pre class="pre_class">{{ resultJSON }}</pre>
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
      result: {},
      resultJSON: "还没生成过JSON",
      isShowJsonHtml: false
    };
  },
  components: {
    PullDownList
  },
  methods: {
    upData(val) {
      if (this.resultJSON != "还没生成过JSON") {
        this.resultJSON = "表单已被修改过，请重新点击生成";
      }
      this.result = val;
    },
    operateHTML() {
      // console.log(JSON.parse(this.JsonInputContent));
      try {
        this.dataJson = JSON.parse(this.JsonInputContent);
        this.isShowJsonHtml = false;
        this.isShowJsonHtml = true;
      } catch (e) {
        this.$message.error("输入的JSON格式有误");
      }
    },
    getResult() {
      if (this.isShowJsonHtml) {
        this.resultJSON = {};
        Object.assign(this.resultJSON, this.result);
      } else {
        this.$message.error("请先生成模板");
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
}
.pulldown {
  box-sizing: border-box;
  padding: 0px 20px;
  width: 100%;
  height: 800px;
  overflow-y: auto;
}
.homeButton {
  display: block;
  margin: 15px auto;
}
.pre_class {
  color: #303133;
  font-size: 13px;
  font-family: sans-serif;
  font-weight: 600;
}
</style>
