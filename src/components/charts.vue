<template>
  <div class="charts-view-box">
    <div class="charts-view" style="width: 500px; height: 500px;"></div>
    
    <div class="charts-change">
      <div v-if="option.title != null">
        <div>
          <div>字体大小</div>
          <el-slider v-model="option.title.fontSize" />
        </div>

        <div>
          <p>字体颜色</p>
          <el-color-picker v-model="option.title.color" />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    option: {}
  }
};
</script>

<style>
</style>