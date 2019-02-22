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
        this.month = res.data.rankLists.mon
        this.all = res.data.rankLists.all
      })
    }
  }
}
</script>
