<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="Name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Description">
      <el-input v-model="form.description"></el-input>
    </el-form-item>
    <el-form-item label="Date">
      <el-input type="date" v-model="form.date"></el-input>
    </el-form-item>
    <el-form-item label="Status">
      <el-select v-model="form.status" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">修改</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import api from '../../api'

export default {
  name: 'house-edit',
  created() {
    this.isNew = this.$route.params.eventId ? false : true
    if(!this.isNew) {
      api.getHouse(this.$route.params.eventId).then(res => {
        this.form = res.data.event
      })
    }
  },
  data() {
    return {
      form: {
        id: '',
        name: '',
        description: '',
        status: '',
        date: ''
      },
      options: [
        {
          label: '关闭',
          value: 'closed'
        },
        {
          label: '完成',
          value: 'compeleted'
        },
        {
          label: '进行中',
          value: 'active'
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      api.updateHouse(this.form._id, this.form).then(res => {
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
      this.form = {
        id: '',
        name: '',
        description: '',
        status: '',
        date: ''
      }
    }
  }
}
</script>
