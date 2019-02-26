<template>
  <div class="rank-board">
    <div class="board-switcher" @click="stay = !stay">
      <i v-if="stay" class="el-icon-more-outline"></i>
      <i v-else class="el-icon-more"></i>
    </div>
    <el-collapse-transition>
      <div v-show="stay">
        <div>
          <el-switch
            style="display: block"
            v-model="active"
            active-value="month"
            inactive-value="all"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="月"
            inactive-text="总">
          </el-switch>
        </div>
        <div>
          <ul v-show="active === 'month'">
            <li v-for="item in month" :key="item._id">{{ item.name }}</li>
          </ul>
          <ul v-show="active === 'all'">
            <li v-for="item in all" :key="item._id">{{ item.name }}</li>
          </ul>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
import api from '../../api'

export default {
  name: 'rank-board',
  created() {
    this.pullData()
  },
  data() {
    return {
      month: [],
      all: [],
      active: 'month',
      stay: true
    }
  },
  methods: {
    pullData() {
      api.getRankData().then(res => {
        if (res.success && res.data.rankLists) {
          this.month = res.data.rankLists.mon.sort(this.keySort('times',true))
          this.all = res.data.rankLists.all.sort(this.keySort('times',true))
        }else{
          this.$message({
            message: 'Can\'t get rank list'
          })
        }
      })
    },
    keySort(key,sortType) {
        return function(a,b){
            return sortType ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
        }
    }
  }
}
</script>
<style scoped>
  .rank-board{
    position: absolute;
    top: 48px;
    left: 0;
    z-index: 2;
    background: #fff;
    padding-left: 26px;
  }
  .rank-board ul {
    list-style: none;
    padding: 0;
  }
</style>
