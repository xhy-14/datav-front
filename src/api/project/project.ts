import request from "@/utils/request";


enum API {
  SAVE = "/common/file/save_project",
  LIST = "/common/file/my_project_list"
}

export function saveProject(params: any) {
  return request.post<any>(API.SAVE, params);
}

export function listProject(params: any) {
  return request.get<any>(API.LIST, params);
}