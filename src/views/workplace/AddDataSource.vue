<template>
  <el-cotainer style="height: 98vh; display: flex; justify-content: center;align-items: center;">
    <el-form ref="formRef" :model="form" label-width="120px" style="margin-right: 10%; margin-left:10%; width: 50%; ">
      <el-form-item prop="name" label="名称" :rules="[
        {
          required: true,
          message: '请输入名称',
          trigger: 'blur',
        },
      ]">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item prop="ip" label="数据库ip" :rules="{ required: true, message: '请输入数据库ip', trigger: 'blur' }">
        <el-input v-model="form.ip" placeholder="请输入数据库ip" />
      </el-form-item>
      <el-form-item prop="port" label="数据库端口" :rules="{ required: true, message: '请输入数据库端口', trigger: 'blur' }">
        <el-input v-model="form.port" placeholder="请输入数据库端口" />
      </el-form-item>
      <el-form-item prop="databaseName" label="数据库名称" :rules="{ required: true, message: '请输入数据库名称', trigger: 'blur' }">
        <el-input v-model="form.databaseName" placeholder="请输入数据库名称" />
      </el-form-item>
      <el-form-item prop="username" label="用户名">
        <el-input v-model="form.userName" />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="form.passWord" type="password" placeholder="Please input password" show-password />
      </el-form-item>
      <el-form-item prop="attribute" label="连接属性">

        <template #default>
          <el-table :data="form.tableData" style="width: 100%" max-height="250" @row-click="editCell">
            <el-table-column prop="key" label="属性名" width="auto">
              <template #default="scope">
                <el-input ref="inputRef" class="w-50 m-2" size="small" @blur="toEdit(scope.row, scope.$index)" v-if="state.tableColumnEditIndex == scope.column.id && state.tableRowEditIndex === scope.$index
                  " placeholder="请输入" v-model="scope.row.key" />
              </template>
            </el-table-column>

            <el-table-column prop="value" label="值" width="auto">
              <template #default="scope">
                <el-input ref="inputRef" class="w-50 m-2" size="small" @blur="toEdit(scope.row, scope.$index)" v-if="state.tableColumnEditIndex == scope.column.id && state.tableRowEditIndex === scope.$index
                  " placeholder="请输入" v-model="scope.row.value" />
              </template>
            </el-table-column>

            <el-table-column fixed="right" v-if="form.tableData.length != 0" label="操作" width="120" @click.stop="">
              <template #default="scope">
                <el-button style="width: 100%; height: 100%; background-color: aliceblue;" link type="primary"
                  size="small" @click.native.stop="deleteRow(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-button class="mt-4" style="width: 100% ;text-align: center ; margin: 0 auto;"
            @click="addRow()">添加</el-button>
        </template>

      </el-form-item>
      <el-form-item>
        <div style="text-align: center ; margin: 0 auto;">
          <el-button @click="testConnect()">测试链接</el-button>
          <el-button type="primary" @click="submitForm(formRef)">添加数据源</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-cotainer>
</template>

<script lang="ts" setup>
import { reactive, ref, nextTick } from 'vue'
import { testDatabaseConnectionApi } from '@/api/sql/index'
import { ElMessage } from 'element-plus'


const inputRef = ref<any>([])
interface Row {
  index: number
  key: string,
  value: string
}


const state = reactive({
  tableRowEditIndex: -1,
  tableColumnEditIndex: undefined,
})

function editCell(row, column) {
  state.tableRowEditIndex = row.index
  state.tableColumnEditIndex = column.id
  // 响应式数据发生变化 获取更新后dom(组件实例)
  form.tableData[row.index] = row;
  nextTick(() => {
    inputRef.value.focus();
  });
}



function addRow() {

  const row = <Row>{
    index: form.tableData.length,
    key: '',
    value: ''
  };
  form.tableData.push(row)
}


// 属性值input元素失去焦点事件回调
const toEdit = (row: any, $index: number) => {

  state.tableRowEditIndex = -1
  state.tableColumnEditIndex = undefined

  form.tableData[$index] = row;
};



const toEditDiv = (row: any, column: any, $index: number) => {
  state.tableRowEditIndex = $index
  state.tableColumnEditIndex = column.id
  // 响应式数据发生变化 获取更新后dom(组件实例)
  form.tableData[$index] = row;
  nextTick(() => {
    inputRef.value.focus();
  });
};


const deleteRow = (index: number) => {
  form.tableData.splice(index, 1)
}

interface Form {
  name: string
  ip: string
  port: string
  databaseName: string
  tableData: [],
  userName: string
  passWord: string
}

const form = reactive<Form>({
  name: '',
  ip: '',
  port: '',
  databaseName: '',
  tableData: <any>[],
  userName: '',
  passWord: '',
})

import type { FormInstance } from 'element-plus'
const formRef = ref<FormInstance>()
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      alert("success")
      console.log('submit!')
    } else {
      console.log('error submit!')
      alert("error")
      return false
    }
  })
}

function testConnect() {
  var json = {
    "database": form.databaseName,
    "ip": form.ip,
    "mysql8": true,
    "name": form.name,
    "password": form.passWord,
    "port": form.port,
    "username": form.databaseName
  }
  testDatabaseConnectionApi(json).then(function (response) {
    if (response.code == "FFFFF") {
      ElMessage.error("连接失败")
    } else {
      ElMessage({
        message: "连接成功",
        type: "success"
      })
    }

  })

}


</script>

