<template>
  <div class="con">
    <div class="header">
      <!--搜索框-->
      <div class="header-left">
        <el-input v-model="inputSearch" size="large" placeholder="请输入...">
          <template #append>
            <el-button type="primary">搜索</el-button>
          </template>
        </el-input>
      </div>
      <div class="header-right">
        <el-button type="primary" size="large" @click="gotoWorkPlace()">添加</el-button>
        <el-button type="primary" size="large">编辑</el-button>
        <el-button type="primary" size="large">查看</el-button>
        <el-button type="danger" size="large">删除</el-button>
      </div>
    </div>

    <div class="main">
      <div class="card-container">
        <div v-for="item in displayData" :key="item.id" class="card" @click="handleCardClick(item)">
          <div class="card-image">这里到时候放一个image作为封面</div>
          <div class="card-title">
            <el-row class="w-150px">
              <el-text truncated size="large">{{ item.name }}</el-text>
            </el-row>
          </div>
          <span class="card-tip" v-if="item.selected">
            √
          </span>
        </div>
      </div>
    </div>

    <div>
      <div class="pagination">
        <el-pagination layout="prev, pager, next" v-model:current-page="currentPage" :total=displayData.length :page-size="pageSize" />
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { getMyChartList } from '@/api/data/data.ts'
import { ElMessage } from 'element-plus'
import { ref, onMounted, reactive } from 'vue'

interface ChartItem {
  id: number
  name: string
  selected: boolean
}

export default {
  setup() {

    const pageSize = ref(10)
    const currentPage = ref(1)
    let inputSearch = ref('');
    let displayData = ref<ChartItem[]>([])
    let originData = reactive<ChartItem[]>([])
    let tableData = reactive<ChartItem[]>([])
    let multipleSelection = ref<ChartItem[]>([])

    onMounted(() => {
      initData()
    }) 

    function initData() {
      getMyChartList(null)
      .then(response => {
        originData.push(...response.data)
        tableData.push(...response.data)
        displayData.value = response.data
        console.log(response)
      })
    }
    function gotoWorkPlace() {
      ElMessage.success('跳')
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
    return {
      gotoWorkPlace,
      pageSize,
      currentPage,
      inputSearch,
      displayData,
      handleCardClick
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
  width: 20%;
  height: 50%;
  padding-top: 0px;
  position: relative;
  cursor: pointer; /* 添加指针样式 */
}
.card.selected {
  background-color: lightblue;
  border: 2px solid darkblue;
}
.card-image {
  width: 100%;
  height: 70%;
  background-color: antiquewhite;
}
.card-title {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.card-tip {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(93, 217, 251, 0.8);
  color: #fff;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  margin-bottom: 30px;
}
.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>