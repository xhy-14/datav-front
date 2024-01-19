<template>
  <div class="dashboard-page">
    <div class="title">
      <h2>绘制你的仪表盘</h2>
      <div>
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
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
          <div>
            <svg class="charts-icon">
              <use xlink:href="#icon-charts-line" />
            </svg>
            <h3 style="margin-left: 10px;">{{ item.name }}</h3>
          </div>
        </div>
      </div>
      <div class="dashboard-box">
        <div class="dashboard" @dragover="deal($event)" @drop="handleDraw($event)"></div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { ChartListApi } from "@/api/chart/chart";
import * as echarts from "echarts";
export default {
  data() {
    return {
      chartList: []
    };
  },
  methods: {
    deal(event) {
      event.preventDefault();
    },
    handleDraw(event) {
      let again = event.dataTransfer.getData("again");
      if (again == "false") {
        let config = JSON.parse(event.dataTransfer.getData("config"));
        let soption = config.config;
        let option = JSON.parse(soption);
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
        div.addEventListener("dragstart", e => {
          e.dataTransfer.setData("config", JSON.stringify(config));
          e.dataTransfer.setData("again", true);
          e.dataTransfer.setData("id", div.id);
        });

        div.addEventListener("mouseenter", e => {
          div.style.border = "1px dashed black";
          /*
          let width = e.target.style.width;
          let height = e.target.style.width;
          let mouseX = e.clientX;
          let mouseY = e.clientY;
          let divLeft = parseInt(e.target.style.left);
          let divTop = parseInt(e.target.style.top);

          let dx = divLeft + parseInt(width)
          let dy = divTop + parseInt(height)
          if( Math.abs(dx - mouseX) < 200 && Math.abs(dy - mouseY) < 400) {
            e.preventDefault()
            e.target.style.width = "600px";
            echarts.init(document.getElementById(this.id)).setOption(option)
          }
          */
        });

        div.addEventListener("mouseleave", e => {
          div.style.border = "none";
        });
        // 设置一个改变大小的
        let changeSizeDiv = document.createElement("div");
        changeSizeDiv.className = "change-size";

        div.appendChild(changeSizeDiv);
        event.target.appendChild(div);

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
}

.dashboard {
  background-color: #ffffff;
  width: 90%;
  height: 90%;
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
  width: 15%;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-top: 1px solid #ccc;
}

.change-size {
  width: 50px;
  height: 50px;
  background-color: #ccc;
}

.charts-item {
  margin-top: 10px;
  width: 240px;
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
  width: 94%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>