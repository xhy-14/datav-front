<template>
  <div class="data-source">
    <div class="data-source-view">
      <div class="table" height="725px">
        <el-scrollbar height="725px">
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

      <div class="sql-box">
        <div class="sql-excute">
          <div class="editor-title">
            <div class="editor-title-icon">
              <svg class="execute-icon" size="20px">
                <use xlink:href="#icon-execute" />
              </svg>

              <svg class="execute-icon" size="20px">
                <use xlink:href="#icon-font-size" />
              </svg>
            </div>
          </div>
          <v-ace-editor
            v-model:value="content"
            @init="editorInit"
            :options="editorOptions"
            lang="html"
            theme="chrome"
            style="height: 350px"
          />
        </div>
        <div class="data-show">
          <div class="data-show-title" style="height: 20%;">
            <div class="header">
              <h2>代码执行结果:</h2>
              <el-button type="primary">添加数据集</el-button>
            </div>
          </div>
          <div class="table-box">
            <el-table
              :data="tableData"
              style="width: 95%; height: 95%;"
              :row-class-name="tableRowClassName"
            ></el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 *
 */
import { getDatabaseByIDApi } from "@/api/datasource/index.ts";
import { VAceEditor } from "vue3-ace-editor";
export default {
  components: {
    VAceEditor,
    tableData: []
  },
  data() {
    return {
      database: {},
      editorOptions: {
        mode: "mysql",
        theme: "twilight",
        fontSize: 20,
        readOnly: false,
        highlightActiveLine: true,
        showPrintMargin: true,
        displayIndentGuides: true,
        tabSize: 4,
        useSoftTabs: false,
        enableAutoClosing: true,
        enableLiveAutocompletion: true,
        enableSnippets: true
      }
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
}

.table {
  width: 25%;
  height: 100%;
  border-right: 1px solid #ccc;
}
.sql-box {
  width: 75%;
  height: 100%;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
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

.sql-excute {
  width: 100%;
  height: 60%;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}

.data-show {
  width: 100%;
  height: 40%;
}

.editor {
  width: 90%;
  height: 80%;
}

.editor-title {
  height: 20%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.editor-title-icon {
  width: 80%;
  height: 80%;
  display: grid;
  gap: 50px;
  grid-template-columns: repeat(20, 1fr);
  align-items: center;
}

.data-show-title {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: aliceblue;
}

.header {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-box {
  height: 80%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  border: 1px solid #ccc;
}

.execute-icon {
  width: 25px;
  height: 25px;
}
.execute-icon:hover {
  cursor: pointer;
}
</style>