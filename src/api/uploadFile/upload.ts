import request from "@/utils/request";
enum API {
    uplodFile = "/common/file/upload",
    getData = "/app/table/data/file/"
  }

export function uploadFileAPI(file: File) {
    return request.post(API.uplodFile, file)
}
export function getDataAPI(fileId: string) {
    return request.get(API.getData + fileId)
}
