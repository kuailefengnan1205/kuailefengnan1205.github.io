<template>
  <div id="addresspage">
      <div id="header">
          <span @click="back()"><i class="el-icon-arrow-left"></i></span>
          <span>编辑地址</span>
          <span @click="isreturn = !isreturn" v-if="isreturn">编辑</span>
          <span @click="isreturn = !isreturn" v-else>完成</span>
      </div>
      <div id="addresslist">
          <ul>
              <li class="addresslist" v-for="(value,index) in addresses" :key="index">
                <p>{{value.name}}</p>
                <p>{{value.phone}}</p>
                <span @click="dele($event,value.id)" v-if="!isreturn">×</span>
              </li>
          </ul>
      </div>
      <div @click="toadd()" id="creataddress">
         <span>新增地址</span><span><i class="el-icon-arrow-right"></i></span>
      </div>
      <router-view class="detail"></router-view>
  </div>
</template>

<script>
export default {
    name: 'addresspage',
    data() {
        return {
            isreturn:true,
            user_id:"",
            addresses:"",
        }
    },
    created() {
        this.user_id = sessionStorage.user_id;
        this.getaddresses();
    },
    // computed:{
	//     key(){
	//         return this.$route.path + Math.random();
	//     }
	// },
    methods: {
        back() {
            this.$router.push({name:"Info"});
        },
        toadd () {
            this.$router.push({name:"Add"})
        },
        getaddresses () {
            this.$http({
                method:"get",
                url:"https://elm.cangdu.org/v1/users/"+this.user_id+"/addresses",
            }).then((res) => {
                this.addresses = res.data;
            })
        },
        dele (e,id) {
            this.$http({
                method:"delete",
                url:"https://elm.cangdu.org/v1/users/"+this.user_id+"/addresses/"+id,
            }).then((res) => {
                e.target.parentNode.remove();
            })  
        },
    },
}
</script>
<style scoped>
.detail {
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background: #f2f2f2
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
#header>span:nth-child(3) {
    float: right;
    margin-right: 0.2rem;
    line-height: 0.5rem;
    font-weight: 800;   
}
#creataddress {
    margin-top: 0.2rem;
    background: white;
    line-height: 0.5rem;
    border-top: 0.01rem solid #d9d9d9;
    border-bottom: 0.01rem solid #d9d9d9;
    overflow: hidden;
}
#creataddress>span:nth-child(1) {
    margin-left: 0.3rem;
}
#creataddress>span:nth-child(2) {
    float: right;
    margin-right: 0.5em;
}
#addresslist {
    margin-top: 0.1rem;
}
#addresslist li{
    background: white;
    border-top: 0.01rem solid #ddd;
    border-bottom: 0.01rem solid #ddd;
    position: relative;
}
.addresslist>p:nth-child(1){
    line-height: 0.3rem;
    font-size: 0.14rem;
    margin-left: 0.1rem;
}
.addresslist>p:nth-child(2){
    line-height: 0.3rem;
    margin-left: 0.1rem;
    font-size: 0.14rem;
}
.addresslist>span {
    z-index: 3;
    position: absolute;
    font-size: 0.25rem;
    right: 3vw;
    top: 0.15rem;
}
</style>
