<template>
  <div>
    <transition name="fadeRightToLeft">
      <router-view v-show="isShopDetail" class="shopDetail"></router-view>
    </transition>
    <section class="shop">
      <header class="head">
        <div class="head_title">
          <i @click.stop="$router.go(-1)" class="el-icon-arrow-left back"></i>
          <section v-if="info.image_path">
            <img :src="'//elm.cangdu.org/img/'+info.image_path" alt>
          </section>
          <article>
            <h4 class="head_h4 ellipsis" v-text="info.name"></h4>
            <p class="head_des ellipsis">
              商家配送/分钟送达/配送费¥
              <span v-text="info.float_delivery_fee"></span>
            </p>
            <router-link :to="{name:'ShopDetail',params:{info:info}}">
              <i @click="isShopDetail=true" class="el-icon-arrow-right toDetail"></i>
            </router-link>
            <p class="head_notice ellipsis">
              公告:
              <span v-text="info.promotion_info"></span>
            </p>
          </article>
          <footer v-if="info.activities&&info.activities.length>0">
            <div v-if="info.activities.length>0" class="activity">
              <!-- <li class="ellipsis" v-for="(val,index) in info.activities" :key="index">
                <span
                  class="minus"
                  :style="{backgroundColor: '#'+val.icon_color}"
                  v-text="val.icon_name"
                ></span>
                <span v-text="val.description"></span>(APP专享)
              </li>-->
              <li>
                <span
                  class="minus"
                  :style="{backgroundColor: '#'+info.activities[0].icon_color}"
                  v-text="info.activities[0].icon_name"
                ></span>
                <span v-text="info.activities[0].description"></span>(APP专享)
              </li>
            </div>
            <p @click.stop="toActive=true" v-if="info.activities.length>0">
              <span v-text="info.activities.length"></span>个活动
              <i class="el-icon-arrow-right"></i>
            </p>
          </footer>
        </div>
        <div class="change_show">
          <div class="change">
            <span :class="{change_show_type:istype}" @click.stop="istype = true,type=false">商品</span>
          </div>
          <div class="change" @click.stop="istype = false,type=true">
            <span :class="{change_show_type:type}">评价</span>
          </div>
        </div>
      </header>
      <transition name="fadeShow" mode="out-in">
        <div v-show="toActive" class="toActive">
          <h2 v-text="info.name"></h2>
          <div class="active_left">
            <p class="active_title">
              <span>优惠消息</span>
            </p>
            <p class="ellipsis active_msg" v-for="(val,index) in info.activities" :key="index">
              <span
                class="minus"
                :style="{backgroundColor: '#'+val.icon_color}"
                v-text="val.icon_name"
              ></span>
              <span v-text="val.description"></span>(APP专享)
            </p>
          </div>
          <div class="active_right">
            <p class="active_title">
              <span>商家公告</span>
            </p>
            <p class="ellipsis active_notice" v-text="info.promotion_info"></p>
          </div>
          <i @click.stop="toActive=false" class="el-icon-circle-close-outline close_active"></i>
        </div>
      </transition>

      <section class="food_container">
        <transition name="fadeShow">
          <section class="menu_container" v-show="istype">
            <section class="wrapper_menu">
              <ul>
                <li
                  class="left_title"
                  :class="{wrap_li_selected:index==i}"
                  @click.stop="selected(index)"
                  v-for="(val,index) in category_list"
                  :key="index"
                  v-show="val.foods.length>0"
                >
                  <img
                    v-if="val.icon_url"
                    class="title_img"
                    :src="'https://fuss10.elemecdn.com/'+imgchange(val.icon_url)"
                    alt
                  >
                  <p v-text="val.name"></p>
                  <p
                    v-show="title_counts[val.id]"
                    class="title_count"
                    v-text="title_counts[val.id]"
                  ></p>
                </li>
              </ul>
            </section>
            <section class="menu_right">
              <ul>
                <li v-show="val.foods.length>0" v-for="(val,index) in category_list" :key="index">
                  <header :id="'title' +index" class="right_title">
                    <span class="right_name ellipsis" v-text="val.name"></span>
                    <span class="right_des" v-text="val.description"></span>
                    <i @click.stop="flag=!flag" class="el-icon-more"></i>
                  </header>
                  <section
                    @click.stop="toFoodDetail(food.name,food.description,food.image_path,food.month_sales,food.rencent_rating,food.rating,food.satisfy_rate,food.rating_count,food.specfoods[0].price)"
                    class="right_food"
                    v-for="(food,index) in val.foods"
                    :key="index"
                  >
                    <p
                      class="new_food"
                      v-if="(food.attributes.length[0]&&food.attributes[0].icon_name=='新')||(food.attributes[1]&&food.attributes[1].icon_name)=='新'"
                    >
                      <span>新品</span>
                    </p>
                    <section>
                      <img :src="'//elm.cangdu.org/img/'+ food.image_path" alt>
                    </section>
                    <section class="menu_food">
                      <h3 class="food_name ellipsis" v-text="food.name"></h3>
                      <p
                        class="sign_border"
                        v-if="(food.attributes.length[0]&&food.attributes[0].icon_name=='招牌')||(food.attributes[1]&&food.attributes[1].icon_name)=='招牌'"
                      >
                        <span>招牌</span>
                      </p>

                      <p class="food_des ellipsis" v-text="food.description"></p>
                      <p class="food_sale">
                        月售
                        <span v-text="food.month_sales"></span>份 好评率
                        <span v-text="food.satisfy_rate"></span>%
                      </p>
                      <p class="food_tag" v-if="food.activity">
                        <span v-text="food.activity.image_text"></span>
                      </p>
                      <transition name="fadeShow">
                        <div v-show="isSpec" class="choose_style">
                          <section class="food_spec">
                            <p v-text="name"></p>
                            <i @click.stop="isSpec=false" class="el-icon-close close_spec_style"></i>
                            <li>
                              <h5>规格</h5>
                              <div class="spec_style">
                                <p
                                  :class="{BorderBlue:i==spec_selected_i}"
                                  v-for="(spfood,i) in specfoods"
                                  :key="i"
                                  v-text="spfood.specs_name"
                                  @click.stop="spec_selected_i = i"
                                ></p>
                              </div>
                            </li>
                            <footer>
                              <span class="spec_price">
                                ¥
                                <span v-text="specfoods[spec_selected_i].price"></span>
                              </span>
                              <span
                                @click.stop="plus(specfoods[spec_selected_i].food_id,specfoods[spec_selected_i].price,category_id,{id:specfoods[spec_selected_i].food_id,price:specfoods[spec_selected_i].price,name:specfoods[spec_selected_i].name,
                            category_id:category_id,specs_name:specfoods[spec_selected_i].specs_name}),isSpec=false"
                                class="add_shopcar"
                              >加入购物车</span>
                            </footer>
                          </section>
                        </div>
                      </transition>

                      <transition name="fade">
                        <p class="show_delete" v-show="isSpecTip">多规格商品只能去购物车删除哦</p>
                      </transition>
                      <footer class="food_footer">
                        <div>
                          <span>¥</span>
                          <span v-text="food.specfoods[0].price"></span>
                          <span v-if="food.specfoods.length>1">起</span>
                        </div>
                        <p v-if="food.specfoods&&food.specfoods.length>1" class="select">
                          <span
                            v-show="counts[food.item_id]!=undefined&&counts[food.item_id]>0"
                            @click.stop="spec_minus"
                            class="minuss"
                          >-</span>
                          <span
                            class="select_count"
                            v-show="counts[food.item_id]!=undefined&&counts[food.item_id]>0"
                            v-text="counts[food.item_id]"
                          ></span>
                          <span
                            @click.stop="isSpec=true,category_id=food.category_id, specfoods=food.specfoods,name=food.name"
                            class="choose"
                          >选规格</span>
                        </p>
                        <p v-else class="select">
                          <span
                            @click.stop="minus(food.specfoods[0].food_id,food.specfoods[0].price,food.category_id)"
                            v-show="counts[food.specfoods[0].food_id]!=undefined&&counts[food.specfoods[0].food_id]>0"
                            class="minuss"
                          >-</span>
                          <span
                            class="select_count"
                            v-show="counts[food.specfoods[0].food_id]!=undefined&&counts[food.specfoods[0].food_id]>0"
                            v-text="counts[food.specfoods[0].food_id]"
                          ></span>
                          <span
                            @click.stop="plus(food.specfoods[0].food_id,food.specfoods[0].price,food.category_id,{id:food.specfoods[0].food_id,price:food.specfoods[0].price,name:food.specfoods[0].name,category_id:food.category_id,image_path:food.image_path},{
                          attrs:food.attrs,extra:{},id:food.specfoods[0].food_id,name:food.name,packing_fee:food.specfoods[0].packing_fee,price:food.specfoods[0].price,sku_id:food.specfoods[0].sku_id,specs:food.specfoods[0].specs,stock:food.specfoods[0].stock})"
                            class="pluss"
                          >+</span>
                        </p>
                      </footer>
                    </section>
                  </section>
                </li>
              </ul>
            </section>
          </section>
        </transition>
        <section class="buy_cart">
          <section class="shopCar">
            <div
              @click="isCarlist=!isCarlist?total_count>0:isCarlist=false"
              :class="{car_blue:total_count>0}"
              class="car_icon"
            >
              <i class="iconfont icon-gouwuche"></i>
              <span v-show="total_count>0" class="title_count" v-text="total_count"></span>
            </div>
            <section class="shop_car_money">
              <i class></i>
              <div>
                ¥
                <span v-text="total_money"></span>
              </div>
              <p>
                配送费¥
                <span v-text="info.float_delivery_fee"></span>
              </p>
            </section>
            <p @click.stop="toclearing" v-show="lack_money<=0" class="pay_car send_order">去结算</p>
            <p v-show="lack_money>0" class="send send_order">
              还差¥
              <span v-text="lack_money"></span>起送
            </p>
          </section>
        </section>
        <transition name="fadeShow" mode="out-in">
          <div class="evalute" v-show="type">
            <section class="eva_head">
              <div class="eva_left">
                <p v-if="eva.overall_score" v-text="ValtoFixed(eva.overall_score)"></p>
                <p v-else>4.56</p>
                <p>综合评价</p>
                <p>
                  高于周边商家
                  <span v-text="eva.compare_rating"></span>
                </p>
              </div>
              <div class="eva_right">
                <p>服务态度
                  <el-rate
                    v-model="service_score"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                  ></el-rate>
                </p>
                <p>菜品评价
                  <el-rate
                    v-model="food_score"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                  ></el-rate>
                </p>
                <p>
                  送达时间
                  <span v-text="eva.deliver_time"></span>分钟
                </p>
              </div>
            </section>
            <div class="evas_spans">
              <p
                @click.stop="evas_span_index =index"
                class="evas_span"
                v-for="(val,index) in evas"
                :key="index"
              >
                <span :class="{active_eva:evas_span_index == index}" v-text="val"></span>
              </p>
            </div>
          </div>
        </transition>
      </section>
      <transition name="fade">
        <section v-show="isCarlist&&total_count>0" class="buy_car_list">
          <div class="car_list_title">
            <h5>购物车</h5>
            <p @click.stop="shop_car_clear">清空</p>
          </div>
          <section class="car_list">
            <ul>
              <li v-for="(val,index) in selected_foods" :key="index" v-show="counts[val.id]>0">
                <div class="car_food_title">
                  <p class="car_food_name ellipsis" v-text="val.name"></p>
                  <p class="car_food_des" v-if="val.specs_name" v-text="val.specs_name"></p>
                </div>
                <section class="car_food_info">
                  <p>
                    ¥
                    <span class="car_food_price" v-text="val.price"></span>
                  </p>
                  <span @click.stop="minus(val.id,val.price,val.category_id)" class="minuss">-</span>
                  <span class="car_select_count" v-text="counts[val.id]"></span>
                  <span @click.stop="plus(val.id,val.price,val.category_id)" class="pluss">+</span>
                </section>
              </li>
            </ul>
          </section>
        </section>
      </transition>
      <transition name="fadeShow">
        <div class="screen_cover" v-show="isCarlist&&total_count>0"></div>
      </transition>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: 0,
      category_list: [],
      info: {},
      eva: {},
      isCarlist: false,
      spec_style_id: 0,
      specfoods: [0],
      category_id: 0,
      evas_span_index: 0,
      title_counts: [],
      i: 0,
      name: "",
      counts: [],
      lack_money: 0,
      spec_selected_i: 0,
      isShop: true,
      service_score: 0,
      total_money: 0,
      food_score: 0,
      spec_index: 0,
      price: 0,
      flag: false,
      isSpecTip: false,
      total_count: 0,
      selected_foods: [],
      istype: true,
      isSpec: false,
      type: false,
      isEva: false,
      isShopDetail: false,
      toActive: false,
      isBuyCarList: false,
      entities: [],
      enters: [],
      evas: [
        "全部(473)",
        "满意(453)",
        "不满意(20)",
        "有图(2)",
        "味道好(47)",
        "送货快(32)",
        "分量足(18)",
        "包装精美(15)",
        "干净卫生(15)",
        "食材新鲜(15)",
        "服务不错(11)"
      ]
    };
  },
  mounted() {
    // let right = document.getElementsByClassName('menu_right')[0];
    // right.addEventListener('scroll', ()=>{
    //   let lists = document.getElementsByClassName("right_title");
    //   let left_lists = document.getElementsByClassName("left_title");
    //   for (let index = 0; index < lists.length; index++) {
    //     const element = lists[index];
    //     if (right.scrollTop>=element.offsetTop) {
    //       for (let index = 0; index < left_lists.length; index++) {
    //         const element = left_lists[index];
    //         element.classList.remove("wrap_li_selected")
    //       }
    //       left_lists[index].classList.add("wrap_li_selected")
    //     }
    //   }
    // })
  },
  methods: {
    ValtoFixed(val) {
      let newVal = val.toFixed(2);
      return newVal - 0;
    },
    selected(i) {
      this.i = i;
      let id =  "title" + i;
      let right = document.getElementsByClassName("menu_right")[0];
      let right_title = document.getElementById(id);
      console.log(right_title.offsetTop);
      right.scrollTo({
        top: right_title.offsetTop,
        behavior: "smooth"
      });
    },
    shop_car_clear() {
      this.isCarlist = false;
      this.selected_foods = [];
      this.counts = [];
      this.total_count = 0;
      this.title_counts = [];
      this.total_money = 0;
      this.lack_money = this.info.float_minimum_order_amount;
      this.counts = Object.assign({}, this.counts);
    },
    imgchange(str) {
      let arr = str.split("");
      arr.splice(1, 0, "/");
      arr.splice(4, 0, "/");
      let arr1 = arr.join("") + ".jpeg";
      return arr1;
    },
    spec_minus() {
      this.isSpecTip = true;
    },
    toFoodDetail(
      name,
      description,
      image_path,
      month_sales,
      rencent_rating,
      rating,
      satisfy_rate,
      rating_count,
      price
    ) {
      this.isShopDetail = true;
      this.$router.push({
        name: "FoodDetail",
        params: {
          name: name,
          description: description,
          image_path: image_path,
          month_sales: month_sales,
          rencent_rating: rencent_rating,
          rating: rating,
          satisfy_rate: satisfy_rate,
          rating_count: rating_count,
          price: price
        }
      });
    },
    removeReption(array, obj) {
      const arr = [];
      for (let index = 0; index < array.length; index++) {
        const element = array[index].id;
        arr.push(element);
      }
      if (arr.indexOf(obj.id) == -1) {
        return false;
      } else {
        return true;
      }
    },
    toclearing() {
      this.$store.state.selected_foods = this.selected_foods;
      this.$store.state.counts = this.counts;
      sessionStorage.counts = JSON.stringify(this.counts);
      sessionStorage.selected_foods = JSON.stringify(this.selected_foods);
      sessionStorage.total_money = JSON.stringify(this.total_money);
      // this.$http({
      //   method: "POST",
      //   url: "https://elm.cangdu.org/v1/carts/checkout",
      //   data: {
      //     restaurant_id: this.id,
      //     geohash: this.geohash,
      //     entities: this.entities
      //   }
      // }).then(res => {
      // });
      this.$router.push({
        name: "ConfirmOrder",
        query: { geohash: this.geohash, shopId: this.id }
      });
    },
    plus(i, price, id, spec, obj) {
      this.isBuyCarList = true;
      this.total_count++;
      if (this.counts[i] != undefined) {
        this.counts[i]++;
        this.counts = Object.assign({}, this.counts);
      } else {
        this.counts[i] = 1;
        this.counts = Object.assign({}, this.counts);
      }
      if (this.title_counts[id] != undefined) {
        this.title_counts[id]++;
        this.title_counts = Object.assign({}, this.title_counts);
      } else {
        this.title_counts[id] = 1;
        this.title_counts = Object.assign({}, this.title_counts);
      }
      this.$http({
        method: "GET",
        url: "https://elm.cangdu.org/shopping/v2/menu/" + id
      }).then(res => {});
      if (spec && !this.removeReption(this.selected_foods, spec)) {
        this.selected_foods.push(spec);
      }
      if (obj && !this.removeReption(this.enters, obj)) {
        this.enters.push(obj);
        this.entities.push([obj]);
      } else {
      }
      this.total_money += price;
      this.lack_money -= price;
    },
    minus(i, price, id) {
      this.total_money -= price;
      this.counts[i]--;
      this.total_count--;
      this.title_counts[id]--;
      this.title_counts = Object.assign({}, this.title_counts);
      this.counts = Object.assign({}, this.counts);
      this.lack_money += price;
      if (this.total_money == 0) {
        this.isBuyCarList = false;
      }
    }
  },
  created() {
    this.id = JSON.parse(localStorage.getItem("id"));
    this.geohash = JSON.parse(localStorage.getItem("place")).geohash;
    this.$http({
      method: "GET",
      url: "https://elm.cangdu.org/shopping/getcategory/" + this.id
    }).then(res => {
      this.category_list = res.data.category_list;
    });
    this.$http({
      method: "GET",
      url: "https://elm.cangdu.org/shopping/restaurant/" + this.id
    }).then(res => {
      this.info = res.data;
      this.lack_money = res.data.float_minimum_order_amount;
      sessionStorage.info = res.data;
    });
    this.$http({
      method: "get",
      url:
        "https://elm.cangdu.org/ugc/v2/restaurants/" +
        this.id +
        "/ratings/scores"
    }).then(res => {
      this.eva = res.data;
      if (res.data.service_score) {
        this.service_score = this.ValtoFixed(res.data.service_score);
        this.food_score = this.ValtoFixed(res.data.food_score);
      }
    });
    this.$http({
      method: "get",
      url: "https://elm.cangdu.org/ugc/v2/restaurants/" + this.id + "/ratings"
    }).then(res => {
      this.eva = res.data;
    });
  }
};
</script>
<style scoped>
.shop {
  height: 100vh;
  position: relative;
}
.back {
  color: #fff;
  position: fixed;
  left: 0.1rem;
  top: 0.1rem;
  font-size: 0.3rem;
}
.toDetail {
  color: #fff;
  position: fixed;
  right: 0.1rem;
  top: 0.4rem;
  font-size: 0.25rem;
}
.head {
  background: rgba(119, 103, 137);
  overflow: hidden;
  width: 100vw;
}
.head_title {
  position: relative;
  z-index: 10;
  background-color: rgba(119, 103, 137, 0.43);
  padding: 0.1rem 0 0.1rem 0.1rem;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  height: 0.8rem;
}
.head_title > section {
  margin-right: 0.06rem;
}

