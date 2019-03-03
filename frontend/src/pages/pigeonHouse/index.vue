<template>
  <el-container>
    <el-header>
      <el-col :span="6">
        <router-link to="/rank" class="header-link">鸽子榜</router-link>
      </el-col>
      <el-col class="name" :span="6" :offset="12">{{ name }}</el-col>
    </el-header>
    <el-main>
      <houses ref="houses"/>

      <el-dropdown class="action" @command="handleCommand" :hide-on-click="false">
        <el-button type="primary" style="font-size: 32px" icon="el-icon-plus" circle></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="house">活动</el-dropdown-item>
          <el-dropdown-item command="pigeon">鸽子</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      
      <!-- dialogs -->
      <el-dialog title="新活动" :visible.sync="houseDialogVisible" width="90%">
        <house-editor v-on:refresh="refreshComponents" v-on:close-house="houseDialogVisible = false"/>
      </el-dialog>
      <el-dialog title="新鸽子" :visible.sync="pigeonDialogVisible" width="90%">
        <pigeon-editer v-on:refresh="refreshComponents" v-on:close-pigeon="pigeonDialogVisible = false"/>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script>
import houses from './components/houses'
import houseEditor from './components/houseEditor'
import pigeonEditer from './components/pigeonEditor'

export default {
  name: 'pigeon-house',
  components: {
    houses,
    houseEditor,
    pigeonEditer
  },
  data() {
    return {
      name: this.$store.state.name,
      houseDialogVisible: false,
      pigeonDialogVisible: false
    }
  },
  methods: {
    refreshComponents() {
      this.$refs.houses.getHouses()
    },
    handleCommand(command) {
      switch(command) {
        case 'house':
          this.houseDialogVisible = true
          break
        case 'pigeon':
          this.pigeonDialogVisible = true
          break
      }
    }
  }
}
</script>
<style scoped>
  .action{
    position: absolute;
    bottom: 26px;
    right: 28px;
  }
</style>
