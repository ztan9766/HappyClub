<template>
  <div class="houses">
    <div class="house" v-for="house in houses" :key="house.name">
      <div class="name">{{ house.name }}</div>
      <div class="pigeon" v-for="pigeon in pigeons" :key="pigeon.name">
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
<style scoped>
.houses{
  position: absolute;
  left: 15%;
  width: 70%;
  bottom: 0;
  text-align: center;
}
.house{
  padding: 20px 10px;
}
.pigeon{
  display: inline-block;
  padding: 0 10px;
  width: 80px;
  height: 80px;
  word-break: break-all
}
</style>
