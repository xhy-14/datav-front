import type { MockMethod } from 'vite-plugin-mock'; //

const courseList = {
  data: [
    {
      "id": 1,
      "title": "嘻嘻嘻",
      "text": "哈哈哈哈",
      "image": "https://img.yzcdn.cn/vant/apple-1.jpg",
    },
    {
      "id": 2,
      "title": "嘻嘻嘻",
      "text": "哈哈哈哈",
      "image": "https://img.yzcdn.cn/vant/apple-1.jpg",
    },
    {
      "id": 3,
      "title": "嘻嘻嘻",
      "text": "哈哈哈哈",
      "image": "https://img.yzcdn.cn/vant/apple-1.jpg",
    },
  ],
};

export default [
  {
    url: '/api/getHomeCourse',
    method: 'post',
    response: () => {
      return courseList;
    },
  },
] as MockMethod[];