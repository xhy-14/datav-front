import request from "@/utils/request";
enum API {
  LINE = "/common/chart/line"
}

export function lineApi(data: any) {
  return request.post(API.LINE, data)
}