<template>
    <el-breadcrumb class="breadcrumb" :separator-icon="ArrowRight">
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>个人设置</el-breadcrumb-item>
    </el-breadcrumb>
    <setting />
    <RouterView :key="$route.fullPath" />
</template>
  
<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
import setting from './components/setting.vue'
</script>
  
<style>
.breadcrumb {
    height: 70px;
    font-size: 24px ;
    align-content: center;
    display: flex;
    padding-left: 156px;
}
</style>