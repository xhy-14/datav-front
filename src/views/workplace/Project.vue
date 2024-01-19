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
        <el-button type="primary" size="large" @click="saveDialogVisible = true">添加</el-button>
        <el-button type="primary" size="large" @click="dialogUpdateForm">编辑</el-button>
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
        <el-pagination @current-change="currentPageChange" layout="prev, pager, next" v-model:current-page="currentPage" :total=tableData.length :page-size="pageSize" />
      </div>
    </div>

    <!-- saveForm表单 -->
    <el-dialog v-model="saveDialogVisible" title="添加" width="30%" align-center >
      <el-form :model="saveForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="saveForm.name"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="depiction">
          <el-input v-model="saveForm.depiction"  type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="saveDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitSaveForm()">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- updateForm表单 -->
    <el-dialog v-model="updateDialogVisible" title="编辑" width="30%" align-center >
      <el-form :model="updateForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="updateForm.name"></el-input>
        </el-form-item>
        <el-form-item label="  简介" prop="depiction">
          <el-input v-model="updateForm.depiction"  type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="updateDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitUpdateForm">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { ElMessage, ElTable } from 'element-plus'
import { saveProject, listProject } from '@/api/project/project.ts'

interface Project {
  id: string
  name: string
  depiction: string
  createTime: string
  selected?: boolean
}

export default {
  name: 'YourComponent',
  components: {
    ElTable,
  },
  setup() {
    const inputSearch = ref()
    const pageSize = ref(10)
    const currentPage = ref(1)
    let saveDialogVisible = ref(false)
    let updateDialogVisible = ref(false)
    const saveForm = ref({
      name: '',
      depiction: ''
    })
    const updateForm = ref({
      id: '',
      name: '',
      depiction: ''
    })


    let multipleSelection = ref<Project[]>([])

    let originData = reactive<Project[]>([])
    let tableData = reactive<Project[]>([])

    let displayData = ref<Project[]>([])

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
    function submitSaveForm() {
      // 处理保存逻辑
      saveProject({
        name: saveForm.value.name,
        depicition: saveForm.value.depiction,
      })
      .then( function(response) {
        if(response.code === "00000"){
          ElMessage.success("保存成功")
          listProject(null)
          .then(function (response) {
            if(response.code === "00000") {
              originData = []
              originData.push(...response.data)
              tableData = originData
              saveDialogVisible.value = false
            }
            else 
              ElMessage.success("查询失败")
          })
        }
        else
          console.log(response)
      } )
    }

    function dialogUpdateForm() {
      if(!multipleSelection.value || multipleSelection.value.length !== 1) {
        ElMessage.warning("请选择一条记录进行更新")
        return
      }
      // 处理更新逻辑
      updateForm.value.id = multipleSelection.value[0].id
      updateForm.value.name = multipleSelection.value[0].name
      updateForm.value.depiction = multipleSelection.value[0].depiction
      updateDialogVisible.value = true
    }
    function submitUpdateForm() {
      // 处理更新逻辑
      alert('更新成功！')
    }

    function handleCardClick(item: Project) {
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
    function currentPageChange() {
      displayData.value = getDisplayData()
      if (multipleSelection.value.length > 0) {
        // 清空选择
        multipleSelection.value = []
        // 清除所有项目的选中状态
        tableData.forEach(item => {
          item.selected = false
        })
      }
    };

    onMounted(() => {
      listProject(null)
      .then(function (response) {
        if(response.code === "00000") {
          originData.push(...response.data)
          tableData.push(...response.data) 
          const start = (currentPage.value - 1) * pageSize.value
          const end = start + pageSize.value
          displayData.value = tableData.slice(start, end)
        }
        else 
          ElMessage.error("查询失败")
      })
    })

    return {
      inputSearch,
      submitSearchForm,
      pageSize,
      currentPage,
      saveDialogVisible,
      updateDialogVisible,
      multipleSelection,
      handleCardClick,
      tableData,
      displayData,
      saveForm,
      updateForm,
      submitSaveForm,
      dialogUpdateForm,
      submitUpdateForm,
      currentPageChange
    }
  }
}
</script>

<style scoped>
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
