<template>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="0">
        <img
          style="width: 100px"
          src="src\assets\images\logo.jpg"
          alt="logo"
        />
      </el-menu-item>
      <div class="flex-grow" />
      <div class="flex justify-space-between mb-4 flex-wrap gap-4">
    <el-button
      v-for="button in buttons"
      :key="button.text"
      :type="button.type"
      text
      >{{ button.text }}</el-button
    >
  </div>
    </el-menu>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  
  const activeIndex = ref('1')
  const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }

  const buttons = [
  { type: 'primary', text: '登录' },
  { type: 'primary', text: 'Dashboard' },

] as const
  </script>
  
  <style>
  .flex-grow {
    flex-grow: 1;
  }
  </style>
  