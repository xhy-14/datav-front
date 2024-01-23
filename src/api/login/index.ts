import request from "@/utils/request";

import type { LoginParamsType, LoginResultModel } from "./types";

enum API {
  LOGIN = "/app/login",
  LOGOUT = "/logout",
  getUserInfo = "/getUserInfo",
  getPermCode = "/getPermCode",
  REGISTER = "/app/register",
  CAPTCHA_EMAIL = "/app/mail?email="
}

// 登录
export function loginAPI(params: LoginParamsType) {
  return request.post<LoginResultModel>(API.LOGIN, params);
}
export function registerAPI(params: LoginParamsType) {
  return request.post<LoginResultModel>(API.REGISTER, params);
}
export function captchaAPI(params: string) {
  return request.get<any>(API.CAPTCHA_EMAIL + params);
}