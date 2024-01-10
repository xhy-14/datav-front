<template>
    <el-container>

        <el-aside width="500px">

            <div style="margin: 50px 80px 0px 40px;">
                <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon>
                                <location />
                            </el-icon>
                            <span>Navigator One</span>
                        </template>
                        <el-menu-item-group title="Group One">
                            <el-menu-item index="1-1">item one</el-menu-item>
                            <el-menu-item index="1-2">item two</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="Group Two">
                            <el-menu-item index="1-3">item three</el-menu-item>
                        </el-menu-item-group>
                        <el-sub-menu index="1-4">
                            <template #title>item four</template>
                            <el-menu-item index="1-4-1">item one</el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>
                    <el-menu-item index="2">
                        <el-icon><icon-menu /></el-icon>
                        <span>Navigator Two</span>
                    </el-menu-item>
                    <el-menu-item index="3" disabled>
                        <el-icon>
                            <document />
                        </el-icon>
                        <span>Navigator Three</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <el-icon>
                            <setting />
                        </el-icon>
                        <span>Navigator Four</span>
                    </el-menu-item>
                </el-menu>
            </div>
        </el-aside>
        <el-main>
            <div style="margin-left: 50px;  margin-top: 50px; display: flex;
    flex-direction: row;">
                <el-breadcrumb :separator-icon="ArrowRight" style="margin:auto 100px auto 0px">
                    <el-breadcrumb-item :to="{ path: '/' }">一级菜单</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/' }">二级菜单</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/' }">三级菜单</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/' }">四级菜单</el-breadcrumb-item>
                </el-breadcrumb>
                <!-- 排序选择 -->
                <el-select style="width: 16vw; margin-right: 88px;" v-model="value" filterable placeholder="Select">
                    <el-option v-for="item in sort" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <!-- 搜索框 -->
                <el-input style="width: 16vw; margin-right: 88px;" v-model="data.searchText" class="w-50 m-2" size="large"
                    placeholder="Please Input" :prefix-icon="Search" />

            </div>
            <!-- 搜索功能 （待实现） -->
            <!-- <div>
                    <el-input style="width: 20vw; margin-top: 80px;" v-model="inputSearch" class="w-50 m-2" size="large"
                        placeholder="Please Input" :prefix-icon="Search" />
                </div> -->
            <!--  -->

            <div class="file-container">
                <!-- v-for循环生成卡片 -->
                <div v-for="item in filteredItems" class="file-box">
                    <el-card :body-style="{ padding: '0px', height: 'auto' }">
                        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                            class="image" />
                        <div style="padding: 14px">
                            <span>{{ item.name }}</span>
                            <div class="bottom">
                                <el-button text class="button">Operating</el-button>
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>
        </el-main>

    </el-container>
</template>

<script lang="ts" setup>

import { reactive, computed, ref } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { Search } from '@element-plus/icons-vue'
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
import { setup } from 'mockjs'


const getRecent = () => {

    //return (后端查询接口)
    return [{ id: 1, name: 'Item A' },
    { id: 2, name: 'Item B' },
    { id: 3, name: 'Item C' }]
}

// 搜索框数据
const data = reactive({
    searchText: '',
    items: getRecent(),
});
const filteredItems = computed(() => {
    return data.items.filter(item => item.name.toLowerCase().includes(data.searchText.toLocaleLowerCase()));
})
// **********

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}



const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}


const value = ref('')
const sort = [
    {
        value: '按文件大小排序',
        label: '按文件大小排序',
    },
    {
        value: '按修改时间排序',
        label: '按修改时间排序',
    },
    {
        value: '默认排序',
        label: '默认排序',
    },
]

</script>

<style>
.file-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-right: 20px;
    /* width: 60vw; */
}

.file-box {
    background-color: beige;
    /* height: 150px;
    width: 150px; */
    margin: 35px 5px 5px 20px;
}

.aside-container {
    height: 300px;
    width: auto;
    background-color: snow;
    /* margin-left: 50px; */
    margin: 30px 50px 30px 50px;
}

.flex-grow {
    flex-grow: 1;
}

.text {
    display: flex;
    position: relative;
    flex-wrap: wrap;
    align-content: center;
    padding: 20px;
    left: -103px;
    color: #54BCBD;
}
</style>
  