.head_title img {
  width: 0.6rem;
  height: 0.6rem;
  display: block;
  border-radius: 0.03rem;
  background-color: white;
}
.select .select_count {
  display: inline-block;
  margin-right: 0.05rem;
  font-size: 0.15rem;
  color: #333;
  transform: translateY(-0.02rem);
}
.head_h4 {
  font-size: 0.16rem;
  color: #fff;
  font-weight: 700;
  margin-bottom: 0.1rem;
}
.head_des,
.head_notice,
footer {
  font-size: 0.13rem;
  color: #fff;
  width: 100%;
  margin-bottom: 0.1rem;
}
.spec_style .BorderBlue {
  border-color: #3199e8;
  color: #3199e8;
}
footer {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0;
}
.head {
  position: relative;
  z-index: 13;
  height: 27%;
}
.choose_style {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 20;
}
.choose_style > section {
  position: fixed;
  top: 35%;
  left: 15%;
  width: 70%;
  background-color: #fff;
  z-index: 34;
  border: 1px;
  border-radius: 0.05rem;
}
.food_spec > p {
  line-height: 0.4rem;
  height: 0.4rem;
  font-size: 0.16rem;
  text-align: center;
}
.food_spec > li {
  margin-top: 0.1rem;
}
.close_spec_style {
  position: absolute;
  right: 0.1rem;
  top: 0.1rem;
  font-size: 0.2rem;
}
.food_spec {
  width: 80%;
  height: 2rem;
}
.food_spec h5 {
  font-size: 0.15rem;
  color: #666;
  text-indent: 0.1rem;
}
.spec_style {
  display: flex;
  margin-top: 0.1rem;
  margin-left: 0.1rem;
}
.food_spec > footer {
  position: absolute;
  bottom: 0;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-align: center;
  align-items: center;
  background-color: #f9f9f9;
  padding: 0.1rem 0;
  border: 1px;
  border-bottom-left-radius: 0.05rem;
  border-bottom-right-radius: 0.05rem;
}
.spec_price {
  color: #ff6000;
  text-indent: 0.1rem;
}
.add_shopcar {
  width: 1rem;
  height: 0.35rem;
  background-color: #3199e8;
  border: 1px;
  border-radius: 0.04rem;
  font-size: 0.15rem;
  color: #fff;
  text-align: center;
  line-height: 0.35rem;
  margin-right: 0.1rem;
}
.show_delete {
  position: fixed;
  top: 50%;
  left: 15%;
  width: 70%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  z-index: 25;
  font-size: 0.16rem;
  text-align: center;
  padding: 0.12rem 0;
  border: 0.005rem solid #f5f5f5;
  border-radius: 0.05rem;
}
.spec_style > p {
  font-size: 0.14rem;
  padding: 0.1rem 0.15rem;
  border: 0.025rem solid #ddd;
  border-radius: 0.05rem;
  margin-right: 0.1rem;
  margin-bottom: 0.05rem;
}
.minus {
  background-color: rgb(240, 115, 115);
  border-color: rgb(240, 115, 115);
  padding: 0 0.02rem;
  border: 0.005rem solid #fff;
  box-sizing: border-box;
  border-radius: 0.02rem;
  font-size: 0.1rem;
  line-height: 0.14rem;
  margin-right: 0.05rem;
  display: inline-block;
}
.activity > span {
  margin-right: 0.1rem;
  box-sizing: border-box;
}
.change_show {
  display: flex;
  justify-content: space-between;
  height: 0.5rem;
  background: #fff;
  color: #333;
  margin-top: 0.3rem;
  border-bottom: 0.005rem solid #e4e4e4;
}
.change {
  width: 50%;
  text-align: center;
  font-size: 0.16rem;
  color: #666;
}
.change > span {
  display: inline-block;
  border-bottom: 0.03rem solid #fff;
  line-height: 0.2rem;
  margin-top: 0.15rem;
  padding: 0.04rem 0.02rem;
}
.change > .change_show_type {
  color: #3190e8;
  border-color: #3190e8;
}
.menu_container {
  display: flex;
  width: 100vw;
  justify-content: space-start;
  height: 73%;
}
.wrapper_menu {
  background: #f5f5f5;
  width: 25%;
  overflow: scroll;
}
.wrapper_menu .title_img {
  width: 0.2rem;
  height: 0.2rem;
  margin-left: 0.05rem;
  margin-top: 0.15rem;
}
.title_count {
  position: absolute;
  top: 0.02rem;
  right: 0.02rem;
  background-color: #ff461d;
  line-height: 0.14rem;
  text-align: center;
  border-radius: 50%;
  border: 0.005rem solid #ff461d;
  width: 0.14rem;
  height: 0.14rem;
  font-size: 0.1rem;
  color: #fff;
  text-indent: 0;
  font-family: Helvetica Neue, Tahoma, Arial;
}
.title_count > span {
  margin-right: 0.1rem;
}

