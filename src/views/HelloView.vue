<template>
  <div>
    <!-- svg图标使用示例 -->
    <svg style="width: 400px; height: 400px;">
      <use xlink:href="#icon-test"></use>
    </svg>
    
    <div class="hello">你好</div>
  </div>
  
</template>

<script lang="ts">
</script>

<style scoped lang="scss">
.hello{
  color:red;
  font-size:20px;
  font-weight:bold;
  background-color:yellow;
  width:200px;
  height:100px;
  border:1px solid #000;
  border-radius:10px;
  box-shadow:10px 10px 5px #888888;
  line-height:100px;
  text-align:center;
  margin:0 auto;
  margin-top:100px;
}
</style>