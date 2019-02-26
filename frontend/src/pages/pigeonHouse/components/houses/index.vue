<template>
  <div>
    <div v-for="house in houses" :key="house.name">
      {{ house.name }}
      <div v-for="pigeon in pigeons" :key="pigeon.name">
        <div v-if="pigeon.id === house.event">{{ pigeon.name }}</div>
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
      houses: [],
      pigeons: []
    }
  },
  created() {
    this.getHouses()
  },
  methods: {
    getHouses() {
      api.getHouses().then(res => {
        if (res.success && res.data.events && res.data.accidents) {
          this.houses = res.data.events
          this.pigeons = res.data.accidents
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
    }
  }
}
</script>
