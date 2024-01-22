<template>
  <div class="dashboard-page">
    <div class="title">
      <h2 style="margin-left: 170px;">绘制你的仪表盘</h2>
      <div style="margin-right: 170px;">
        <el-button type="primary">保存</el-button>
        <el-button @click="toHome()" style="margin-left: 25px;">取消</el-button>
      </div>
    </div>
    <div class="dashboard-view">
      <div class="charts">
        <h2>图表</h2>

        <div
          v-for="(item, index) in chartList"
          @dragstart="dragStart($event, index)"
          draggable="true"
          class="charts-item"
        >
          <el-button class="charts-item-button" text>
            <div class="charts-item-button-icon">
              <svg class="charts-icon">
                <use xlink:href="#icon-charts-line" />
              </svg>
              <h3 style="margin-left: 10px;">{{ item.name }}</h3>
              <el-tooltip
                class="box-item"
                effect="light"
                :content="item.depiction"
                placement="right-start"
              ></el-tooltip>
            </div>
          </el-button>
        </div>
      </div>
      <div class="dashboard-box">
        <div
          id="canvas"
          :style="canvacStyle"
          class="dashboard"
          @dragover="deal($event)"
          @drop="handleDraw($event)"
        ></div>
      </div>

      <div class="change-canvas">
        <h2>调整画布</h2>
        <div class="change-item">
          <h3 class="ml-3 w-35 text-gray-600 inline-flex items-center">背景颜色</h3>
          <el-color-picker v-model="canvacStyle.backgroundColor" />
        </div>

        <div class="change-item">
          <h3 class="ml-3 w-35 text-gray-600 inline-flex items-center">设置背景图</h3>
          <el-input
            @change="changeBackgroundImg($e)"
            v-model="canvacStyle.backgroundImage"
            class="w-50 m-2"
            placeholder="输入图片地址"
          />
        </div>

        <div class="change-item">
          <el-button type="primary" @click="exportImage()">
            导出为图片
            <el-icon>
              <Bottom />
            </el-icon>
          </el-button>
        </div>

        <div id="test"></div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { ChartListApi } from "@/api/chart/chart";
import * as echarts from "echarts";
import {
  Delete,
  Edit,
  Search,
  Share,
  Upload,
  Bottom
} from "@element-plus/icons-vue";
export default {
  data() {
    return {
      chartList: [],
      canvacStyle: {
        backgroundColor: "#fffff",
        backgroundImage: ""
      }
    };
  },
  methods: {
    exportImage() {
      
    },
    toHome() {
      this.$router.replace("/workplace");
    },
    changeBackgroundImg(e) {
      console.log(e);
      this.canvacStyle.backgroundImage = `url(${e.target.value})`;
      console.log(this.canvacStyle.backgroundImage);
    },
    deal(event) {
      event.preventDefault();
    },
    handleDraw(event) {
      let again = event.dataTransfer.getData("again");
      if (again == "false") {
        let config = JSON.parse(event.dataTransfer.getData("config"));
        let option = config.option;
        let parent = document.createElement("div");
        // 创建一个节点放入画板
        let div = document.createElement("div");
        div.id = "chart-item-" + config.id;
        div.style.position = "absolute";
        div.style.left = event.clientX + "px";
        div.style.top = event.clientY + "px";
        div.style.width = "500px";
        div.style.height = "300px";
        div.draggable = "true";
        div.padding = "10px";
        div.style.border = "1px dashed white";
        div.addEventListener("dragstart", e => {
          e.dataTransfer.setData("config", JSON.stringify(config));
          e.dataTransfer.setData("again", true);
          e.dataTransfer.setData("id", div.id);
        });

        div.addEventListener("mouseenter", e => {
          div.style.border = "1px dashed black";
          let width = e.target.style.width;
          let height = e.target.style.width;
          let mouseX = e.clientX;
          let mouseY = e.clientY;
          let divLeft = parseInt(e.target.style.left);
          let divTop = parseInt(e.target.style.top);

          let dx = divLeft + parseInt(width);
          let dy = divTop + parseInt(height);
          if (Math.abs(dx - mouseX) < 200 && Math.abs(dy - mouseY) < 400) {
            e.preventDefault();
            e.target.addEventListener("mousedown", ce => {
              let echart = echarts.init(document.getElementById(e.target.id));
              echart.resize(500, 500);
              echart.setOption(option);
            });
          }
        });

        div.addEventListener("mouseleave", e => {
          div.style.border = "1px dashed white";
        });
        // 设置一个改变大小的
        let changeSizeDiv = document.createElement("div");
        changeSizeDiv.className = "change-size";

        parent.appendChild(div);
        event.target.appendChild(parent);

        echarts.init(document.getElementById(div.id)).setOption(option);
      } else {
        let id = event.dataTransfer.getData("id");
        let div = document.getElementById(id);
        div.style.left = event.clientX + "px";
        div.style.top = event.clientY + "px";
      }
    },
    dragStart(event, index) {
      event.dataTransfer.setData(
        "config",
        JSON.stringify(this.chartList[index])
      );

      event.dataTransfer.setData("again", false);
    }
  },
  mounted() {
    ChartListApi().then(res => {
      this.chartList = res.data;
      console.log(this.chartList);
    });
  }
};
</script>
  
<style>
#c {
  box-sizing: border-box;
}

.title {
  height: 6%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid #ccc;
}

.dashboard {
  background-color: #ffffff;
  width: 95%;
  height: 95%;
}

.item-1 {
  width: 100px;
  height: 100px;
}

.dashboard-view {
  width: 100%;
  height: 94%;
  display: flex;
  justify-content: center;
}

.charts {
  padding: 10px;
  width: 10%;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
  background-color: white;
}

.change-size {
  width: 50px;
  height: 50px;
  background-color: #ccc;
}

.charts-item {
  margin-top: 10px;
  width: 140px;
  height: 60px;
}

.charts-item > div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dashboard-page {
  background-color: #ededed;
  width: 100%;
  height: 100%;
}

.charts-icon {
  width: 40px;
  height: 40px;
}

.dashboard-box {
  width: 75%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.charts-item-button {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.charts-item-button-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.change-canvas {
  width: 15%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

.change-item {
  width: 80%;
  margin-top: 20px;
  display: flex;
  justify-content: start;
  align-items: center;
}
</style>