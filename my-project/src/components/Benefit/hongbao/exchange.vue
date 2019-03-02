<template>
  <div id="exchange">
    <div id="header">
        <span @click="back()">＜</span>
        <span>兑换红包</span>
    </div>
    <div class="winput">
        <input @input="isreg()" v-model="exchange_code" class="exchange" type="text" placeholder="请输入兑换码">
        <div id="bot">
            <input @input="isreg()" v-model="captcha_code" class="code" type="text" placeholder="验证码">
            <input class="show" type="text">
            <div class="codediv">
                <img :src="code" alt="">
                <div class="wright">
                    <p class="top">看不清</p>
                    <p @click="getcode()" class="bot">换一张</p>
                </div>
            </div>
        </div>
    </div>
    <div @click="voucher()" class="foot" :class="{green:isgreen}">
        兑换
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
  name: 'exchange',
  data() {
      return {
          code: "",
          user_id:"",
          exchange_code: "",
          captcha_code: "",
          isgreen: false,
          isshow:false,
          warncont: ""
      }
  },
  created() {
      this.getcode();
      this.user_id = sessionStorage.user_id;
  },
  methods: {
    isreg () {
        // 正则判断
        var reg = /^\d{4}$/;
        if (this.exchange_code != "" && reg.test(this.captcha_code)) {
            this.isgreen = true;
        } else {
            this.isgreen = false;
        }
    },
    back () {
      this.$router.go(-1);
    },
    getcode () {
        this.$http({
            method:"post",
            url: "https://elm.cangdu.org/v1/captchas",
            withCredentials: true,
        }).then((res) => {
            this.code = res.data.code;
        })
    },
    voucher () {
        var reg = /^\d{4}$/;
        if (this.exchange_code != "" && reg.test(this.captcha_code)) {
            this.$http({
                method: "post",
                url: "https://elm.cangdu.org/v1/users/:user_id/hongbao/exchange",
                data:{
                    user_id: this.user_id,
                    exchange_code: this.exchange_code,
                    captcha_code : this.captcha_code
                },
            withCredentials: true, 
            }).then ((res) => {
                this.isshow = true;
                this.warncont = res.data.message;
            })
        }
    }
  },
}
</script>
<style scoped>
.foot {
    width: 90vw;
    height: 0.5rem;
    text-align: center;
    line-height: 0.5rem;
    background: #ccc;
    margin-left: 5vw;
    margin-top: 0.2rem;
    border-radius: 0.05rem;
    color: white;
}
.green {
    background: #4cd964;
}
.codediv {
    width: 1.3rem;
    height: 0.3rem;
    position: absolute;
    bottom: 0.1rem;
    right: 0.3rem;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
}
.codediv>img {
    float: left;
}
.wright>p{
    font-size: 0.12rem;
    width: 15vw;
    overflow: hidden;
    white-space: nowrap;
}
.bot {
    color: blue;
}
.exchange {
    width: 90vw;
    height: 0.5rem;
    margin-left: 3vw;
}
.show {
    float: right;
    margin-right: 0.05rem;
    width: 40vw;
}
.code {
    height: 0.5rem;
    margin-left: 3vw;
    float: left;
}
.winput {
    position: relative;
}
#bot {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
}
#bot input {
    width: 45vw;
}
.winput input{
    margin-top: 0.2rem;
    border-radius: 0.05rem;
    text-indent: 0.1rem;
}
#exchange {
    background: #f5f5f5;
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
