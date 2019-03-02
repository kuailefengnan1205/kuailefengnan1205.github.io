<template>
  <div id="hongbao">
        <div class="leftright">
            <p>有{{length}}个红包即将到期</p>
            <div @click="tohbdes()" class="wright">
                <div class="que">?</div>
                <p class="shuoming">红包说明</p>
            </div>
        </div>
        <ul id="hongbao_list">
            <li v-for="(value, index) in voucher"  :key="index" class="hongbao_list_li">
                    <div class="my_top">
                        <div class="li_left">
                            <p>¥{{value.amount}}</p>
                            <p>{{value.description_map.sum_condition}}</p>
                        </div>
                        <div class="li_center">
                            <p>分享红包</p>
                            <p>{{value.description_map.validity_periods}}</p>
                            <p>{{value.description_map.phone}}</p>
                        </div>
                        <div class="li_right">
                            <p>{{value.description_map.validity_delta}}</p>
                        </div>
                    </div>
                    <div v-if="value.limit_map?true:false" class="limit">
                        <p>{{value.limit_map.restaurant_flavor_ids}}</p>
                    </div>
            </li>
        </ul>
        <div @click="tohistory()" class="his">查看历史红包></div>
        <div class="my_footer">
            <p @click="toexchange()">兑换红包</p>
            <p @click="tocommend()">推荐有奖</p>
        </div>
        <router-view class="detail"></router-view>
  </div>
</template>

<script>
export default {
  name: 'hongbao',
  data() {
      return {
          user_id: "",
          voucher: "",
          length:""
      }
  },
  created() {
    this.user_id = sessionStorage.user_id;
    this.getticket();
  },
  methods: {
    tohistory() {
        this.$router.push({name:'History'})
    },
    tocommend() {
        this.$router.push({name:'Commend'})
    },
    toexchange() {
        this.$router.push({name:'Exchange'})
    },
    tohbdes () {
        this.$router.push({name:'Hbdes'})
    },
    getticket () {
        this.$http({
            method: "get",
            url: "https://elm.cangdu.org/promotion/v2/users/" + this.user_id + "/hongbaos?limit=3",
        }).then((res) => {
            // console.log(res);
            this.length = res.data.length;
            this.voucher = res.data;
        })
    }
  },
}
</script>
<style scoped>
.my_top {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
}
.detail {
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 203;
    background:white;
}
.my_footer {
    display: flex;
    position: fixed;
    bottom: 0;
}
.my_footer>p {
    width: 50vw;
    float: left;
    text-align: center;
    height: 0.5rem;
    line-height: 0.5rem;
    background: white;
    color: gray;
}
.his {
    width: 100%;
    text-align: center;
    font-size: 0.12rem;
    color: gray;
    margin-top: 0.5rem;
}
.limit {
    width: 100%;
    line-height: 0.2rem;
    background-color: #f9f9f9;
    color: #999;
    font-size: 0.12rem;
}
.limit>p {
    padding-left: 0.2rem;
    padding-right: 0.2rem;
}
#hongbao_list {
    width: 100%;
}
.hongbao_list_li {
    width: 90%;
    background: white;
    margin-left: 5vw;
    margin-top: 0.1rem;
    overflow: hidden;
    border-top: 0.02rem solid red;
    border-radius: 0.05rem;
}
.hongbao_list_li>div:nth-child(2){
    float: left;
}
.li_left {
    float: left;
    height: 0.8rem;
    margin-top: 0.1rem;;
    margin-left: 0.1rem;
    border-right: 0.01rem dashed gray;
}
.li_left>p:nth-child(1){
    color: #ff5340;
    margin-top: 0.1rem;
}
.li_left>p:nth-child(2){
    color: gray;
    font-size: 0.12rem;
    margin-top: 0.3rem;
}
.li_center {
    color: gray;  
}
.li_center>p {
    margin-top: 0.12rem;
}
.li_center>p:nth-child(2),
.li_center>p:nth-child(3) {
    font-size: 0.12rem;
}
.li_right {
    width: 0.6rem;
    color: #ff5340;
    margin-top: 0.3rem;
}
.leftright {
    width: 100%;
    height: 0.3rem;
}
.leftright>p {
    color: gray;
    font-size: 0.12rem;
    line-height: 0.3rem;
    float: left;
    margin-left: 0.1rem;
}
.wright {
    float: right;
    padding-right: 5vw;
    width: 0.7rem;
    height: 0.3rem;
}
.shuoming {
    color: #3190e8;
    font-size: 0.12rem;
    line-height: 0.3rem;
}
.que {
    float: left;
    width: 0.15rem;
    height: 0.15rem;
    background: #3190e8;
    text-align: center;
    border-radius: 50%;
    font-size: 0.14rem;
    line-height: 0.15rem;
    color: white;
    margin-top: 0.075rem;
}
</style>
