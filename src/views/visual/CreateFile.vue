<template>
  <div>
    <div v-show="active == 0">
      <el-input v-model="input" placeholder="将复制的数据粘贴到此处" style="height: 300px" />
    </div>
    <div v-show="active == 1">
      <el-input v-model="input" placeholder="https://" style="height: 300px" />
    </div>
  </div>
  <el-radio-group v-model="tabPosition" style="margin-top: 40px">
    <el-radio-button @Click="fun0" label="复制并粘贴">复制并粘贴</el-radio-button>
    <el-radio-button  @Click="fun0" label="上传文件"><el-upload>上传文件</el-upload></el-radio-button>

    <el-radio-button @click="fun1" label="链接外部数据表">链接外部数据表</el-radio-button>
    
  </el-radio-group>
 
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
const tabPosition = ref('复制并粘贴')
const active = ref(0)
const fun0 = () => {
  active.value = 0

}
const fun1 = () => {
  active.value = 1
}


const input = ref('')

</script>

<style>
.el-upload-list{
  margin: 0;
}
.text:focus {
  color: aqua;
}
</style>
