<template>
    <el-container>
        <el-header style="height: 160px; padding: 0%;">
            <el-menu style="height: 160px;" :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                :ellipsis="false" @select="handleSelect">
                <RouterLink to="/" style="height: 100%; position: relative; left: 138px;">
                    <el-menu-item index="0" style="top: 55px; padding: 0%;">
                        <img style="width: 182px;height: 59px;position: relative;" src="@\assets\images\logo.jpg"
                            alt="logo" />
                    </el-menu-item>
                </RouterLink>
                <div class="flex-grow" />
                <RouterLink to="/login" class="text">登录</RouterLink>
                <RouterLink to="/" class="text">Dashboard</RouterLink>
            </el-menu>
        </el-header>
        <el-container>
            <el-main>
                <div style="margin-left: 50px;">最近编辑</div>
                <div class="file-container">
                    <div v-for="item in getRecent()" class="file-box">
                        <el-card :body-style="{ padding: '0px', height: 'auto' }">
                            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                                class="image" />
                            <div style="padding: 14px">
                                <span>RecentFile</span>
                                <div class="bottom">
                                    <el-button text class="button">Operating</el-button>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>
            </el-main>
            <el-aside width="500px">
                <div>
                    <div class="aside-container">
                        最近30天编辑文件数
                    </div>
                    <div class="aside-container">
                        杂项
                    </div>
                </div>
            </el-aside>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Layout from '@/views/Layout/components/LayoutHeader.vue'

const getRecent = () => {

    //return (后端查询接口)
    return [{ data: '1', name: 'b' }, { data: '1', name: 'b' }, { data: '1', name: 'b' }, { data: '1', name: 'b' },]
}

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>

<style>
.file-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* width: 60vw; */
}

.file-box {
    background-color: beige;
    /* height: 150px;
    width: 150px; */
    margin: 50px;
}

.aside-container {
    height: 300px;
    width: auto;
    background-color: snow;
    /* margin-left: 50px; */
    margin: 50px 100px 50px 50px;
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
  