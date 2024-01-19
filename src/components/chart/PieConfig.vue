<template>
  <div>
    <el-menu :default-active="select" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="data">数据</el-menu-item>
      <el-menu-item index="style">样式</el-menu-item>
    </el-menu>

    <div style="margin-top: 20px">
      <div v-if="select == 'data'" class="chart-data">
        <div>
          <h4>x轴</h4>
          <div class="x-col" @dragover="dealX($event)" @drop="handleDropX($event)">
            <div ref="x-box" class="x-box" v-show="xExists">
              <div ref="x" class="header"></div>
              <div @click="deleteXCol()">
                <svg class="close-icon">
                  <use xlink:href="#icon-charts-close" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4>y轴</h4>
          <div class="y-col" @dragover="dealY($event)" @drop="handleDropY($event)">
            <div ref="y-box" class="y-box" v-show="yExists">
              <div ref="y" class="header"></div>
              <div @click="deleteYCol()">
                <svg class="close-icon">
                  <use xlink:href="#icon-charts-close" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="select == 'style'" class="chart-config">
        <el-scrollbar height="480px">
          <el-collapse>
            <el-collapse-item class="title" name="1">
              <template #title>
                <h2>标题</h2>
              </template>
              <div>
                <h3>内容</h3>
                <el-input v-model="options.title.text" class="w-50 m-2" placeholder="Pick a date" />
              </div>
              <div>
                <h3 class="ml-3 w-35 text-gray-600 inline-flex items-center">标题位置</h3>
                <el-button @click="changeTitlePos('left')">左边</el-button>
                <el-button @click="changeTitlePos('center')">居中</el-button>
                <el-button @click="changeTitlePos('right')">右边</el-button>
              </div>

              <div>
                <h3 class="ml-3 w-35 text-gray-600 inline-flex items-center">字体颜色</h3>
                <el-color-picker v-model="options.title.textStyle.color" />
              </div>

              <div>
                <h3 class="ml-3 w-35 text-gray-600 inline-flex items-center">字体大小</h3>
                <el-slider v-model="options.title.textStyle.fontSize" />
              </div>
            </el-collapse-item>

            <el-collapse-item class="title" name="2">
              <template #title>
                <h2>图列</h2>
              </template>
              <div>
                <h3 class="ml-3 w-35 text-gray-600 inline-flex items-center">是否显示图列</h3>
                <el-checkbox v-model="options.legend.show">是否显示</el-checkbox>
              </div>
              <div>
                <h3 class="ml-3 w-35 text-gray-600 inline-flex items-center">图列位置</h3>
                <el-button @click="changesymbolPos('left')">左边</el-button>
                <el-button @click="changesymbolPos('center')">居中</el-button>
                <el-button @click="changesymbolPos('right')">右边</el-button>
              </div>
            </el-collapse-item>

            <el-collapse-item class="title" name="3">
              <template #title>
                <h2>饼状图</h2>
              </template>

              <div>
                <h3>图表大小</h3>
                <el-input v-model="options.series[0].radius" class="w-50 m-2" placeholder="Pick a date" />
              </div>

              <div>
                <h3>图表名</h3>
                <el-input v-model="options.series[0].name" class="w-50 m-2" placeholder="Pick a date" />
              </div>
            </el-collapse-item>

          </el-collapse>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import { chartStore } from "@/store/chart";
