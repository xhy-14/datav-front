<template>
  <div class="data-source">
    <div class="data-source-view">
      <div class="table" height="700px">
        <el-scrollbar height="700px">
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
      
      <div class="sql-excute">
        <v-ace-editor class="editor"
          v-model:value="content"
          @init="editorInit"
          lang="html"
          theme="chrome"
          style="height: 400px"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getDatabaseByIDApi } from "@/api/datasource/index.ts";
import { VAceEditor } from "vue3-ace-editor";
export default {
  components: {
    VAceEditor
  },
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

<style scoped>
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
  display: flex;
  justify-content: center;
  align-content: center;
  border-right: 1px solid #ccc;
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

.sql-excute{
  width: 80%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.editor{
  width: 90%;
  height: 80%;
}
</style>