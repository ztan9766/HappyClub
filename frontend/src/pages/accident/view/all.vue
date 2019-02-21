<template>
  <div>
    This is accident all
    <div v-for="accident in accidents" :key="accident.name">
      {{ accident.name }}
    </div>
  </div>
</template>
<script>
import api from '../api'

export default {
  name: 'accident-all',
  data() {
    return {
      accidents: []
    }
  },
  mounted() {
    api.getAll().then(res => {
      if(res.success){
        this.accidents = res.data.accidents
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