import { pieApi } from "@/api/chart/chart";
export default {
  name: "Chart",
  data() {
    return {
      chartStore: null,
      select: "data",
      xExists: false,
      yExists: false,
      xCol: "",
      yCol: "",
      options: {
        title: {
          text: "标题",
          textStyle: {
            color: "black",
            fontSize: 18,
            fontFamily: null
          },
          left: "center"
        },
        tooltip: {
          show: true,
          trigger: "item"
        },
        legend: {
          orient: "vertical",
          left: "left",
          show: false
        },
        series: [
          {
            name: "图表",
            type: "pie",
            radius: "50%",
            data: [
              {
                name: "10",
                value: "10"
              },
              {
                name: "1",
                value: "100"
              },
              {
                name: "2",
                value: "2"
              },
              {
                name: "3",
                value: "8"
              },
              {
                name: "4",
                value: "6"
              },
              {
                name: "5",
                value: "5"
              },
              {
                name: "6",
                value: "9"
              },
              {
                name: "7",
                value: "9"
              },
              {
                name: "8",
                value: "3"
              },
              {
                name: "9",
                value: "4"
              },
              {
                name: "10",
                value: "6"
              },
              {
                name: "11",
                value: "1"
              },
              {
                name: "12",
                value: "2"
              },
              {
                name: "13",
                value: "5"
              },
              {
                name: "14",
                value: "3"
              },
              {
                name: "15",
                value: "4"
              }
            ]
          }
        ]
      }
    };
  },
  mounted() {
    this.chartStore = chartStore();
  },
  methods: {
    handleSelect(key, keyPath) {
      this.select = key;
    },
    dealX(event) {
      event.preventDefault();
    },
    dealY(event) {
      event.preventDefault();
    },
    handleDropX(event, item) {
      this.$refs.x.innerHTML = event.dataTransfer.getData("header");
      this.xCol = event.dataTransfer.getData("header");
      this.xExists = true;
    },
    handleDropY(event, item) {
      this.$refs.y.innerHTML = event.dataTransfer.getData("header");
      this.yCol = event.dataTransfer.getData("header");
      this.yExists = true;
    },
    deleteXCol() {
      this.xExists = false;
    },
    deleteYCol() {
      this.yExists = false;
    },
    /**
     * 处理数据
     * @return {[any]} [处理后的数据]
     */
    dealData(column) {
      let data = this.chartStore.data;
      console.log(data);
      let selectData = [];
      for (let i = 0; i < data.rows.length; i++) {
        let map = {};
        map[this.xCol] = data.rows[i][this.xCol];
        map[this.yCol] = data.rows[i][this.yCol];
        selectData.push(map);
      }
      let parameter = {};
      parameter["headers"] = [this.xCol, this.yCol];
      parameter["rows"] = selectData;
      console.log(parameter);
      pieApi(parameter)
        .then(result => {
          console.log(result.data);
          this.options = result.data;
        })
        .catch(err => {});
    },
    /**
     * 改变标题位置
     * @param  {[type]} type [description]
     */
    changeTitlePos(type) {
      this.options.title.left = type;
    },
    /**
     * 改变图列位置
     * @param {*} type 
     */
    changesymbolPos(type) {
      this.options.legend.left = type;
    }
  },
  watch: {
    options: {
      handler(newVal, oldVal) {
        this.chartStore.setOptions(newVal);
      },
      deep: true
    },
    "chartStore.options": {
      handler(newVal, oldVal) {
        this.options = newVal;
      },
      deep: true
    },
    xCol: {
      handler(newVal, oldVal) {
        if (this.yCol != "") {
          this.dealData();
        }
      },
      deep: true
    },
    yCol: {
      handler(newVal, oldVal) {
        if (this.xCol != "") {
          this.dealData();
        }
      },
      deep: true
    }
  }
};
</script>

<style>
.chart-config {
  padding: 10px;
  width: 100%;
  height: 100%;
}

.x-col {
  background-color: rgb(239, 242, 245);
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
}

.chart-data {
  padding: 10px;
}

.x-box {
  display: flex;
  justify-content: center;
  background-color: rgb(126, 187, 252);
  width: 90%;
  border-radius: 10px;
}

.y-box {
  display: flex;
  justify-content: center;
  background-color: rgb(126, 187, 252);
  width: 90%;
  border-radius: 10px;
}

.y-col {
  background-color: rgb(239, 242, 245);
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
}

.close-icon {
  position: relative;
  right: -50px;
  top: 8px;
  width: 20px;
  height: 20px;
}

.close-icon:hover {
  cursor: pointer;
}
.header {
  line-height: 36px;
  width: 120px;
  height: 36px;
  text-align: center;
  color: white;
}
</style>