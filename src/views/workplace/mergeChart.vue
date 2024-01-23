<template>
  <div class="dashboard-page">
    <div class="title">
      <h2 style="margin-left: 170px;">绘制你的仪表盘</h2>
      <div style="margin-right: 170px;">
        <el-button @click="exportImage()" type="primary">生成图片</el-button>
        <el-button @click="toHome()" style="margin-left: 25px;">取消</el-button>
      </div>
    </div>
    <div class="dashboard-view">
      <div class="charts">
        <h2>图表</h2>

        <div v-for="(item, index) in chartList" @dragstart="dragStart($event, index)" draggable="true"
          class="charts-item">
          <el-button class="charts-item-button" text>
            <div class="charts-item-button-icon">
              <svg class="charts-icon">
                <use xlink:href="#icon-charts-line" />
              </svg>
              <h3 style="margin-left: 10px;">{{ item.name }}</h3>
              <el-tooltip class="box-item" effect="light" :content="item.depiction" placement="right-start"></el-tooltip>
            </div>
          </el-button>
        </div>
      </div>
      <div class="dashboard-box">
        <div
          id="canvas"
          ref="dashboard"
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

        <div class="change-item background-img">
          <h3 class="ml-3 w-35 text-gray-600 inline-flex items-center">设置背景图</h3>
          <el-upload
            class="upload-demo"
            drag
            action="http://127.0.0.1:8080/renren-fast/common/file/upload-other"
            multiple
            :on-error="handleError"
            :on-success="handleSuccess"
          >
            <el-icon class="el-icon--upload">
              <upload-filled />
            </el-icon>
            <div class="el-upload__text">
              拖拽文件到这上传或
              <em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">请上传png/jpge格式图片</div>
            </template>
          </el-upload>
        </div>
        <div id="test"></div>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import { ChartListApi } from "@/api/chart/chart";
import * as echarts from "echarts";
import html2canvas from "html2canvas";
import {
  Delete,
  Edit,
  Search,
  Share,
  Upload,
  Bottom,
  Check
} from "@element-plus/icons-vue";
export default {
  data() {
    return {
      chartList: [],
      canvacStyle: {
        backgroundColor: "#fffff",
        backgroundImage: ""
      },
      dashboardData: {},
      dashboardConfig: {
        backgroundImage: ""
      }
    };
  },
  methods: {
    handleError() {
      this.$message.error("上传失败");
    },
    handleSuccess(response, file) {
      this.$refs.dashboard.style.backgroundImage = `url(${response.data.path})`;
    },
    exportImage() {
      html2canvas(this.$refs.dashboard).then(function(canvas) {
        let imgURI = canvas.toDataURL("image/png");
        // 下载图片
        let link = document.createElement("a");
        link.href = imgURI;
        link.download = "myImage.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // 清理blob对象
        DOMURL.revokeObjectURL(img.src);
      });
    },
    toHome() {
      this.$router.replace("/workplace");
    },
    changeBackgroundImg(e) {
      this.canvacStyle.backgroundImage = `url(${e.target.value})`;
    },
    deal(event) {
      event.preventDefault();
    },
    /**
     * 图表移动
     * @param {*} node
     */
    move(node) {
      node.addEventListener("mousedown", e => {
        let px = e.clientX;
        let py = e.clientY;
        let dashboard = document.getElementById("canvas");
        document.onmousemove = e => {
          let mx = e.clientX;
          let my = e.clientY;
          let dx = mx - px;
          let dy = my - py;
          let offsetX = parseInt(node.style.left);
          let offsetY = parseInt(node.style.top);
          node.style.left = offsetX + dx + "px";
          node.style.top = offsetY + dy + "px";
          px = mx;
          py = my;
        };
        document.onmouseup = e => {
          document.onmousemove = null;
        };
      });
    },
    /**
     * 改变大小
     * @param {*} node
     * @param {*} echart
     */
    changeSize(node, echart) {
      node.addEventListener("mousedown", e => {
        let px = e.clientX;
        let py = e.clientY;
        document.onmousemove = e => {
          let mx = e.clientX;
          let my = e.clientY;
          let dx = mx - px;
          let dy = my - py;
          let width = parseInt(node.style.width);
          let height = parseInt(node.style.height);
          node.style.width = width + dx + "px";
          node.style.height = height + dy + "px";
          echart.resize(width + dx, height + dy);
          px = mx;
          py = my;
        };
        document.onmouseup = e => {
          document.onmousemove = null;
        };
      });
    },
    handleDraw(event) {
      let again = event.dataTransfer.getData("again");
      let config = JSON.parse(event.dataTransfer.getData("config"));
      let option = config.option;
      let parent = document.createElement("div");
      // 创建一个节点放入画板
      let div = document.createElement("div");
      let echart = null;
      div.id = "chart-item-" + config.id;
      div.style.position = "absolute";
      div.style.left = event.clientX + "px";
      div.style.top = event.clientY + "px";
      div.style.width = "500px";
      div.style.height = "300px";
      div.padding = "10px";
      div.style.border = "1px dashed white";

      div.addEventListener("mouseenter", e => {
        div.style.border = "1px dashed black";
        let width = e.target.style.width;
        let height = e.target.style.width;
        let mouseX = e.clientX;
        let mouseY = e.clientY;

        // 左上角位置
        let divLeft = parseInt(e.target.style.left);
        let divTop = parseInt(e.target.style.top);

        // 右下角
        let divRight = divLeft + parseInt(width);
        let divBottom = divTop + parseInt(height);

        // 在右下角盒子
        if (
          Math.abs(divRight - mouseX) < 200 &&
          Math.abs(divBottom - mouseY) < 300
        ) {
          // 改变大小
          console.log("改变大小");
          div.style.cursor = "left";
          this.changeSize(div, echart);
        } else {
          // 在右下角拉伸盒子
          div.style.cursor = "move";
          this.move(div);
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

      echart = echarts.init(document.getElementById(div.id));
      echart.setOption(option);
    },
    dragStart(event, index) {
      event.dataTransfer.setData(
        "config",
        JSON.stringify(this.chartList[index])
      );

      event.dataTransfer.setData("again", false);
    },
    changeImg() {
      this.$refs.dashboard.style.backgroundImage = `url(${this.dashboardConfig.backgroundImage})`;
    }
  },
  mounted() {
    ChartListApi().then(res => {
      this.chartList = res.data;
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
  overflow: hidden;
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
  width: 12%;
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

.charts-item>div {
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

.background-img {
  display: block;
}

.change-img {
  display: flex;
  justify-content: end;
  align-items: center;
}
</style>