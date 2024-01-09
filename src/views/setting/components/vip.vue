<template>
    <h5>套餐和价格</h5>
    <p style="font-size: 14px;padding-top: 10px;padding-bottom: 10px;">您当前正在使用免费套餐。您可以在下方找到所有可用的Dataswap套餐的概述。如有任何疑问，请随时与我们的支持团队联系。</p>
        <el-table
    :data="tableData"
    style="width: 100%;height: 400px;"
    :row-class-name="tableRowClassName"
  >
    <el-table-column prop="free" label="Free" width="340" />
    <el-table-column prop="vip" label="会员" width="340" />
    <el-table-column prop="other" label="其他" width="340" />
  </el-table>
</template>
  
<script lang="ts" setup>
interface User {
  free: string
  vip: string
  other: string
}

const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: User
  rowIndex: number
}) => {
  if (rowIndex === 0) {
    return 'warning-row' 
  } 
  return ''
}

const tableData: User[] = [
  {
    free: '免费',
    vip: '￥10/月',
    other: '联系我们',
  },
  {
    free: '2016-05-03',
    vip: 'Tom',
    other: 'No. es',
  },
  {
    free: '2016-05-03',
    vip: 'Tom',
    other: 'No. es',
  },
  {
    free: '2016-05-03',
    vip: 'Tom',
    other: 'No. es',
  },

]
</script>
  
<style>
.el-table .cell {
    text-align: center;
}
.el-table td.el-table__cell {
    box-sizing: border-box;
    text-align: center;
}
.el-table__body{
    height: 300px !important;
    text-align: center;

}
.el-table__header{
    height: 100px !important;
    text-align: center;
}
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-danger-light-9);
  font-size: 20px;
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
    