import request from "@/utils/request";
enum API {
  MY_DATASET = "/app/table/data/my",
  DATASET = "/app/table/data/metadata/"
}

export function myDatasetApi() {
  return request.get(API.MY_DATASET)
}

export function getDatasetApi(id: any) {
  return request.get(API.DATASET + id)
}