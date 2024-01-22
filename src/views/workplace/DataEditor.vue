<template>
  <div class="box">
    <div class="button-container">
      <el-button type="primary" size="default" @click="saveMetadata">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </div>
    <div class="table-container">
      <el-table class="table" :data="rows" border>
        <el-table-column v-for="item in headers" :key="item" :prop="item" :label="item" min-width="120px">
          <template #default="{ row }">
            <el-form :model="row">
              <el-form-item style="height: 20px;">
                <el-input v-model="row[item]" />
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getDataById, updateTable } from '@/api/data/data.ts'
import { ElMessage, ElLoading } from 'element-plus'

export default {
  setup() {
    const router = useRouter();
    let metadataId = ref(0)
    let headers = ref<any[]>([])
    let rows = ref<any[]>([])

    function saveMetadata() {
      let params = {
        id: metadataId.value,
        data: {
          headers: headers.value,
          rows: rows.value
        }
      }
      const loadingInstance = ElLoading.service({
        fullscreen: true,
        text: '正在修改文件...',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      updateTable(params)
      .then( function (response){
        if(response.code === "00000") {
          ElMessage.success("保存成功");
        } else {
          ElMessage.error("保存失败，请联系管理员");
        }
      }).finally(function (){
        loadingInstance.close();
      })
    }

    function cancel() {
      router.back();
    }

    onMounted(() => {
      const loadingInstance = ElLoading.service({
        fullscreen: true,
        text: '查询中...',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      metadataId.value = Number(router.currentRoute.value.query.id);
      getDataById(metadataId.value).then(function (response) {
        headers.value = response.data.data.headers;
        rows.value = response.data.data.rows.map((row: any) => ({ ...row }));
      }).finally(function () {
        loadingInstance.close();
      })
    });

    return {
      headers,
      rows,
      saveMetadata,
      cancel
    }
  }
};
</script>

<style>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.button-container {
  width: 1200px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: end;
}

.table-container {
  width: 1200px;
  height: 600px;
  max-height: 600px;
  margin-top: 10px;
}

.table {
  width: 1200px;
  max-height: 550px;
  overflow: auto;
}
</style>
