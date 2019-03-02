<template>
  <div id="add">
    <div id="header">
        <span @click="back()"><i class="el-icon-arrow-left"></i></span>
        <span>新增地址</span>
    </div>
    <div id="inputlist">
        <input @input="warn1()" v-model="name" type="text" placeholder="请填写你的姓名">
        <p class="tishi1" v-text="warn1cont"></p>
        <input @click="toadddetail()" v-model="address" type="text" placeholder="小区/写字楼/学校等">
        <input v-model="address_detail" type="text" placeholder="请填写详细送餐地址">
        <input @input="warn2()" v-model="phone" type="text" placeholder="请填写能够联系到您的手机号">
        <p class="tishi2" v-text="warn2cont"></p>
        <input v-model="phone_bk" type="text" placeholder="备用联系电话(选填)">
    </div>
    <div id="footer" @click="creataddress()">新增地址</div>
    <div class="animated bounceIn" id="walert" v-show="isshow">
        <div class="tip_icon">
        <span></span>
        <span></span>
        </div>
        <p v-text="warncont"></p>
        <div @click="isshow=!isshow" class="wbutton">
        确定
        </div>
    </div>
    <router-view class="detail"></router-view>
  </div>
</template>

<script>
export default {
  name: 'add',
  data() {
      return {
        warn1cont:"",
        warn2cont:"",
        user_id:"",
        isshow:false,
        warncont:"",
        name:"",
        address:this.$store.state.cityname,
        address_detail:"",
        phone:"",
        phone_bk:"",
        geohash:"",
        sex:"",
        tag:""
      }
  },
  created() {
    this.user_id = sessionStorage.user_id;
  },
  methods: {
    warn1 () {
      if (this.name == "") {
          this.warn1cont = "*名字不能为空";
      } else {
          this.warn1cont="";
      }
    },
    warn2 () {
        let reg = /^1[34578]\d{9}$/;
        if (this.phone == "") {
            this.warn2cont = "*电话号码不能为空"
        }else if (!(reg.test(this.phone))) {
            this.warn2cont = "*请填写正确格式的电话号码"
        } else {
          this.warn2cont="";
        }
    },
    // 父子组件的传值
    tranname (name) {
      this.address = name;
    },
    back() {
        this.$router.push({name:"Address"});
    },
    toadddetail () {
      this.$router.push({name:"Adddetail"})
    },
    creataddress () {
      this.$http({
        method:"post",
        url:"https://elm.cangdu.org/v1/users/"+this.user_id+"/addresses",
        data: {
          address:this.address,
          address_detail:this.address_detail,
          geohash:"34.78413,113.715187",
          name:this.name,
          phone:this.phone,
          phone_bk:this.phone_bk,
          sex:1,
          tag:"啦啦",
          tag_type:3,
        },
      }).then((res) => {
        this.isshow = true;
        this.warncont = res.data.message;
        //如果成功就跳转
        if (res.data.success) {
            this.$router.push({name:"Address"})
        }
      })
    },
  }

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
#inputlist {
    margin-top: 0.2rem;
    background: white;
    padding-bottom: 0.1rem;
}
#inputlist>input{
    width: 90vw;
    height: 0.4rem;
    border:0.01rem solid #ddd;
    background: #f2f2f2;
    margin-left: 5vw;
    border-radius: 0.05rem;
    margin-top: 0.1rem;
}
#footer {
    width: 90vw;
    margin-left: 5vw;
    text-align: center;
    line-height: 0.4rem;
    color: white;
    background: #4cd964;
    border-radius: 0.03rem;
    margin-top: 0.2rem;
}
.tishi1, .tishi2, .tishi3{
  line-height: 0.3rem;
  font-size: 0.12rem;
  margin-left: 5vw;
  color: red;
}
#walert {
  background: white;
  border-radius: 0.3rem;
  width: 80vw;
  height: 2rem;
  position: absolute;
  left: 10vw;
  top: 25%;
}
#walert>p {
  width: 100%;
  height: 0.5rem;
  background: white;
  position: absolute;
  bottom: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
}
.wbutton {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
  color: white;
  font-weight: 800;
  background: #4cd964;
  border-bottom-right-radius:0.3rem;
  border-bottom-left-radius:0.3rem;
}
.tip_icon {
  width: 0.8rem;
  height: 0.8rem;
  border: 0.03rem solid #f8cb86;
  border-radius: 50%;
  margin-left: 36%;
  margin-top: 0.1rem;
}
.tip_icon span:nth-child(1) {
  display: inline-block;
  width: 0.03rem;
  height: 0.34rem;
  background-color: #f8cb86;
  margin-left: 49%;
  margin-top: 0.1rem;
}
.tip_icon span:nth-child(2) {
  display: inline-block;
  width: 0.05rem;
  height:0.05rem;
  border: 0.01rem;
  border-radius: 50%;
  margin-left: 49%;
  background-color: #f8cb86;
}
</style>
