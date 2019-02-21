<template>
  <div>
    <span v-if="event">yes {{ event._id }}</span>
  </div>
</template>
<script>
import api from '../api'

export default {
  name: 'event',
  mounted() {
    api.getOne(this.$route.params.eventId).then(res => {
      this.event = res.data.event
    })
  },
  data() {
    return {
      event: {}
    }
  }
}
</script>
