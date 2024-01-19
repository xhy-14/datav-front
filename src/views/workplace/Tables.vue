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
        <el-button type="primary" size="large" @click="uploadDialogVisible = true">添加</el-button>
        <el-button type="primary" size="large">编辑</el-button>
        <el-button type="primary" size="large">查看</el-button>
        <el-button type="danger" size="large">删除</el-button>
      </div>
    </div>
    <div class="main">

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
          <el-select v-model="projectId" placeholder="请选择">
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
          <el-select v-model="selectedHeaders" multiple clearable collapse-tags placeholder="请选择对应列" 
          popper-class="custom-header" :max-collapse-tags="3" style="width: 240px" :disabled="useSelectHearders">
            <el-option v-for="(item, index) in tableData.headers" :key="index" :label="item" :value="index" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="resetUploadForm">取消</el-button>
          <el-button type="primary" @click="saveFileByData">
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
import { ElMessage } from 'element-plus'
import { uploadFile, saveFileByData } from '@/api/file/file.ts'

interface Project {
  id: string
  name: string
  depiction: string
  createTime: string
}

export default {
    setup() {
        let inputSearch = ref('');
        let uploadDialogVisible = ref(false);
        let updateDialogVisible = ref(false);
        let projectItems = reactive<Project[]>([]);
        let projectId = ref('');
        let useSelectHearders = ref(true);
        let selectedHeaders = ref([]);
        let fileList = ref([]);
        let uploadForm = ref({
            name: "",
            depiction: "",
            projectId: "",
            file: null
        });
        let tableData = ref({
          headers: [],
          rows: []
        });
        let selectedTableData = ref({
          headers: [],
          rows: []
        })
        onMounted(() => {
            listProject(null)
                .then(function (response) {
                if (response.code === "00000") {
                    projectItems.push(...response.data);
                }
                else
                    ElMessage.error("查询失败");
            });
        });
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
        function saveFileByData() {
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
          console.log(selectedTableData.value);
        };
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
        return {
            inputSearch,
            uploadDialogVisible,
            updateDialogVisible,
            projectId,
            uploadForm,
            fileList,
            projectItems,
            tableData,
            selectedTableData,
            useSelectHearders,
            selectedHeaders,
            fileListChange,
            saveFileByData,
            resetUploadForm
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
  height: 85%;
  width: 100%;
  background-color: antiquewhite;
}
</style>