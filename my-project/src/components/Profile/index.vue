<template>
  <div id="underpage">
    <div class="header">
      <router-link to="/home"><i class="el-icon-arrow-left"></i></router-link>
      <p>我的</p>
    </div>
    <div @click="Info()" class="info">
      <img src="//elm.cangdu.org/img/default.jpg" alt="">
      <div class="user">
        <div class="name" v-if="flag"><router-link  to="/login">登录/注册</router-link></div>
        <div v-else class="name">{{username}}</div>
        <div><i class="icon-shouji iconfont"></i> 暂无绑定手机号</div>
      </div>
      <div class="more"><i class="el-icon-arrow-right"></i></div>
    </div>
    <div class="account">
      <router-link to="/balance">
        <div class="balance">
          <span class="yellow">0.00</span>元
          <p class="txt">我的余额</p>
        </div>
      </router-link>
      <router-link to="/benefit">
        <div class="benefit">
          <p v-if="flag"><span class="org">0</span><span>个</span></p>
          <p v-else><span class="org">3</span><span>个</span></p>
          <p class="txt">我的优惠</p>
        </div>
      </router-link>
      <router-link to="/points">
        <div class="points">
          <span class="green">0</span>分
          <p class="txt">我的积分</p>
        </div>
      </router-link>
    </div>
    <div class="my">
      <router-link to="/order">
        <div class="order"><i class="icon-icon--copy iconfont m_font"></i> 我的订单</div>
      </router-link>
      <router-link to="/chome">
        <div class="chome"><i class="icon-jifenshangcheng iconfont m_font"></i> 积分商城</div>
      </router-link>
      <router-link to="/vipcard">
        <div class="vipcard"><i class="icon-huangguan iconfont m_font"></i> 饿了么会员卡</div>
      </router-link>
    </div>
    <div class="server">
      <router-link to="/service">
        <div> <i class="icon-fuwuzhongxin1 iconfont m_font"></i> 服务中心</div>
      </router-link>
      <router-link to="/download">
        <div class="download"><i class="icon-eliaomo iconfont m_font"></i> 下载饿了么APP</div>
      </router-link>
    </div>
    <div class="footer_all">
      <router-link to="/msite">
      <i class="icon-SSS iconfont iconfont1"></i>
        <p>外卖</p>
      </router-link>
      <router-link to="/search">
      <i class="icon-icon02 iconfont iconfont2"></i>
        <p>搜索</p>
      </router-link>
      <router-link to="/order">
      <i class="iconfont icon-icon--copy iconfont3"></i>
        <p>订单</p>
      </router-link>
      <router-link to="/profile">
      <i class="iconfont icon-yonghu1 iconfont4"></i>
        <p>我的</p>
      </router-link>
    </div>
    <router-view class="Infopage"></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      user_id:"",
      flag:false,
    };
  },
  methods: {
    Info () {
      if (sessionStorage.username) {
          this.$router.push({name:'Info',query:this.username})
      } else {
          this.$router.push({name:'Login'})
      }
    },
    islogin () {
        if (sessionStorage.username) {
            this.flag=false;
        } else {
            this.flag=true;
        }
    }
  },
  created() {
      this.flag=false;
      this.username = sessionStorage.username;
      this.user_id = sessionStorage.user_id;
      this.islogin();
  },
  beforeRouteUpdate (to, from, next) {
    next();
    this.islogin();
  }
};
</script>
<style scoped>
.Infopage {
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  background: #f2f2f2
}
.txt {
    color: gray;
    font-size: 0.14rem;
  }
.yellow {
    display: inline-block;
    margin-top: 0.15rem;
    color: #f90;
    font-size: 0.3rem;
    font-weight: 800;
  }
  .org {
    display: inline-block;
    margin-top: 0.15rem;
    color: #ff5f3e;
    font-size: 0.3rem;
    font-weight: 800;
  }
  .green {
    display: inline-block;
    margin-top: 0.15rem;
    color: #6ac20b;
    font-size: 0.3rem;
    font-weight: 800;
  }
.info>img {
  width: 0.6rem;
  border-radius: 50%;
  margin-left: 10vw;
}
.header {
  height: 0.45rem;
  position: relative;
  background: #3190e8;
  color: white;
  text-align: center;
  line-height: 0.45rem;
}
.header > a {
  float: left;
  margin-left: 0.2rem;
  color: white;
}
.header > p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: bolder;
  font-size: 0.2rem;
}
.info {
  height: 1rem;
  background: #3190e8;
  display: flex;
  align-items: center;
  color: #fff;
}
.user{
  line-height: .3rem;
  margin-left: 0.2rem;
}
.more {
  position: absolute;
  font-size: 0.2rem;
  right: 0.15rem;
}
.user > .name{
  font-weight: bold;
  font-size: 0.18rem
}
.name>a{
  font-weight: bold;
  color: #fff;
}
.user>div:nth-child(2){
  font-size: .14rem
}
.info:after {
  content: "";
  display: block;
  clear: both;
}
.account {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  box-sizing: border-box;
}
.account > a {
  display: inline-block;
  color: #333;
  font-weight: 400;
  width: 33.33%;
  font-size: 0.14rem;
  height: 100%;
  font-family: Microsoft Yahei;
  text-align: center;
}
.account > a:nth-child(1),
.account > a:nth-child(2) {
  border-right: 1px solid #f1f1f1;
}
.balance>div,.benefit>div,.points>div{
  height: .4rem;
  line-height: .4rem;
}
.balance>p,.benefit>p,.points>p{
    line-height: 0.3rem;
}
.my {
  padding-left: 0.2rem;
  background: #fff;
  display: flex;
  flex-flow: wrap;
  align-content: space-around;
  margin-top: 0.1rem;
}
.my > a {
  width: 100%;
  line-height: 0.4rem;
  border-bottom: 1px solid #e4e4e4;
}
.my > a:nth-child(3) {
  border: none;
}
.server {
  margin-top: 0.1rem;
  background: #fff;
  padding-left: 0.2rem;
  line-height: 0.4rem;
}
.server div {
  height: 0.4rem;
  border-bottom: 1px solid #e4e4e4;
}
.server .download {
  border: none;
}
.iconfont4{
  color: #3190e8;
}
.icon-jifenshangcheng{
 color: rgb(252, 123, 83)
}
.icon-huangguan{
  color:rgb(255, 198, 54);
}
.icon-fuwuzhongxin1{
  color: rgb(74, 165, 240);
}
.icon-eliaomo {
  color: rgb(74, 165, 240);
  font-size: .13rem!important;
}
.m_font{
  margin-right: .1rem;
  font-size: .15rem
}
</style>

