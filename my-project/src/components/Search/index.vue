<template>
  <div>
    <div class="header">
      <router-link to="/home">
        <i class="el-icon-arrow-left"></i>
      </router-link>
      <p>搜索</p>
    </div>
    <div class="con">
      <input
        @input="isClear=true?food!=null:isClear=false"
        type="text"
        v-model="food"
        placeholder="请输入商家或美食名称"
      >
      <i
        @click="food='',isHistory=true,isClear=false,isSearchEmp=false,isShop=false"
        v-show="isClear"
        class="el-icon-close close_icon"
      ></i>
      <button @click="sub">提交</button>
    </div>
    <p v-show="isSearchEmp" class="search_none">很抱歉,无搜索结果</p>
    <ul v-show="isShop">
      <h4 class="his">商家</h4>
      <li @click="searchToShop(val.id)" class="rest" v-for="(val,index) in restaurant" :key="index">
        <div>
          <img :src="'//elm.cangdu.org/img/'+val.image_path" alt>
        </div>
        <section>
          <p>
            <span>{{val.name}}</span>
            <span class="rest_pay">支付</span>
          </p>
          <p>
            月售
            <span>{{val.rating_count}}</span>单
          </p>
          <p>
            <span v-text="val.float_minimum_order_amount"></span>元起送 / 距离
            <span v-text="val.distance"></span>
          </p>
        </section>
      </li>
    </ul>
    <ul v-show="history_search!=''&&isHistory">
      <p class="his">搜索历史</p>
      <li
        @click="search_usehis(val)"
        class="history_list"
        v-for="(val,index) in history_search"
        :key="index"
      >
        <p v-text="val"></p>
        <i @click.stop="clear_single(index)" class="el-icon-close"></i>
      </li>
      <p @click="clear_his" class="clear_his">清空搜索历史</p>
    </ul>
    <div class="footer_all">
      <router-link to="/msite">
        <i class="icon-SSS iconfont iconfont1"></i>
        <p>外卖</p>
      </router-link>
      <router-link to="/search">
        <i class="icon-zhinanzhen1 iconfont iconfont2"></i>
        <p>搜索</p>
      </router-link>
      <router-link to="/order">
        <i class="iconfont icon-icon--copy iconfont3"></i>
        <p>订单</p>
      </router-link>
      <router-link to="/profile">
        <i class="iconfont icon-yonghu1"></i>
        <p>我的</p>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      geohash: "",
      latitude: "",
      longitude: "",
      history_search: [],
      food: "",
      isHistory: true,
      isShop: false,
      isClear: false,
      restaurant: [],
      isSearchEmp: false
    };
  },
  created() {
    let place = JSON.parse(localStorage.getItem("place"));
    this.latitude = place.latitude;
    this.longitude = place.longitude;
    this.geohash = place.geohash;
    if (localStorage.getItem("history") != undefined) {
      this.history_search = JSON.parse(localStorage.getItem("history"));
    } else {
      localStorage.setItem("history", JSON.stringify(this.history_search));
    }
  },

  methods: {
    remove(array, val) {
      if (array.indexOf(val) != -1) {
        return false;
      } else {
        return true;
      }
    },
    clear_his() {
      this.isHistory = false;
      this.history_search = [];
      localStorage.setItem("history", JSON.stringify(this.history_search));
    },
    clear_single(i) {
      this.history_search.splice(i, 1);
      localStorage.setItem("history", JSON.stringify(this.history_search));
    },
    search_usehis(val) {
      this.food = val;
      this.sub();
    },
    searchToShop(id) {
      localStorage.setItem("id", JSON.stringify(id));
      this.$router.push({ name: "Shop", query: { id: id } });
    },
    sub() {
      this.isSearchEmp = false;
      if (this.food != "") {
        this.isHistory = false;
        this.$http({
          method: "GET",
          url:
            "https://elm.cangdu.org/v4/restaurants?geohash=" +
            this.geohash +
            "&keyword=" +
            this.food
        }).then(res => {
          if (res.data.length > 0) {
            this.isShop = true;
            this.restaurant = res.data;
          } else {
            this.isSearchEmp = true;
            this.isShop = false;
          }
        });
      } else {
        return;
      }

      if (this.food != "" && this.remove(this.history_search, this.food)) {
        this.history_search.push(this.food);
      }
      localStorage.setItem("history", JSON.stringify(this.history_search));
    }
  }
};
</script>
<style scoped>
.header {
  position: relative;
}
.header > a {
  float: left;
  padding-left: 0.2rem;
  color: #fff;
}
.header > p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: bolder;
  font-size: 0.18rem;
}
.con {
  height: 0.6rem;
  background: white;
  line-height: 0.6rem;
  position: relative;
}
.con > input {
  width: 72%;
  margin-left: 0.1rem;
  height: 0.35rem;
  border: 1px solid #e4e4e4;
  font-weight: bold;
  font-size: 0.16rem;
  text-indent: 0.1rem;
  background: #f3f3f3;
}
.history_list {
  height: 0.4rem;
  display: flex;
  line-height: 0.4rem;
  background: #fff;
  justify-content: space-between;
  border-bottom: 0.01rem solid #f5f5f5;
}
.history_list > p {
  padding-left: 0.1rem;
}
.history_list > i {
  transform: scale(1.2) translate(-0.1rem, 35%);
}
.close_icon {
  position: absolute;
  left: 70%;
  top: 50%;
  transform: translateY(-50%);
}
.rest {
  display: flex;
  background: #fff;
  border-bottom: 1px solid #e4e4e4;
}
.rest > div {
  padding: 0.1rem;
}
.rest img {
  width: 0.4rem;
  height: 0.4rem;
}
.rest > section {
  padding-top: 0.15rem;
  margin-bottom: 0.15rem;
  border-bottom: 1px solid #e4e4e4;
  margin-right: 0.2rem;
  flex: auto;
}
.rest_pay {
  display: inline-block;
  padding: 0.03rem;
  margin-left: 0.1rem;
  color: rgb(255, 96, 0);
  border: 0.005rem solid rgb(255, 96, 0);
  font-size: 0.1rem;
  line-height: 0.1rem;
}
.rest p {
  margin-bottom: 0.08rem;
  font-size: 0.13rem;
  color: #333;
}
.rest p:last-child {
  margin-bottom: 0.1rem;
}
.con > button {
  width: 20%;
  float: right;
  margin-top: 0.1rem;
  margin-right: 0.1rem;
  height: 0.4rem;
  font-weight: bold;
  font-size: 0.16rem;
  color: white;
  background: #3190e8;
  border: none;
  border-radius: 0.04rem;
}
.his {
  height: 0.4rem;
  line-height: 0.4rem;
  font-size: 0.15rem;
  font-weight: bold;
  color: #666;
  text-indent: 0.1rem;
}
.search_none {
  background: #fff;
  text-align: center;
  font-size: 0.16rem;
  height: 0.4rem;
  line-height: 0.4rem;
}
.clear_his {
  width: 100%;
  height: 0.4rem;
  line-height: 0.4rem;
  color: #3190e8;
  font-size: 0.18rem;
  font-weight: 700;
  text-align: center;
  background: #fff;
}
.iconfont2 {
  color: #3190e8;
}
</style>

