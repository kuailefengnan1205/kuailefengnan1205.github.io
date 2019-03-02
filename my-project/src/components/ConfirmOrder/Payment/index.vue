<template>
  <div class="wrap">
    <div class="header">
      <i @click="$router.go(-1)" class="el-icon-arrow-left"></i>
      <p>在线支付</p>
    </div>
    <section class="lack_time">
        <p>支付剩余时间</p>
        <p><span>00:</span><span v-text="min"></span>:<span v-text="seconds"></span></p>
    </section>
    <p class="choose_pay">选择支付方式</p>
    <li><p> <i></i> <span>支付宝</span></p> <i @click="ischecked=!ischecked" :class="{icon_select:ischecked}" class='el-icon-circle-check selected_icon'></i> </li>
    <li><p> <i></i> <span>微信</span></p> <i @click="ischecked=!ischecked" :class="{icon_select:!ischecked}" class="el-icon-circle-check selected_icon"></i> </li>
    <button @click="confirmPay" >确认支付</button>
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
            ischecked:true,
            flag:true,
            skip:false,
            msg:"暂不开放支付功能",
            time:900,
            min:'15',
            seconds:'00',
        }
    },
    created() {
      this.totime();
    },
    methods: {
      confirmPay(){
        this.flag = true;
        this.msg="当前环境无法支付,请打开官方APP进行付款"
        this.skip = true;
      },
      confirm(){
        if (this.skip==true) {
          this.$router.push({name:"Order"})
        }else{
          this.flag =false;
        }
      },
      totime(){
        var time1 = setInterval(() => {
          this.time -= 1;
          this.min = parseInt(this.time/60);
          this.seconds = this.time % 60;
        }, 1000);
        if (this.time==0) {
          clearInterval(time1)
        }
      }
    },
};
</script>
<style scoped>
.wrap{
    background: #f5f5f5;
}
.header > i {
  float: left;
  padding-left: 0.15rem;
    box-sizing: border-box;
  color: #fff;
  font-size: 0.25rem;
  line-height: 0.45rem;
}
.lack_time{
  padding-top: .5rem;
}
.lack_time>p:nth-child(2){
      font-size: .3rem;
    color: #333;
    margin-top: .2rem;
}
.lack_time span{
  margin: .06rem .1rem .2rem;
}
.header > p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 0.2rem;
}
section{
    margin-top: .45rem;
    height: 1rem;  
    background: #fff;
    text-align: center;
}
.choose_pay{
    height: .35rem;
    text-indent: .2rem;
    font-size: .14rem;
    line-height: .35rem;
    background: #f5f5f5;
}
li{
    display: flex;
    justify-content: space-between;
    padding: 0 .15rem;
    box-sizing: border-box;
    height: .6rem;
    line-height: .6rem;
    background: #fff;
    border-bottom: 1px solid #f5f5f5;
}
button{
        background-color: #4cd964;
        width: 90%;
    font-size: .15rem;
    color: #fff;
    text-align: center;
    margin-left: 5%;
    height: .4rem;
    border: none;
    line-height: .4rem;
    border-radius: .04rem;
    margin-top: .1rem;
    font-weight: 700;
}
.selected_icon{
    line-height: .6rem;
    font-size: .25rem;
    color: #999;
}
.icon_select{
    color:#4cd964!important;
}
</style>

