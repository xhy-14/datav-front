export interface LoginParamsType {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
  type: string;
}

export interface LoginResultModel {
  status: string;
  type: string;
  currentAuthority: string;
}

export interface HomeCourseModel {
  id: number;
  title: string;
  text: string;
  image: string;
}