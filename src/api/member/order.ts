import request from "@/utils/request";


enum API {
  ORDER_LIST = "/common/member/order/list"
}

export function orderList(params: any) {
  return request.get<any>(API.ORDER_LIST, params);
}
