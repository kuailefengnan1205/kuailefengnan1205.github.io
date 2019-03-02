<template>
  <div id="addDetail">
    <div id="header">
        <span @click="back()"><i class="el-icon-arrow-left"></i></span>
        <span>搜索地址</span>
    </div>
    <div id="seacher">
        <input v-model="address" type="text" placeholder="请输入小区/写字楼/学校等">
        <div @click="getaddress()">确定</div>
    </div>
    <div class="tishi">
        为了满足商家的送餐要求,建议您从列表中选择地址
    </div>
    <ul>
        <li @click="toadd(value.name)" v-for="(value,index) in addresslist" :key="index" class="mylist">
            <p v-text="value.name"></p>
            <p v-text="value.address"></p>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
    name: 'addDetail',
    data() {
        return {
            address:"",
            addresslist:"",
        }
    },
    methods: {
        // tranname (name) {
        //     this.$emit("tranname",name)
        // },
        toadd (cityname) {
            this.$store.state.cityname = cityname;
            this.$router.push({name:"Add"})
        },
        back () {
            this.$router.go(-1)
        },
        getaddress() {
            this.$http({
                method:"get",
                url:"https://elm.cangdu.org/v1/pois?&keyword="+this.address+"&type=search",
            }).then((res) => {
                this.addresslist = res.data;
            })
        },
    },
}
</script>
<style scoped>
ul {
    background: #f2f2f2;
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
#seacher {
    margin-top: 0.2rem;
    background: white;
    overflow: hidden;
}
#seacher>input {
    float: left;
    width: 70vw;
    line-height: 0.4rem;
    border: 0.01rem solid #ddd;
    border-radius: 0.03rem;
    margin-left: 3vw;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
    background: #f2f2f2;
}
#seacher>div {
    float: left;
    margin-left: 3vw;
    width: 20vw;
    line-height: 0.4rem;
    margin-top: 0.1rem;
    text-align: center;
    background: #4cd964;
    color: white;
    border-radius: 0.03rem;
}
.mylist {
    border-bottom: 0.01rem solid gray;
    color: gray;
}
.mylist>p:nth-child(1) {
    line-height: 0.4rem;
    margin-left: 0.2rem;
}
.mylist>p:nth-child(2) {
    font-size: 0.12rem;
    line-height: 0.3rem;
    margin-left: 0.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.tishi {
    background: #fff6e4;
    color: #ff883f;
    text-align: center;
    font-size: 0.15rem;
    line-height: 0.4rem;
}
</style>
