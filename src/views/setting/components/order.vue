<template>
    <div>
        <el-table :data="orders" style="width: 850px;height: 500px" >
            <el-table-column prop="name" label="套餐" width="300" />
            <el-table-column prop="price" label="支付金额" width="250" />
            <el-table-column prop="createTime" label="购买时间" width="300" />
        </el-table>
    </div>
</template>

<script lang="ts" setup>

import { onMounted, reactive } from "vue"
import { orderList } from "@/api/member/order"

interface order {
    id: string,
    comboId: string,
    name: string,
    price: number,
    discount: number,
    createTime: Date
}

let orders = reactive<order[]>([])

onMounted( ()=> {
    orderList(null)
    .then(function (response) {
        orders.push(...response.data)
    })
} ) 

</script>

<style>

</style>