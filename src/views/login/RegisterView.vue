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
                    <div class="font">注册</div>
                    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="20%" class="demo-ruleForm"
                        :size="formSize" status-icon>
                        <!-- <el-form-item label="用户名" prop="username">
                            <el-input style="width: 80%;" v-model="ruleForm.username" placeholder="Please input"
                                clearable />
                        </el-form-item> -->
                        <el-form-item label="邮箱" prop="email">
                            <el-input style="width: 80%;" v-model="ruleForm.email" placeholder="Please input" clearable />
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
                        <el-form-item label="验证码" prop="code">
                            <el-input style="width: 40%;" v-model="ruleForm.code" placeholder="Please input" clearable />
                            <el-button @click="getCaptcha()" style="margin: 0 auto;">获取验证码</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm(ruleFormRef)">
                                注册
                            </el-button>
                            <el-button @click="gotoLogin()" style="margin:0 auto;">已有账号？去登录</el-button>
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
import { registerAPI, captchaAPI } from '@/api/login/index'
import { ElMessage } from 'element-plus'
import { debounce } from '@/utils/DebounceThrottle'
import { ElLoading } from 'element-plus'

const router = useRouter()

interface RuleForm {
    username: string
    password: string
    confirm: string
    mobile: string
    email: string
    code: string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    username: '',
    password: '',
    confirm: '',
    mobile: '',
    email: '',
    code: '',
})

const rules = reactive<FormRules<RuleForm>>({
    username: [
        { required: true, message: '请输入用户名称', trigger: 'blur' },
        { min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 18, message: '密码必须为8 ~ 16位字符', trigger: 'blur' },
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
    code: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
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

const gotoLogin = () => {
    router.push('/login')
    router.forward

}

const getCaptcha = () => {
    //获取验证码
    if (ruleForm.email == null || ruleForm.email == undefined || ruleForm.email == '') { ElMessage.error("请输入邮箱！") }
    else {
        captchaAPI(ruleForm.email).then((response) => {
            if (response.code == "00000") {
                ElMessage({
                    message: "验证码发送成功！",
                    type: "success"
                })
            } else {
                ElMessage.error(response.msg)
            }
        }).catch(() => { ElMessage.error("发生异常请稍后重试") })
    }

}


const toRegister = async (formEl: FormInstance | undefined) => {
    if (!formEl) return

    await formEl.validate((valid, fields) => {
        if (valid) {
            const loadingInstance = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            registerAPI(ruleForm).then((response) => {
                console.log(response.data);
                if (response.code == "00000") {
                    ElMessage({
                        message: "注册成功，请登录",
                        type: "success"
                    })
                    router.replace("/login")
                } else {
                    ElMessage.error(response.msg)
                }
            }).catch(() => { ElMessage.error("发生异常请稍后重试") }).finally(() => { loadingInstance.close() })
        }
    })
}

const submitForm = debounce(toRegister, 400)

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