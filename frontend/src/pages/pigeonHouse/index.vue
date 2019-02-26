<template>
  <el-container>
    <el-header height="40px">
      <el-col class="name" :span="4" :offset="20">{{ name }}</el-col>
    </el-header>
    <el-main>
      <rank-board />
      <houses />
      <!-- House editor -->
      <el-button class="edit-btn house" type="primary" icon="el-icon-plus" circle @click="houseDialogVisible = true"></el-button>
      <el-dialog title="新活动" :visible.sync="houseDialogVisible" width="90%">
        <house-editor/>
      </el-dialog>
      <!-- Pigeon editor -->
      <el-button class="edit-btn pigeon" type="warning" icon="el-icon-plus" circle @click="pigeonDialogVisible = true"></el-button>
      <el-dialog title="新鸽子" :visible.sync="pigeonDialogVisible" width="90%">
        <pigeon-editer/>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script>
import rankBoard from './components/rankBoard'
import houses from './components/houses'
import houseEditor from './components/houseEditor'
import pigeonEditer from './components/pigeonEditor'

export default {
  name: 'pigeon-house',
  components: {
    rankBoard,
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
  }
}
</script>
<style scoped>
  .name{
    color: #fff;
  }
  .edit-btn.house{
    position: absolute;
    bottom: 18px;
    left: 18px;
  }
  .edit-btn.pigeon{
    position: absolute;
    bottom: 18px;
    right: 18px;
  }
  .edit-btn  i{
    font-size: 34px;
  }
</style>
