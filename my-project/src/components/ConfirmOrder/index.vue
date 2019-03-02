<template>
  <div>
    <transition name="fadeRightToLeft">
    <router-view @back="back" @address="add"  class="childComp"></router-view>
    </transition>
    <div class="header">
      <i @click="$router.push({name:'Shop',query:{id:shopId}})" class="el-icon-arrow-left"></i>
      <p>确认订单</p>
      <router-link v-if="isName" to="/profile">
        <i class="iconfont icon-rentou"></i>
      </router-link>
      <router-link class="login" v-else to="/login">登录|注册</router-link>
    </div>
    <div @click="$router.push({name:'ChooseAddress'})" class="address">
      <div>
        <i class="el-icon-location-outline"></i>
        <span class="please_add" v-if="address==''">请添加一个收货地址</span>
        <li class="select_ad" v-else>
          <div>
            <section class="adds_name">
              <span v-text="address.name"></span>
              <span v-if="address.sex==1">先生</span>
              <span v-else>女士</span>
              <span v-text="address.phone"></span>
            </section>
            <section class="address_detail">
              <span class="ad_tag" v-text="address.tag"></span>
              <span class="moreAd" v-text="address.moreAd"></span>
            </section>
          </div>
        </li>
        <i class="addAddress el-icon-arrow-right"></i>
      </div>
    </div>
    <div class="cover" @click="isCover=false,isChoose=false" v-show="isCover"></div>
    <div class="sendTime">
      <p>送达时间</p>
      <section>
        <p class="soon_send">尽快送达丨预计22:49</p>
        <p class="bee_bird">蜂鸟快送</p>
      </section>
    </div>
    <div v-show="isChoose" class="choose_type">
      <h5>支付方式</h5>
      <ul>
        <li>
          <span>货到付款(商家不支持货到付款)</span>
          <i
            @click="isSelected =!isSelected"
            :class="{isSelected: isSelected}"
            class="el-icon-circle-check"
          ></i>
        </li>
        <li>
          <span>在线支付</span>
          <i
            @click="isSelected =!isSelected"
            :class="{isSelected: !isSelected}"
            class="el-icon-circle-check"
          ></i>
        </li>
      </ul>
    </div>
    <div @click="isCover=true,isChoose=true" class="payWay">
      <p>
        <span class="pay_way">支付方式</span>
        <span class="pay_grey">
          在线支付
          <i class="el-icon-arrow-right"></i>
        </span>
      </p>
      <p class="redPackage">
        <span class="pay_grey">红包</span>
        <span class="pay_grey">暂时只在饿了么APP中支持</span>
      </p>
    </div>
    <div class="foodInfo">
      <header>
        <img :src="'//elm.cangdu.org/img/'+info.image_path" alt>
        <h5 v-text="info.name">店名</h5>
      </header>
      <ul>
        <li v-show="counts[val.id]>0" v-for="(val,index) in selected_foods" :key="index">
          <p v-text="val.name"></p>
          <section class="food_price">
            <p class="food_num">
              x
              <span v-text="counts[val.id]"></span>
            </p>
            <p>
              ¥
              <span v-text="val.price"></span>
            </p>
          </section>
        </li>
        <li>
          <span>餐盒</span>
          <p>
            ¥
            <span></span>
          </p>
        </li>
        <li>
          <span>配送费</span>
          <p>
            ¥
            <span v-text="info.float_delivery_fee"></span>
          </p>
        </li>
      </ul>
      <section class="food_order">
        <section>
          <p>
            订单 ¥
            <span v-text="all_total_money"></span>
          </p>
          <p class="wait_pay_text">待支付</p>
        </section>
        <p class="wait_pay">
          ¥
          <span v-text="all_total_money"></span>
        </p>
      </section>
    </div>
    <div class="remark">
      <section @click.stop="$router.push({name:'Remark'})">
        <p>订单备注</p>
        <p class="pay_grey">
          <span v-if="arr_mark==''">口味、偏好等</span>
          <span v-else v-for="(val,index) in arr_mark" :key="index" v-text="val"></span>
          <i class="el-icon-arrow-right"></i>
        </p>
      </section>
      <section @click="$router.push({name:'Invoice'})">
        <p>发票抬头</p>
        <p class="pay_grey">
          不需要开发票
          <i class="el-icon-arrow-right"></i>
        </p>
      </section>
    </div>
    <div class="pay">
      <p class="wait">
        待支付 ¥
        <span v-text="all_total_money"></span>
      </p>
      <p @click="confirm_order" class="confirm_order">确认下单</p>
    </div>
    <div class="container animation bounceIn" v-show="flag">
      <div class="flag">
        <div class="warn">
          <span></span>
          <span></span>
        </div>
        <p v-text="msg"></p>
        <div @click="confirm" class="confirm">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isName: true,
      selected_foods: [],
      counts: [],
      shopId: "",
      info: "",
      flag: false,
      order_info: [],
      address: "",
      arr_mark: [],
      all_total_money: "",
      total_money: "",
      arr: [],
      msg: "",
      isSelected: false,
      isCover: false,
      isChoose: false
    };
  },
  methods: {
    back(name) {
      this.arr_mark = name;
    },
    add(data) {
      this.address = data;
    },
     add_request(){
       this.$http({
      method:"GET",
      url:"https://elm.cangdu.org/v1/users/"+ JSON.parse(sessionStorage.user_id)+"/addresses"
    }).then(res=>{
      if (res.data.length>0) {
        this.address= res.data[0]
      }
    })
    },
    confirm_order() {
      if (!sessionStorage.username) {
        this.flag = true;
        this.msg = "请登录";
      } else if (this.address == "") {
        this.flag = true;
        this.msg = "请添加收货地址";
      } else {
        this.$router.push({ name: "Payment" });
      }
    },
    confirm() {
      this.flag = false;
    }
  },
  created() {
    this.$store.commit("isname");
    this.isName = this.$store.state.isName;
    this.shopId = JSON.parse(localStorage.getItem("id"));
    this.selected_foods = JSON.parse(sessionStorage.selected_foods);
    this.counts = JSON.parse(sessionStorage.counts);
    this.total_money = JSON.parse(sessionStorage.total_money);
    this.$http({
      method: "GET",
      url: "https://elm.cangdu.org/shopping/restaurant/" + this.shopId
    }).then(res => {
      this.info = res.data;
      this.all_total_money = this.total_money + res.data.float_delivery_fee;
    });
     if (sessionStorage.user_id) {
      this.add_request();
  }
  }
};
</script>
<style scoped>
.childComp {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #fff;
  z-index: 20;
}
.header {
  position: fixed;
  top: 0;
}
.header > i {
  float: left;
  padding-left: 0.15rem;
  box-sizing: border-box;
  color: #fff;
  font-size: 0.25rem;
  line-height: 0.45rem;
}
.icon-rentou {
  float: right;
  transform: scale(1.5) translate(-0.15rem);
  color: #fff;
}
.header > p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 0.2rem;
}
.login {
  font-size: 0.14rem;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(-0.15rem, -50%);
  color: #fff;
}
.address {
  margin-top: 0.45rem;
  height: 0.8rem;
  background: #fff;
}
.select_ad {
  margin-left: 0.3rem;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
  padding: 0.14rem;
  line-height: 0.2rem;
}
.adds_name {
  font-size: 0.15rem;
  color: #333;
}
.adds_name > span {
  margin-right: 0.05rem;
}
.adds_name > span:nth-child(1) {
  font-size: 0.16rem;
  font-weight: 700;
}

