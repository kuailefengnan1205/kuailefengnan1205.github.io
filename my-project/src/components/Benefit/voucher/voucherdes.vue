<template>
  <div id="detail">
    <div id="header">
        <span @click="back()"><i class="el-icon-arrow-left"></i></span>
        <span>代金券说明</span>
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
              que:"Q1: 商家代金券说明?",
              ans:"商家代金券是指由商家自己发放代金券，只限在指定的商家使用，可根据条件抵扣相应金额。"
            },
            {
              que:'Q2: 怎么获得商家代金券?',
              ans:"进入有「进店领券」或「下单返券」标示的商家即有机会获得代金券。「下单返券」需要在指定商家完成满足返券金额要求的订单后才会返还，代金券可在下次下单时使用。"
            },
            {
              que:'Q3: 商家代金券使用条件？',
              ans:"商家代金券仅限在指定商家使用,商家代金券仅限在线支付使用,每个订单只能使用一张商家代金券，不可与其他代金券叠加使用"
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
