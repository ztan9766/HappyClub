<template>
  <div class="rank-board">
    <el-dropdown size="mini" split-button type="primary"  @click="changeType">
      鸽子榜 ({{ currentType.name }})
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(item, index) in list" :key="item._id">{{ index + 1 }}. {{ item.name }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
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
      currentType: {
        name: '月',
        type: 'month'
      }
    }
  },
  computed: {
    list() {
      if(this.currentType.type === 'month') {
        return this.month
      }
      return this.all
    }
  },
  methods: {
    pullData() {
      api.getRankData().then(res => {
        if (res.success && res.data.rankLists) {
          this.month = res.data.rankLists.mon.sort(this.keySort('times',true)).slice(0,3)
          this.all = res.data.rankLists.all.sort(this.keySort('times',true)).slice(0,3)
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
    },
    changeType() {
      if(this.currentType.type !== 'month'){
        this.currentType = {
          name: '月',
          type: 'month'
        }
        this.list = this.month
      } else {
        this.currentType = {
          name: '总',
          type: 'all'
        }
        this.list = this.all
      }

    }
  }
}
</script>
<style scoped>
</style>
