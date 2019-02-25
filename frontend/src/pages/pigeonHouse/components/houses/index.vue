<template>
  <div>
    <div v-for="house in houses" :key="house.name">
      {{ house.name }}
      <div v-for="item in house.accidents" :key="item.name">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script>
import api from '../../api'

export default {
  name: 'houses',
  data() {
    return {
      houses: []
    }
  },
  created() {
    this.getHouses()
  },
  methods: {
    getHouses() {
      api.getHouses().then(res => {
        if (res.success && res.data.events) {
          this.houses = res.data.events
        }else{
          this.$message({
            message: 'can\'t get houses'
          })
        }
      }).catch(err => {
        console.log(err)
        this.$message({
          message: 'error when getting houses'
        })
      })
    }
  }
}
</script>
