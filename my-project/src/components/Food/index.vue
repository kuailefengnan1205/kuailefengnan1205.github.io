<template>
  <div>
    <div class="header">
      <i @click="$router.go(-1)" class="el-icon-arrow-left backSite"></i>
      <p v-text="title"></p>
    </div>
    <div class="choose_shop">
      <li :class="{send_blue:isDetail}" @click="isDetail = !isDetail,isOrder=false,isSend=false">
        <p ><span v-text="title"></span><i class="el-icon-caret-bottom"></i></p>
        <p v-for="(val,index) in types" :key="index"></p>
      </li>
      <li :class="{send_blue:isOrder}" @click="isDetail = false,isOrder=!isOrder,isSend=false">
        <p><span>排序</span> <i class="el-icon-caret-bottom"></i></p>
        <p v-for="(val,index) in types" :key="index"></p>
      </li>
      <li :class="{send_blue:isSend}" @click="isDetail = false,isOrder=false,isSend=!isSend"><p>筛选<i class="el-icon-caret-bottom"></i></p></li>
    </div>
    <div v-show="!(!isDetail&&!isOrder&&!isSend)" class="cover"></div>
    <transition name="fade" mode="out-in">
    <div v-show="isDetail" class="detail">
      <div class="detail_left">
        <li
          :class="{type_selected:restaurant_category_id==val.id}"
          @click="type_change(val.sub_categories,val.id)"
          v-for="(val,index) in types"
          :key="index"
        >
          <div class="detail_left_name">
            <i v-if="index==7" class="icon-shangjia1 iconfont"></i>
            <img v-if="val.image_url" class="detail_left_img" :src="'https://fuss10.elemecdn.com/'+imgchange(val.image_url)" alt>
            <p class="detail_name" v-text="val.name"></p>
          </div>
          <p class="detail_count">
            <span v-text="val.count"></span>
            <i class="el-icon-arrow-right"></i>
          </p>
        </li>
      </div>
      <div class="detail_right">
        <li @click="to_send_type(sub.id,sub.name)" v-for="sub in sub_categories" :key="sub.id">
          <p v-text="sub.name"></p>
          <p class="sub_count" v-text="sub.count"></p>
        </li>
      </div>
    </div>
    </transition>
    <transition name="fade" mode="out-in">
    <div v-show="isOrder" class="detail_order">
      <li class="order_choose" @click="order_select(index,or.id)" v-for="(or,index) in order" :key="index">
       <div> <i :class="or.class"></i><p class="order_name" v-text="or.name"></p></div>
        
        <i v-show="order_index == index" class="el-icon-check order_icon"></i>
      </li>
    </div>
    </transition>
    <transition name="fade" mode="out-in">
    <div v-show="isSend" class="detail_send">
      <section>
        <p>配送方式</p>
        <p   class="bird_send" @click = "send_choose('8')">
             <i v-if="send_arr.indexOf('8')==-1" class="icon-fengniao iconfont"></i>
           <i v-if="send_arr.indexOf('8')!=-1" class="el-icon-check send_check"></i>
         <span :class="{send_blue:send_arr.indexOf('8')!=-1}">蜂鸟配送</span> 
        </p>
      </section>
      <section>
        <p>商家属性(可以多选)</p>
        <ul class="attrs">
          <li @click="send_choose(val.id)" v-for="(val,index) in shop_attr" :key="index">
            <span
              class="attr_icon"
              :style="{borderColor:'#'+val.icon_color,color:'#'+val.icon_color}"
              v-text="val.icon_name"
              v-if="send_arr.indexOf(val.id)==-1"
            ></span>
            <i v-else class="el-icon-check send_check"></i>
            <span :class="{send_blue:send_arr.indexOf(val.id)!=-1 }" class="shop_attr" v-text="val.name"></span>
          </li>
        </ul>
      </section>
      <section class="send_foot">
        <button @click="clear_send" class="clear">清空</button>
        <button @click="confirm_send" class="confirm">
          确定<span v-show="count>0">(<span v-text="count"></span>)</span>
          <span v-text="send_count"></span>
        </button>
      </section>
    </div> 
    </transition>
    <div class="detail_cover" v-show="detail_cover"></div>
    <div class="stores">
      <ul>
        <li @click="toRest(val.id)" class="restaurant" v-for="(val,index) in shops" :key="index">
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
                <el-rate class="rate" v-model="val.rating" disabled></el-rate>
                <span class="rating" v-text="val.rating"></span>
                月售
                <span v-text="val.recent_order_num"></span>单
              </section>
              <div v-for="(val,index) in send_ways" :key="index">
                <span class="send" v-text="val.text"></span>

              </div>
            </div>
            <footer class="res_bot">
              <p>
                ¥
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
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      types: [],
      i: "",
      bird:true,
      order_index: "",
      send_index: "",
      count:"",
      sub_categories: [],
      sends: [],
      send_count: "",
      isDetail: false,
      isOrder: false,
      isSend: false,
      isSendChoose: true,
      detail_cover: false,
      restaurant_category_id:"",
      shop_attr: [],
      send_arr:[],
      place:{},
      send_ways:[],
      longitude: "",
      latitude: "",
      order: [
        { name: "智能排序", id: 4 , class:"icon-jiage iconfont"},
        { name: "距离最近", id: 5 ,class:"icon-position-o iconfont"},
        { name: "销量最高", id: 6 ,class:"icon-icon-- iconfont"},
        { name: "起送价最低", id: 1,class:"icon-jinqian iconfont" },
        { name: "配送速度最快", id: 2,class:'icon-shijian iconfont' },
        { name: "评分最高", id: 3,class:'icon-star_off iconfont' }
      ],
      shops: [],
      api: "https://elm.cangdu.org/shopping/restaurants"
    };
  },
  created() {
    let place = JSON.parse(localStorage.getItem("place"));
    this.place = place
    this.latitude = place.latitude;
    this.longitude = place.longitude;
    this.title = this.$route.query.title;
    this.restaurant_category_id = this.$route.query.restaurant_category_id;
    this.$http({
      method: "GeT",
      url:"https://elm.cangdu.org/shopping/v1/restaurants/delivery_modes"
    }).then(res=>{
      this.send_ways = res.data;
    })
    this.$http({
      method: "GET",
      url:
        "https://elm.cangdu.org/shopping/restaurants?latitude=" +
        this.latitude +
        "&longitude=" +
        this.longitude
    }).then(res => {
      this.shops = res.data;
    });
    this.$http({
      method: "GET",
      url: "https://elm.cangdu.org/shopping/v2/restaurant/category"
    }).then(res => {
      this.types = res.data;
      this.sub_categories = res.data.sub_categories;
    });
    this.$http({
      method: "GET",
      url:
        "https://elm.cangdu.org/shopping/restaurants?latitude=" +
        this.latitude +
        "&longitude=" +
        this.longitude +
        "&restaurant_category_id=" +
        this.restaurant_category_id
    }).then(res => {
    });
    this.$http({
      method: "GET",
      url: " https://elm.cangdu.org/shopping/v1/restaurants/activity_attributes"
    }).then(res => {
      this.shop_attr = res.data;
    });
  },
  methods: {
    type_change(sub_categories, id) {
      this.sub_categories = sub_categories;
      this.restaurant_category_id =id;
    },
    order_select(i, id) {
      this.order_index = i;
      this.$http({
        method: "GET",
        url:
          "https://elm.cangdu.org/shopping/restaurants?latitude=" +
          this.latitude +
          "&longitude=" +
          this.longitude +
          "&order_by=" +
          id
      }).then(res => {
        this.shops = res.data;
      });
      this.isOrder = false;
    },
    toRest(id) {
      localStorage.setItem("id",JSON.stringify(id));
      this.$router.push({
        name: "Shop",
        query: { geohash: this.geohash, id: id }
      });
    },
    send_choose(i) {
      if (this.send_arr.indexOf(i)==-1) {
        this.send_arr.push(i);
        this.count++
      } else {
        let num = this.send_arr.indexOf(i);
        this.send_arr.splice(num,1);
        this.count--
      }
    },
    clear_send(){
      this.count = 0;
      this.send_arr = [];
    },
    confirm_send(){
      this.$http({
        method:"GET",
        url:"https://elm.cangdu.org/shopping/restaurants",
        params:{
          latitude:this.latitude,longitude:this.longitude,support_ids:this.send_arr
        }
      }).then(res=>{
        this.shops = res.data;
        this.isSend=false;
      })
    },
    imgchange(str){
      let arr = str.split("");
       arr.splice(1,0,'/');
       arr.splice(4,0,'/');
      if (str.indexOf('png')!=-1) {
        let arr1 = arr.join("")+".png";
       return arr1
      }else if (str.indexOf('jpeg')!=-1) {
        let arr1 = arr.join("")+".jpeg";
       return arr1
      }else if(str.indexOf('jpg')!=-1){
        let arr1 = arr.join("")+".jpg";
       return arr1
      } else{
        return false;
      }
    },
    to_send_type(id,sub_name) {
      this.title= sub_name
      this.$http({
        methdod: "GET",
        url:
          "https://elm.cangdu.org/shopping/restaurants",
        params:{
          latitude :this.place.latitude,
          longitude :this.place.longitude,
          restaurant_category_ids : [id]
        } 
      }).then(res=>{
          this.shops =res.data;
          this.isDetail =false;
          
      })
    }
  }
};
</script>
<style scoped>
.detail,
.detail_order,
.detail_send {
  position: fixed;
  z-index: 6;
  display: flex;
  padding-top: 0.85rem;
}
.detail {
  height: 3.6rem;
}
.detail_order {
  flex-flow: wrap;
  height: 2.4rem;
}
.detail_send {
  flex-flow: wrap;
  background: #fff;
}
.attrs {
  display: flex;
  flex-flow: wrap;
  justify-content: space-around;
}
.detail_send p {
  font-size: 0.12rem;
  margin: 0.1rem;
  color: #666;
}
.attrs > li {
  width: 30%;
  height: 0.3rem;
  line-height: 0.3rem;
  margin-bottom: 0.05rem;
  border: 0.005rem solid #f5f5f5;
  border-radius: 0.05rem;
}
.bird_send{
  width: 1.1rem;
  height: 0.3rem;
  line-height: 0.3rem;
  margin-bottom: 0.05rem;
  border: 0.005rem solid #f5f5f5;
  border-radius: 0.05rem;
}
.send_blue {
  color: #3190e8;
}
.send_blue>p{
  color: #3190e8;
}
.attr_icon {
  border: 0.005rem solid;
  font-size: 0.13rem;
  padding: 0.02rem 0.03rem;
  border-radius: 0.05rem;
  margin-left: 0.1rem;
 
}
.send_check{
 color:#3190e8;
  font-size: 0.16rem;
  width: .19rem;
  line-height: .3rem;
  margin-left: .1rem;
}
.icon-fengniao{
  margin-left:.1rem;
  line-height: .3rem;
  color: #3190e8;
}
.shop_attr {
  font-size: 0.12rem;
}
.send_foot {
  display: flex;
  justify-content: space-around;
  background: #e4e4e4;
}
.send_foot > button {
  display: inline-block;
  width: 1.7rem;
  height: 0.4rem;
  margin: 0.05rem 0.1rem;
  border-radius: 0.1rem;
  border: none;
  font-size: 0.18rem;
}
.tag{
  font-size: .1rem;
  border: .005rem solid #f1f1f1;
  padding: .005rem .02rem;
  box-sizing: border-box;
  margin-left: .05rem;
}
.clear {
  background: #fff;
}
.confirm {
  color: #fff;
  background: #56d176;
}
.fade-enter-active{
  animation: fadeIn .3s
}
@keyframes fadeIn{
  from{transform: translateY(-3rem)}
  to{transform: translateY(0)}
}
.detail_order > li {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 0.6rem;
  line-height: 0.6rem;
  background: #fff;
  z-index: 6;
  font-size: 0.14rem;
  color: #666;
  border-bottom: 0.005rem solid #f5f5f5;
}
.order_choose>div{
  display: flex;
  margin-left: .15rem;
  width: 40%;
}
.order_icon {
  line-height: 0.6rem;
  transform: scale(1.3);
  font-weight: bold;
  margin-right: 0.15rem;
  color: #3190e8;
}
.icon-shangjia1{
  color:#3190e8;
  font-size: .2rem;
  line-height: .4rem;
  margin-right: .1rem;
  margin-left: .04rem;
}
.order_name {
  padding-left: 0.1rem;
}
.icon-jiage{
  color:#3190e8;
}
.icon-position-o{
  color:#3190e8;
}
.icon-icon--{
  color: red;
}
.icon-jinqian{
  color: orange;
}
.icon-shijian{
  color:#3190e8;
}
.icon-star_off{
  color:salmon;
}
.iconfont{
 font-size: .2rem;
}
.detail_left {
  background-color: #f5f5f5;
  width: 50%;
  display: flex;
  flex-flow: wrap;
  line-height: 0.3rem;
  z-index: 6;
}
.type_selected {
  background: #fff;
}
.detail_left > li {
  width: 100%;
  height: 0.4rem;
  display: flex;
  font-size: 0.12rem;
  justify-content: space-between;
}
.detail_name {
  color: #666;
  height: 0.4rem;
  line-height: 0.4rem;
}

