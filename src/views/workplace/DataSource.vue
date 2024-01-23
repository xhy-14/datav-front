<template>
  <div class="view">
    <div class="nav">
      <h2 style="margin-left: 50px;">数据源</h2>
      <div>
        <el-button @click="addDialogVisible = true">添加数据源</el-button>
        <el-button @click="toWorkplace()">返回工作台</el-button>
      </div>
    </div>
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
                <h2>执行结果:</h2>
                <el-scrollbar height="100%" width="100%">
                  <div>{{ message }}</div>
                </el-scrollbar>
                <el-button @click="dialogVisible = true" type="primary">添加数据集</el-button>
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

      <!-- 上传数据集 --->
      <el-dialog v-model="dialogVisible" title="上传数据集" width="35%">
        <el-form label-width="100px" :model="uploadData" style="max-width: 560px">
          <el-row class="form-item" :gutter="20">
            <h2>数据集名</h2>
            <el-input
              v-model="saveDataForm.name"
              class="w-50 m-2"
              placeholder="数据集名"
              :suffix-icon="Calendar"
            />
          </el-row>
          <el-row :gutter="20" class="form-item">
            <h2>所属项目</h2>
            <div>
              <el-select
                v-model="saveDataForm.pid"
                placeholder="选择所属项目"
                style="margin-left: 20px; display: block;"
              >
                <el-option v-for="(item, index) in myProjects" :label="item.name" :value="item.id" />
              </el-select>
            </div>
          </el-row>
          <el-row :gutter="16" class="form-item">
            <h2>选择你的数据列</h2>
            <el-transfer class="selectHeader" v-model="saveDataForm.data.headers" :data="headers" />
          </el-row>

          <el-row :gutter="16" class="form-item-submit">
            <el-button @click="save()" type="primary">保存</el-button>
          </el-row>
        </el-form>
      </el-dialog>

      <el-dialog v-model="addDialogVisible" title="上传数据集" width="35%">
        <el-form label-width="100px" :model="uploadData" style="max-width: 560px">
          <el-row class="form-item" :gutter="20">
            <h2>数据连接名</h2>
            <el-input
              v-model="addDataSource.name"
              class="w-50 m-2"
              placeholder="数据集名"
            />
          </el-row>

          <el-row class="form-item" :gutter="20">
            <h2>数据库名</h2>
            <el-input
              v-model="addDataSource.database"
              class="w-50 m-2"
              placeholder="数据集名"
            />
          </el-row>

          <el-row class="form-item" :gutter="20">
            <h2>数据库ip</h2>
            <el-input
              v-model="addDataSource.ip"
              class="w-50 m-2"
              placeholder="数据集名"
            />
          </el-row>

          <el-row class="form-item" :gutter="20">
            <h2>数据库端口</h2>
            <el-input
              v-model="addDataSource.port"
              class="w-50 m-2"
              placeholder="数据集名"
            />
          </el-row>

          <el-row class="form-item" :gutter="20">
            <h2>用户名</h2>
            <el-input
              v-model="addDataSource.username"
              class="w-50 m-2"
              placeholder="数据集名"
            />
          </el-row>

          <el-row class="form-item" :gutter="20">
            <h2>密码</h2>
            <el-input
              v-model="addDataSource.password"
              class="w-50 m-2"
              placeholder="数据集名"
            />
          </el-row>

          <el-row :gutter="20" class="form-item">
            <h2>mysql版本</h2>
            <div>
              <el-select
                v-model="addDataSource.mysql8"
                placeholder="选择所属项目"
                style="margin-left: 20px; display: block;"
              >
                <el-option label="mysql5+" value="false" />
                <el-option label="mysql8+" value="true" />
              </el-select>
            </div>
          </el-row>
          <el-row :gutter="16" class="form-item-submit">
            <el-button @click="testConnection()" type="primary">测试</el-button>
            <el-button @click="saveDataSource()" type="primary">保存连接</el-button>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
/**
 *
 */
