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
import { ref, reactive, onMounted, watch } from 'vue'
import { ElMessage, } from 'element-plus'
import { useChartStore } from '@/store/chart'
import { useUserStore } from '@/store/user'
import { getChartInfoAPI } from '@/api/chart/chart'



const token = useUserStore().userInfo.token

const uploadUrl = "http://112.124.59.107:8080/renren-fast/app/table/data/file"

interface responseData {
  headers: [], 
  rows: [],
}
const headers = {
  'token': `${token}`
};
const tabPosition = ref('复制并粘贴')
const active = ref(0)
const fun0 = () => {
  active.value = 0

}
const fun1 = () => {
  active.value = 1
}

const input2 = ref('')

let options = ref([]);
let chartType = ref("");
// x轴
const xAxis = ref("");
// y轴
const yAxis = ref("");



let fileList = ref([]);
// 上传错误提示
const handleError = () => {
  ElMessage.error('导入数据失败，请您重新上传！');
};
//上传成功提示
const data = reactive<responseData>({
  headers: [],
  rows: []

})    

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
  console.log(options,"option");
  ElMessage.success('上传文件成功！');
}
//上传前校验
const beforeUpload = (file: any) => {
  const isLt2M = file.size / 1024 / 1024 < 10
  if (!isLt2M) {
    ElMessage.error('上传图片大小不能超过 10MB！')
    return;
  }
}



watch(
  [() => xAxis.value, () => yAxis.value],

  ([newX, newY]) => {
      console.log(newX, newY)
      let selectData = [];
      for (let i = 0; i < data.rows.length; i++) {
        let map = {};
        map[newX] = data.rows[i][newX];
        map[newY] = data.rows[i][newY];
        selectData.push(map);
      }  
      let parameter = {};
      parameter["headers"] = [newX, newY];
      parameter["rows"] = selectData;
      
      getChartInfoAPI(parameter)
        .then(res => {
          if (res.code == "00000") {
            useChartStore().setChartInfo(res.data)
            console.log("rows",res.data)
          }
        })
        .catch(err => { });
    
  }
)



// // 上传错误提示
// const handleError = () => {
//   ElMessage.error('导入数据失败，请您重新上传！');
// };








// //上传成功提示
// const dataList = ref()
// var data = []
// var tableHeaders = [];
// var tablerows = [];
// const handleSuccess = (response, file) => {
//   dataList.value = response
//   console.log("文件正在上传")
//       dataList.value = response.data
//       tableHeaders = dataList.value.headers;
//       tablerows = dataList.value.rows;
//       console.log(tableHeaders)
//       console.log(tablerows)
//       // var res = {};

//       // for (let i = 0; i < tablerows.length; i++) {
//       //   res = {};
//       //   for (let j = 0; j < tableHeaders.length; j++) {
//       //     res[tableHeaders[j]] = tablerows[i][j]
//       //   }

//       //   data.push(res)
//       // }
//       console.log(dataList.value)
//       // 获取数据
//       console.log("文件上传成功！")
//     }
//   })
//   ElMessage.success('上传文件成功！');
// }









</script>

<style>
.el-upload-list {
  margin: 0;
}
</style>
