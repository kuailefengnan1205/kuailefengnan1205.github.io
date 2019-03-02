<template>
  <div>
    <div class="header">
      <p class="back">
        <router-link to="/home">
          <i class="el-icon-arrow-left"></i>
        </router-link>
      </p>
      <p class="city" v-text="city"></p>
      <p class="changeCity">
        <router-link to="/home">切换城市</router-link>
      </p>
    </div>
    <div class="con">
      <input @input="isenter=true?keyword!='':isenter=false" type="text" v-model="keyword" placeholder="输入学习,商务楼,地址">
      <i v-show="isenter" @click="keyword='',isenter=false" class="el-icon-close clearEnter"></i>
      <br>
      <button @click="adress">提交</button>
    </div>
    <div class="searchEmp" v-show="searchNothing"><span>很抱歉,无搜索结果!</span></div>
    <p v-show="flag" class="hist">搜索历史</p>
    <div v-show="flag" class="history">
      <li @click="hisTostore(val.name,val.geohash,val.latitude,val.longitude,val.address)" v-for="(val,index) in arr" :key="index">
        <h4 class="ellipase" v-text="val.name"></h4>
        <p class="ellipase ad" v-text="val.ad"></p>
      </li>
      <p class="clear" @click="clear">清空所有</p>
    </div>
    <div class="list">
      <li
        @click="toStore(val.geohash,val.latitude,
            val.longitude,val.name,val.address)"
        v-for="(val,index) in info"
        :key="index"
      >
        <h4 class="ellipase" v-text="val.name"></h4>
        <p class="ellipase" v-text="val.address"></p>
      </li>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      city: "",
      keyword: "",
      id: "",
      info: [],
      flag: false,
      arr: [],
      searchNothing:false,
      isenter:false
    };
  },
  methods: {
    clear() {
      this.flag = false;
      this.arr = [];
      localStorage.setItem("arr", "");
    },
    toCity() {
      this.$http({
        method: "get",
        url: "https://elm.cangdu.org/v1/cities/" + this.$route.params.id
      }).then(res => {
        this.city = res.data.name;
        this.id = res.data.id;
        localStorage.setItem("cityId",JSON.stringify(this.id))
      });
    },
    adress() {
      if (this.keyword != "") {
        this.flag = false;
        // this.arr.push(this.keyword)
        this.$http({
          method: "get",
          url:
            "https://elm.cangdu.org/v1/pois?city_id=" +
            this.id +
            "&keyword=" +
            this.keyword +
            "&type=search"
        }).then(res => {
          if (res.data.length>0) {
              this.info = res.data;
              this.searchNothing = false;
          } else {
            this.info = res.data;
            this.searchNothing = true;

          }
        
        });
      } else {
        return false;
        
      }
    },
    reduce(name) {
      const arr = [];
      for (let index = 0; index < this.arr.length; index++) {
        const element = this.arr[index];
        arr.push(element);
      }
      if (arr.indexOf(name) == -1) {
        return true;
      } else {
        return false;
      }
    },
    toStore(geohash, latitude, longitude, name, ad) {
      this.$router.push({
        name: "Msite",
        query: { geohash: geohash, latitude: latitude, longitude: longitude }
      });
      sessionStorage.ad = name;
      let place_history = {
        geohash: geohash,
        latitude: latitude,
        longitude: longitude,
        ad:ad,
      };
      this.$store.state.place = place_history;
      let place = JSON.stringify(place_history);
        localStorage.setItem("place", place);
      if (this.reduce(name)) {
        let obj = {
          name: name,
          ad: ad,
          geohash: geohash,
          latitude: latitude,
          longitude: longitude,
        };
        this.arr.push(obj);
        let arr = JSON.stringify(this.arr);
        localStorage.setItem("arr", arr);
      }
    },
    hisTostore(name, geohash,latitude,longitude,ad) {
      let place_history = {
        geohash: geohash,
        latitude: latitude,
        longitude: longitude,
        ad:ad,
      };
      this.$store.state.place = place_history;
      let place = JSON.stringify(place_history);
        localStorage.setItem("place", place);
        sessionStorage.ad = name;
      this.$router.push({ name: "Msite", query: { geohash: geohash } });
      
    }
  },
  created() {
    this.toCity();
    if (localStorage.getItem("arr")) {
      this.flag = true;
      this.arr = JSON.parse(localStorage.getItem("arr"));
    }
  }
};
</script>
<style scoped>
.header {
  position: relative;
  margin-bottom: 0.1rem;
}
.back {
  float: left;
  padding-left: 0.2rem;
}
.back > a {
  color: #fff;
}
.city {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  color: #fff;
  text-align: center;
  font-size: 0.2rem;
  font-weight: bolder;
}
.changeCity {
  position: absolute;
  right: 0.1rem;
  top: 50%;
  transform: translate(0, -50%);
  font-size: 0.14rem;
}
.changeCity > a {
  color: white;
}
.con {
  width: 100vw;
  background: white;
  text-align: center;
}
.con > input {
  width: 90vw;
  height: 0.35rem;
  margin: 0.1rem;
  font-size: 0.15rem;
  text-indent: 0.1rem;
  border: 1px solid #e4e4e4;
}
.con > button {
  width: 90vw;
  height: 0.35rem;
  background: #3190e8;
  border: none;
  color: white;
  border-radius: 0.05rem;
  margin-bottom: 0.1rem;
}
.searchEmp{
    margin: 0 auto;
    font: .15rem Microsoft YaHei;
    color: #333;
    background-color: #fff;
    text-indent: .1rem;
    line-height: .3rem;
    height: .3rem;
    border-top: 1px solid #f5f5f5;
}
.history {
  border-top: 1px solid #e4e4e4;
}

.history > li {
  margin: 0 auto;
  background-color: #fff;
  padding-top: 0.13rem;
  border-bottom: 1px solid #e4e4e4;
}
.hist {
  text-indent: 0.1rem;
  font-size: 0.12rem;
  height: 0.2rem;
  line-height: 0.2rem;
  border-bottom: 1px solid #e4e4e4;
  border-top: 1px solid #e4e4e4;
}
.history h4 {
  margin: 0 auto 0.07rem;
  width: 90%;
  font-size: 0.18rem;
  color: #333;
}
.ellipase {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ad {
  width: 90%;
  margin: 0 auto 0.11rem;
  font-size: 0.12rem;
  color: #999;
}
.clear {
  background: #fff;
  height: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
  color: #666;
  font-size: 0.16rem;
}
.list {
  border-top: 1px solid #e4e4e4;
  background: white;
}
.list > li {
  border-bottom: 1px solid #e4e4e4;
  margin-top: 0.1rem;
}
.list h4 {
  margin: 0 auto 0.07rem;
  width: 90%;
  font-size: 0.16rem;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.clearEnter{
  position: absolute;
  left: 88%;
  font-size: .2rem;
  font-weight: bold!important;
  color:#3190e8;
  transform: translateY(.2rem);
}
.list p {
  width: 90%;
  margin: 0 auto 0.11rem;
  font-size: 0.12rem;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
