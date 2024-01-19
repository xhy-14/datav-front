import request from "@/utils/request";


enum API {
  GET_MY_METADATA = "/app/table/data/my"
}

export function uploadFile(params: any) {
  return request.get<any>(API.GET_MY_METADATA, params);
}

