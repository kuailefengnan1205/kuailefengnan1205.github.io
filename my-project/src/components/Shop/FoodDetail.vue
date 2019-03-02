<template>
  <div class="foodDetail">
    <div class="header">
      <i @click="backShop" class="el-icon-arrow-left backShop"></i>
      <p v-text="category_list.name"></p>
    </div>  
    <div class="foodDetail_mid">
      <img :src="'//elm.cangdu.org/img/'+category_list.image_path" alt>
      <p v-text="category_list.description"></p>
    </div>
    <footer>
      <h4 v-text="category_list.name"></h4>
      <p class="food_rate">评分
        <el-rate class="icon" v-model="category_list.rating" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
      </p>
      <p>月售
        <span v-text="category_list.month_sales"></span>单  
        <span class="food_price">售价¥
          <span v-text="category_list.price"></span>起
        </span>
      </p>
      <p>评论数
        <span v-text="category_list.rating_count"></span>   好评率
        <span v-text="category_list.satisfy_rate"></span>%
      </p>
    </footer>
  </div>
</template>
<script>
export default {
    data() {
        return {
            category_list:{},
        }
    },
    methods: {
        backShop(){
            this.$router.go(-1);
        }
    },
    created() {
        this.category_list = this.$route.params
    },
};
</script>
<style scoped>
.header>.backShop{
    float: left;
    margin-left: .05rem;
    font-size: .25rem;
    color:#fff;
    line-height: .35rem;
}
.header>p{
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    font-weight: 700;
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
  white-space: nowrap;
}
.foodDetail{
    z-index: 14;
    background: #fff;
}
.foodDetail_mid img{
    width: 100vw;
}
.foodDetail_mid p {
    line-height: .3rem;
    padding-left: .1rem;
}
footer{
    padding-left: .1rem;
}
footer>h4{
    line-height: .5rem;
    font-size: .16rem
}
.food_rate{
    display: flex;
}
.food_rate>.icon{
    transform: scale(0.8) translateY(.08rem)
}
footer p {
    color: #666;
    line-height: .3rem; 
}
.food_price{
    color: orange;
}
</style>