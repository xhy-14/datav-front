import request from "@/utils/request";
enum API {
  LIST = "/app/sql/mysql/my-sql",
  DATABASE = "/app/sql/mysql/get_database/",
  EXECTUTE = "/app/sql/mysql/execute",
}

/**
 * 获取所有数据库连接
 * @returns 
 */
export function sqlListAPI() {
  return request.get(API.LIST)
}

export function getDatabaseByIDApi(id: string) {
  return request.get(API.DATABASE+id)
}

export function executeApi(data: any) {
  return request.post(API.EXECTUTE, data)
}
