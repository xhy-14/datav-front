<template>
    <el-container class="back">
        <el-main style="display: flex; justify-content: center;align-items: center;">
            <div class="input">
                <div class="box">
                    <div>
                        <img src="@/assets/images/logo.jpg" />
                    </div>
                </div>
                <div class="box">
                    <div class="font">忘记密码</div>
                    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="20%" class="demo-ruleForm"
                        :size="formSize" status-icon>
                        <el-form-item label="邮箱" prop="email">
                            <el-input style="width: 80%;" v-model="ruleForm.email" placeholder="Please input" clearable />
                        </el-form-item>
                        <el-form-item label="新密码" prop="password">
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
                                确认
                            </el-button>
                            <el-button @click="gotoLogin()" style="margin: 0 auto;">返回登录</el-button>
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
import { ElMessage } from 'element-plus'
import { registerAPI, captchaAPI } from '@/api/login/index'
const router = useRouter()
interface RuleForm {
    username: string
    password: string
    confirm: string
    mobile: string
    email: string
    code: string
    type: string
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
    type: '',
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

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return

    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('执行提交!')
            toReset(ruleForm)
        } else {
            console.log('提交错误', fields)
        }
    })
}

const toReset = (ruleForm) => {
    registerAPI(ruleForm).then(function (response) {
        console.log(response.data);
        if (response.data == 200) { // 验证成功跳转登录
            alert("重置密码成功，请返回登录界面登录")
            router.push("/login")
        }

    })
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

.back {
    background-image: url(@/assets/images/loginBg.png) !important;
    background-size: cover;
    width: 100vw;
    height: 100vh;
}
</style>