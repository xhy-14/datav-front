<template>
     <el-row>
        <el-col :span="24">
          <div class="grid-content ep-bg-purple-dark">
            <h5>编辑个人资料</h5>
            <div style="height: 20px;" />
            <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" style="max-width: 460px">
              <el-form-item label="昵称">
                <el-input aria-disabled="" v-model="formLabelAlign.name" />
                <el-button class="modify-botton" text @click="name_dialogFormVisible = true">
                  更改昵称
                </el-button>
                <el-dialog v-model="name_dialogFormVisible" title="更改昵称">
                  <el-form ref="ruleFormRef" :model="name_ruleForm" status-icon :rules="name_rules" label-width="120px"
                    class="demo-ruleForm">
                    <el-form-item label="新昵称" prop="name">
                      <el-input v-model="name_ruleForm.name" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary"
                        @click="name_dialogFormVisible = false, submitForm(ruleFormRef)">提交</el-button>
                      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                      <el-button @click="name_dialogFormVisible = false">取消</el-button>
                    </el-form-item>
                  </el-form>
                </el-dialog>
              </el-form-item>

              <el-form-item label="密码">
                <el-input type="password" v-model="formLabelAlign.region" />
                <el-button class="modify-botton" text @click="password_dialogFormVisible = true">
                  更改密码
                </el-button>
                <el-dialog v-model="password_dialogFormVisible" title="更改密码">
                  <el-form ref="ruleFormRef" :model="password_ruleForm" status-icon :rules="password_rules"
                    label-width="120px" class="demo-ruleForm">
                    <el-form-item label="Password" prop="pass">
                      <el-input v-model="password_ruleForm.pass" type="password" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="Confirm" prop="checkPass">
                      <el-input v-model="password_ruleForm.checkPass" type="password" autocomplete="off" />
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary"
                        @click="password_dialogFormVisible = false, submitForm(ruleFormRef)">提交</el-button>
                      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                      <el-button @click="password_dialogFormVisible = false">取消</el-button>
                    </el-form-item>
                  </el-form>

                </el-dialog>
              </el-form-item>
              <el-form-item label="电子邮箱">
                <el-input v-model="formLabelAlign.type" />
                <el-button class="modify-botton" text @click="email_dialogFormVisible = true">
                  更改邮箱
                </el-button>
                <el-dialog v-model="email_dialogFormVisible" title="更改邮箱">
                  <el-form ref="ruleFormRef" :model="email_ruleForm" status-icon :rules="email_rules" label-width="120px"
                    class="demo-ruleForm">
                    <el-form-item label="新邮箱" prop="email">
                      <el-input  v-model="email_ruleForm.email"  autocomplete="off" />
                    </el-form-item>
                    
                      <el-button type="primary"
                        @click="email_dialogFormVisible = false, submitForm(ruleFormRef)">提交</el-button>
                      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                      <el-button @click="email_dialogFormVisible = false">取消</el-button>
              
                  </el-form>
                </el-dialog>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormProps, FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const email_validate = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (email_ruleForm.email !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('email', () => null)
    }
    callback()
  }
}
const name_validate = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('昵称不能为空'))
  } else {
    if (name_ruleForm.name !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('name', () => null)
    }
    callback()
  }
}
const password_validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (password_ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const password_validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== password_ruleForm.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}
const email_ruleForm = reactive({
  email: '',
})
const name_ruleForm = reactive({
  name: '',
})
const password_ruleForm = reactive({
  pass: '',
  checkPass: '',
})
const email_rules = reactive<FormRules<typeof email_ruleForm>>({
  email: [{ validator: email_validate, type: 'email', trigger: 'blur' }],
})
const name_rules = reactive<FormRules<typeof name_ruleForm>>({
  name: [{ validator: name_validate, trigger: 'blur' }],
})
const password_rules = reactive<FormRules<typeof password_ruleForm>>({
  pass: [{ validator: password_validatePass, trigger: 'blur' }],
  checkPass: [{ validator: password_validatePass2, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      ElMessage({
        showClose: true,
        message: '提交成功',
        type: 'success',
      })
    } else {
      console.log('error submit!')
      ElMessage({
        message: '提交失败',
        type: 'warning',
      })
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const email_dialogFormVisible = ref(false)
const name_dialogFormVisible = ref(false)
const password_dialogFormVisible = ref(false)


const labelPosition = ref<FormProps['labelPosition']>('top')

const formLabelAlign = reactive({
  name: '',
  region: '',
  type: '',
})
</script>
  
<style>
.el-form-item {
  padding-bottom: 13px;
}

.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

.modify-botton {
  position: relative;

}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
  width: 200px;
  position: relative;
}


</style>