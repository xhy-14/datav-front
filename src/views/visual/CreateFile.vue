<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
          @select="handleSelect">
          <el-menu-item index="0">
            <img style="width: 100px" src="/images/element-plus-logo.svg" alt="" />
          </el-menu-item>
          <div class="flex-grow" />
          <el-menu-item index="1" style="width: 100px">进入工作台</el-menu-item>
          <el-menu-item index="2" style="width: 100px">新建文件</el-menu-item>
          <el-menu-item index="3" style="width: 100px">我的目录</el-menu-item>
          <el-sub-menu index="4">
            <template #title>个人中心</template>
            <el-menu-item index="4-1">设置</el-menu-item>
            <el-menu-item index="4-2">退出</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-header>
      <el-main>
        <div class="common-layout">
          <el-container>
            <el-aside width="200px" style="text-align: center;">
              <div style="height: 600px">
                <el-steps direction="vertical" :active="1">
                  <el-step title="Step 1" />
                  <el-step title="Step 2" />
                  <el-step title="Step 3" />
                  <el-step title="Step 4" />
                </el-steps>
              </div>
            </el-aside>
            <el-main>
              <div><el-input v-model="input" placeholder="" style="height: 300px" />
              </div>
              <div style="margin-top: 50px; display:flex">
                <div style="margin-left: 60px"><el-button type="primary">复制并粘贴</el-button></div>
                <div style="margin-left: 160px; dispaly:flex">
                  <el-upload v-model:file-list="fileList" class="upload-demo"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple
                    :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="3"
                    :on-exceed="handleExceed">
                    <el-button type="primary">Click to upload</el-button>
                    <template #tip>
                      <div class="el-upload__tip">
                        jpg/png files with a size less than 500KB.
                      </div>
                    </template>
                  </el-upload>
                </div>
              </div>
              <div style="margin-left: 500px; margin-top: 120px;">
                <el-button type="success">继续</el-button>
              </div>
            </el-main>
          </el-container>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const input = ref('')
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
const fileList = ref<UploadUserFile[]>([
  {
    name: 'element-plus-logo.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
  {
    name: 'element-plus-logo2.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
])

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length
    } totally`
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}

</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
