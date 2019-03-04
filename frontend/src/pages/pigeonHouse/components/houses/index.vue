<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <el-row class="list-header">
      <el-col :span="6">
        <span>活动列表</span>
      </el-col>
      <el-col :span="18" style="text-align: right">
        <el-pagination
          layout="prev, next"
          :page-size="pageSize"
          :total="total"
          :current-page="page"
          @current-change="handlePageChange"
        ></el-pagination>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-collapse class="houses" accordion>
          <el-collapse-item
            class="house"
            :name="house.name"
            v-for="house in houses"
            :key="house._id"
          >
            <template slot="title">
              <div class="title"><span>{{ formateDate(house.date) }}: <span style="color: #67C23A">{{ house.name }}</span></span></div>
            </template>
            <div v-if="house.accidents.length > 0" class="content">
              <div style="color: #333;"><span>咕咕：{{ house.accidents.length }}</span></div>
              <span v-for="(item, index) in house.accidents" :key="item._id">
                <span v-if="index !== 0">, </span>{{ item.name }}
              </span>
            </div>
            <div v-else class="content">
              <div>-- 没有鸽子 --</div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import api from "../../api";

export default {
  name: "houses",
  data() {
    return {
      houses: [],
      pigeons: [],
      page: 1,
      pageSize: 10,
      total: 0,
      fullscreenLoading: false
    };
  },
  created() {
    this.getHouses();
  },
  methods: {
    getHouses() {
      this.fullscreenLoading = true;
      api
        .getHouses({ page: this.page, limit: this.pageSize })
        .then(res => {
          if (res.success && res.data.events) {
            this.houses = res.data.events;
            this.total = res.data.count;
            this.fullscreenLoading = false;
          } else {
            this.fullscreenLoading = false;
            this.$message({
              message: "can't get houses",
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.fullscreenLoading = false;
          this.$message({
            message: "error when getting houses",
            type: "error"
          });
        });
    },
    handlePageChange(page) {
      this.page = page;
      this.getHouses();
    },
    formateDate(unixDate) {
      const date = new Date(unixDate * 1000)
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    }
  }
};
</script>
<style scoped>
.title {
  font-size: 22px;
  font-weight: 600;
}
.content {
  font-size: 18px;
  color: #909399;
}
.content{
  margin: 
}
.content:first-child{
  margin-left: 0;
}
</style>
