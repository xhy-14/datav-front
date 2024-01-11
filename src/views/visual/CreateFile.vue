<template>
  <div>
    <div v-show="active == 0">
      <el-input v-model="input" placeholder="将复制的数据粘贴到此处" style="height: 300px" />
    </div>
    <div v-show="active == 1">
      <el-input v-model="input2" placeholder="https://" style="height: 300px" />
    </div>
  </div>
  <el-radio-group v-model="tabPosition" style="margin-top: 40px">
    <el-radio-button @Click="fun0" label="复制并粘贴">复制并粘贴</el-radio-button>
    <el-radio-button @Click="fun0" label="上传文件">
      <el-upload
      :action="uploadUrl"
      :headers ="headers"
        accept=".csv"
        :before-upload="beforeUpload"
        :on-error="handleError"
        :on-success="handleSuccess"
        :show-file-list="false"
        >
        上传文件
      </el-upload>
    </el-radio-button>
    <el-radio-button @click="fun1" label="链接外部数据表">链接外部数据表</el-radio-button>
  </el-radio-group>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessageBox,ElMessage } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { getDataAPI } from '@/api/uploadFile/upload'
import { useUserStore } from '@/store/user' 

const token = useUserStore().userInfo.token

const uploadUrl = "http://112.124.59.107:8080/renren-fast/common/file/upload?projectId=0&name=" 
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
const input = ref('')


let fileList = ref([]);

// 上传错误提示
const handleError = () => {
	ElMessage.error('导入数据失败，请您重新上传！');
}; 
//上传成功提示
const file_id = ref('')
const handleSuccess = (response, file) => {
  file_id.value = response.data.id
  console.log(file_id.value)
  getDataAPI(file_id.value).then(function (response) {
      if (response.code == "00000") {
        input.value = response.data
      }
  
    })
	ElMessage.success('上传文件成功！');
}
//上传前校验
const beforeUpload = (file:any) => {
  const isLt2M = file.size / 1024 / 1024 < 10
  if (!isLt2M) {
    ElMessage.error('上传图片大小不能超过 10MB！')
    return;
  }
  if (fileList.value.length > 1) {
    ElMessage.error('只支持上传一个文件')
    return;
  }
}


</script>

<style>
.el-upload-list {
  margin: 0;
}
</style>
