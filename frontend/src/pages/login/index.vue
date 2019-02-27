<template>
  <el-form ref="form" :model="form" label-width="100px" label-position="top">
    <el-form-item label="名称">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleLogin">登陆</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import api from './api'

export default {
  name: 'login',
  data(){
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleLogin() {
      api.login(this.form).then(res => {
        if (res.success){
          this.$store.dispatch('login', res.data)
          this.$router.push({ path :'/pigeonHouse' })
          this.$message({
            type: 'success',
            message: "登陆成功！"
          })
        }else{
          this.clear()
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      }).catch(err => {
        this.clear()
        this.$message({
          type: 'error',
          message: err.message
        })
      })
    },
    clear() {
      this.form = {
        username: '',
        password: ''
      }
    }
  }
}
</script>
