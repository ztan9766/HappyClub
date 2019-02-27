<template>
  <el-container>
    <el-row>
      <el-pagination
        layout="prev, next"
        :page-size="5"
        :total="total"
        :current-page="page"
        @current-change="handlePageChange">
      </el-pagination>
    </el-row>
    <el-row>
      <el-collapse class="houses" accordion>
        <el-collapse-item class="house" :title="house.name" :name="house.name" v-for="house in houses" :key="house._id">
          <div class="name">{{ house.name }}</div>
          <div class="pigeon" v-for="item in house.accidents" :key="item._id">{{ item.name }}</div>
        </el-collapse-item>
      </el-collapse>
    </el-row>
  </el-container>
</template>
<script>
import api from '../../api'

export default {
  name: 'houses',
  data() {
    return {
      houses: [],
      pigeons: [],
      page: 1,
      total: 0
    }
  },
  created() {
    this.getHouses()
  },
  methods: {
    getHouses() {
      api.getHouses({ page: this.page }).then(res => {
        if (res.success && res.data.events) {
          this.houses = res.data.events
          this.total = res.data.count
        }else{
          this.$message({
            message: 'can\'t get houses',
            type: 'error'
          })
        }
      }).catch(err => {
        console.log(err)
        this.$message({
          message: 'error when getting houses',
          type: 'error'
        })
      })
    },
    handlePageChange(page) {
      this.page = page
      this.getHouses()
    }
  }
}
</script>
<style scoped>

</style>