.wrapper_menu ul {
  display: flex;
  flex-wrap: wrap;
}
.wrapper_menu li {
  position: relative;
  display: flex;
  height: 0.5rem;
  line-height: 0.5rem;
  width: 100%;
  text-indent: 0.1rem;
}
.wrap_li_selected {
  border-left: 0.03rem solid #3190e8;
  background: #fff;
  font-weight: 700;
}

.menu_right {
  flex: 4;
  flex-grow: 4;
  flex-shrink: 1;
  flex-basis: 0%;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
}
.menu_right header {
  height: 0.4rem;
  text-indent: 0.1rem;
}
.right_name {
  font-size: 0.16rem;
  font-weight: 600;
  line-height: 0.4rem;
  color: #333;
}
.right_des {
  line-height: 0.4rem;
  font-size: 0.14rem;
  color: #999;
}
.screen_cover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 20;
}
.right_food {
  background: #fff;
  width: 100%;
  border-bottom: 0.005rem solid #e4e4e4;
  display: flex;
  position: relative;
  overflow: hidden;
}
.right_food img {
  width: 0.4rem;
  height: 0.4rem;
  padding: 0.15rem 0.1rem 0;
}
.menu_food {
  flex: 4;
  flex-grow: 4;
  flex-shrink: 1;
  flex-basis: 0%;
  padding-top: 0.2rem;
  position: relative;
}
.food_name {
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 1.2rem;
  font-size: 0.14rem;
  line-height: 0.18rem;
  font-weight: 600;
}
.food_des {
  font-size: 0.12rem;
  color: #999;
  line-height: 0.18rem;
}
.food_sale {
  line-height: 0.18rem;
  font-size: 0.13rem;
  color: #333;
}

