<template>
  <div class="chart-page">
    <div class="chart-header">
      <div class="chart-header-left-icon">
        <h2>创建图表</h2>
      </div>
      <div class="chart-header-left-button">
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </div>
    </div>
    <div class="chart-content">
      <div class="data-select">
        <div class="dataset-select">
          <el-select v-model="value" class="m-2" placeholder="请选择数据集" style="border:none">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </div>

        <div class="data-info">
          <div class="dataset-name">
            <el-icon style="margin-left: 10px">
              <Grid />
            </el-icon>
            <h4 style="margin-left: 5px">全国超市订单数据</h4>
          </div>

          <el-scrollbar style="height: 94%;">
            <div class="dataset-col">
              <div class="dataset-col-item">
                <el-icon style="margin-left: 25px">
                  <Discount />
                </el-icon>
                <p style="margin-left: 5px">字段一</p>
              </div>

              <div class="dataset-col-item">
                <el-icon style="margin-left: 25px">
                  <Discount />
                </el-icon>
                <p style="margin-left: 5px">字段一</p>
              </div>

              <div class="dataset-col-item">
                <el-icon style="margin-left: 25px">
                  <Discount />
                </el-icon>
                <p style="margin-left: 5px">字段一</p>
              </div>

              <div class="dataset-col-item">
                <el-icon style="margin-left: 25px">
                  <Discount />
                </el-icon>
                <p style="margin-left: 5px">字段一</p>
              </div>

              <div class="dataset-col-item">
                <el-icon style="margin-left: 25px">
                  <Discount />
                </el-icon>
                <p style="margin-left: 5px">字段一</p>
              </div>

              <div class="dataset-col-item">
                <el-icon style="margin-left: 25px">
                  <Discount />
                </el-icon>
                <p style="margin-left: 5px">字段一</p>
              </div>

              <div class="dataset-col-item">
                <el-icon style="margin-left: 25px">
                  <Discount />
                </el-icon>
                <p style="margin-left: 5px">字段一</p>
              </div>

              <div class="dataset-col-item">
                <el-icon style="margin-left: 25px">
                  <Discount />
                </el-icon>
                <p style="margin-left: 5px">字段一</p>
              </div>

              <div class="dataset-col-item">
                <el-icon style="margin-left: 25px">
                  <Discount />
                </el-icon>
                <p style="margin-left: 5px">字段一</p>
              </div>

              <div class="dataset-col-item">
                <el-icon style="margin-left: 25px">
                  <Discount />
                </el-icon>
                <p style="margin-left: 5px">字段一</p>
              </div>

              <div class="dataset-col-item">
                <el-icon style="margin-left: 25px">
                  <Discount />
                </el-icon>
                <p style="margin-left: 5px">字段一</p>
              </div>

              <div class="dataset-col-item">
                <el-icon style="margin-left: 25px">
                  <Discount />
                </el-icon>
                <p style="margin-left: 5px">字段一</p>
              </div>

              <div class="dataset-col-item">
                <el-icon style="margin-left: 25px">
                  <Discount />
                </el-icon>
                <p style="margin-left: 5px">字段一</p>
              </div>

              <div class="dataset-col-item">
                <el-icon style="margin-left: 25px">
                  <Discount />
                </el-icon>
                <p style="margin-left: 5px">字段一</p>
              </div>

              <div class="dataset-col-item">
                <el-icon style="margin-left: 25px">
                  <Discount />
                </el-icon>
                <p style="margin-left: 5px">字段一</p>
              </div>

              <div class="dataset-col-item">
                <el-icon style="margin-left: 25px">
                  <Discount />
                </el-icon>
                <p style="margin-left: 5px">字段一</p>
              </div>

              <div class="dataset-col-item">
                <el-icon style="margin-left: 25px">
                  <Discount />
                </el-icon>
                <p style="margin-left: 5px">字段一</p>
              </div>

              <div class="dataset-col-item">
                <el-icon style="margin-left: 25px">
                  <Discount />
                </el-icon>
                <p style="margin-left: 5px">字段一</p>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>

      <div class="create-chart">
        <div class="create-chart-view">
          <div class="create-chart-view-left">
            <div class="create-chart-view-left-title">
              <p>配置图表</p>
            </div>

            <div class="create-chart-view-left-config">
              <p>属性</p>
            </div>
          </div>

          <div class="create-chart-view-right">
            <div class="chart-select">
              
              <el-popover
                placement="top-start"
                title="Title"
                :width="200"
                trigger="hover"
                content="折线图"
              >
                <template #reference>
                  <div class="chart-select-item">
                    <svg class="charts-icon">
                      <use xlink:href="#icon-charts-bar" />
                    </svg>
                  </div>
                </template>
              </el-popover>

              <el-popover
                placement="top-start"
                title="Title"
                :width="200"
                trigger="hover"
                content="折线图"
              >
                <template #reference>
                  <div class="chart-select-item">
                    <svg class="charts-icon">
                      <use xlink:href="#icon-charts-bar" />
                    </svg>
                  </div>
                </template>
              </el-popover>

              <el-popover
                placement="top-start"
                title="Title"
                :width="200"
                trigger="hover"
                content="折线图"
              >
                <template #reference>
                  <div class="chart-select-item">
                    <svg class="charts-icon">
                      <use xlink:href="#icon-charts-bar" />
                    </svg>
                  </div>
                </template>
              </el-popover>

              <el-popover
                placement="top-start"
                title="Title"
                :width="200"
                trigger="hover"
                content="折线图"
              >
                <template #reference>
                  <div class="chart-select-item">
                    <svg class="charts-icon">
                      <use xlink:href="#icon-charts-bar" />
                    </svg>
                  </div>
                </template>
              </el-popover>

              <el-popover
                placement="top-start"
                title="Title"
                :width="200"
                trigger="hover"
                content="折线图"
              >
                <template #reference>
                  <div class="chart-select-item">
                    <svg class="charts-icon">
                      <use xlink:href="#icon-charts-bar" />
                    </svg>
                  </div>
                </template>
              </el-popover>

              <el-popover
                placement="top-start"
                title="Title"
                :width="200"
                trigger="hover"
                content="折线图"
              >
                <template #reference>
                  <div class="chart-select-item">
                    <svg class="charts-icon">
                      <use xlink:href="#icon-charts-bar" />
                    </svg>
                  </div>
                </template>
              </el-popover>

              <el-popover
                placement="top-start"
                title="Title"
                :width="200"
                trigger="hover"
                content="折线图"
              >
                <template #reference>
                  <div class="chart-select-item">
                    <svg class="charts-icon">
                      <use xlink:href="#icon-charts-bar" />
                    </svg>
                  </div>
                </template>
              </el-popover>

              <el-popover
                placement="top-start"
                title="Title"
                :width="200"
                trigger="hover"
                content="折线图"
              >
                <template #reference>
                  <div class="chart-select-item">
                    <svg class="charts-icon">
                      <use xlink:href="#icon-charts-bar" />
                    </svg>
                  </div>
                </template>
              </el-popover>

              <el-popover
                placement="top-start"
                title="Title"
                :width="200"
                trigger="hover"
                content="折线图"
              >
                <template #reference>
                  <div class="chart-select-item">
                    <svg class="charts-icon">
                      <use xlink:href="#icon-charts-bar" />
                    </svg>
                  </div>
                </template>
              </el-popover>

              <el-popover
                placement="top-start"
                title="Title"
                :width="200"
                trigger="hover"
                content="折线图"
              >
                <template #reference>
                  <div class="chart-select-item">
                    <svg class="charts-icon">
                      <use xlink:href="#icon-charts-bar" />
                    </svg>
                  </div>
                </template>
              </el-popover>

              <el-popover
                placement="top-start"
                title="Title"
                :width="200"
                trigger="hover"
                content="折线图"
              >
                <template #reference>
                  <div class="chart-select-item">
                    <svg class="charts-icon">
                      <use xlink:href="#icon-charts-bar" />
                    </svg>
                  </div>
                </template>
              </el-popover>

              <el-popover
                placement="top-start"
                title="Title"
                :width="200"
                trigger="hover"
                content="折线图"
              >
                <template #reference>
                  <div class="chart-select-item">
                    <svg class="charts-icon">
                      <use xlink:href="#icon-charts-bar" />
                    </svg>
                  </div>
                </template>
              </el-popover>

              <el-popover
                placement="top-start"
                title="Title"
                :width="200"
                trigger="hover"
                content="折线图"
              >
                <template #reference>
                  <div class="chart-select-item">
                    <svg class="charts-icon">
                      <use xlink:href="#icon-charts-bar" />
                    </svg>
                  </div>
                </template>
              </el-popover>

            </div>
            <div class="chart-view"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          id: 1,
          name: "数据表一"
        },
        {
          id: 2,
          name: "数据表二"
        }
      ],
      value: "请选择数据集"
    };
  }
};
</script>

