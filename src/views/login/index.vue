<template>
  <el-container class="login-body">
    <el-main style="display: flex; justify-content: center;align-items: center;">
      <div class="input">
        <div class="box">
          <div>
            <img src="@/assets/images/logo.jpg" />
          </div>
        </div>
        <div class="box">
          <div class="font">登录</div>
          <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="20%" class="demo-ruleForm"
            :size="formSize" status-icon>
            <el-form-item label="帐号" prop="mobile">
              <el-input style="width: 80%;" v-model="ruleForm.mobile" placeholder="Please input" clearable />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input style="width: 80%;" v-model="ruleForm.password" type="password"
                placeholder="Please input password" show-password />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm(ruleFormRef)">
                登录
              </el-button>
              <el-button @click="gotoRegister()" style="margin:0 auto;">没有账号？去注册</el-button>
              <a href="/forget" style="margin:0 auto;">忘记密码？</a>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
    
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'
import { loginAPI } from '@/api/login/index'
import { ElMessage } from 'element-plus'
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
  mobile: [
    { required: true, message: '请输入电话号码', trigger: 'blur' },
    {
      validator(rule, value, callback) {
        const reg = /^1[3456789]\d{9}$/;
        console.log(ruleForm.password)
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号码'))
        }

      }
    }
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


const gotoRegister = () => {
  router.replace("/register");
}

const toLogin = (ruleForm) => {
  loginAPI(ruleForm).then(async function (response) {
    console.log(response.data);
    if (response.code == "00000") {
      localStorage.setItem('token', response.data.token)
      useUserStore().setUserInfo(response.data.user.name, response.data.user.mobile, response.data.token)
      ElMessage({
        message: "登陆成功",
        type: "success"
      })
      await new Promise(resolve => setTimeout(resolve, 2000));
      router.replace("/")
    } else {
      ElMessage.error("发生错误请重试")
    }

  })


}
</script>
  
<style>
.input {

  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 66%;
  height: 50vh;
  align-items: center;
  background-color: rgb(253, 253, 253);
}

.box {
  width: 40%;
  margin: 10px auto;
  /* border: 1px solid; */


}

.font {
  font-size: 55px;
  margin-bottom: 30px;
  margin-left: 50px;

}

.login-body {
  background-image: url(@/assets/images/loginBg.png) !important;
  background-size: cover;
  width: 100vw;
  height: 100vh;
}
</style>