.food_tag > span {
  display: inline-block;
  border: 0.005rem solid rgb(240, 115, 115);
  border-radius: 0.06rem;
  color: rgb(241, 136, 79);
  font-size: 0.12rem;
  transform: scale(0.8);
  padding: 0 0.05rem 0.02rem;
}
.food_footer {
  height: 0.4rem;
  width: 100%;
  transform: translateY(0.1rem);
}
.food_footer span {
  font-size: 0.15rem;
  color: #f60;
  margin: 0 0.05rem;
}
.new_food {
  color: rgb(94, 196, 82);
  border-color: rgb(94, 196, 82);
  position: absolute;
  top: 0;
  left: 0;
  background-color: #4cd964;
  width: 0.3rem;
  height: 0.3rem;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: end;
  align-items: flex-end;
  transform: rotate(-45deg) translate(-0rem, -0.2rem);
  border: none;
  border-radius: 0;
}
.new_food > span {
  font-size: 0.1rem;
  text-align: center;
  color: #fff;
  -ms-flex: 1;
  flex: 1;
  transform: scale(0.8);
}
.sign_border {
  position: absolute;
  right: 0.1rem;
  top: 0.1rem;
  font-size: 0.1rem;
  line-height: 0.15rem;
}
.sign_border > span {
  padding: 0 0.05rem;
  border: 0.005rem solid rgb(240, 115, 115);
  color: rgb(240, 115, 115);
  border-radius: 0.06rem;
}
.choose {
  margin-right: 0.15rem;
  padding: 0.05rem;
  text-align: center;
  color: #fff !important;
  font-size: 0.2rem;
  line-height: 0.2rem;
  background: #3190e8;
  border: 0rem solid #3190e8;
  border-radius: 0.05rem;
}
.select > .count {
  display: inline-block;
  margin-right: 0.05rem;
  transform: translateY(-0.04rem);
}
.pluss,
.minuss {
  margin-right: 0.05rem;
  display: inline-block;
  width: 0.2rem;
  height: 0.2rem;
  text-align: center;

  font-size: 0.2rem !important;
  line-height: 0.2rem;

  border: 0.005rem solid #3190e8;
  border-radius: 0.2rem;
}
.pluss {
  background: #3190e8;
  color: #fff !important;
}
.minuss {
  color: #3190e8 !important;
}
.shopCar {
  position: fixed;
  background-color: #3d3d3f;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 24;
  width: 100%;
  height: 0.45rem;
}

