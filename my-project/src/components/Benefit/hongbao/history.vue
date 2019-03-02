<template>
  <div id="history">
    <div id="header">
        <span @click="back()">＜</span>
        <span>历史红包</span>
    </div>
    <ul id="hongbao_list">
            <li v-for="(value, index) in history"  :key="index" class="hongbao_list_li">
                    <div class="my_top">
                        <div class="li_left">
                            <p>¥{{value.amount}}</p>
                            <p>{{value.description_map.sum_condition}}</p>
                        </div>
                        <div class="li_center">
                            <p>{{value.name}}</p>
                            <p>{{value.description_map.validity_periods}}</p>
                            <p>{{value.description_map.phone}}</p>
                        </div>
                        <div class="li_right">
                            <p>已过期</p>
                        </div>
                    </div>
                    <div v-if="value.limit_map?true:false" class="limit">
                       <p> {{value.limit_map.restaurant_flavor_ids}}</p>
                    </div>
            </li>
        </ul>
  </div>
</template>

<script>
export default {
    name: 'commend',
    data() {
        return {
            user_id:"",
            history: ""
        }
    },
    created() {
      this.user_id = sessionStorage.user_id;  
      this.gethistory();
    },
    methods: {
        back () {
            this.$router.go(-1);
        },
        gethistory () {
            this.$http ({
                method: "get",
                url: "https://elm.cangdu.org/promotion/v2/users/"+ this.user_id + "/expired_hongbaos?limit=20&offset=0"
            }).then((res) => {
                console.log(res);
                this.history = res.data;
            })
        }
    },
}
</script>
<style scoped>
#history {
    background: #f1f1f1;
}
.my_top {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
}
#hongbao_list {
    width: 100%;
    background: #f1f1f1;
    margin-top: 0.7rem;
}
.hongbao_list_li {
    width: 90vw;
    background: white;
    margin-left: 5vw;
    margin-top: 0.2rem;
    overflow: hidden;
    border-top: 0.02rem solid gray;
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
    color: gray;
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
    color: gray;
    margin-top: 0.3rem;
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
    line-height: 0.3rem;
}
#header {
    width: 100%;
    height: 0.5rem;
    background: #3190e8;
    color: white;
    position: fixed;
    top: 0;
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

