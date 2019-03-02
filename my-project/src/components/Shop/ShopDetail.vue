<template>
  <div class="shop">
    <div class="header">
      <i @click="backShop" class="el-icon-arrow-left backShop"></i>
      <p>商家详情</p>
    </div>
    <section class="active_proper">
      <h3>活动与属性</h3>
      <p class="ellipsis active_msg" v-for="(val,index) in info.activities" :key="index">
        <span class="minus" :style="{backgroundColor: '#'+val.icon_color}" v-text="val.icon_name"></span>
        <span v-text="val.description"></span>(APP专享)
      </p>
      <ul >
        <li class="active_list ellipsis" v-for="(val,index) in info.supports" :key="index">
            <span :style = "{ backgroundColor: '#'+ val.icon_color}" class="active_icon" v-text="val.icon_name"></span>
            <span  v-text="val.description"></span>
            <span>(APP专享)</span>
        </li>
      </ul>
    </section>
    <section class="food_safe">
      <header class="safe_head">
        <h3>食品监督安全公示</h3>
        <p>
          企业认证详情
         <router-link to=""> <i class="el-icon-arrow-right"></i></router-link>
        </p>
      </header>
      <div class="safe_bot">
        <img src alt>
        <div>
          <p>
            监督检查结果 :
            <span></span>
          </p>
          <p>检查日期 :</p>
        </div>
      </div>
    </section>
    <div class="shopMsg">
      <h3>商家信息</h3>
      <ul class="shop_msg">
        <li v-text = "info.name"></li>
        <li>
          地址:
          <span v-text="info.address"></span>
        </li>
        <li>
          营业时间 :
          [<span v-text = "info.opening_hours[0]"></span>]
        </li>
        <li>
          营业执照
          <i @click="isCharter=true" class="shop_info el-icon-arrow-right"></i>
        </li>
        <li>
          餐饮服务许可证
          <i @click="isLicence=true" class="shop_info el-icon-arrow-right"></i>
        </li> 
      </ul>
      <img @click="isCharter=false" v-show="isCharter" class="charter" src="" alt="">
      <img @click="isLicence=false" v-show="isLicence" class="charter" src="" alt="">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isDetail: true,
      info: "",
      isCharter:false,
      isLicence:false
    };
  },
  methods: {
    backShop() {
      this.$router.go(-1);
    },
    server_licence(){

    },
    charter(){

    }
  },
  created() {
    this.info=this.$route.params.info;
  }
};
</script>
<style scoped>
.header:after {
  content: "";
  display: block;
  clear: both;
}
.shop {
  background: #e3e3e3;
  overflow: auto;
}
.backShop {
  float: left;
  color: #fff;
  line-height: 0.45rem;
  text-indent: 0.1rem;
  font-size: 0.25rem;
}
.header > p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  font-weight: 700;
}
.shop h3 {
  font-size: 0.18rem;
  color: #333;
  line-height: 0.4rem;

  border-bottom: 1px solid #f1f1f1;
}
.active_proper,
.food_safe,
.shopMsg {
  background-color: #fff;
  padding: .1rem;
  box-sizing:border-box;
}
.active_proper {
  margin-top: 0.5rem;
}
.food_safe,.shopMsg{
    margin-top: .1rem;
}
.food_safe>header{
    display: flex;
    width: 100%;
    justify-content: space-between;
}
.safe_head > p{
    line-height: .4rem;
    color: #999;
    font-size: .16rem;
    margin-right: .1rem;
}
.safe_bot{
    display: flex;
    padding: 0 .15rem;
}
.shop_msg>li{
   border-top: .005rem solid #f1f1f1;
   line-height: .5rem;
   font-size: .14rem;
   color: #666
}

li>.shop_info{
    float: right;
    line-height: .5rem;
    font-size: .2rem;
    color: #999;
}
.safe_bot p{
    font-size: .14rem;
    color: #666;
    line-height: .3rem;
}
.active_icon,.active_msg>.minus{
    border: 1px solid #f1f1f1;
    border-radius: .05rem;
    padding: .1rem;
    color: #fff;
}
.active_list,.active_msg{
    font-size: .14rem;
    line-height: .3rem;
    color: #666;
    margin-bottom: .1rem;
}
.chart{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 33;
}
</style>