.detail_count > span {
  background-color: #ccc;
  color: #fff;
  font-size: 0.1rem;
  line-height: 0.4rem;
  padding: 0 0.05rem;
  border: 0.005rem solid #ccc;
  border-radius: 0.1rem;
  vertical-align: middle;
  margin-right: 0.05rem;
}
.detail_right {
  background: #fff;
  width: 50%;
  flex: 1;
  flex-flow: wrap;
  overflow-y: auto;
  font-size: 0.13rem;
  color: #666;
  z-index: 6;
}
.detail_right > li {
  display: flex;
  justify-content: space-between;
  height: 0.4rem;
  line-height: 0.4rem;
  border-bottom: 0.005rem solid #e4e4e4;
  margin-left: 0.1rem;
  padding-right: .1rem;
  box-sizing: border-box;
}
::-webkit-scrollbar {
  width: 0px;
  height: 1px;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.2);
}
.sub_count {
  margin-right: 0.1rem;
}
.detail_left_name {
  display: flex;
  margin-left: 0.2rem;
}
.detail_left_img{
  width: .25rem;
  height: .25rem;
  margin-right: .1rem;
  margin-top: .08rem;
}
.detail_cover {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 4;
  background-color: rgba(0, 0, 0, 0.3);
}

.el-icon-arrow-right {
  padding: 0.08rem;
}
.header {
  position: fixed;
  z-index: 30;
}
.backSite {
  float: left;
  line-height: 0.4rem;
  font-size: 0.25rem;
  margin-left: 0.05rem;
}
.header > p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: 700;
  font-size: 0.19rem;
}
.cover{
  position: fixed;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: rgba(0,0,0,.3);
}
.choose_shop {
  margin-top: 0.45rem;
  display: flex;
  position: fixed;
  background: #fff;
  z-index: 30;
  width: 100%;
  height: 0.4rem;
  border-bottom: 0.005rem solid #f5f5f5;
}
.choose_shop > li {
  width: 33.33%;
  text-align: center;
  line-height: 0.4rem;
  font-size: 0.13rem;
  color: #333;
}
.choose_shop > li:nth-child(2) {
  border-left: 0.005rem solid #e4e4e4;
  border-right: 0.005rem solid #e4e4e4;
}
.el-input__inner {
  border: none;
}
.stores {
  padding-top: 0.9rem;
  width: 100vw;
  background: #fff;
}
.restaurant {
  display: flex;
  border-bottom: 0.025rem solid #f1f1f1;
  padding: 0.14rem 0.08rem;
}
ul article {
  flex: auto;
}
.res_head {
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-align: center;
  align-items: center;
  height: 0.2rem;
  line-height: 0.2rem;
}
.res_head h4 {
  color: #333;
  font-weight: 700;
}
.res_head > div {
  width: 1.7rem;
  padding-top: 0.01rem;
  font: 0.13/0.13 PingFangSC-Regular;
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
  font-size: 0.1rem;
  line-height: 0.2rem;
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
.brand {
  width: 0.3rem;
  float: left;
  font-weight: bold;
  background: yellow;
  font-size: 0.12rem;
  text-align: center;
  margin-right: 0.1rem;
}
.tag {
  font-size: 0.1rem;
  color: #999;
  border: 0.005rem solid #f1f1f1;
  box-sizing: border-box;
  margin-left: 0.05rem;
}
.send {
  color: #fff;
  background-color: #3190e8;
  border: 0.01rem solid #3190e8;
  font-size: 0.12rem;
  line-height: 0.15rem;
}
.rightTime {
  color: #3190e8;
  border: 0.01rem solid #3190e8;
  margin-left: 0.02rem;
  font-size: 0.12rem;
  line-height: 0.15rem;
}
.rate {
  transform: scale(0.7);
}
.rating {
  color: gold;
  margin-right: 0.1rem;
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
.time {
  color: #3190e8;
}
.swip {
  display: flex;
  flex-wrap: wrap;
}
.stores img {
  width: 40%;
}
.stores_title {
  font-size: 0.12rem;
  height: 0.2rem;
  line-height: 0.2rem;
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;
}
.restaurant img {
  width: 0.6rem;
  height: 0.6rem;
  display: block;
  margin-right: 0.08rem;
}
.el-icon-check {
  border: none;
}
</style>