<template>
  <el-container>
    <el-header>
      <el-col  :span="12">
        <router-link to="/pigeonHouse" class="header-link" type="primary">返回首页</router-link>
      </el-col>
      <el-col class="name" :span="6" :offset="6">{{ name }}</el-col>
    </el-header>
    <el-main>
      <el-row class="list-header">
        <el-col :span="6">
          <span>鸽子排名</span>
        </el-col>
        <el-col :span="18" style="text-align: right">
          <el-switch
            v-model="isMon"
            active-text="月"
            inactive-text="总">
          </el-switch>
        </el-col>
    </el-row>
    <el-row style="border-top: 1px solid #ebeef5;">
      <el-col :span="24">
        <span v-if="this.isEmpty" class="list-like">暂无数据</span>
        <ul v-else style="list-style: none">
          <li v-for="(item, index) in list" :key="item._id">
            <i v-if="index === 0" style="color: gold; font-size: 27px" class="el-icon-star-on" />
            <span v-else>#{{ index + 1 }}</span>
            <span style="margin-left: 10px">{{ item.name }}</span>
            <span style="float: right;">{{item.times}}</span>
          </li>
        </ul>
      </el-col>
    </el-row>
    </el-main>
  </el-container>
</template>
<script>
import api from "./api";

export default {
  name: "rank-board",
  created() {
    this.pullData();
  },
  data() {
    return {
      name: this.$store.state.name,
      month: [],
      all: [],
      isMon: true
    };
  },
  computed: {
    list() {
      if (this.isMon) {
        return this.month;
      }
      return this.all;
    },
    isEmpty() {
      return !(this.list.length > 0)
    }
  },
  methods: {
    pullData() {
      api.getRankData().then(res => {
        if (res.success && res.data.rankLists) {
          this.month = res.data.rankLists.mon
            .sort(this.keySort)
            .slice(0, 3);
          this.all = res.data.rankLists.all
            .sort(this.keySort)
            .slice(0, 3);
        } else {
          this.$message({
            message: "Can't get rank list"
          });
        }
      });
    },
    keySort(a, b) {
      return b.times - a.times
    }
  }
};
</script>
<style scoped>
.list-like{
  display: block;
  margin: 16px 0;
}
ul{
  padding: 0;
}
li{
  font-size: 22px;
  margin-top: 8px;
}
</style>

