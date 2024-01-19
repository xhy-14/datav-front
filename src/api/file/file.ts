import request from "@/utils/request";


enum API {
  UPLOAD = "/app/table/data/file",
  SAVE_FILE_BY_DATA = "/app/table/data/save"
}

export function uploadFile(params: any) {
  return request.post<any>(API.UPLOAD, params);
}

export function saveFileByData(params: any) {
  return request.post<any>(API.SAVE_FILE_BY_DATA, params);
}
