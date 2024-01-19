<template>
  <div>
    <el-menu :default-active="select" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="data">数据</el-menu-item>
      <el-menu-item index="style">样式</el-menu-item>
    </el-menu>

    <div style="margin-top: 20px">
      <div v-if="select == 'data'" class="chart-data">
        <div>
          <h4>指标轴</h4>
          <div class="x-col" @dragover="deal($event)" @drop="handleDropX($event)">
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
          <h4>数据列</h4>
          <el-scrollbar height="380px">
            <div class="select-clonums" @drop="handleDrop($event)" @dragover="deal($event)">
              <div v-for="(item, index) in dataName" class="data-col">
                <div class="header">{{ item }}</div>
                <div @click="deleteData(index)">
                  <svg class="close-icon">
                    <use xlink:href="#icon-charts-close" />
                  </svg>
                </div>
              </div>
            </div>
          </el-scrollbar>
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
                <h2>图标字体</h2>
              </template>
              <div>
                <h3 class="ml-3 w-35 text-gray-600 inline-flex items-center">字体颜色</h3>
                <el-color-picker v-model="options.textStyle.color" />
              </div>
              <div>
                <h3 class="ml-3 w-35 text-gray-600 inline-flex items-center">字体大小</h3>
                <el-slider v-model="options.textStyle.fontSize" />
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import { useChartStore } from "@/store/chart";
import { radarApi } from "@/api/chart/chart";
export default {
  name: "Chart",
  data() {
    return {
      chartStore: null,
      select: "data",
      xExists: false,
      dataExists: false,
      xCol: "",
      dataName: [],
      options: {
        title: {
          text: "标题",
          textStyle: {
            color: "black",
            fontSize: 18,
            fontFamily: "monspace"
          },
          left: null
        },
        textStyle: {
          color: "black",
          fontSize: 18,
          fontFamily: "monspace"
        },
        legend: {
          show: true
        },
        radar: {
          indicator: []
        },
        series: [
          {
            name: "",
            type: "radar",
            data: []
          }
        ]
      }
    };
  },
  mounted() {
    this.chartStore = useChartStore();
  },
  methods: {
    handleSelect(key, keyPath) {
      this.select = key;
    },
    deal($event) {
      event.preventDefault();
    },
    handleDropX(event, item) {
      this.$refs.x.innerHTML = event.dataTransfer.getData("header");
      this.xCol = event.dataTransfer.getData("header");
      this.xExists = true;
    },
    handleDrop(event) {
      let tmp = this.dataName;
      tmp.push(event.dataTransfer.getData("header"))
      this.dataName = tmp;
    },
    deleteXCol() {
      this.xExists = false;
    },
    deleteData(index) {
      let tmp = this.dataName;
      tmp.splice(index, 1);
      this.dataName = tmp;
    },
    /**
     * 处理数据
     * @return {[any]} [处理后的数据]
     */
    dealData() {
      let data = this.chartStore.data
      let selectData = []
      for (let i = 0; i < data.rows.length; i++) {
        let map = {}
        map[this.xCol] = data.rows[i][this.xCol]
        for(let item of this.dataName) {
          map[item] = data.rows[i][item]
        }
        selectData.push(map)
      }
      let parameter = {}
      let headerTmp = []
      headerTmp.push(this.xCol)
      for(let item of this.dataName) {
        headerTmp.push(item)
      }
      parameter["headers"] = headerTmp
      parameter["rows"] = selectData
      console.log(parameter);
      radarApi(parameter)
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
    dataName: {
      handler(newVal, oldVal) {
        if (this.dataName.length >= 2 && this.xCol != "") { 
          this.dealData()
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
  width: 100%;
  height: 100%;
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

.select-clonums {
  height: 380px;
  background-color: rgb(239, 242, 245);
}
.select-clonums {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
.data-col {
  width: 90%;
  display: flex;
  justify-content: center;
  background-color: rgb(105, 156, 223);
  margin-top: 5px;
  border-radius: 10px;
}
</style>