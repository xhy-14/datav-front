import request from "@/utils/request";

import type { LoginParamsType, LoginResultModel } from "./types";

enum API {
  login = "/login",
  logout = "/logout",
  getUserInfo = "/getUserInfo",
  getPermCode = "/getPermCode"
}

// 登录
export function login(params: LoginParamsType) {
  return request.post<LoginResultModel>(API.login, params);
}
