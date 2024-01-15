import request from "@/utils/request";
enum API {
  getChartInfo = "/common/chart/line"
}

// get图表数据教程
export function getChartInfoAPI(params: any) {
  return request.post(API.getChartInfo , params);
}

