<template>
  <div id="chome">
      <div>积分暂未开放</div>
      <p @click="back()">点击返回上一页面</p>
      <img :src="img" alt="">
  </div>
</template>

<script>
let img = require('../../../static/img/retrylogin.png')
export default {
    name: 'chome',
    data() {
        return {
            img,
        }
    },
    methods: {
        back () {
            this.$router.go(-1);
        }
    },
}
</script>
<style scoped>
#chome>div {
    font-size: 0.3rem;
    color: blue;
    text-align: center;
    padding-top: 1rem;
}
#chome>p {
    color: blue;
    text-align: center;
    margin-top: 0.5rem;
}
#chome>img {
    width: 2rem;
    margin-left: 23vw;
    margin-top: 0.5rem;
}

</style>
