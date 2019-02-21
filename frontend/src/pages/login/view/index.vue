<template>
  <div class="login">
    <div class="control">
      <div class="input">
        <input name="username" placeholder="User Name" v-model="username" type="text" />
      </div>
      <div class="input">
        <input name="pasword" v-model="password" type="password" />
      </div>
    </div>
    <div class="action">
      <div class="submit">
        <button type="button" @click="handleLogin">Login</button>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../api'

export default {
  name: 'login',
  data(){
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      api.login({ 
        username: this.username, 
        password: this.password
      }).then(res => {
        if (res.success){
          this.$store.dispatch('login', res.data)
          this.$router.push({ path :'/rank' })
        }else{
          this.password = ''
          this.$message.error(res.message)
        }
      }).catch(err => {
        this.password = ''
        console.log(err)
      })
    }
  }
}
</script>
