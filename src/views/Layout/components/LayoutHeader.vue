<template>
    <el-header style="height: 160px; padding: 0%;">
     <el-menu style="height: 160px;" :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                    :ellipsis="false" @select="handleSelect">
                    <RouterLink to="/" style="height: 100%; position: relative; left: 138px;">
                        <el-menu-item index="0" style="top: 55px; padding: 0%;">
                            <img style="width: 182px;height: 59px;position: relative;" src="@\assets\images\logo.jpg"
                                alt="logo" />
                        </el-menu-item>
                    </RouterLink>
                    <div class="flex-grow" />
                    <RouterLink to="/login" class="text">登录</RouterLink>
                    <RouterLink to="/" class="text">Dashboard</RouterLink>
                </el-menu>
            </el-header>
</template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  
  const activeIndex = ref('1')
  const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }


  </script>
  
  <style>
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
  