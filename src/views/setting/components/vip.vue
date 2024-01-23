<template>
  <div>
    <h5>会员套餐</h5>
    <p style="font-size: 14px;padding-top: 10px;padding-bottom: 10px;">您当前正在使用免费套餐。您可以在下方找到所有可用的Dataswap套餐的概述。如有任何疑问，请随时与我们的支持团队联系。</p>
  </div>
  <el-table :data="combos" style="width: 900px;height: 500px;margin-top: 20px;" >
    <el-table-column prop="name" label="套餐" width="250" />
    <el-table-column prop="price" label="支付金额" width="250" />
    <el-table-column prop="term" label="有效期" width="250" />
    <el-table-column width="150">
      <template #default="scope">
        <el-button @click="buy(scope.row.id)">购买</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
  
<script lang="ts" setup>
  import { onMounted, reactive } from 'vue';
  import { comboList } from "@/api/member/combo"
  import { ElMessage } from 'element-plus'


  interface combo {
    id: string,
    name: string,
    price: number,
    discount: number,
    term: number
  }

  let combos = reactive<combo[]>([])

  onMounted(() => {
    comboList(null)
    .then(function (response) {
      combos.push(...response.data.data)
    })
  })

  function buy(id: string){
    ElMessage.success('套餐' + id + '购买成功')
  }
</script>
  
<style>

</style>
    