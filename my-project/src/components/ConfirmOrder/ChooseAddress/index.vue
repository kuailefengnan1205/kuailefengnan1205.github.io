<template>
  <div >
    <transition name="fadeRightToLeft">
      <router-view @confirm="confirm" class="add_address"></router-view>
    </transition>
    
    <div class="">
    <div class="header">
      <i @click="$router.push({name:'ConfirmOrder'})" class="el-icon-arrow-left"></i>
      <p>选择地址</p>   
    </div>
    <ul>
      <li @click="toConfirm(val)" v-for="(val,index) in adds" :key="index">
        <i @click="i=index" :class="{isSelected: i==index}" class=" el-icon-circle-check"></i>
        <div>
          <section class="adds_name"><span v-text="val.name"></span><span v-if="val.sex==1">先生</span><span v-else>女士</span><span v-text="val.phone"></span></section>
        <section class="address_detail"><span class="ad_tag"  v-text="val.tag"></span><span class="moreAd" v-text="val.moreAd"></span></section>
        </div>
      </li>
    </ul>
    <div @click="$router.push({name:'AddAddress'})" class="choose_footer">
        <p><span class='plus'>+</span>
        <span>新增收货地址</span></p>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      adds:[],
      i:0,
    };
  },
  created() {
    if (sessionStorage.user_id) {
      this.add_request()
    }
  },
  beforeRouteUpdate (to, from, next) {
    next();
    if (sessionStorage.user_id) {
    this.add_request();
    }
  },
  methods: {
    add_request(){
       this.$http({
      method:"GET",
      url:"https://elm.cangdu.org/v1/users/"+ JSON.parse(sessionStorage.user_id)+"/addresses"
    }).then(res=>{
      this.adds= res.data
    })
    },
    confirm(data){
      this.adds.push(data);
      localStorage.setItem('adds',JSON.stringify(this.adds));
    },
    toConfirm(data){
      this.$emit('address',data);
      this.$router.push({name:"ConfirmOrder"});
    }
  },
};
</script>
<style scoped>
.header > i {
  float: left;
  padding-left: 0.15rem;
  color: #fff;
  font-size: 0.25rem;
  line-height: 0.45rem;
}
.header > a {
  float: right;
  margin-right: 0.15rem;
  transform: scale(1.5);
  color: #fff;
}
.add_address{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #fff;
    z-index: 25;
}
.choose_footer{
   position: absolute;
   bottom: 0;
   left: 50%;
   transform: translateX(-50%);
    height: .5rem;
    border: none;
    display: flex;
}
.choose_footer span{
    color:#3190e8;
    font-size: .18rem
}
ul{
  margin-top: .45rem;
   background: #fff;
}
ul>li{
  height: .5rem;
  margin-left: .1rem;
      display: flex;
    -ms-flex-align: center;
    align-items: center;
    border-bottom: 1px solid #f5f5f5;
    padding: .14rem;
    line-height: .2rem;
}
.el-icon-circle-check{
  margin-right: .1rem;
  font-size: .25rem;
}
.adds_name{
  font-size: .15rem;
    color: #333;
}
.adds_name>span{
  margin-right: .05rem;
}
.adds_name>span:nth-child(1){
  font-size: .16rem;
    font-weight: 700;
}
.plus{
    border: .01rem solid #3190e8;
    border-radius: .2rem;
    padding: .01rem .04rem;
    text-align: center;
   display: inline-block;
}
.address_detail{
  width: 100%;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
}
.ad_tag{
    font-size: .12rem;
    color: #fff;
    border-radius: .03rem;
    background-color: #ff5722;
    height: .16rem;
    line-height: .16rem;
    padding: 0 .05rem;
    margin-right: .1rem;
}
.moreAd{
      font-size: .12rem;
    color: #777;
}
.isSelected{
  color:#4cd964;
}
</style>
