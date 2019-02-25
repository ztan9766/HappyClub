<template>
  <div>
    <ul>
      <li v-for="item in month" :key="item._id">{{ item.name }}</li>
    </ul>
    <ul>
      <li v-for="item in all" :key="item._id">{{ item.name }}</li>
    </ul>
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
      all: []
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
