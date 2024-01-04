<template>
    <div class="common-layout">
        <el-container>
            <el-header style="height: 160px;" class="">
                <el-menu style="height: 160px;" :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                    :ellipsis="false" @select="handleSelect">
                    <a href="/" style="height: 100%; position: relative; left: 106px;">
                        <el-menu-item index="0" style="top: 55px; padding: 0%;">
                            <img style="width: 182px;height: 59px;position: relative;" src="@\assets\images\logo.jpg"
                                alt="logo" />
                        </el-menu-item>
                    </a>
                    <div class="flex-grow" />
                    <a href="/" class="text">登录</a>
                    <a href="/" class="text">Dashboard</a>
                </el-menu>
            </el-header>
            <el-main style="padding: 0px;">
                <div>
                    <img style="height: 570px; width: 100%;" src="@/assets/images/bg2.png" />
                </div>
                <div class="main-text" style="height: 55px; width: 270px;  ">
                    <el-text class="mx-1" style="font-size: 43px; color: black;"><span>丰富你的<br>带图表的故事</span></el-text>
                </div>
                <a href="/">
                    <el-button type="primary" class="main-botton_start" style=""><span>开 始 创 建</span></el-button>
                </a>

            </el-main>
            <el-text class="mx-1 between-main-footer-text"
                style="font-size: 30px;">无需代码或设计技能。<br>我们的目标是让每个人都能创建漂亮的图表和表格，包括你。</el-text>
            <el-footer style="padding: 0%;width: 100%;">
                <el-row v-for="o in 4" :key="o" class="footer-card" :gutter="40">
                    <el-col style="width: 100%;flex: 0 0 100%;max-width: 100%;  padding-right: 60px;  padding-left: 60px;" :span="8">
                            <el-card shadow="hover">

                                <div class="card-desc__card">
                                    <div class="card-desc__card-data">
                                        <div class="card-desc__card-data_numbered">
                                            <div class="icon_number">{{ o }}</div>
                                        </div>

                                        <div class="card-desc__card-data_content">
                                            <div class="card-desc__card-data_title">上传你的文件</div>
                                            <div class="card-desc__card-data_desc">
                                                <p>从网络、Excel 或 Google 表格复制数据并粘贴数据表。您还可以上传 CSV/XLS 等文件以获取你的图表</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-desc__card-img">
                                        <picture class="card-desc__card-img picture">
                                            <img width="100%" height="100%" src="@/assets/images/example1.png">
                                        </picture>
                                    </div>
                                </div>

                            </el-card>
                    </el-col>
                    
                </el-row>
            </el-footer>
        </el-container>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}


</script>
  
<style>
.card-desc__card:not(:last-of-type) {
    padding-bottom: 100px
}

.card-desc__card {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    max-width: 1160px;
    position: relative;
    left: 89px;
}

.between-main-footer-text {
    position: relative;
    bottom: 53px;
}

.card-desc__card-img picture {
    display: block
}

.card-desc__card-img {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    max-width: 660px;
    width: 100%
}

.card-desc__card-data_numbered {
    margin-right: 20px
}

.card-desc__card-data {
    position: relative;
    max-width: 460px;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    margin-right: 100px
}

.card-desc__card-data_desc {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #4f4f4f;
    margin-bottom: 25px
}

.card-desc__card-data_title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    color: #333;
    margin-bottom: 20px
}

.card-desc__card-data_content {
    margin-top: 10px
}

.icon_number {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 47px;
    width: 47px;
    background: #333;
    border-radius: 47px;
    color: #fff;
    font-size: 22px;
    font-weight: 700;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center
}

.footer-card {
    width: 1500px;
    max-width: 100%;
    flex: auto;
    max-width: 100%;
    width: 100%;
    margin-bottom: 27px;
    margin-left: 0 !important;
    margin-right: 0 !important;
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



.main-image {
    padding: 0px;
}

.main-botton_start {
    position: relative;
    bottom: 220px;
    left: 150px;
    height: 55px !important;
    width: 250px !important;
    font-size: 18px !important;
    background-color:rgba(67, 214, 186, 0.86) !important;
}

.main-text {
    position: relative;
    bottom: 370px;
    left: 150px;

}</style>
  