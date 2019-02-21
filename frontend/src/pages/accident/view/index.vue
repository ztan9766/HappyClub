<template>
  <div>
    <span v-if="accident">yes {{ accident._id }}</span>
  </div>
</template>
<script>
import api from '../api'

export default {
  name: 'accident',
  mounted() {
    api.getOne(this.$route.params.accidentId).then(res => {
      this.accident = res.data.accident
    })
  },
  data() {
    return {
      accident: {}
    }
  }
}
</script>
