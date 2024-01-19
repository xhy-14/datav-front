import request from "@/utils/request";
enum API {
  DATABASE = "/app/sql/mysql/get_database/"
}

export function getDatabaseByIDApi(id) {
  return request.get(API.DATABASE + id)
}
