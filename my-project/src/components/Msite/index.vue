<template >
  <div>
    <div class="header">
      <router-link :to="'/search?geohash='+ geohash">
        <i class="el-icon-search"></i>
      </router-link>
      <router-link to="/home" v-text="ad"></router-link>
      <router-link v-if="isName" to="/profile"><i class="icon-rentou iconfont"></i></router-link>
      <router-link v-else to="/login">登录|注册</router-link>
    </div>
    <nav class="banner">
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide>
          <ul class="swip">
            <li class="stores" v-for="(val,index) in stores_fir" :key="index">
              <router-link :to="'/food?geohash='+geohash+'&title='+val.title+'&restaurant_category_id='+val.id">
                <img :src="'https://fuss10.elemecdn.com'+val.image_url" alt="">
                <p class="stores_title" v-text="val.title"></p>
              </router-link>
            </li>
          </ul>
        </swiper-slide>
        <swiper-slide>
            <ul class="swip">
            <li class="stores" v-for="(val,index) in stores_last" :key="index">
              <router-link :to="'/food?geohash='+geohash+'&title='+val.title+'&restaurant_category_id='+val.id">
                <img :src="'https://fuss10.elemecdn.com'+val.image_url" alt="">
                <p  class="stores_title" v-text="val.title"></p>
              </router-link>
            </li>
          </ul>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </nav>
    <div class="store">
      <p class="all_store"><i class="icon-shangjia iconfont"></i><span>附近商家</span> </p>
      <li @click="toRest(val.id)" class="restaurant" v-for="(val,index) in info" :key="index">
        <section>
          <img :src="'//elm.cangdu.org/img/'+val.image_path" alt>
        </section>
        <article>
          <header class="res_head">
            <div>
              <p class="brand">品牌</p>
              <h4 v-text="val.name"></h4>
            </div>
            <ul>
              <li class="tag" :style={color:val.icon_color} v-for="(icon,index) in val.supports" :key ="index" v-text="icon.icon_name"></li>
            </ul>
          </header>
          <div class="mid">
            <section>
              <el-rate class="rate" v-model="val.rating" disabled ></el-rate>
              <span class="rating" v-text="val.rating"></span>
              月售
              <span v-text="val.recent_order_num"></span>单
            </section>
            <div>
              <span class="send">蜂鸟快送</span>
              <span class="rightTime">准时达</span>
            </div>
          </div>
          <footer class="res_bot">
            <p>¥
              <span v-text="val.float_minimum_order_amount"></span>起送/
              <span v-text="val.piecewise_agent_fee.tips"></span>
            </p>
            <p>
              <span v-text="val.distance"></span>/
              <span class="time" v-text="val.order_lead_time"></span>
            </p>
          </footer>
        </article>
      </li>
    </div>
    <div class="footer_all">
      <router-link to="/msite">
      <i class="icon-changyonglogo401 iconfont iconfont1"></i>
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
      <i class="iconfont icon-yonghu1"></i>
        <p>我的</p>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ad: "",
      geohash: "",
      latitude: "",
      longitude: "",
      stores_fir:[],
      stores_last:[],
      info: {},
      isName: false,
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  methods: {
      toRest(id){
          localStorage.setItem('id',JSON.stringify(id))
          this.$router.push({name:"Shop",query:{geohash:this.geohash,id:id}});
      },
      iSad(){
       if (sessionStorage.ad) {
          this.ad = sessionStorage.ad;
       } else {
         this.ad = ""
       }
      },
  },
  created() {
    this.$store.commit("isname");
    this.isName = this.$store.state.isName;
    this.iSad();
    this.geohash = JSON.parse(localStorage.getItem("place")).geohash;
    this.latitude = JSON.parse(localStorage.getItem("place")).latitude;
    this.longitude = JSON.parse(localStorage.getItem("place")).longitude;
    this.$http({
      method: "GET",
      url:"https://elm.cangdu.org/v2/index_entry"
      }).then(res=>{
        this.stores = res.data;
        this.stores_fir = res.data.slice(0,8);
        this.stores_last = res.data.slice(8,16);
      })
     this.$http({
      method: "GET",
      url:
        "https://elm.cangdu.org/shopping/restaurants?latitude=" +
        this.latitude +
        "&longitude=" +
        this.longitude
    }).then(res => {
      this.info = res.data;
    });
    this.$http({
      method: "GET",
      url:
        "https://elm.cangdu.org/shopping/restaurants?latitude=" +
        this.latitude +
        "&longitude=" +
        this.longitude
    }).then(res => {
      this.info = res.data;
    });
  }
};
</script>
<style scoped>
.header > a {
  color: white;
}
.header > a:nth-child(1) {
  float: left;
  padding-left: 0.2rem;
}
.header > a:nth-child(2) {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding-left: 0.2rem;
}
.header > a:nth-child(3) {
  float: right;
  margin-right: 0.1rem;
  font-size: 0.14rem;
}
.banner {
  margin-top: 0.5rem;
  margin-bottom: 0.1rem;
  background: #fff;
}
.swiper-slide {
  padding: .1rem 0;
}
.store {
  background: #fff;
  padding-bottom: .5rem;
}
.all_store {
  text-indent: 0.15rem;
  color: #999;
  font: 0.11rem/.32rem Microsoft YaHei;
  height: 0.4rem;
}
.all_store>i{
  margin-right: .06rem;
  font-size: .15rem;
  line-height: .4rem;
}
.restaurant {
  display: flex;
  border-bottom: 0.025rem solid #f1f1f1;
  padding: 0.14rem 0.08rem;
}
.store article {
  flex: auto;
}
.res_head {
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-align: center;
  align-items: center;
  height: .2rem;
  line-height: .2rem;
}
.res_head h4{
  color: #333;
   font-weight: 700;
}
.res_head > div {
  width: 1.7rem;
  padding-top: 0.01rem;
  font: 0.13/.13 PingFangSC-Regular;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.res_head > ul {
  display: flex;
  transform: scale(0.8);
  margin-right: -0.06rem;
}
.mid {
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-top: 0.1rem;
}
.mid > section {
  display: flex;
  -ms-flex-pack: start;
  justify-content: flex-start;
  font-size: .1rem;
  line-height: .2rem;
}
.mid div {
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  transform: scale(0.7);
  min-width: 1rem;
  -ms-flex-pack: end;
  justify-content: flex-end;
  margin-right: -0.16rem;
}
.brand{
  width: .3rem;
  float: left;
  font-weight: bold;
  background: yellow;
  font-size: .12rem;
  text-align: center;
  margin-right: .1rem;
}
.tag{
  font-size: .1rem;
  border: .005rem solid #f1f1f1;
  padding: .005rem .02rem;
  box-sizing: border-box;
  margin-left: .05rem;
}
.send{
  color: #fff;
    background-color: #3190e8;
    border: .01rem solid #3190e8;
    font-size: .12rem;
    line-height: .15rem;
}
.rightTime{
  color: #3190e8;
    border: .01rem solid #3190e8;
    margin-left: .02rem;
    font-size: .12rem;
    line-height: .15rem;
}
.rate{
    transform:  scale(.7)
}
.rating{
  color:gold;
  margin-right: .1rem;
}
.res_bot {
  margin-top: 0.1rem;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  font-size: 0.1rem;
  color: #333;
}
.res_bot > p:nth-child(1) {
  transform: scale(0.9);
  font-size: 0.1rem;
  color: #666;
}
.time{
    color: #3190e8;
}
.swip{
  display: flex;
  flex-wrap: wrap;
}
.stores{
  width: 25%;
  text-align: center;
}
.stores img{
  width: 40%;
}
.stores_title{
  font-size: .12rem;
  height: .2rem;
  line-height: .2rem;
  margin-top: .1rem;
  margin-bottom: .1rem;
}
.restaurant img{
    width: .6rem;
    height: .6rem;
    display: block;
    margin-right: .08rem;
}
.iconfont1{
   color: #3190e8;
}

</style>

