<template>
    <IndexView />
  <div>
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import IndexView  from './views/IndexView.vue';
</script>

<style>

</style>
