<template>
  <div>
    This is event all
    <div v-for="event in events" :key="event.name">
      {{ event.name }}
    </div>
  </div>
</template>
<script>
import api from '../api'

export default {
  name: 'event-all',
  data() {
    return {
      events: []
    }
  },
  mounted() {
    api.getAll().then(res => {
      if(res.success){
        this.events = res.data.events
      } else {
        this.$message({
          type: 'error',
          message: res.message
        })
      }
    })
  }
}
</script>
