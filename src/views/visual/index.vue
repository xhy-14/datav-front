<template>
        <el-container>
            <el-aside width="200px" style="text-align: center;">
                <div style="height: 600px">
                    <el-steps direction="vertical" :active="active" finish-status="success">
                        <el-step title="上传文件" />
                        <el-step title="检查并描述" />
                        <el-step title="可视化" />
                        <el-step title="生成图表" />
                    </el-steps>
                </div>
            </el-aside>
            <el-main>
                <div v-show="active == 0"><CreateFile /><RouterView /></div>
                <div v-show="active == 1">1</div>
                <div v-show="active == 2">2</div>
                <div v-show="active == 3">3</div>
            </el-main>
            <el-button class="next" type="success" @click="next">继续</el-button>

        </el-container>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import CreateFile from './CreateFile.vue';
const active = ref(0)
const next = () => {
  if (active.value++ > 3) active.value = 0
}


</script>
  
<style>
.el-container{
    padding-left: 150px;
    padding-top: 70px;
    padding-right: 100px;
}
.flex-grow {
    flex-grow: 1;
}
.next{
    position: absolute;
    top: 636px;
    right: 200px;

}
.el-steps--vertical {
    height: 70%;
}
</style>
  