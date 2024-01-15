<template>
    <div style="display: flex;">
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="标题">
        <el-input placeholder="主题是什么？" v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="署名行">
        <el-input placeholder="谁创建了图表？" v-model="formLabelAlign.region" />
      </el-form-item>
    </el-form>
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 700px; margin-left: 20px;"
    >
    <el-form-item label="说明">
        <el-input
    v-model="textarea1"
    autosize
    type="textarea"
    placeholder="Please input"
    style="width: 700px; "
  />
      </el-form-item>
    </el-form>
</div>
    
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import type { FormProps } from 'element-plus'
  const textarea1 = ref('')
  const labelPosition = ref<FormProps['labelPosition']>('top')
  
  const formLabelAlign = reactive({
    name: '',
    region: '',
    type: '',
  })
  </script>
  
  <style>
 .el-form-item__label {
    margin-bottom: 4px !important;
}
.el-form-item{
    margin-bottom: 4px;
}

</style>