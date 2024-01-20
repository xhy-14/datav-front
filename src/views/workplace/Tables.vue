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
        <el-button type="primary" size="large" @click="uploadDialogVisible = true">添加</el-button>
        <el-button type="primary" size="large" @click="dialogUpdateForm">编辑</el-button>
        <el-button type="primary" size="large">查看</el-button>
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

    <!-- uploadForm表单 -->
    <el-dialog v-model="uploadDialogVisible" title="添加" width="30%" align-center >
      <el-form :model="uploadForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="uploadForm.name" maxlength="10" show-word-limit required />
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="uploadForm.depiction" />
        </el-form-item>
        <el-form-item label="所属项目">
          <el-select v-model="uploadForm.projectId" placeholder="请选择">
            <el-option v-for="item in projectItems" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="选择文件">
          <el-upload v-model:file-list="fileList" ref="uploadRef" class="upload" :auto-upload="false" :limit=1 :on-change="fileListChange">
            <el-button type="primary">
              选择文件
            </el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="选择表头">
          <el-select v-model="selectedHeaders" multiple clearable collapse-tags placeholder="请选择对应列(优先选择item列)" 
          popper-class="custom-header" :max-collapse-tags="3" style="width: 240px" :disabled="useSelectHearders">
            <el-option v-for="(item, index) in tableData.headers" :key="index" :label="item" :value="index" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="resetUploadForm">取消</el-button>
          <el-button type="primary" @click="saveFileByDataForm">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!--updateForm表单-->
    <el-dialog v-model="updateDialogVisible" title="编辑" width="30%" align-center >
      <el-form :model="uploadForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="updateForm.name" maxlength="10" show-word-limit required />
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="updateForm.depiction" />
        </el-form-item>
        <el-form-item label="所属项目">
          <el-select v-model="updateForm.pid" placeholder="请选择">
            <el-option v-for="item in projectItems" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="resetUpdateForm">取消</el-button>
          <el-button type="primary" @click="submitUpdateForm">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script lang="ts">

import { ref, reactive, onMounted } from 'vue'
import { listProject } from '@/api/project/project.ts'
import { ElMessage, ElLoading } from 'element-plus'
import { uploadFile, saveFileByData } from '@/api/file/file.ts'
import { getMyMetadata } from '@/api/data/data.ts'
import func from 'vue-editor-bridge'

interface Project {
  id: string
  name: string
  depiction: string
  createTime: string
}

interface Matedata {
  id: string,
  name: string,
  selected?: boolean
}

