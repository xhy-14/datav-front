<template>
    <canvas id="canvas" width="200" height="200"></canvas>
</template>
  
<script lang="ts" setup>
import { onMounted } from 'vue';
import { fabric } from 'fabric';
// 使用 fabric 绑定画布
let canvasContainer = null;


// 创建矩形元素
const rect = new fabric.Rect({
    top: 10,
    left: 10,
    width: 60,
    height: 60,
    fill: '#998766'
})

// 将矩形添加到画布中



async function initCanvas() {
    let canvas = new fabric.Canvas('canvas', {
    backgroundColor: '#aa96da'
})// 实例化fabric，并绑定到canvas元素上
    canvasContainer = canvas;
canvas.add(rect)
}
onMounted(() => {
    initCanvas();
});
</script>
  
<style>
#c {
    border: 1px solid #ccc;
    box-sizing: border-box;
}
</style>