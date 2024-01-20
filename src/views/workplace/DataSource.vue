<template>
  <div class="view">
    <div class="nav">导航栏</div>
    <div class="data-source">
      <div class="data-source-view">
        <div class="table" height="700px">
          <div class="select-database">
            <el-dropdown>
              <span class="el-dropdown-link">
                请选择数据库
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="(item, index) in databaseList"
                    @click="selecDataBase(item)"
                  >{{ item.name }}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <el-scrollbar height="100%" width="100%">
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
                <el-menu-item v-for="(item, index) in database.tables">
                  <svg class="table-icon" size="20px" style="margin-left: 10px;">
                    <use xlink:href="#icon-table" />
                  </svg>
                  {{ item }}
                </el-menu-item>
              </el-sub-menu>
            </el-menu>
          </el-scrollbar>
        </div>

        <div class="sql-box">
          <div class="sql-excute">
            <div class="editor-title">
              <div class="editor-title-icon">
                <div class="file">
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      <el-icon>
                        <Document />
                      </el-icon>文件
                      <el-icon class="el-icon--right">
                        <arrow-down />
                      </el-icon>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu></el-dropdown-menu>
                    </template>
                  </el-dropdown>
                  <el-icon class="execute-icon">
                    <Plus />
                  </el-icon>
                </div>
                <div class="code-execute">
                  <svg @click="execute()" class="execute-icon" size="20px">
                    <use xlink:href="#icon-execute" />
                  </svg>
                  <svg class="execute-icon" size="20px" style="margin-left: 30px;">
                    <use xlink:href="#icon-font-size" />
                  </svg>
                </div>

                <div class="others">
                  <el-switch v-model="drakOrLight" size="large" @change="changeTheme">
                    <template #active-action>
                      <span class="custom-active-action">白</span>
                    </template>
                    <template #inactive-action>
                      <span class="custom-inactive-action">黑</span>
                    </template>
                  </el-switch>
                </div>
              </div>
            </div>
            <v-ace-editor
              v-model:value="executeData.code"
              :options="editorOptions"
              style="height: 80%"
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
                <el-table :data="tableData.rows" style="width: 90%; height: 90%">
                  <el-table-column
                    v-for="(item, index) in tableData.headers"
                    :key="item"
                    :prop="item"
                    :label="item"
                  />
                </el-table>
            </div>
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
import { getDatabaseByIDApi, sqlListAPI, executeApi } from "@/api/sql/index.ts";
import { VAceEditor } from "vue3-ace-editor";
import ace from "ace-builds";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-searchbox";
import "ace-builds/src-noconflict/ext-beautify";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-error_marker";

export default {
  components: {
    VAceEditor
  },
  data() {
    return {
      executeData: {
        id: 1,
        code: ""
      },
      tableData: [],
      database: {},
      content: "",
      drakOrLight: false,
      databaseList: [],
      editorOptions: {
        mode: "ace/mode/sql",
        theme: "light",
        fontSize: 20,
        readOnly: false,
        highlightActiveLine: true,
        showPrintMargin: false,
        display: "inline",
        displayIndentGuides: true,
        tabSize: 2,
        useSoftTabs: false,
        enableAutoClosing: true,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showCommandLine: true,
        enableBeautify: true,
        enableEmmet: true
      }
    };
  },
  methods: {
    changeTheme(val) {
      this.editorOptions.theme = val ? "ace/theme/monokai" : "ace/theme/chrome";
    },
    selecDataBase(item) {
      getDatabaseByIDApi(item.id).then(res => {
        this.database = res.data;
        this.executeData.id = this.database.id;
      });
    },
    /**
     * 执行sql语句
     */
    execute() {
      executeApi(this.executeData)
        .then(res => {
          this.tableData = res.data;
          console.log(this.tableData.headers);
        })
        .catch(err => {
          console.log("请求失败");
        });
    }
  },
  created() {},
  mounted() {
    /**
     * 获取所有数据库连接
     */
    sqlListAPI()
      .then(result => {
        this.databaseList = result.data;
        console.log(this.databaseList);
      })
      .catch(err => {
        alert("获取数据库连接失败");
      });
  }
};
</script>

<style scoped>
.table-icon {
  width: 20px;
  height: 20px;
}
.nav {
  height: 5%;
  border-bottom: 1px solid #eee;
}
.view {
  width: 100%;
  height: 100%;
}
.data-source {
  width: 100%;
  height: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.data-source-view {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
}

.table {
  width: 18%;
  height: 95%;
  border-right: 1px solid #ccc;
}
.sql-box {
  width: 80%;
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
  display: flex;
  justify-content: space-between;
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

.file {
  width: 20%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}

.code-execute {
  width: 30%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
.others {
  width: 20%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}

.select-database {
  width: 90%;
  height: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
</style>