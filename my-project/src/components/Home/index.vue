<template>
  <div class="fat">
    <div class="header">
        <p>ele.me</p>
        <router-link v-if="isName" to="/profile"><i class="iconfont icon-rentou"></i></router-link>
        <router-link v-else to="/login">登录|注册</router-link>
    </div>
    <div class='posi'>
        <div class="posi_text">
          <p>当前定位城市:</p>
          <p>定位不准时,请在城市列表选择</p>
        </div>
        <div class='guess'><router-link :to="'/city/'+guess.id" v-text='guess.name'></router-link></div>
    </div>
    <ul class='hotcity'>
    <h4>热门城市</h4>
      <li class="hot" v-for="(city,index) in hot" :key="index">
        <router-link :to='"/city/"+city.id'>
          <span v-text="city.name"></span>
        </router-link>
      </li>
    </ul>
    <div class='cities' v-for="(val,key,index) in list" :key="index">
      <h4 v-text="key"></h4>
      <ul>
        <li v-for="(city,i) in val" :key="i">
          <router-link  :to='"/city/"+city.id' v-text="city.name"></router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: {},
      hot: [],
      guess:{},
      isName:true
    };
  },
  methods: {
    objKeySort(obj){
      var newkey = Object.keys(obj).sort();
      var newObj = {};
      for (var index = 0; index < newkey.length; index++) {
        newObj[newkey[index]] = obj[newkey[index]];
      }
      return newObj;
    },
  },
  created() {
    this.$store.commit("isname");
    this.isName = this.$store.state.isName;
    this.$http({
      method: "get",
      url: "https://elm.cangdu.org/v1/cities?type=group"
    }).then(res => {
      this.list = this.objKeySort(res.data)
    });
    this.$http({
      method: "get",
      url: "https://elm.cangdu.org/v1/cities?type=hot"
    }).then(res => {
      this.hot = res.data;
    });
    this.$http({
      method: "get",
      url: "https://elm.cangdu.org/v1/cities?type=guess"
    }).then(res => {
      this.guess = res.data;
    });
    
  }
};
</script>
<style scoped>
.header>p:nth-child(1),.posi_text>p:nth-child(1){
    float: left;  
}
.header>p:nth-child(1){
    margin-left: 0.15rem;
}
.header>a{
  color: white;
}
.header>a,.posi_text>p:nth-child(2){
    float: right;
    margin-right: 0.2rem; 
}
.posi{
    margin-top: 0.5rem;
    height: 0.7rem;
    font-size: 0.15rem;
    text-indent: 0.15rem;
    background-color: white; 
}
.hotcity{
  margin:0.1rem 0;
  background-color: white; 
}
.posi p{
    padding-top: 0.2rem;
}
.posi>div{
  border-bottom: 1px solid #e4e4e4;
}
.posi_text p:nth-child(2){
   font-weight: 500;
   color: grey;
}
.posi_text{
  height: 0.4rem;
}
.guess{
  bottom: 0;
  height: 0.4rem;
  margin-top: 0.1rem;
}
.guess>a{
  color: #3190e8;
  font-size: 0.18rem;
  line-height: 0.14rem;
}
ul {
  width: 100vw;
  overflow: hidden;
  background-color: white; 
}
ul > li {
  float: left;
  text-align: center;
  color: #333;
  box-sizing: border-box;
  border-bottom: 0.005rem solid #e4e4e4;
  border-right: 0.005rem solid #e4e4e4;
  width: 25vw;
  height: 0.35rem;
  font: 0.15rem Microsoft YaHei;
  line-height: 0.35rem;
  overflow: hidden;
  font-weight:500;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cities{
  margin-bottom: 0.1rem;
}
h4 {
  color: #666;
  font-weight: 400;
  text-indent: 0.15rem;
  border-bottom: 0.005rem solid #e4e4e4;
  font: 0.15rem Helvetica Neue;
  background-color: white; 
}
.hot span{ 
  color: #3190e8;
}
/* ul>li:nth-child(4n){
    border-right: none;
} */
</style>

