<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="24">
          <span style="display: block; font-size: 22px; line-height: 60px; font-weight: 600; text-align: center;">咕咕</span>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="24">
          <el-form ref="form" :model="form" label-width="100px" label-position="top">
            <el-form-item label="用户名">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleLogin">登陆</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
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
          const redirect = this.$route.query.redirect ? this.$route.query.redirect : '/pigeonHouse'
          this.$router.push({ path :redirect })
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
