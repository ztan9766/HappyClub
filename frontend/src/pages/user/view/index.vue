<template>
  <div>
    yes {{ user.id }}
  </div>
</template>
<script>
export default {
  name: 'user',
  data() {
    return {
      user: {
        id: this.$store.state.id,
        name: this.$store.state.name
      }
    }
  }
}
</script>
