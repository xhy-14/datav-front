<template>
  <div>
    <div class="workplace-box">
      <div class="workplace-menu">
        <el-menu
          default-active="/workplace/info"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
          router="true"
        >
          <el-menu-item index="/workplace/info">
            <el-icon :size="size" :color="color">
              <Edit />
            </el-icon>我的信息
          </el-menu-item>
          <el-menu-item index="/workplace/data/source">
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
          <el-menu-item index="/workplace/show">
            <el-icon>
              <DataBoard />
            </el-icon>看台
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
    return {};
  },
  methods: {}
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 525px;
}

.workplace-box {
  width: 100%;
  display: grid;
  grid-template:
    "menu content" 1fr
    / 14% 1fr;
}
</style>