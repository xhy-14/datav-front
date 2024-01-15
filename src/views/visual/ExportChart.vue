<template>
    <div style="height: 450px;">
        <div id="asd" class="echarts-vue" style="width: 1000px; height: 400px;"></div>

    </div>
    <div>
        <h2>导出图片或生成图表</h2>

        <el-button type="primary" :icon="Download" @click="exportChart">导出为图片</el-button>
    </div>
</template>




<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, } from 'element-plus'
import { useUserStore } from '@/store/user'
import * as echarts from "echarts";
import { Download } from '@element-plus/icons-vue'

defineProps({
    myChart: Object
})

var myChart = {}

function getChartData() {

    return {
        title: {
            text: "ECharts 入门示例",
        },
        tooltip: {},
        xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
            {
                name: "销量",
                type: "bar",
                data: [5, 20, 36, 10, 10, 20],
            },
        ],
    }
}


//声明周期函数，自动执行初始化
onMounted(() => {
    init();
});
//初始化函数
function init() {
    // 基于准备好的dom，初始化echarts实例
    myChart = echarts.init(document.getElementById("asd"));
    // 绘制图表
    let options = getChartData()

    // 渲染图表
    myChart.setOption(options);
}



function downloadImg(file, name) {
    let parts = file.split(';base64,')
    let contentType = parts[0].split(':')[1]
    let raw = window.atob(parts[1]) // 解码base64得到二进制字符串
    let rawLength = raw.length
    let uInt8Array = new Uint8Array(rawLength) // 创建8位无符号整数值的类型化数组

    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i) // 数组接收二进制字符串
    }
    // 创建blob对象设置文件类型
    var blob = new Blob([uInt8Array], { type: contentType });
    console.log(blob);

    var aLink = document.createElement("a");
    // 下载的文件名称
    aLink.download = name + '.' + contentType.split('/')[1];
    aLink.href = URL.createObjectURL(blob);
    // 执行点击事件进行下载
    aLink.click()

}

function exportChart() {
    const base64Image = myChart.getDataURL({ type: 'png', pixelRatio: 2 })
    downloadImg(base64Image, '文件')
}

</script>

<style scoped>
/* 样式这里要设置长宽，不然显示不出来 */
#main {
    width: 1000px;
    height: 450px;
}
</style>
