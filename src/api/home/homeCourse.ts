import request from "@/utils/request";
import type {HomeCourseModel} from "./coureType";
enum API {
  getHomeCourse = "/getHomeCourse",
}

// get首页教程
export function getHomeCourse() {
  return request.post(API.getHomeCourse);
}

