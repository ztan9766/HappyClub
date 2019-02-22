<template>
  <el-container>
    <el-header>
      <el-col :span="4" :offset="20">{{ name }}</el-col>
    </el-header>
    <el-main>
      <rank-board />
      <houses />
      <house-editor />
      <pigeon-editer />
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
      name: this.$store.state.name
    }
  }
}
</script>
