<template>
  <div>
    yes {{ id }}
  </div>
</template>
<script>
import api from '../api'

export default {
  name: 'user',
  mounted() {
    api.getOne(this.$route.params.userId).then(res => {
      this.user = res.data.user
    })
  },
  data() {
    return {
      id: this.$route.params.userId
    }
  }
}
</script>
