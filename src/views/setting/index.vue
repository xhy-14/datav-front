<template>
    <el-breadcrumb class="breadcrumb" :separator-icon="ArrowRight">
        <el-breadcrumb-item>promotion management</el-breadcrumb-item>
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>
    <profile />
    <RouterView :key="$route.fullPath" />
</template>
  
<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
import profile from './components/profile.vue'
</script>
  
<style>
.breadcrumb {
    height: 60px;
    font-size: 24px ;
    align-content: center;
    display: flex;
    padding-left: 156px;
}
</style>