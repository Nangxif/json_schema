<template>
  <div class="home">
    <el-row>
      <el-col :span="8">
        <div class="JsonInput"></div>
      </el-col>
      <el-col :span="16">
        <el-row>
          <el-col :span="24">
            <div class="pulldown">
              <PullDownList :schema="dataJson" @upData="upData"></PullDownList>
            </div>

            <el-button round @click="getResult">生成JSON</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <div>{{ resultJSON }}</div>
    </el-row>
  </div>
</template>

<script>
import PullDownList from "../components/PullDownList";
const dataJson = require("../files/data.json");
export default {
  name: "Home",
  data() {
    return {
      dataJson,
      result: {},
      resultJSON: {}
    };
  },
  components: {
    PullDownList
  },
  methods: {
    upData(val) {
      this.result = val;
    },
    getResult() {
      this.resultJSON = {};
      this.resultJSON = { ...this.result };
    }
  },
  mounted() {
    // console.log(dataJson);
  }
};
</script>
<style lang="scss" scoped>
.JsonInput {
  width: 100%;
  height: 800px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}
.pulldown {
  box-sizing: border-box;
  padding-left: 20px;
  width: 100%;
  height: 800px;
  overflow-y: auto;
}
</style>