import { getDatabaseByIDApi, sqlListAPI, executeApi, testDatabaseConnectionApi, saveDatabaseConnectionApi } from "@/api/sql/index.ts";
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
import { listProject } from "@/api/project/project.ts";
import { saveFileByData } from "@/api/file/file.ts";
import { ElMessage, ElLoading } from "element-plus";
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
      uploadData: {},
      tableData: [],
      database: {},
      headers: [],
      selectHeader: [],
      addDataSource: {
        database: "数据库名",
        id: 0,
        ip: "服务器IP地址",
        mysql8: true,
        name: "数据库连接名",
        password: "密码",
        port: "端口",
        username: "用户名"
      },
      content: "",
      addDialogVisible: false,
      saveDataForm: {
        data: {
          headers: [{}],
          rows: [{}]
        },
        name: "string",
        pid: null
      },
      drakOrLight: false,
      dialogVisible: false,
      databaseList: [],
      myProjects: [],
      message: "",
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
    toWorkplace() {
      this.$router.replace("/workplace");
    },
    testConnection() {
      const loadingInstance = ElLoading.service({
        fullscreen: true,
        text: "正在创建数据集...",
        background: "rgba(0, 0, 0, 0.7)"
      });
      testDatabaseConnectionApi(this.addDataSource).then(res=>{
        if(res.code == '00000') {
          this.$message.success("连接成功");
        } else {
          this.$message.error("连接失败");
        }
        loadingInstance.close();
      }).catch(err=>{
        this.$message.error("连接失败");
        loadingInstance.close();
      })
    },
    saveDataSource(){
      const loadingInstance = ElLoading.service({
        fullscreen: true,
        text: "正在创建数据集...",
        background: "rgba(0, 0, 0, 0.7)"
      });
      saveDatabaseConnectionApi(this.addDataSource).then(res=>{
        if(res.code == '00000') {
          this.$message.success("连接成功");
        } else {
          this.$message.error("连接失败");
        }
        loadingInstance.close();
      }).catch(err=>{
        this.$message.error("连接失败");
        loadingInstance.close();
      })
    },
    /**
     * 执行sql语句
     */
    execute() {
      const loadingInstance = ElLoading.service({
        fullscreen: true,
        text: "正在创建数据集...",
        background: "rgba(0, 0, 0, 0.7)"
      });
      executeApi(this.executeData).then(res => {
        if (res.code === "00000") {
          console.log(res.data);
          this.tableData = res.data;
          let tmp = [];
          for (let i = 0; i < this.tableData.headers.length; i++) {
            let map = {};
            map["key"] = this.tableData.headers[i];
            map["value"] = this.tableData.headers[i];
            tmp.push(map);
          }
          this.headers = tmp;
          this.message = res.msg;
        } else {
          this.$message.error(res.msg);
          this.message = res.msg;
        }
      });
      loadingInstance.close();
    },
    /**
     * 保存数据集
     */
    save() {
      const loadingInstance = ElLoading.service({
        fullscreen: true,
        text: "正在创建数据集...",
        background: "rgba(0, 0, 0, 0.7)"
      });
      let data = this.tableData;
      let selectData = [];
      for (let i = 0; i < data.rows.length; i++) {
        let map = {};
        for (let item of this.saveDataForm.data.headers) {
          map[item] = data.rows[i][item];
        }
        selectData.push(map);
      }
      this.saveDataForm.data.rows = selectData;
      saveFileByData(this.saveDataForm)
        .then(res => {
          console.log(res);
          if (res.code == "00000") {
            ElMessage.success("数据集创建成功");
            this.dialogVisible = false;
          } else {
            ElMessage.error("数据集创建失败");
          }
        })
        .catch(err => {
          ElMessage.error("数据集创建失败");
        });
      loadingInstance.close();
    }
  },
  created() {
    listProject().then(res => {
      this.myProjects = res.data;
    });
  },
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
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.selectHeader {
}

.form-item {
  margin-top: 10px;
  display: flex;
  justify-content: start;
  align-items: center;
}

.form-item-submit {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 20px;
}
</style>