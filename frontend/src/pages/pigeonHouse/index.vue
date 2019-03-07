<template>
  <el-container>
    <el-header>
      <el-col :span="12">
        <router-link to="/rank" class="header-link">查看咕咕排行榜</router-link>
      </el-col>
      <el-col class="name" :span="6" :offset="6">{{ name }}</el-col>
    </el-header>
    <el-main>
      <div v-loading.fullscreen.lock="fullscreenLoading">
        <el-row class="list-header">
          <el-col :span="6">
            <span>活动列表</span>
          </el-col>
          <el-col :span="18" style="text-align: right">
            <el-pagination
              layout="prev, next"
              :page-size="pageSize"
              :total="total"
              :current-page="page"
              @current-change="handlePageChange"
            ></el-pagination>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table
              :data="houses"
              style="width: 100%"
              :default-sort="{prop: 'date', order: 'descending'}"
            >
              <el-table-column type="expand" width="40px">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="house-table-expand">
                    <el-form-item label="活动名称">
                      <span>{{ props.row.name }}</span>
                    </el-form-item>
                    <el-form-item label="日期">
                      <span>{{ props.row.date }}</span>
                    </el-form-item>
                    <el-form-item label="描述">
                      <span>{{ props.row.description }}</span>
                    </el-form-item>
                    <el-form-item label="咕咕">
                      <el-popover
                        style="margin-right: 5px;"
                        v-for="(item, index) in props.row.accidents"
                        :key="index"
                        placement="top"
                        width="150"
                        trigger="click"
                      >
                        <div v-if="item.credit">
                          <span>{{ `记${ item.credit }分` }}</span>
                        </div>
                        <div v-if="item.description">
                          <span>{{ `借口：${ item.description }` }}</span>
                        </div>
                        <div v-if="item.created_at">
                          <span>{{ `记录员：${ getUserName(item.created_by) }` }}</span>
                        </div>
                        <el-button slot="reference">{{ item.name }}</el-button>
                      </el-popover>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column prop="date" label="日期" sortable width="100px"></el-table-column>
              <el-table-column prop="name" label="活动名" sortable width="140px"></el-table-column>
              <el-table-column prop="times" label="咕咕"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>

      <el-dropdown
        @command="handleCommand"
        :hide-on-click="false"
        style="position: absolute; bottom: 26px; right: 28px;"
      >
        <el-button type="primary" style="font-size: 32px" icon="el-icon-plus" circle></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="house">活动</el-dropdown-item>
          <el-dropdown-item command="pigeon">鸽子</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!-- dialogs -->
      <!-- house -->
      <el-dialog title="新活动" :visible.sync="houseEditVisible" width="90%" center>
        <house-edit v-on:refresh="refreshComponents" v-on:close-house="houseEditVisible = false"/>
      </el-dialog>
      <!-- pigeon -->
      <el-dialog title="新鸽子" :visible.sync="pigeonEditVisible" width="90%" center>
        <pigeon-edit
          ref="pigeonEditer"
          v-on:refresh="refreshComponents"
          v-on:close-pigeon="pigeonEditVisible = false"
          :userOptions="users"
          :eventOptions="events"
        />
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script>
import houseEdit from "./components/house/edit";
import pigeonEdit from "./components/pigeon/edit";
import api from "./api";

export default {
  name: "pigeon-house",
  components: {
    houseEdit,
    pigeonEdit
  },
  created() {
    this.getHouses();
    this.getUsers();
    this.getEvents();
  },
  data() {
    return {
      name: this.$store.state.name,
      houseEditVisible: false,
      pigeonEditVisible: false,
      users: [],
      houses: [],
      events: [],
      page: 1,
      pageSize: 10,
      total: 0,
      fullscreenLoading: false
    };
  },
  methods: {
    refreshComponents() {
      this.getHouses();
      this.events = [];
      this.getEvents();
    },
    formateDate(unixDate) {
      const date = new Date(unixDate * 1000);
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    handleCommand(command) {
      switch (command) {
        case "house":
          this.houseEditVisible = true;
          break;
        case "pigeon":
          this.pigeonEditVisible = true;
          break;
      }
    },
    getHouses() {
      this.fullscreenLoading = true;
      api
        .getHouses({ page: this.page, limit: this.pageSize })
        .then(res => {
          if (res.success && res.data.events) {
            this.houses = res.data.events;
            this.total = res.data.count;
            this.fullscreenLoading = false;
          } else {
            this.fullscreenLoading = false;
            this.$message({
              message: "can't get houses",
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.fullscreenLoading = false;
          this.$message({
            message: "error when getting houses",
            type: "error"
          });
        });
    },
    getUsers() {
      api.getAllUsers().then(res => {
        for (const user of res.data.users) {
          this.users.push({
            label: user.name,
            value: user._id
          });
        }
      });
    },
    getEvents() {
      api.getAllEvents().then(res => {
        for (const event of res.data.events) {
          this.events.push({
            label: `${this.formateDate(event.date)}: ${event.name}`,
            value: event._id
          });
        }
      });
    },
    getUserName(id) {
      for (const user of this.users) {
        if (user.value === id) return user.label;
      }
      return "";
    },
    handlePageChange(page) {
      this.page = page;
      this.getHouses();
    }
  }
};
</script>
<style>
.house-table-expand {
  font-size: 0;
}
.house-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.house-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>
