<template>
  <div class="data-source">
    <div class="data-source-view">
      <div class="table">
        <el-scrollbar height="650px">
          <el-menu class="database">
            <el-sub-menu>
              <template #title>
                <div class="mysql-database">
                  <svg class="mysql-icon" size="30px">
                    <use xlink:href="#icon-mysql" />
                  </svg>
                  <div class="mysql-database-name">{{ database.name }}</div>
                </div>
              </template>
              <el-menu-item v-for="(item, index) in database.tables">{{ item }}</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </div>
      <div class="sql-excute"></div>
    </div>
  </div>
</template>

<script>
import { getDatabaseByIDApi } from "@/api/datasource/index.ts";
export default {
  data() {
    return {
      database: {}
    };
  },
  methods: {},
  created() {},
  mounted() {
    getDatabaseByIDApi(1)
      .then(result => {
        this.database = result.data;
      })
      .catch(err => {});
  }
};
</script>

<style>
.data-source {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.data-source-view {
  width: 98%;
  height: 98%;
}

.table {
  width: 20%;
  height: 100%;
}

.mysql-icon {
  width: 40px;
  height: 40px;
}

.mysql-icon > svg {
  width: 100%;
  height: 100%;
}

.mysql-database {
  display: flex;
  justify-content: center;
  align-items: center;
}

.mysql-database-name {
  margin-left: 10px;
  font-size: 20px;
}
.database {
  height: 100%;
  border: none;
}
</style>