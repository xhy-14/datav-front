<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="20%" class="demo-ruleForm" :size="formSize"
    status-icon>
    <el-form-item label="帐号" prop="username">
      <el-input style="width: 80%;" v-model="ruleForm.username" placeholder="Please input" clearable />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input style="width: 80%;" v-model="ruleForm.password" type="password" placeholder="Please input password"
        show-password />
    </el-form-item>
    <!-- <el-form-item label="">
      <el-checkbox label="记住密码" name="remember" v-model="ruleForm.remember" />
    </el-form-item> -->
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        登录
      </el-button>
      <el-button @click="resetForm()" style="margin-left: 30%;">没有账号？去注册</el-button>
    </el-form-item>
  </el-form>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

import { useRouter } from 'vue-router'
import axios from 'axios'
import { login } from '@/api/example/index'

const router = useRouter()

interface RuleForm {
  username: string
  password: string
  mobile: string
  captcha: string
  type: string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  username: '',
  password: '',
  mobile: '',
  captcha: '',
  type: '',
})

const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '请输入用户名称', trigger: 'blur' },
    { min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '密码必须为6 ~ 18位字符', trigger: 'blur' },
  ],

})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('执行提交!')
      toLogin(ruleForm)
    } else {
      console.log('提交错误', fields)
    }
  })
}


const resetForm = () => {
  router.push("/register");
}

const toLogin = (ruleForm) => {
  login(ruleForm).then(function (response) {
    console.log(response.data);
    if (response.data == 200) {
      sessionStorage.setItem("isAuthenticated", "true")
      router.push("/home")
    }

  })


}
</script>
