<template>
    <el-container style="height: 98vh;">
        <el-main style="display: flex; justify-content: center;align-items: center;">
            <div class="input">
                <div class="box">
                    <div>
                        <img src="@/assets/images/logo.jpg" />
                    </div>
                </div>
                <div class="box">
                    <div class="font">注册</div>
                    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="20%" class="demo-ruleForm"
                        :size="formSize" status-icon>
                        <el-form-item label="用户名" prop="username">
                            <el-input style="width: 80%;" v-model="ruleForm.username" placeholder="Please input"
                                clearable />
                        </el-form-item>
                        <el-form-item label="手机" prop="mobile">
                            <el-input style="width: 80%;" v-model="ruleForm.mobile" placeholder="Please input" clearable />
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input style="width: 80%;" v-model="ruleForm.password" type="password"
                                placeholder="Please input password" show-password />
                        </el-form-item>
                        <el-form-item label="确认密码" prop="confirm">
                            <el-input style="width: 80%;" v-model="ruleForm.confirm" type="confirm"
                                placeholder="Please input password" show-password />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm(ruleFormRef)">
                                注册
                            </el-button>
                            <el-button @click="gotoLogin()" style="margin-left: 30%;">已有账号？去登录</el-button>
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

import { useRouter } from 'vue-router'
import axios from 'axios'
import { registerAPI } from '@/api/login/index'
import { triggerEvent } from 'element-plus/es/utils/index.mjs'

const router = useRouter()

interface RuleForm {
    username: string
    password: string
    confirm: string
    mobile: string
    //    captcha: string
    type: string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    username: '',
    password: '',
    confirm: '',
    mobile: '',
    //    captcha: '',
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
    confirm: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        {
            validator(rule, value, callback) {
                console.log(ruleForm.password)
                if (ruleForm.password !== value) {
                    return callback(new Error('两次密码输入不一致'))
                } else {
                    callback()
                }

            }
        }
    ],
    // captcha: [
    //     { required: true, message: '请输入验证码', trigger: 'blur' }
    //     {
    //         validator(rule, value, callback) {
    //             //调用api发送请求获取验证码（待开发）
    //             //验证验证码
    //         }

    //     }
    // ],

})

const gotoLogin = () => {
    router.push('/login')
    router.forward

}

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return

    await formEl.validate((valid, fields) =>  {
        if (valid) {
            console.log('执行提交!')
            router.push('/')
            toRegister(ruleForm)
        } else {
            console.log('提交错误', fields)
        }
    })
}

const toRegister = (ruleForm) => {
    registerAPI(ruleForm).then(function (response) {
        console.log(response.data);
        if (response.data == 200) {
            sessionStorage.setItem("isAuthenticated", "true")
            router.push("/home")
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
    width: 45%;
    margin: 10px auto;
    /* border: 1px solid; */


}

.font {
    font-size: 55px;
    margin-bottom: 20px;
    margin-left: 20px;

}

body {
    background-image: url(@/assets/images/loginBg.png) !important;
    background-size: cover;
    width: 100vw;
    height: 100vh;
}
</style>