import request from "@/utils/request";


enum API {
  COMBO_LIST = "/common/member/combo/list"
}

export function comboList(params: any) {
  return request.get<any>(API.COMBO_LIST, params);
}
