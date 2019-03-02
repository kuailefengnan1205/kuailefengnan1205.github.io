<template>
  <div id="detail">
    <div id="header">
        <span @click="back()"><i class="el-icon-arrow-left"></i></span>
        <span>积分问题</span>
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
              que:"Q1: 怎么获得积分？",
              ans:"在线支付的订单将获得订单积分奖励:积分将在用户完成评价后获得。可获得积分=订单金额×10（即1元=10点积分）。订单金额指实际付款金额，不包含活动优惠金额。每位用户每天最多可以获得2000积分，体验商家的订单和评价不会增加积分。"
            },
            {
              que:'Q2: 积分用来做什么?',
              ans:"可以在积分商城兑换各种礼品"
            },
            {
              que:'Q3: 礼品兑换很多天了还没有收到，该怎么办？',
              ans:"礼品从兑换日起，3个工作日（周末不算）内处理发货，发货后，通常会在3个工作日左右送达。"
            },
            {
              que:'Q4: 礼品兑换中的手机充值卡兑换，怎么样进行充值，充值之前会和我电话确认嘛？',
              ans:"不会，手机充值卡兑换，是直接充值到您填写的手机号上，充值之前不会和您电话确认，所以您在填写电话的时候，请确认电话是否正确。"
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
