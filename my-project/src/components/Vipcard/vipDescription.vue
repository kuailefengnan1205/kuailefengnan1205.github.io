<template>
  <div id="detail">
    <div id="header">
        <span @click="back()"><i class="el-icon-arrow-left"></i></span>
        <span>会员说明</span>
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
              que:"Q1: 特权介绍?",
              ans:"通过邀请好友获得,在下单返红包的商家下单获得,抢微信朋友分享的红包获得"
            },
            {
              que:'Q2: 资费介绍?',
              ans:"饿了么会员卡：20元"
            },
            {
              que:'Q3: 使用说明',
              ans:"当用户满足以下任一条件，会员服务自动失效：1,自绑定之日起超过31天；2,在31天内累计使用减免配送费的蜂鸟订单数量达到30单；"
            },
            {
              que:'Q4: 购卡说明?',
              ans:"在线购买：饿了么App&gt;我的&gt;饿了么会员卡"
            },
            {
              que:'Q5: 温馨提示?',
              ans:"用户在当前会员服务失效前，无法购买新卡。请认准饿了么官方渠道，任何从其他第三方途径获得的会员卡，饿了么不保证其可用性。"
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
