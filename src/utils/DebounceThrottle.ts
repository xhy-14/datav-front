import { ElMessage } from "element-plus";

export function debounce(fn: Function, delay = 200) {//fn是需要防抖的函数，delay是延迟多少毫秒执行fn
    let timer: NodeJS.Timeout | null = null;
    return function () {
        if (timer) {
            clearTimeout(timer);
            ElMessage.error("操作太快啦！")
        }
        timer = setTimeout(() => {
            fn.apply(fn, arguments);
            timer = null;
        }, delay)
        // console.log(timer, "timer");

    }
}
