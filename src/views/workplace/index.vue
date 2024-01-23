<template>
  <div class="workplace">
    <div class="workplace-box">
      <div class="workplace-menu">
        <el-menu
          default-active="/workplace/project"
          class="el-menu-vertical-demo"
          :router="true"
        >
          <el-menu-item @click="toData()">
            <el-icon>
              <Coin />
            </el-icon>数据源
          </el-menu-item>
          <el-menu-item index="/workplace/project">
            <el-icon>
              <Folder />
            </el-icon>项目
          </el-menu-item>
          <el-menu-item index="/workplace/data/tables">
            <el-icon>
              <Document />
            </el-icon>数据集
          </el-menu-item>
          <el-menu-item index="/workplace/chart">
            <el-icon>
              <DataLine />
            </el-icon>图表
          </el-menu-item>
          <el-menu-item @click="toDashboard()">
            <el-icon>
              <DataBoard />
            </el-icon>画布
          </el-menu-item>
        </el-menu>
      </div>

      <div class="workplace-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Workplace",
  data() {
    return {
    };
  },
  methods: {
    toDashboard() {
      this.$router.replace("/dashboard")
    },
    toData() {
      this.$router.replace("/datasource")
    }
  }
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
  border-radius: 5px;
  font-size: 36px;
  align-items: center;
}

.workplace {
  width: 100%;
  height: 90.5%;
  background-color: #f1f1f1;
}

.workplace-box {
  width: 100%;
  display: grid;
  height: 100%;
  grid-template:
    "menu content" 1fr
    / 14% 1fr;
}

.workplace-content {
  margin-top: 5px;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: white;
}

.workplace-menu {
  margin-top: 5px;
  height: 100%;
}
</style>