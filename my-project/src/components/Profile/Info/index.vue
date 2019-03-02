<template>
  <div id="info">
      <div id="header">
          <span @click="back()"><i class="el-icon-arrow-left"></i></span>
          <span>账户信息</span>
      </div>
      <div class="input1">
          <span class="left1">头像</span>
          <div class="right1">
            <img src="//elm.cangdu.org/img/default.jpg" alt="">
            <span class="jiantou"><i class="el-icon-arrow-right"></i></span>
          </div>
      </div>
      <div class="inputk">
        <div>用户名</div>
        <div class="user">
          <p class="name" v-text="username"></p>
        </div>
        <div class="rightk"><i class="el-icon-arrow-right"></i></div>
      </div>
      <div @click="toaddress()" class="input3">
        <span>收货地址</span>
        <span class="right2"><i class="el-icon-arrow-right"></i></span>
      </div>
      <div class="gray"><p>账号绑定</p></div>
      <div class="input4" @click="alert()">
        <img :src="phone" alt="">
        <span>手机</span>
        <span class="right2"><i class="el-icon-arrow-right"></i></span>
      </div>
      <div class="gray"><p>安全设置</p></div>
      <div @click="toforget" class="input2">
        <span>登录密码</span>
        <span>修改</span>
        <span class="right2"><i class="el-icon-arrow-right"></i></span>
      </div>
      <div @click="dlogin()" id="exit">退出登录</div>
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
      <div class="animated bounceIn" id="walert1" v-show="isshow1">
          <div class="tip_icon1">
          <span></span>
          <span></span>
          </div>
          <p v-text="warncont1"></p>
          <div @click="isshow1=!isshow1" class="wbuttonleft">
            再等等
          </div>
          <div @click="suredlogin()" class="wbuttonright">
            退出登录
          </div>
      </div>
      <router-view class="detail" :key="key"></router-view>
  </div>
</template>

<script>
export default {
  name: 'info',
  data() {
      return {
          isshow: false,
          isshow1:false,
          warncont:"请在手机App中设置",
          warncont1:"是否退出登录",
          username:"",
          phone: "data:image/png;base64,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",
      }
  },
  created() {
    this.username = sessionStorage.username
  },
  computed:{
	    key(){
	        return this.$route.path + Math.random();
	    }
	},
  methods: {
    back () {
      this.$router.push({name:"Profile"})
    },
    toaddress () {
      this.$router.push({name:'Address'})
    },
    toforget () {
      this.$router.push({name:'Forget'})
    },
    alert () {
      this.isshow = true;
    },
    dlogin() {
      this.isshow1 = true;
    },
    suredlogin() {
      this.$http({ 
        method:"get",
        url:"https://elm.cangdu.org/v2/signout"
      }).then((res) => {
          if (res.data.message) {
            sessionStorage.clear();
            this.$router.push({name:"Profile"})
          }
      })
    }
  },
}
</script>
<style>
  .detail {
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background: #f2f2f2
  }
  .inputk {
    height: 0.5rem;
    background: white;
    border-bottom: 0.01rem solid #eee;
  }
  .inputk>div {
    float: left;
  }
  .inputk>div:nth-child(1) {
    line-height: 0.5rem;
    margin-left: 0.2rem;
  }
  .inputk>div:nth-child(2) {
    width: 1.5rem;
    line-height: 0.5rem;
    margin-left: 0.5rem;
    color: gray;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .inputk>div:nth-child(3) {
    line-height: 0.5rem;
    float: right;
    margin-right: 5vw;
    color: gray;
  }
  #exit {
    width: 90vw;
    margin-left: 5vw;
    margin-top: 0.1rem;
    background: #d8584a;
    height: 0.4rem;
    text-align: center;
    line-height: 0.4rem;
    border-radius: 0.05rem;
    font-size: 0.12rem;
    color: white;
  }
  .gray>p {
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.12rem;
    margin-left: 0.2rem;
  }
  .input4 {
    height: 0.5rem;
    background: white;
    border-top: 0.01rem solid #eee;
    border-bottom: 0.01rem solid #eee;
    overflow: hidden;
  }
  .input4>span {
    line-height: 0.5rem;
  }
  .input4>span:nth-child(1) {
    margin-left: 5vw;
  }
  .input4>img {
    margin-left: 0.1rem;
    padding-top: 0.1rem;
  }
  .input3 {
    height: 0.5rem;
    background: white;
    border-bottom: 0.01rem solid #eee;
  }
  .input3>span {
    line-height: 0.5rem;
  }
  .input3>span:nth-child(1) {
    margin-left: 5vw;
  }
  .right2 {
    float: right;
    margin-right: 5vw;
    color: gray;
    position: relative;
  }
  .input2 {
    height: 0.5rem;
    background: white;
    border-bottom: 0.01rem solid #eee;
  }
  .input2>span {
    line-height: 0.5rem;
  }
  .input2>span:nth-child(1) {
    margin-left: 5vw;
  }
  .input2>span:nth-child(2) {
    margin-left: 50vw;
    text-overflow: ellipsis;
    overflow: hidden;
    color: gray;
  }
  .left1 {
    margin-left: 5vw;
    line-height: 0.8rem;
  }
  .input1 {
    background: white;
    height:0.8rem;
    margin-top: 0.1rem;
    border-top: 0.01rem solid #eee;
    border-bottom: 0.01rem solid #eee;
  }
  .right1 {
    position: relative;
    width: 0.7rem;
    height: 100%;
    float: right;
    margin-right: 3vw;
    overflow: hidden;
  }
  .right1>img {
    width: 0.5rem;
    border-radius: 50%;
    margin-top: 0.15rem;
  }
  .jiantou {
    float: right;
    line-height: 0.8rem;
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
/* 退出登录窗口 */
  #walert1 {
  background: white;
  border-radius: 0.3rem;
  width: 95vw;
  height: 3rem;
  position: absolute;
  left: 2vw;
  top: 25%;
}
#walert1>p {
  width: 100%;
  height: 0.5rem;
  background: white;
  color: #575757;
  font-size: 0.3rem;
  position: absolute;
  bottom: 1rem;
  text-align: center;
  line-height: 0.5rem;
}
.wbuttonright {
  position: absolute;
  bottom: 0.2rem;
  right: 0.5rem;
  width: 30%;
  height: 0.3rem;
  text-align: center;
  line-height: 0.3rem;
  color: white;
  font-weight: 800;
  background: #dd6b55;
  border-radius:0.1rem;
  font-weight: normal;
}
.wbuttonleft {
  position: absolute;
  bottom: 0.2rem;
  left: 0.5rem;
  width: 30%;
  height: 0.3rem;
  text-align: center;
  line-height: 0.3rem;
  color: white;
  font-weight: 800;
  background: #c1c1c1;
  border-radius:0.1rem;
  font-weight: normal;
}
.tip_icon1 {
  width: 0.8rem;
  height: 0.8rem;
  border: 0.03rem solid #f8cb86;
  border-radius: 50%;
  margin-left: 36%;
  margin-top: 0.1rem;
}
.tip_icon1 span:nth-child(1) {
  display: inline-block;
  width: 0.03rem;
  height: 0.34rem;
  background-color: #f8cb86;
  margin-left: 49%;
  margin-top: 0.1rem;
}
.tip_icon1 span:nth-child(2) {
  display: inline-block;
  width: 0.05rem;
  height:0.05rem;
  border: 0.01rem;
  border-radius: 50%;
  margin-left: 49%;
  background-color: #f8cb86;
}
</style>
