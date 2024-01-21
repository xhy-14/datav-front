import request from "@/utils/request";


enum API {
  GET_MY_METADATA = "/app/table/data/my",
  GET_MY_CHART_LIST = "/common/generated_chart/list",
  GET_DATA_BY_ID = "/app/table/data/metadata/",
  DELETE_CHART_BY_ID = "/common/generated_chart/delete/"
}

export function getMyMetadata(params: any) {
  return request.get<any>(API.GET_MY_METADATA, params);
}

export function getMyChartList(params: any) {
  return request.get<any>(API.GET_MY_CHART_LIST, params);
}

export function getDataById(params: any) {
  return request.get<any>(API.GET_DATA_BY_ID +  params);
}

export function deleteChartById(params: any) {
  return request.get<any>(API.DELETE_CHART_BY_ID + params);
}


