<template>
  <div>

    <router-view @backToadd="backToadd" class="search"></router-view>
    <div class="header">
      <i @click="$router.push({name:'ChooseAddress'})" class="el-icon-arrow-left"></i>
      <p>添加地址</p>
    </div>
    <form class="con" action>
      <div>
        <span>联系人</span>
        <input placeholder="你的名字" v-model="name" type="text">
      </div>
      <div class="sex_choose">
        <section>
          <input v-model="sex" value="1" checked="checked" id="sir" type="radio">
          <label for="sir">先生</label>
          
          <input v-model="sex" value="2" id="girl" type="radio">
          <label for="girl">女士</label>
        </section>
      </div>
      <div>
        <span>联系电话</span>
        <input v-model="phone" type="text" placeholder="你的手机号">
        <span @click="isMore=true" class="more">+</span>
      </div>
      <div v-show="isMore">
        <input v-model="rephone" placeholder="备选电话" type="text">
      </div>
      <div>
        <span>送餐地址</span>
        <input
          @click="$router.push({name:'SearchAddress'})"
          v-model="address"
          placeholder="小区/写字楼/学校等"
          type="text"
        >
      </div>
      <div>
        <input v-model="moreAd" placeholder="详细地址(如门牌号等)" type="text">
      </div>
      <div>
        <span>标签</span>
        <input v-model="tag" placeholder="无/家/学校/公司" type="text">
      </div>
      <button
        @click="confirm"
      >确定</button>
    </form>
    <div class="container animition bounceIn" v-show="flag">
      <div class="flag">
        <div class="warn">
          <span></span>
          <span></span>
        </div>
        <p v-text="msg"></p>
        <div @click="confirmAdd" class="confirm">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isMore: false,
      name: "",
      sex: "",
      phone: "",
      rephone: "",
      address: "",
      moreAd: "",
      tag: "",
      flag: false,
      msg: ""
    };
  },
  methods: {
    confirmAdd() {
      this.flag = false;
    },
    backToadd(name) {
      this.address = name;
    },
    confirm() {
      if (this.name == "") {
        this.flag = true;
        this.msg = "请输入姓名";
      } else if (this.phone == "") {
        this.flag = true;
        this.msg = "请输入电话号码";
      } else if (this.address == "") {
        this.flag = true;
        this.msg = "请选择地址";
      } else if (this.moreAd == "") {
        this.flag = true;
        this.msg = "请输入详细地址";
      } else if (this.tag == "") {
        this.flag = true;
        this.msg = "标签错误";
      } else if(!sessionStorage.user_id){
        this.flag = true;
        this.msg = "请登录";
      }else {
          let geohash = JSON.parse(localStorage.getItem("place")).geohash;
          this.$http({
            method: "POST",
            url:
              "https://elm.cangdu.org/v1/users/" +
              JSON.parse(sessionStorage.user_id) +
              "/addresses",
            data: {
              address: this.address,
              address_detail: this.moreAd,
              geohash: geohash,
              name: this.name,
              phone: this.phone,
              tag: this.tag,
              sex: this.sex,
              phone_bk: this.rephone,
              tag_type: 2
            }
          }).then(res => {
            if (res.data.success) {
               this.$router.push({ name: "ChooseAddress" });
            } else {
              this.flag = true;
              this.msg = "添加失败";
            }
          });
        }
      }
    }
  };
</script>
<style scoped>
.header > i {
  float: left;
  padding-left: 0.15rem;
  color: #fff;
  font-size: 0.25rem;
  line-height: 0.45rem;
}
.header > a {
  float: right;
  margin-right: 0.15rem;
  transform: scale(1.5);
  color: #fff;
}
.con {
  margin-top: 0.45rem;
}
form > div {
  height: 0.5rem;
  display: flex;
  line-height: 0.5rem;
  background: #fff;
  position: relative;
  box-sizing: border-box;
  padding-left: 0.2rem;
  position: relative;
}
div > input {
  position: absolute;
  right: 0.15rem;
  line-height: 0.5rem;
  width: 65%;
  border-bottom: 1px solid #f5f5f5;
  font-size: 0.17rem;
  outline: none;
}
div > span {
  font-size: 0.16rem;
}
.sex_choose > section {
  position: absolute;
  right: 0.15rem;
  width: 65%;
}
label {
  font-size: 0.16rem;
}
button {
  width: 90%;
  height: 0.4rem;
  margin-left: 5%;
  margin-top: 0.2rem;
  border-radius: 0.04rem;
  border: none;
  background: #4cd964;
  font-size: 0.19rem;
  color: #fff;
}
.more {
  position: absolute;
  right: 0.15rem;
  font-size: 0.35rem;
  color: #3190e8;
}
.search {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #fff;
  z-index: 30;
}
</style>