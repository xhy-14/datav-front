<template>
  <el-header v-if="router.currentRoute.value.path == '/'" style="height: 160px; padding: 0%; z-index: 999;">
    <el-menu v-if="user.token != ''" style="position: absolute;height: 160px;" :default-active="activeIndex"
      class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
      <a href="/" style="height: 100%; position: relative; left: 138px;">
        <img style="width: 182px;height: 59px;position: relative;top: 55px;" src="@\assets\images\logo.jpg" alt="logo" />
      </a>
      <div class="flex-grow" />
      <RouterLink to="/workplace" class="text">进入工作台</RouterLink>
      <RouterLink to="/visual" class="text">新建文件</RouterLink>
    </el-menu>

    <el-menu v-else style="position: absolute;height: 160px;" :default-active="activeIndex" class="el-menu-demo"
      mode="horizontal" :ellipsis="false" @select="handleSelect">
      <a href="/" style="height: 100%; position: relative; left: 138px;">
        <img style="width: 182px;height: 59px;position: relative;top: 55px;" src="@\assets\images\logo.jpg" alt="logo" />
      </a>
      <div class="flex-grow" />
      <a href="/login" class="text">登录</a>
      <RouterLink to="/workplace" class="text">进入工作台</RouterLink>
    </el-menu>
  </el-header>

  <el-header v-else style="height: 70px; padding: 0%;">
    <el-menu v-if="user.token != ''" style="height: 70px;" :default-active="activeIndex" class="el-menu-demo"
      mode="horizontal" :ellipsis="false" @select="handleSelect">
      <a href="/" style="height: 100%; position: relative; left: 138px;">
        <img style="width: 130px;height: 35px;position: relative;top: 17px;" src="@\assets\images\logo.jpg" alt="logo" />
      </a>
      <div class="flex-grow" />
      <RouterLink to="/workplace" class="text">进入工作台</RouterLink>
        <RouterLink to="/visual" class="text">新建文件</RouterLink>
        <el-sub-menu style="right: 100px;position: relative;" class="menu__title" index="2">
          <template #title><p style="color: #54BCBD;">个人中心</p></template>
          <el-menu-item index="2-1"><a href="/account" class=" menu_item">设置</a></el-menu-item>
          <el-menu-item index="2-2" @click="logout"><p  class="menu_item">退出登录</p></el-menu-item>


      </el-sub-menu>
    </el-menu>
    <el-menu v-else style="height: 70px;" :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
      :ellipsis="false" @select="handleSelect">
      <a href="/" style="height: 100%; position: relative; left: 138px;">
        <img style="width: 130px;height: 35px;position: relative;top: 17px;" src="@\assets\images\logo.jpg" alt="logo" />
      </a>
      <div class="flex-grow" />
      <a href="/login" class="text">登录</a>
      <RouterLink to="/" class="text">Dashboard</RouterLink>
    </el-menu>
  </el-header>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
onMounted(() => {
  //当前路由路径名称
  console.log(router.currentRoute.value.path)
})
const user = useUserStore().userInfo
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const logout = () => {
  localStorage.removeItem("token")
  useUserStore().$reset
  router.replace('/login')
  ElMessage({
    message: "登出成功",
    type: "success"
  })
}


</script>
  
<style scoped lang='scss'>
.menu_item {
  display: flex;
  position: relative;
  flex-wrap: wrap;
  align-content: center;
  padding-left: 20px;
  color: #54BCBD;
}
.el-menu {
  width: 100% !important;
  z-index: 99 !important;

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
  