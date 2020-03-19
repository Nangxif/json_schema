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
              <PullDownList :schema="dataJson"></PullDownList>
            </div>
          </el-col>
        </el-row>
      </el-col>
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
      dataJson
    };
  },
  components: {
    PullDownList
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
