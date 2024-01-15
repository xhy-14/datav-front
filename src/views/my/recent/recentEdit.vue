<template>
    <el-main>
        <div style="margin:0 auto; display: flex;
    flex-direction: row;">
            <!-- 面包屑 -->
            <el-breadcrumb style="margin:auto 0" separator="/">
                <el-breadcrumb-item v-for="(item, index) in breadList" :key="index" :to="item.path">
                    {{ item.meta.title }}</el-breadcrumb-item>
            </el-breadcrumb>
            <!-- 排序选择 -->
            <el-select style="width: 188px; margin-left: auto;" v-model="value" filterable placeholder="默认排序">
                <el-option v-for="(item, index) in sort" :key="index" :label="item.label" :value="item.label"
                    @click="check(item.value)" />
            </el-select>
            <!-- 搜索框 -->
            <el-input style="width: 220px; margin-left: 88px;margin-right: 100px;" v-model="searchData.searchText"
                class="w-50 m-2" placeholder="Please Input" :prefix-icon="Search" />
        </div>
        <div class="file-container">
            <!-- v-for循环生成卡片 -->
            <div v-for="(item, index) in filteredItems" :key="index" class="file-box">
                <el-card text @click="set(index)" :body-style="{ padding: '0px', height: 'auto' }">
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
        <el-dialog v-model="dialogTableVisible" align-center
            style="height:66vh; width: 66vw; background-color: transparent;">
            <el-container style="margin: -25px; height:66vh; width: 66vw;">
                <el-main style="background-color:rgb(240, 240, 240); height: auto; width: auto; margin-top: -30px;">
                    {{ fileDetail.name }}
                </el-main>
                <el-aside width="200px" style="background-color: rgb(231, 231, 231); height: auto; margin-top: -30px;">

                    <!-- 图表信息（编辑人、发布时间、上次编辑时间 -->
                    <div>
                        {{ fileDetail.id }}
                        <el-divider />
                        {{ fileDetail.name }}
                    </div>
                </el-aside>
            </el-container>
        </el-dialog>
    </el-main>
</template>

<script lang="ts" setup>

import { reactive, computed, ref, watch, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'

const dialogTableVisible = ref(false)
const router = useRouter()
const route = useRoute()
const fileList = getFileInformation()
var fileDetail = ref()

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

function set(index: number) {
    dialogTableVisible.value = true
    //请求id index
    //fileDetail.value = 
    console.log(filteredItems.value[index])
    fileDetail.value = filteredItems.value[index]
}


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

function toFileDetails(id: number) {
    router.push('/my/file')

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
</style>
  