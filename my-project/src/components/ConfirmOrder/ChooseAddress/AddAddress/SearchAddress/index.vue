<template>
    <div class="searchAdd">
       
        <div class="header">
            <i @click="$router.go(-1)" class="el-icon-arrow-left"></i>
            <p>搜索</p>
        </div>
        <div class='searchBox'>
            <input v-model="enter_key" placeholder="请输入小区/写字楼/学校等" type="text">
            <button @click="search">搜索</button>
        </div>
        <div class="list">
      <li
        @click="backToadd(val.name)"
        v-for="(val,index) in lists"
        :key="index"
      >
        <h4 class="ellipase" v-text="val.name"></h4>
        <p class="ellipase" v-text="val.address"></p>
      </li>
    </div>
        <div v-show="isDes" class="des">
            <p>找不到地址?</p>
            <p>尝试输入小区、写字楼或学校名</p>
            <p>详细地址(如门牌号等)可稍后输入哦</p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            enter_key:"",
            city_id:"",
            lists:[],
            isDes:true,
        }
    },
    created(){
    this.city_id=localStorage.getItem('cityId');
        
    },
    methods: {
        search(){
            this.isDes =false;
            if (this.enter_key!="") {
                this.$http({
                method:"GET",
                url:"https://elm.cangdu.org/v1/pois?city_id="+this.city_id+"&keyword="+this.enter_key
            }).then(res=>{
                this.lists=res.data;
            })
            }
        },
        confirm(data){
            this.lists
        },
        backToadd(name){
            this.$emit('backToadd',name);
            this.$router.push({name:"AddAddress"});
        }
    },
}
</script>
<style scoped>
.searchAdd{
    background: #fff;
}
.header > i {
  float: left;
  padding-left: 0.15rem;
  color: #fff;
  font-size: 0.25rem;
  line-height: 0.45rem;
}
.header>p{
    position: absolute;
    left: 50%;
    top: 50%;
   transform: translate(-50%,-50%) 
}
.searchBox{
    margin-top: .45rem;
    display: flex;
    justify-content: space-between;
    height: .6rem;
}
.searchBox>button{
    font-size: .15rem;
    color: #fff;
    width: 23%;
    height: .35rem;
    background-color: #3190e8;
    border: none;
    border-radius: .05rem;
    margin-right: .15rem;
    margin-top: .2rem;
}
.searchBox>input{
        background-color: #f1f1f1;
    margin: .2rem;
    height: .35rem;
    padding-right: .6rem;
    text-indent: .1rem;
    border-radius: .03rem;
    font-size: .15rem;
    color: #999
}
.des{
    position: fixed;
    left: 0;
    right: 0;
    top: 45%;
    bottom: 0;
    font-size: .12rem;
    color: #999;
    text-align: center;
    z-index: 0;
}
.des>p{
    margin: .05rem 0;
}
.list {
  border-top: 1px solid #e4e4e4;
  background: white;
  z-index: 100;
}
.list > li {
  border-bottom: 1px solid #e4e4e4;
  margin-top: 0.1rem;
}
.list h4 {
  margin: 0 auto 0.07rem;
  width: 90%;
  font-size: 0.16rem;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list p {
  width: 90%;
  margin: 0 auto 0.11rem;
  font-size: 0.12rem;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>



