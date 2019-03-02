<template>
    <div>
        <div class="header">
        <i @click="$router.go(-1)" class="el-icon-arrow-left"></i>
      <p>订单列表</p>
    </div>
    <section>
      <ul class="order_list_ul">
        <li v-for="(val,index) in order_info" :key="index">
          <img :src="'//elm.cangdu.org/img/'+val.shopImg" alt="">
          <section class="order_item_right">
            <section>
              <header class="order_header">
                <section>
                  <h5><span v-text="val.shopName"></span><i class="el-icon-arrow-right"></i></h5>
                  <p v-text="val.time"></p>
                </section>
                <!-- <p v-if="">等待支付</p> -->
                <p>支付超时</p>
              </header>
              <section class="food_info">
                <p class='food_name' v-if="val.foods.length==1"><span v-text="val.foods[0].name"></span></p>
                <p v-else><span v-text="val.foods[0].name"></span>等<span v-text="val.foods.length"></span>件商品</p>
                <p class="order_money">¥<span v-text="val.total_money"></span></p>
              </section>
            </section>
            <div class="order_time">
              <div>
                <span class='to_pay'>去支付(还剩<span></span>)</span>
                <span class="more_order">再来一单</span>
              </div>
            </div>
          </section>
        </li>
      </ul>
    </section>
    <div class="footer_all">
      <router-link to="/msite">
      <i class="icon-SSS iconfont iconfont1"></i>
        <p>外卖</p>
      </router-link>
      <router-link to="/search">
      <i class="icon-zhinanzhen1 iconfont iconfont2"></i>
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
      order_info:[],
    }
  },
  methods: {
    
  },
  created() {
      this.$http({
        method:"GET",
        url:"https://elm.cangdu.org/bos/v2/users/"+JSON.parse(sessionStorage.user_id)+"/orders?limit=10&offset=0"
      }).then(res=>{
        this.order_info = res.data;
      })
      if (sessionStorage.selected_foods) {
        // this.order_info = JSON.parse(sessionStorage.selected_foods)
        // console.log(this.order_info);
      }
  },
};
</script>
<style scoped>
.header > i {
  float: left;
  padding-left: 0.1rem;
  color: #fff;
  font-size: .2rem;
  margin-top: .1rem;
}
.header > p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: bolder;
  font-size: 0.18rem;
}
.iconfont3 {
  color: #3190e8;
}
.order_list_ul{
  padding-top: .45rem;
}
.order_list_ul li {
  background-color: #fff;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: .1rem;
    padding:.12rem;
}
.order_list_ul img{
      width: .4rem;
    height: .4rem;
    margin-right: .1rem;
}
.order_item_right{
  flex: 5;
}
.order_header h5{
  font-size: .18rem;
    color: #333;
    line-height: .2rem;
}
.food_name{
  font-size: .15rem;
    color: #666;
}
.order_header,.food_info{
      border-bottom: .005rem solid #f5f5f5;
    padding-bottom: .1rem;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
}
.food_info{
  height: .4rem;
  line-height: .4rem;
}
.to_pay{
      color: orange;
    border-width: .3px;
    border-style: solid;
    border-color: orange;
    font-size: .12rem;
    padding: .03rem
}
.order_money{
  font-size: .15rem;
    color: #f60;
    font-weight: 700;
}
.order_time{
  text-align: right;
  margin-top: .2rem;
}
.more_order{
      font-size: .12rem;
    color: #3190e8;
    border: .005rem solid #3190e8;
    padding: .02rem .04rem;
    border-radius: .03rem;
}
</style>

