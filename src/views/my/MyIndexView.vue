<template>
    <el-container>

        <el-aside width="500px">

            <div style="margin: 50px 80px 0px 40px;">
                <el-menu :default-active="this.$route.path" class="el-menu-vertical-demo" @open="handleOpen"
                    @close="handleClose">
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon>
                                <location />
                            </el-icon>
                            <span>我的存档</span>
                        </template>
                        <RouterLink to="/my/recent"><el-menu-item index="1-1">最近编辑</el-menu-item></RouterLink>
                        <el-menu-item index="1-2">最近导出</el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="2">

                        <template #title>
                            <RouterLink to="/my/file">
                                <el-icon>
                                    <icon-menu />
                                </el-icon>
                                <span>
                                    我的文件夹
                                </span>
                            </RouterLink>
                        </template>

                        <el-menu-item index="2-1">文件1</el-menu-item>
                        <el-menu-item index="2-2">文件2</el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </div>
        </el-aside>
        <el-main>
            <RouterView />
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>

import { reactive, computed, ref, watch, onMounted } from 'vue'
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const fileList = getFileInformation()

// 搜索框数据
const searchData = reactive({
    searchText: '',
    items: fileList,
});
const filteredItems = computed(() => {
    return searchData.items.filter(item => item.name.toLowerCase().includes(searchData.searchText.toLocaleLowerCase()));
})
// **********

const breadList = ref()

watch(() => route.path, (newValue, oldValue) => { //监听路由路径是否发生变化，之后更改面包屑
    breadList.value = route.matched.filter(item => item.meta && item.meta.title);
})

let getMatched = () => {
    console.log(route.matched); //打印路径数组
    breadList.value = route.matched.filter(item => item.meta && item.meta.title);
}
onMounted(() => {
    getMatched();
})




function getRecent() {
    //return (后端查询接口)
    return [{ id: 1, name: 'Item A' },
    { id: 2, name: 'Item B' },
    { id: 3, name: 'Item C' }]
}


function getFileInformation() {
    // return "查询后端"
    return [{ id: 1, name: 'Item A' },
    { id: 2, name: 'Item B' },
    { id: 3, name: 'Item C' }]
}




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
        value: 'size',
        label: '按文件大小排序',
    },
    {
        value: 'time',
        label: '按修改时间排序',
    },
    {
        value: 'default',
        label: '默认排序',
    },
]

const sortBySize = () => {
    console.log("按文件大小排序")
}

const sortByTime = () => {
    console.log("按时间排序")
}

const sortByDefault = () => {
    console.log("默认排序")
}

const check = (rule: string) => {
    if (rule === "time") {
        sortByTime()
    } else if (rule === "default") {
        sortByDefault()
    } else if (rule === "size") {
        sortBySize()
    }
}

const toFileDetails = () => {
    router.push('')

}
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
  