.shop_car_money {
  margin-left: 1rem;
  color: #fff;
}
.shop_car_money > div {
  font-size: 0.18rem;
  line-height: 0.3rem;
}
.shop_car_money > p {
  font-size: 0.12rem;
  position: absolute;
  bottom: 0.03rem;
}
.buy_car_list {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.45rem;
  z-index: 21;
}
.car_list_title {
  display: flex;
  justify-content: space-between;
  height: 0.4rem;
  line-height: 0.4rem;
  background: #f5f5f5;
}
.car_food_name {
  height: 0.4rem;
  width: 1.3rem;
  line-height: 0.4rem;
}
.car_list_title > h5,
.car_food_name {
  padding-left: 0.1rem;
  font-weight: 530;
  font-size: 0.16rem;
}
.fade-enter-active {
  animation: fadein 0.5s;
}
.fade-leave-active {
  animation: fadein reverse 0.5s;
}
@keyframes fadein {
  from {
    transform: translateY(1rem);
  }
  to {
    transform: translateY(0);
  }
}
.car_food_des {
  font-size: 0.1rem;
  height: 0.2rem;
  line-height: 0.2rem;
  transform: translate(-1.3rem, 0.3rem);
}
.car_food_title {
  display: flex;
  flex-wrap: wrap;
}
.car_food_title > p {
  padding-left: 0.1rem;
}
.car_list_title > p,
.car_food_info {
  padding-right: 0.1rem;
}
.car_list li {
  display: flex;
  justify-content: space-between;
  height: 0.6rem;
  display: flex;
  background: #fff;
  line-height: 0.6rem;
}
.car_food_info {
  display: flex;
}
.car_food_info > p {
  margin-right: 0.3rem;
  color: #f60;
  font-size: 0.16rem;
  font-weight: 800;
}
.car_food_price {
  font-weight: 600;
}
.car_food_info > span {
  display: inline-block;
  margin-right: 0.1rem;
  transform: translateY(0.2rem);
}
.car_select_count {
  transform: translateY(0.003rem) !important;
}
.car_icon {
  display: flex;
  background-color: #3d3d3f;
  position: absolute;
  padding: 0.1rem;
  border: 0.04rem solid #444;
  border-radius: 50%;
  left: 0.1rem;
  z-index: 100;
  top: -0.14rem;
}
.car_blue {
  background: #3190e8;
}
.car_icon i {
  font-size: 0.25rem;
  color: #fff;
}
.car_icon > span {
  top: -0.05rem;
  right: -0.05rem;
}
.send_order {
  position: absolute;
  color: #fff;
  font-size: 0.17rem;
  top: 50%;
  height: 100%;
  line-height: 0.45rem;
  text-align: center;
  right: 0;
  transform: translateY(-50%);
}
.send {
  padding: 0 0.1rem;
  background-color: #535356;
}
.pay_car {
  padding: 0 0.3rem;
  background-color: #4cd964;
}
.evalute {
  z-index: 15;
}
.eva_head {
  display: flex;
  background-color: #fff;
  padding: 0.2rem 0.12rem;
}
.eva_left {
  flex: 3;
  flex-grow: 3;
  flex-shrink: 1;
  flex-basis: 0%;
  text-align: center;
}
.eva_left > p:nth-child(1) {
  font-size: 0.25rem;
  color: #f60;
  margin-bottom: 0.1rem;
}
.eva_left > p:nth-child(2) {
  font-size: 0.15rem;
  color: #666;
  margin-bottom: 0.1rem;
}
.eva_left > p:nth-child(3) {
  font-size: 0.1rem;
  color: #999;
  margin-bottom: 0.1rem;
}
.eva_right {
  flex: 4;
  flex-grow: 4;
  flex-shrink: 1;
  flex-basis: 0%;
}
.eva_right > p {
  font-size: 0.15rem;
  line-height: 0.2rem;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: start;
  justify-content: flex-start;
}
.evas_spans {
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 0.12rem;
}
.evas_span > span {
  display: block;
  padding: 0.06rem;
  font-size: 0.14rem;
  color: #6d7885;
  background-color: #ebf5ff;
  border-radius: 0.05rem;
  border: 1px;
  margin: 0 0.1rem 0.05rem 0;
}
.evas_span > .active_eva {
  background: #3190e8;
  color: #fff;
}
.toActive {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #262626;
  padding: 0.3rem;
  padding-bottom: 0;
  z-index: 35;
}
.toActive > h2 {
  text-align: center;
  font-size: 0.18rem;
  color: #fff;
}
.active_left {
  margin-top: 0.5rem;
  margin-bottom: 0.3rem;
  font-size: 0.13rem;
  color: #fff;
}
.active_title {
  text-align: center;
}
.activity span {
  margin-bottom: 0.05rem;
}
.active_msg > span {
  margin-bottom: 0.1rem;
}
.active_title > span {
  display: inline-block;
  padding: 0.05rem 0.1rem;
  margin: 0 0.1rem 0.2rem;
  border-radius: 0.15rem;
  border: 0.005rem solid #f3f3f3;
}
.menu_container {
  position: absolute;
}
.active_right {
  font-size: 0.14rem;
  color: #fff;
}
.close_active {
  color: white;
  font-weight: lighter;
  z-index: 22;
  position: absolute;
  bottom: 0.4rem;
  left: 50%;
  transform: translate(-50%) scale(3);
}
.shopDetail {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 30;
}
</style>