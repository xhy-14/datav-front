<template>
  <div class="con">
    <div class="header">
      <!--搜索框-->
      <div class="header-left">
        <el-input v-model="inputSearch" size="large" placeholder="请输入...">
          <template #append>
            <el-button type="primary" @click="submitSearchForm">搜索</el-button>
          </template>
        </el-input>
      </div>
      <div class="header-right">
        <el-button type="primary" size="large" @click="gotoWorkPlace()">添加</el-button>
        <!-- <el-button type="primary" size="large">编辑</el-button> -->
        <el-button type="primary" size="large" @click="dialogShow">查看</el-button>
        <el-button type="danger" size="large">删除</el-button>
      </div>
    </div>

    <div class="main">
      <div class="card-container">
        <div v-for="item in displayData" :key="item.id" :class="['card', { 'card-selected': item.selected }]" @click="handleCardClick(item)">
          <div class="card-image">这里到时候放一个image作为封面</div>
          <div class="card-title">
            <el-row class="w-150px">
              <el-text truncated size="large">{{ item.name }}</el-text>
            </el-row>
            <span class="card-tip" v-if="item.selected">
            √
            </span>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="pagination">
        <el-pagination layout="prev, pager, next" v-model:current-page="currentPage" :total=displayData.length :page-size="pageSize" />
      </div>
    </div>

    <el-dialog v-model="chartDialogVisible" align-center class="chart-dialog">
      <div id="chartcontainer" style="width: 500px;height: 500px;">

      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { getMyChartList } from '@/api/data/data.ts'
import { ElMessage } from 'element-plus'
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts';

interface ChartItem {
  id: number
  name: string
  selected: boolean
  option: any
}

export default {
  setup() {

    const router = useRouter()
    const pageSize = ref(10)
    const currentPage = ref(1)
    let inputSearch = ref('');
    let displayData = ref<ChartItem[]>([])
    let originData = reactive<ChartItem[]>([])
    let tableData = reactive<ChartItem[]>([])
    let multipleSelection = ref<ChartItem[]>([])
    let chartDialogVisible = ref(false)

    onMounted(() => {
      initData()
    }) 

    function initData() {
      getMyChartList(null)
      .then(response => {
        originData.push(...response.data)
        tableData.push(...response.data)
        
        displayData.value = getDisplayData()
      })
    }
    function gotoWorkPlace() {
      router.replace({ path: '/chart' })
    }
    function handleCardClick(item: ChartItem) {
      item.selected = !item.selected;
      if (item.selected) {
        multipleSelection.value.push(item)
      } else {
        const index = multipleSelection.value.findIndex((i) => i.id === item.id)
        if (index !== -1) {
          multipleSelection.value.splice(index, 1)
        }
      }
    };
    function dialogShow() {
      if(!multipleSelection.value || multipleSelection.value.length !== 1) {
        ElMessage.warning("请选择一条记录进行查看")
        return
      }
      chartDialogVisible.value = true

      setTimeout(() => {
        // 初始化echarts图表
        const chartContainer = document.getElementById('chartcontainer');
        const chart = echarts.init(chartContainer);

        // 获取选中的图表数据
        const selectedChart = multipleSelection.value[0];

        // 设置echarts的配置选项
        const chartOption = selectedChart.option;
        chart.setOption(chartOption);
      }, 100);
    }
    function submitUpdateForm() {
      // 处理更新逻辑
      alert('更新成功！')
    }
    function getDisplayData() {
      const start = (currentPage.value - 1) * pageSize.value
      const end = start + pageSize.value
      return tableData.slice(start, end)
    }
    function submitSearchForm() {
    if (inputSearch.value) {
      const keyword = inputSearch.value.trim()
      tableData = [...originData]
      const searchData = tableData.filter(item => {
        return item.name.toLowerCase().includes(keyword.toLowerCase())
      })
      tableData.splice(0, tableData.length, ...searchData)
      displayData.value = getDisplayData()
      if (searchData.length === 0) {
        ElMessage.warning('未找到匹配的项目')
      }
      } else {
        tableData = originData
        displayData.value = getDisplayData()
      }
    };
    return {
      gotoWorkPlace,
      pageSize,
      currentPage,
      inputSearch,
      displayData,
      chartDialogVisible,
      handleCardClick,
      dialogShow,
      submitSearchForm
    }
  }
}
</script>

<style>

.con {
  height: 100%;
  width: 100%;
}
.header {
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.header-left {
  height: 100%;
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header-right {
  height: 100%;
  width: 30%;
  display: flex;
  align-items: center;
}
.upload {
  width: 100%;
}
.main {
  margin-top: 20px;
  height: 75%;
  width: 100%;
  display: flex;
  justify-content: center;
}
.card-container {
  width: 90%;
  display: flex;
  flex-wrap: wrap;
}
.card {
  padding: 0px;
  width: 18%;
  height: 40%;
  position: relative;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease-in-out;
  margin: 10px;
  overflow: hidden;
}
.card-selected {
  background-color: #eaf6ff; /* 设置选中状态的背景色 */
  transform: translateY(-5px); /* 设置选中状态下的卡片偏移效果 */
}
.card:hover {
  transform: translateY(-5px);
}
.card-image {
  width: 100%;
  height: 70%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.card-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
.card-title {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
}
.card-tip {
  width: 25px;
  right: 10px;
  background-color: rgba(93, 217, 251, 0.8);
  color: #fff;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
}
.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.chart-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>