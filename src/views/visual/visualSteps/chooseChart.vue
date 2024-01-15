<template>
    <el-scrollbar>
        <div class="scrollbar-flex-content">
            <el-row class="scrollbar-demo-item">
                <el-col :span="8" >
                    <el-button @click="chooseChart('bar')" style="height: auto; width: auto;">
                     <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <img src="@/assets/images/barChart.png" class="image" style="height: 80px;width: 200px;" />
                        <div style="padding: 1px">
                            <span>柱状图</span>
                        </div>
                      </el-card>
                    </el-button>

                  
                </el-col>
                <el-col :span="8">
                    <el-button @click="chooseChart('line')" style="height: auto; width: auto;">
                     <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <img src="@/assets/images/barChart.png" class="image" style="height: 80px;width: 200px;" />
                        <div style="padding: 1px">
                            <span>折线图</span>
                        </div>
                      </el-card>
                    </el-button>
                </el-col>

                <el-col :span="8">
                    <el-button @click="chooseChart('pie')" style="height: auto; width: auto;">
                     <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <img src="@/assets/images/pieChart.png" class="image" style="height: 80px;width: 200px;" />
                        <div style="padding: 1px">
                            <span>饼图</span>
                        </div>
                      </el-card>
                    </el-button>
                </el-col>
            </el-row>
        </div>
    </el-scrollbar>
</template>
      
<script lang="ts" setup>

const emits = defineEmits(['currentType'])
const chooseChart = (type: string) => {
    emits('currentType', type);
}
</script>
      
<style>
.el-col-8 {
    margin-right: 100px;
    max-width: 33.3333333333%;
    flex: 0 0 0% !important;
    position: relative;
    left: 44px;
}
.chart {
  height: 400px;
}
.scrollbar-flex-content {
    display: flex;
}

.scrollbar-demo-item {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    text-align: center;
    border-radius: 4px;

}

</style>
      