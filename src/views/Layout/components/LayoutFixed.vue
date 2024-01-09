<template>
  <div class="header" :class="{ show: y > 78 }">
  <el-header style="height: 70px; padding: 0%;" >
    <el-menu style="height: 70px;" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
      @select="handleSelect">
      <RouterLink to="/" style="height: 100%; position: relative; left: 138px;">
        <el-menu-item index="0" style="top: 7px; padding: 0%;">
          <img style="width: 130px;height: 35px;position: relative;" src="@\assets\images\logo.jpg" alt="logo" />
        </el-menu-item>
      </RouterLink>
      <div class="flex-grow" />
      <!-- <RouterLink to="/login" class="text">登录</RouterLink>
      <RouterLink to="/" class="text">Dashboard</RouterLink> -->
      <RouterLink to="/login" class="text">进入工作台</RouterLink>
      <RouterLink to="/" class="text">新建文件</RouterLink>
      <RouterLink to="/login" class="text">我的目录</RouterLink>
      <el-sub-menu style="right: 100px;position: relative;" class="menu__title" index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1"><a href="/account" class=" menu_item">设置</a></el-menu-item>
      <el-menu-item index="2-2"><RouterLink to="/" class="menu_item">Logout</RouterLink></el-menu-item>

    </el-sub-menu>
    </el-menu>
  </el-header>
  </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import {useScroll}  from '@vueuse/core'
const {y} = useScroll(window)
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}


</script>
  
<style scoped lang='scss'>
.menu_item{
  display: flex;
  position: relative;
  flex-wrap: wrap;
  align-content: center;
  padding: 20px;
  color: #54BCBD;
}
.header {
  transform: translateY(-100%) ;
  opacity: 0 ;
  position: fixed ;
  width: 100% ; 
  z-index: 999 ;
  
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }
}
.menu__title {
    color: #54BCBD !important;
}
.flex-grow {
  flex-grow: 1;
}

.text {
  display: flex;
  position: relative;
  flex-wrap: wrap;
  align-content: center;
  padding: 20px;
  left: -103px;
  color: #54BCBD;
}
</style>
  