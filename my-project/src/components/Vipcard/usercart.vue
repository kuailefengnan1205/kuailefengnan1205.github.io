<template>
    <div id="usercart">
        <div id="header">
            <span @click="back()"><i class="el-icon-arrow-left"></i></span>
            <span>兑换会员</span>
        </div>
        <div id="top">
            <p>成功兑换后将关联到当前账号:<span>{{username}}</span></p>
        </div>
        <div id="input">
            <input @input="iscart()" v-model="cardphone" type="text" placeholder="请输入10位卡号">
            <input @input="iscart()" v-model="cardpassword" type="text" placeholder="请输入6位卡密">
            <div class="ccc" :class="{green:isgreen}">兑换</div>
        </div>
        <div id="explain">
            <p>——温馨提示——</p>
            <div class="footer">
                <p>新兑换的会员服务，权益以「会员说明」为准。</p>
                <p>月卡:30次减免配送费。</p>
                <p>季卡:90次减免配送费。</p>
                <p>年卡:360次减免配送费。</p>
                <p>＊仅限蜂鸟专送订单，每日最多减免3单，每单最高减免4元（一个月按31天计算)</p>
            </div>
        </div>
        <div class="animated bounceIn" id="walert" v-show="isshow">
            <div class="tip_icon">
            <span></span>
            <span></span>
            </div>
            <p v-text="warncont"></p>
            <div @click="isshow=!isshow" class="wbutton">
            确定
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'usercart',
  data() {
      return {
          isshow:false,
          isgreen:false,
          warncont: "无效的卡号",
          username:"",
          cardphone:"",
          cardpassword:"",
        }
  },
  created() {
      this.username = sessionStorage.username;
  },
  methods: {
    back () {
      this.$router.go(-1);
    },
    iscart () {
      var reg = /^\d{10}$/;
      var reg1 = /^\d{6}$/;
      if (reg.test(this.cardphone)&&reg1.test(this.cardpassword)) {
          this.isgreen = true;
      } else {
          this.isgreen = false;
      }
    },
  }
}
</script>
<style scoped>
#explain {
  color: gray;
}
#explain>p {
  text-align: center;
  margin-top: 0.2rem;
}
.footer {
  font-size: 0.14rem;
  margin-top: 0.2rem;
  margin-left: 0.5rem;
}
.footer>p {
  margin-top: 0.05rem;
}
#input {
    margin-top: 0.3rem;
}
#input>input {
  text-indent: .2rem;
    width: 100%;
    height: 0.5rem;
}
#input>input:nth-child(1) {
    border-bottom: 0.01rem solid #eee;
}
.ccc{
    width: 90vw;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    background: #ccc;
    margin-top: 0.2rem;
    margin-left: 5vw;
    border-radius: 0.05rem;
    color: white;
}
.green {
    background: #4cd964;
}
#usercart {
    background: #f5f5f5;
}
#top {
    margin-top: 0.2rem;
    margin-left: 0.2rem;
}
#top>p {
    color: gray;
    font-size: 0.13rem;
}
#top span {
    margin-left: 0.2rem;
    font-weight: bold;
    color: black;
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
#walert {
  background: white;
  border-radius: 0.3rem;
  width: 80vw;
  height: 2rem;
  position: absolute;
  left: 10vw;
  top: 25%;
}
#walert>p {
  width: 100%;
  height: 0.5rem;
  background: white;
  position: absolute;
  bottom: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
}
.wbutton {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
  color: white;
  font-weight: 800;
  background: #4cd964;
  border-bottom-right-radius:0.3rem;
  border-bottom-left-radius:0.3rem;
}
.tip_icon {
  width: 0.8rem;
  height: 0.8rem;
  border: 0.03rem solid #f8cb86;
  border-radius: 50%;
  margin-left: 36%;
  margin-top: 0.1rem;
}
.tip_icon span:nth-child(1) {
  display: inline-block;
  width: 0.03rem;
  height: 0.34rem;
  background-color: #f8cb86;
  margin-left: 49%;
  margin-top: 0.1rem;
}
.tip_icon span:nth-child(2) {
  display: inline-block;
  width: 0.05rem;
  height:0.05rem;
  border: 0.01rem;
  border-radius: 50%;
  margin-left: 49%;
  background-color: #f8cb86;
}
</style>
