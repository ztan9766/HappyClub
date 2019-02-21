<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="Name">
        <span v-html="form.name"></span>
      </el-form-item>
      <el-form-item label="Password">
        <el-input type="password" v-model="form.pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import api from '../api'

export default {
  name: 'user-edit',
  data() {
    return {
      form: {
        id: this.$route.params.userId || this.$store.state.id,
        name: this.$route.params.userId ? '' : this.$store.state.name,
        pwd: ''
      }
    }
  },
  methods: {
    onSubmit() {
      api.changePwd({
        id: this.form.id,
        password: this.form.pwd
      }).then(res => {
        if (res.success) {
          this.$message({
            message: res.message,
            type: 'success'
          })
        }else{
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    clear() {
      console.log('clear')
    }
  }
}
</script>

