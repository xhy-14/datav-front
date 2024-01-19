import request from "@/utils/request";
enum API {
  LINE = "/common/chart/line",
  PIE = "/common/chart/pie",
  SCATTER = "/app/chart/scatter/draw",

}

export function lineApi(data: any) {
  return request.post(API.LINE, data)
}

export function pieApi(data: any) {
  return request.post(API.PIE, data)
}

export function scatterApi(data: any) {
  return request.post(API.SCATTER, data)
}

