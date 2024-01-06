import request from "@/utils/request";
import type {HomeCourseModel} from "./coureType";
enum API {
  // getHomeCourse = "/common/home/carousel/list",
}

// get首页教程
export function getHomeCourse() {
  return request.get(API.getHomeCourse);
}

