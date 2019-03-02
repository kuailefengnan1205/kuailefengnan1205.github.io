<template>
  <div id="detail">
    <div id="header">
        <span @click="back()">＜</span>
        <span>余额问题</span>
    </div>
    <ul id="cont">
      <li class="answer" v-for="(value, index) in question" :key="index">
        <h4>{{value.que}}</h4>
        <p>{{value.ans}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data() {
      return {
          question:[
            {
              que:"Q1: 使用余额的条件",
              ans:"为了保护账户安全，使用余额前必须先绑定手机号"
            },
            {
              que:'Q2: 余额可以怎么用?',
              ans:"余额可以在饿了么平台上提现，当余额大于等于待支付金额时可以在支持在线支付的商家中进行消费。提现功能将于2016年12月25日00:00全面开放"
            },
            {
              que:'Q3: 我要如何提现？',
              ans:"为了保护账户和资金安全，您在提现前需要输入真实姓名和用该姓名开通的银行卡号、选择开户行，并验证已绑定饿了么账号的手机号。每日只能提现1次，每次限额50元。若提现金额超过50元，点击【提现】时系统会提示您已超额，请您修改提现金额"
            },
            {
              que:'Q4 :为什么会提现失败？',
              ans:"可能原因有：您的姓名、开户行、银行卡号等信息不匹配；您当日的提现次数和金额超过限制；您的账户存在异常，被风控拦截"
            }
          ]
      }
  },
  methods: {
    back () {
      this.$router.go(-1);
    }
  },
}
</script>
<style scoped>
.answer>p{
  color: #666;
  font-size: 0.16rem;
  margin-top: 0.2rem;
  font-family: Helvetica Neue,Tahoma,Arial;
}
#cont>li {
    width: 90vw;
    margin-left: 3vw;
    margin-top: 0.3rem;
}
#header {
    width: 100%;
    height: 0.5rem;
    background: #3190e8;
    color: white;
}
#header>span:nth-child(1) {
    line-height: 0.5rem;
    margin-left: 5vw;
    font-size: 0.2rem
}
#header>span:nth-child(2) {
  line-height: 0.5rem;
  font-weight: 800;
  margin-left: 30vw;
  font-size: 0.2rem;
}
</style>
