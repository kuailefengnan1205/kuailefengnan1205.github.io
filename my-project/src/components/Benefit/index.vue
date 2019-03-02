<template>
  <div id="benefit">
    <div id="header">
          <span @click="back()"><i class="el-icon-arrow-left"></i></span>
          <span>我的优惠</span>
    </div>
    <div id="change">
        <p @click="isshow()"><span :class="{line:isline}">红包</span></p>
        <p @click="isshow2()"><span :class="{line:isline2}">商家代金券</span></p>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'benefit',
  data() {
      return {
          isline:true,
          isline2:false,
      }
  },
  methods: {
      back () {
          this.$router.push({name: 'Profile'})
      },
      isshow () {
        this.isline = true;
        this.isline2=false;
        this.$router.push({name: 'Hongbao'})
      },
      isshow2 () {
        this.isline = false;
        this.isline2 = true;
        this.$router.push({name: 'Voucher'})
      }
  },
}
</script>
<style scoped>
.line {
    color: #3190e8;
    border-bottom: 0.02rem solid #3190e8;
}
#change {
  height: 0.5rem;
}
#change>p {
    display: block;
    width: 50%;
    height: 0.5rem;
    background: white;
    line-height: 0.5rem;
    text-align: center;
    float:left; 
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
</style>