.address_detail {
  width: 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
}
.ad_tag {
  font-size: 0.1rem;
  color: #fff;
  border-radius: 0.03rem;
  background-color: #ff5722;
  height: 0.12rem;
  line-height: 0.12rem;
  padding: 0 0.05rem;
  margin-right: 0.1rem;
}
.moreAd {
  font-size: 0.12rem;
  color: #777;
}
.addAddress {
  position: absolute;
  right: 0.15rem;

  font-size: 0.2rem;
  color: #999;
  top: 0.85rem;
}
.el-icon-location-outline {
  color: #3190e8;
  transform: scale(1.3) translateY(0.3rem);
  padding-left: 0.15rem;
}
.sendTime {
  height: 1rem;
  width: 100vw;
  display: flex;
  margin-top: 0.1rem;
  justify-content: space-between;
  border-left: 0.05rem solid #3190e8;
  box-sizing: border-box;
  background: #fff;
  box-sizing: border-box;
  padding: 0 0.15rem;
}
.sendTime > p {
  line-height: 1rem;
  font-size: 0.19rem;
  font-weight: bold;
}
.sendTime > section {
  padding-right: 0.2rem;
  box-sizing: border-box;
}
.soon_send {
  padding-top: 0.2rem;
  color: #3190e8;
  font-size: 0.17rem;
}
.bee_bird {
  float: right;
  margin: 0.15rem 0;
  background: #3190e8;
  font-size: 0.1rem;
  padding: 0.04rem;
  color: #fff;
}
.payWay > p {
  height: 0.5rem;
  background: #fff;
  line-height: 0.5rem;
  padding: 0 0.1rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f5f5f5;
}
.choose_type {
  min-height: 1.5rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 204;
  padding-bottom: 1rem;
}
.cover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 203;
}
.choose_type h5 {
  background-color: #fafafa;
  font-size: 0.15rem;
  color: #333;
  text-align: center;
  line-height: 0.5rem;
  height: 0.5rem;
}
.choose_type li {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0 0.2rem;
  line-height: 0.5rem;
  -ms-flex-align: center;
  align-items: center;
}
.pay_way {
  font-size: 0.16rem;
}
.pay_grey {
  color: #999;
}
.foodInfo {
  background: #fff;
  margin: 0.1rem 0;
  box-sizing: border-box;
  padding: 0 0.15rem;
}
.foodInfo > header {
  display: flex;
}
.foodInfo img {
  width: 0.4rem;
  height: 0.4rem;
  line-height: 0.6rem;
  padding-top: 0.1rem;
  margin-right: 0.1rem;
}
.foodInfo h5 {
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.18rem;
}
.foodInfo > header {
  border-bottom: 1px solid #f5f5f5;
}
.foodInfo li {
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.16rem;
  color: #666;
  display: flex;
  justify-content: space-between;
}
.food_order {
  height: 0.8rem;
  line-height: 0.4rem;
}
.food_order > section {
  display: flex;
  justify-content: space-between;
}
.wait_pay_text,
.food_num {
  margin-right: 0.3rem;
  color: #f60;
}
.please_add {
  display: inline-block;
  position: absolute;
  left: 0.4rem;
  top: 0.85rem;
}
.food_price {
  display: flex;
}
.wait_pay {
  float: right;
  margin-right: 0.3rem;
  color: #f60;
}
.remark {
  box-sizing: border-box;
  padding: 0 0.15rem;
  background: #fff;
  margin-bottom: 0.7rem;
}
.remark > section {
  height: 0.5rem;
  line-height: 0.5rem;

  font-size: 0.16rem;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  justify-content: space-between;
}
.pay {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0.5rem;
  line-height: 0.5rem;
  color: white;
  display: flex;
  justify-content: space-between;
}
.pay > .wait {
  background: #3c3c3c;
  width: 75%;
  text-indent: 0.2rem;
  font-size: 0.18rem;
}
.pay > .confirm_order {
  background: #56d176;
  width: 25%;
  text-align: center;
  font-size: 0.18rem;
}
.isSelected {
  color: #4cd964;
}
.el-icon-circle-check {
  font-size: 0.25rem;
}
</style>