<style>
.chart-page {
  width: 100%;
  height: 100%;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  height: 7%;
  line-height: 50px;
  border-bottom: 1px solid #eee;
  padding: 0 20px;
}

.chart-header-left-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-header-left-icon {
  width: 250px;
}
.chart-content {
  width: 100%;
  height: 93%;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
}

.data-select {
  width: 16%;
  height: 100%;
  background-color: white;
}

.dataset-select {
  height: 5%;
  display: flex;
  justify-content: center;
}

.data-info {
  height: 95%;
  justify-content: center;
}

.dataset-name {
  display: flex;
  justify-content: start;
  align-items: center;
  height: 36px;
}

.dataset-col-item {
  display: flex;
  justify-content: start;
  align-items: center;
  height: 36px;
}

.create-chart {
  width: 95%;
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
}

.create-chart-view {
  width: 98%;
  height: 96%;
  display: flex;
  justify-content: space-between;
}

.create-chart-view-left {
  width: 24%;
  height: 100%;
  border-right: 1px solid #eee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.create-chart-view-right {
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.create-chart-view-left-title {
  height: 10%;
  background-color: white;
}

.create-chart-view-left-config {
  height: 88%;
  background-color: white;
}

.chart-select {
  height: 15%;
  width: 100%;
  background-color: white;
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-gap: 10px;
  padding: 5px;
}

.chart-view {
  height: 84%;
  width: 100%;
  background-color: white;
}

.chart-view-title {
  height: 10%;
  width: 100%;
  background-color: white;
}

.chart-view-config {
  height: 90%;
  width: 100%;
  background-color: white;
}

.chart-select-item {
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  border-radius: 5px;
}
.chart-select-item:hover {
  background-color: rgb(101, 183, 251);
  cursor: pointer;
}

.charts-icon {
  width: 90%;
  height: 90%;
}
</style>