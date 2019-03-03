<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style>
body {
  margin: 0;
}
.el-header {
  background-color: #e9eef3;
  color: #333;
  padding-top: 10px;
  padding-bottom: 10px;
}
.el-header div{
  line-height: 60px;
}
.header-link{
  text-decoration: none;
  padding:  7px 14px;
  border: 1px solid #909399;
  min-width: 85px;
  color: #909399;
  border-radius: 30px;
}
.name {
  font-size: 22px;
  font-weight: 600;
  color: #409eff;
  text-transform: capitalize;
}
.list-header span{
  line-height: 32px;
}
</style>