export default {
    setup() {
        const pageSize = ref(10)
        const currentPage = ref(1)
        let inputSearch = ref('');
        let uploadDialogVisible = ref(false);
        let updateDialogVisible = ref(false);
        let projectItems = reactive<Project[]>([]);
        let useSelectHearders = ref(true);
        let selectedHeaders = ref([]);
        let fileList = ref([]);
        let multipleSelection = ref([]);
        let originData = reactive<any[]>([])
        let myMetadata = reactive<any[]>([])
        let displayData = ref<Matedata[]>([])
        let uploadForm = ref({
            name: "",
            depiction: "",
            projectId: "",
            file: null
        });
        let updateForm = ref({
            id: "",
            name: "",
            depiction: "",
            pid: ""
        });
        let tableData = ref({
          headers: [],
          rows: []
        });
        let selectedTableData = ref({
          headers: [],
          rows: []
        })
        let saveDataForm = ref({
          data: {},
          name: "",
          depiction: "",
          pid:""
        })
        onMounted(() => {
            initData()
        });
        function initData() {
          listProject(null)
            .then(function (response) {
            if (response.code === "00000") {
                projectItems.push(...response.data);
              }
            else
                ElMessage.error("查询失败");
            });
          getMyMetadata(null)
            .then(function (response) {
              if(response.code === "00000") {
                myMetadata = []
                originData = []
                myMetadata.push(...response.data);
                originData.push(...response.data);
                displayData.value = getDisplayData();
              } else {
                ElMessage.error("查询失败")
              }
            }) 
        }
        function getDisplayData() {
          const start = (currentPage.value - 1) * pageSize.value
          const end = start + pageSize.value
          return myMetadata.slice(start, end)
        }
        function submitSearchForm() {
          if (inputSearch.value) {
            const keyword = inputSearch.value.trim()
            myMetadata = [...originData]
            const searchData = originData.filter(item => {
              return item.name.toLowerCase().includes(keyword.toLowerCase())
            })
            myMetadata.splice(0, myMetadata.length, ...searchData)
            displayData.value = getDisplayData()
            if (searchData.length === 0) {
              ElMessage.warning('未找到匹配的项目')
            }
          } else {
            myMetadata = originData
            displayData.value = getDisplayData()
          }      
        };
        function handleCardClick(item: Matedata) {
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
        function fileListChange(fileList: any) {
          const formDate = new FormData();
          formDate.append('file', fileList.raw);
          uploadForm.value.file = fileList.raw;
          uploadFile(formDate)
          .then(response => {
            if( response.code === '00000' ) {
              tableData.value.headers = response.data.headers;
              tableData.value.rows = response.data.rows;
              useSelectHearders.value = false;
              ElMessage.success("文件解析成功");
            } 
            else {
              ElMessage.error("解析出错，请检查文件格式和数据内容")
            }
          })
        };
        function saveFileByDataForm() {
          // 显示加载提示
          const loadingInstance = ElLoading.service({
            fullscreen: true,
            text: '正在保存文件...',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          // 根据选择的表头生成新的selectedTableData
          selectedTableData.value.headers = selectedHeaders.value.map(index => tableData.value.headers[index]);
          // 处理rows数据
          selectedTableData.value.rows = tableData.value.rows.map(row => {
            const newRow = {};
            selectedHeaders.value.forEach(index => {
              const header = tableData.value.headers[index];
              newRow[header] = row[header];
            });
            return newRow;
          });
          saveDataForm.value.name = uploadForm.value.name;
          saveDataForm.value.depiction = uploadForm.value.depiction;
          saveDataForm.value.data = selectedTableData.value;
          saveDataForm.value.pid = uploadForm.value.projectId;
          saveFileByData(saveDataForm.value)
          .then(response => {
            if(response.code === "00000") {
              ElMessage.success("文件保存成功");
            } else {
              ElMessage.error(response.msg);
            }
          }).finally(() => {
            loadingInstance.close();
            resetUploadForm()
            initData()
          })
        };
        function dialogUpdateForm() {
          if(!multipleSelection.value || multipleSelection.value.length !== 1) {
            ElMessage.warning("请选择一条记录进行更新")
            return
          }

          updateForm.value.id = multipleSelection.value[0].id
          updateForm.value.name = multipleSelection.value[0].name
          updateForm.value.depiction = multipleSelection.value[0].depiction
          updateForm.value.pid = multipleSelection.value[0].pid
          
          updateDialogVisible.value = true
        }
        function submitUpdateForm() {
            // 处理更新逻辑
            console.log(updateForm.value);
            
            ElMessage.success("更新成功");
        }
        function resetUploadForm() {
          //重置表单
          uploadForm.value.name = '',
          uploadForm.value.depiction = '',
          uploadForm.value.file = null;
          fileList.value = [];
          selectedHeaders.value = [];
          selectedTableData.value = {
            headers: [],
            rows: []
          };
          uploadDialogVisible.value = false;
        };
        function resetUpdateForm() {
          //重置表单
          updateForm.value.name = '',
          updateForm.value.depiction = '',
          updateForm.value.file = null;
          updateDialogVisible.value = false;
        };
        return {
            inputSearch,
            uploadDialogVisible,
            updateDialogVisible,
            uploadForm,
            updateForm,
            fileList,
            projectItems,
            tableData,
            selectedTableData,
            useSelectHearders,
            selectedHeaders,
            saveDataForm,
            myMetadata,
            pageSize,
            currentPage,
            originData,
            displayData,
            handleCardClick,
            getDisplayData,
            fileListChange,
            saveFileByDataForm,
            resetUploadForm,
            dialogUpdateForm,
            resetUpdateForm,
            submitUpdateForm,
            submitSearchForm
        };
    },
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

.card-selected {
  background-color: #eaf6ff; /* 设置选中状态的背景色 */
  transform: translateY(-5px); /* 设置选中状态下的卡片偏移效果 */
}

.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>