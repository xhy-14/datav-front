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
              <el-input style="width: 80%;" v-model="ruleForm.mobile" placeholder="邮箱/手机" clearable />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input style="width: 80%;" v-model="ruleForm.password" type="password" placeholder="请输入密码"
                show-password />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm(ruleFormRef)">
                登录
              </el-button>
              <el-button @click="gotoRegister()" style="margin:0 auto;">没有账号？去注册</el-button>
              <RouterLink to="/forget" style="margin:0 auto;">忘记密码？</RouterLink>
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
import { debounce } from '@/utils/DebounceThrottle'
import { ElLoading } from "element-plus";
const router = useRouter()

interface RuleForm {
  username: string
  password: string
  mobile: string
  email: string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  username: '',
  password: '',
  mobile: '',
  email: ''
})

const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '请输入用户名称', trigger: 'blur' },
    { min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, max: 16, message: '密码必须为8 ~ 16位', trigger: 'blur' },
  ],
  mobile: [
    { required: true, message: '请输入电话号码', trigger: 'blur' },
    // {
    //   validator(rule, value, callback) {
    //     const reg = /^1[3456789]\d{9}$/;
    //     console.log(ruleForm.password)
    //     if (reg.test(value)) {
    //       callback()
    //     } else {
    //       return callback(new Error('请输入正确的手机号码'))
    //     }
    //   }
    // }
    {
      pattern: /^1[3456789]\d{9}$/,
      message: '请输入正确的手机号码',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    // {
    //     validator(rule, value, callback) {
    //         const reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    //         if (reg.test(value)) {
    //             callback()
    //         } else {
    //             return callback(new Error('邮箱格式不正确'))
    //         }
    //     }
    // }
    {
      pattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      message: '邮箱格式不正确',
      trigger: 'blur'
    }
  ]

})


const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const loadingInstance = ElLoading.service({
        fullscreen: true,
        text: "正在登录...",
        background: "rgba(0, 0, 0, 0.7)"
      });
      loginAPI(ruleForm).then(function (response) {
        if (response.code == "00000") {
          localStorage.setItem('token', response.data.token)
          useUserStore().setUserInfo(response.data.user.name, response.data.user.mobile, response.data.token)
          ElMessage({
            message: "登陆成功",
            type: "success"
          })
          router.replace("/")
        } else {
          ElMessage.error(response.msg)
        }
      }).catch(() => { ElMessage.error("发生异常请稍后重试") }).finally(() => { loadingInstance.close() })
    }
  })
}

const submitForm = debounce(login, 400)


const gotoRegister = () => {
  router.replace("/register");
}
</script>
  
<style scoped>
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