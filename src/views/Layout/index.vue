<template>
  <!-- <LayoutFixed /> -->
  <LayoutHeader />
  <RouterView :key="$route.fullPath"/>
</template>
  
<script lang="ts" setup>
// import LayoutFixed from '@/views/Layout/components/LayoutFixed.vue';
import LayoutHeader from '@/views/Layout/components/LayoutHeader.vue';
</script>
  
  