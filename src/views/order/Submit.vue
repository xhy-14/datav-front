<template>
  <el-button type="primary" @click="pay()">提交</el-button>
</template>


<script>
export default {
  methods: {
    pay() {
      window.open(
        "http://127.0.0.1:8080/renren-fast/common/alipay/pay?" +
          "subject=" +
          "测试" +
          "&traceNo=" +
          "123" +
          "&totalAmount=" +
          "10"
      );
    }
  }
};
</script>


<style>
</style>