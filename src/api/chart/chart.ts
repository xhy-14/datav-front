import request from "@/utils/request";
enum API {
  RIVER = "/app/chart/themetiver/draw",
  HEAT = "/app/chart/heatmap/draw",
  FUNNEL = "/app/chart/funnel/draw",
  POLAR = "/common/chart/polar_bar",
  MORE_BAR = "/common/chart/more_bar",
  BAR = "/common/chart/bar",
  KLINE = "/common/chart/candlestick",
  RADAR = "/common/chart/radar",
  LINE = "/common/chart/line",
  PIE = "/common/chart/pie",
  SCATTER = "/app/chart/scatter/draw",
  CHART_LIST = "/common/generated_chart/list"
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

export function radarApi(data: any) {
  return request.post(API.RADAR, data)
}

export function kLineApi(data: any) {
  return request.post(API.KLINE, data)
}

export function barApi(data: any) {
  return request.post(API.BAR, data)
}

export function moreBarApi(data: any) {
  return request.post(API.MORE_BAR, data)
}

export function PolarBarApi(data: any) {
  return request.post(API.POLAR, data)
}

export function ChartListApi() {
  return request.get(API.CHART_LIST)
}

export function FunnelApi(data: any) {
  return request.post(API.FUNNEL, data)
}

export function HeatApi(data: any) {
  return request.post(API.HEAT, data)
}

export function RiverApi(data: any) {
  return request.post(API.RIVER, data)
}
