<template>
  <div class="header" :class="{ show: y > 78 }">
    <el-header style="height: 70px; padding: 0%;">
      <el-menu v-if="user.token != ''" style="height: 70px;" :default-active="activeIndex" class="el-menu-demo"
        mode="horizontal" :ellipsis="false" @select="handleSelect">
        <a href="/" style="height: 100%; position: relative; left: 138px;">
          <img style="width: 130px;height: 35px;position: relative;top: 17px;" src="@\assets\images\logo.jpg"
            alt="logo" />
        </a>
        <div class="flex-grow" />
        <RouterLink to="/workplace" class="text">进入工作台</RouterLink>
        <RouterLink to="/visual" class="text">新建文件</RouterLink>
        <a href="/account" class="text">个人资料</a>
        <el-sub-menu style="right: 100px;position: relative;" class="menu__title" index="2">
          <template #title>Workspace</template>
          <el-menu-item index="2-1"><a href="/account" class=" menu_item">设置</a></el-menu-item>
          <el-menu-item index="2-2" @click="logout">Logout</el-menu-item>

        </el-sub-menu>
      </el-menu>
      <el-menu v-else style="height: 70px;" :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
        :ellipsis="false" @select="handleSelect">
        <a href="/" style="height: 100%; position: relative; left: 138px;">
          <img style="width: 130px;height: 35px;position: relative;top: 17px;" src="@\assets\images\logo.jpg"
            alt="logo" />
        </a>
        <div class="flex-grow" />
        <a href="/login" class="text">登录</a>
        <RouterLink to="/" class="text">Dashboard</RouterLink>
      </el-menu>
    </el-header>
  </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import { useScroll } from '@vueuse/core'
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()
const user = useUserStore().userInfo
const { y } = useScroll(window)
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

.header {
  transform: translateY(-100%);
  opacity: 0;
  position: fixed;
  width: 100%;
  z-index: 999;

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
  