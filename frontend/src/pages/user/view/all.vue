<template>
  <div>
    This is user all
    <div v-for="user in users" :key="user.name">
      {{ user.name }}
    </div>
  </div>
</template>
<script>
import api from '../api'

export default {
  name: 'user-all',
  data() {
    return {
      users: []
    }
  },
  mounted() {
    api.getAll().then(res => {
      if(res.success){
        this.users = res.data.users
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
