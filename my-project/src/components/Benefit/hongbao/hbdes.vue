<template>
  <div id="detail">
    <div id="header">
        <span @click="back()">＜</span>
        <span>红包说明</span>
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
              que:"Q1: 怎么获得红包?",
              ans:"通过邀请好友获得,在下单返红包的商家下单获得,抢微信朋友分享的红包获得"
            },
            {
              que:'Q2: 红包可以做什么?',
              ans:"可以抵扣在线支付时的实际支付金额。"
            },
            {
              que:'Q3: 红包的门槛金额按照什么金额计算？',
              ans:"为了保护账户和资金安全，您在提现前需要输入真实姓名和用该姓名开通的银行卡号、选择开户行，并验证已绑定饿了么账号的手机号。每日只能提现1次，每次限额50元。若提现金额超过50元，点击【提现】时系统会提示您已超额，请您修改提现金额"
            },
            {
              que:'Q4: 一个红包能拆开多次使用吗？',
              ans:"不能，一个红包只能一次性使用，不能分开使用。"
            },
            {
              que:'Q5: 下单的时候使用了红包，但是后来订单取消了，红包还会返还吗？',
              ans:"会的，订单无效后红包会自动返还到您的账户里。"
            },
            {
              que:'Q6: 红包兑换码怎样兑换成红包，怎样查看红包？',
              ans:"在个人中心 &gt; 我的红包 &gt; 兑换红包，输入兑换码进行兑换。"
            },
            {
              que:'Q7: 邀请好友了，为什么没获得红包？',
              ans:"先检查下您是否在同一设备上进行的邀请？或者被邀请人是否通过您发给对方的链接进行注册？而非自己复制链接注册的。同一设备上邀请或没有按照点击发送的链接邀请都是无效邀请。如果您是正常邀请没获得红包，可以致电客服进行查实。",
            },
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
#cont {
  margin-top: 0.7rem;
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
    position: fixed;
    top: 0;
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
