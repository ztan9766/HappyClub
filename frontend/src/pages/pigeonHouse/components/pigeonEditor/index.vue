<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="Name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Description">
      <el-input v-model="form.description"></el-input>
    </el-form-item>
    <el-form-item label="User">
      <el-select v-model="form.user" placeholder="请选择">
        <el-option
          v-for="item in userOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Event">
      <el-select v-model="form.event" placeholder="请选择">
        <el-option
          v-for="item in eventOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" v-if="isNew" @click="onSubmit">保存</el-button>
      <el-button type="primary" v-else @click="onSubmit">修改</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import api from '../../api'

export default {
  name: 'pigeon-edit',
  created() {
    this.isNew = this.$route.params.accidentId ? false : true
    if(!this.isNew) {
        api.getPigeon(this.$route.params.accidentId).then(res => {
        this.form = res.data.accident
      })
    }
    api.getAllUsers().then(res => {
      for(const user of res.data.users){
        this.userOptions.push({
          label: user.name,
          value: user._id
        })
      }
    })
    api.getAllEvents().then(res => {
      for(const event of res.data.events){
        this.eventOptions.push({
          label: event.name,
          value: event._id
        })
      }
    })
  },
  data() {
    return {
      isNew: true,
      form: {
        id: '',
        name: '',
        description: '',
        user: '',
        event: ''
      },
      userOptions: [],
      eventOptions: []
    }
  },
  methods: {
    onSubmit() {
      if(this.isNew) {
        api.createPigeon(this.form).then(res => {
          if (res.success) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.clear()
            this.$emit('refresh')
            this.$emit('close-pigeon')
          }else{
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
        })
      } else {
        api.updatePigeon(this.form._id, this.form).then(res => {
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
      }
    },
    clear() {
      this.form = {
        id: '',
        name: '',
        description: '',
        user: '',
        event: ''
      }
    }
  }
}
</script>
