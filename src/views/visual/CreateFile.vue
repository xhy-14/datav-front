<template>
  <div  v-show="active == 0">
    <el-table :data="data.rows" style="width: 100%" height="450px">
      <el-table-column v-for="item in data.headers" :prop="item" :label="item">
      </el-table-column>
    </el-table>
    <div v-show="active == 1">
      <el-input v-model="input2" placeholder="https://" style="height: 300px" />
    </div>  
  </div>   
  <el-radio-group v-model="tabPosition" style="margin-top: 40px">
    <el-upload :action="uploadUrl" :headers="headers" accept=".csv" :on-error="handleError" :on-success="handleSuccess"
      :show-file-list="false">
      <el-radio-button @Click="fun0" label="上传文件">
        上传文件
      </el-radio-button>
              
    </el-upload>
    <el-radio-button @Click="fun0" label="复制并粘贴">复制并粘贴</el-radio-button>
    <el-radio-button @click="fun1" label="链接外部数据表">链接外部数据表</el-radio-button>
  </el-radio-group> 
  
  <div class="header-select">
    <div>
      <p>x轴</p>
      <el-select v-model="xAxis" class="m-2" placeholder="Select" style="width: 240px">
        <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.value" />
      </el-select>
    </div>

    <div style="margin-left: 10px">
      <p>y轴</p>
      <el-select v-model="yAxis" class="m-2" placeholder="Select" style="width: 240px">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div> 
  </div>  
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/user";
import { lineApi } from "@/api/chart/chart";
import * as echarts from "echarts";
import Chart from "@/components/chart";
const token = useUserStore().userInfo.token;

const uploadUrl = "http://112.124.59.107:8080/renren-fast/app/table/data/file";

interface responseData {
  headers: [];
  rows: [];
}
const headers = {
  token: `${token}`
};
const tabPosition = ref("复制并粘贴");

const active = ref(0);

const fun0 = () => {
  active.value = 0;
};
const fun1 = () => {
  active.value = 1;
};

const input2 = ref("");

let fileList = ref([]);

// x轴
const xAxis = ref("");
// y轴
const yAxis = ref("");

let chartOption = ref({
  xAxis: {
    type: "",
    data: [],
    name: ""
  },
  yAxis: {
    type: "",
    name: ""
  },
  title: {
    text: "",
    textStyle: {
      color: "",
      fontSize: 18,
      fontFamily: null
    }
  },
  series: [
    {
      type: "",
      data: []
    }
  ]
})

// 上传错误提示
const handleError = () => {
  ElMessage.error("导入数据失败，请您重新上传！");
};

//上传成功提示
const data = reactive<responseData>({
  headers: [],
  rows: []
});

let options = ref([]);
let chartType = ref("");
let myChart = ref(null);

const initChart = option => {
  myChart = echarts.init(document.getElementById("main"));
  myChart.setOption(option);
};

/**
 * 提交
 */
const submitChart = () => {
  if (chartType == "line") {
    let selectData = [];
    for (let i = 0; i < data.rows.length; i++) {
      let map = {};
      map[xAxis.value] = data.rows[i][xAxis.value];
      map[yAxis.value] = data.rows[i][yAxis.value];
      selectData.push(map);
    }
    let parameter = {};
    parameter["headers"] = [xAxis.value, yAxis.value];
    parameter["rows"] = selectData;
    lineApi(parameter)
      .then(res => {
        if (res.code == "00000") {
          chartOption = res.data;
          initChart(chartOption);
        }
      })
      .catch(err => {});
  }
};

const handleSuccess = (response, file) => {
  data.headers = response.data.headers;
  data.rows = response.data.rows;
  let opt = [];
  for (let i = 0; i < data.headers.length; i++) {
    let map = {};
    map["label"] = data.headers[i];
    map["value"] = data.headers[i];
    opt.push(map);
  }
  options = opt;
  ElMessage.success("上传文件成功！");
};

//上传前校验
const beforeUpload = (file: any) => {
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isLt2M) {
    ElMessage.error("上传图片大小不能超过 10MB！");
    return;
  }
  if (fileList.value.length > 1) {
    ElMessage.error("只支持上传一个文件");
    return;
  }
};

const chooseChart = type => {
  chartType = type;
};
</script>

<style>
.el-upload-list {
  margin: 0;
}

.top {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.header-select {
  margin-top: 10px;
  display: flex;
  justify-content: start;
}

.submit {
  margin-top: 20px;
  display: flex;
  justify-content: end;
}

.charts-display {
  margin-top: 30px;
}
</style>
