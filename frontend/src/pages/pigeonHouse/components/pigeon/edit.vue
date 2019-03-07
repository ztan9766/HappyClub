<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="用户" required>
      <el-select v-model="form.user" placeholder="请选择">
        <el-option
          v-for="item in userOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="扣分" required>
      <el-select v-model="form.credit" placeholder="请选择">
        <el-option v-for="n in maxCredit" :key="n" :label="n" :value="n"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="借口">
      <el-input v-model="form.description"></el-input>
    </el-form-item>
    <el-form-item label="活动" required>
      <el-select v-model="form.event" placeholder="请选择">
        <el-option
          v-for="item in eventOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" v-if="isNew" @click="onSubmit">保存</el-button>
      <el-button type="primary" v-else @click="onSubmit">修改</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import api from "../../api";

export default {
  name: "pigeon-edit",
  props: {
    userOptions: Array,
    eventOptions: Array
  },
  created() {
    this.isNew = this.$route.params.accidentId ? false : true;
    if (!this.isNew) {
      api.getPigeon(this.$route.params.accidentId).then(res => {
        this.form = res.data.accident;
      });
    }
  },
  data() {
    return {
      isNew: true,
      form: {
        id: "",
        name: "",
        description: "",
        user: "",
        event: "",
        credit: 1
      },
      maxCredit: 3
    };
  },
  methods: {
    onSubmit() {
      if (this.isNew) {
        if (this.form.user === "" || this.form.event === "") {
          this.$message({
            message: "Select a user and event before submit the form",
            type: "error"
          });
        } else {
          for (const user of this.userOptions) {
            if (user.value === this.form.user) {
              this.form.name = user.label;
            }
          }
          console.log(this.form)
          api.createPigeon(this.form).then(res => {
            if (res.success) {
              this.$message({
                message: res.message,
                type: "success"
              });
              this.clear();
              this.$emit("refresh");
              this.$emit("close-pigeon");
            } else {
              this.$message({
                message: res.message,
                type: "error"
              });
            }
          });
        }
      } else {
        api.updatePigeon(this.form._id, this.form).then(res => {
          if (res.success) {
            this.$message({
              message: res.message,
              type: "success"
            });
          } else {
            this.$message({
              message: res.message,
              type: "error"
            });
          }
        });
      }
    },
    clear() {
      this.form = {
        id: "",
        name: "",
        description: "",
        user: "",
        event: ""
      };
    }
  }
};
</script>
