<template>
  <div>
    <div class="header">
      <router-link to="/home"><i class="el-icon-arrow-left"></i></router-link>
      <p>密码登录</p>
    </div>
    <div class="con">
      <input type="text" v-model="name" placeholder="账号">
      <br>
      <div class="pass">
        <input v-if="value2" type="password" v-model="password" placeholder="密码">
        <input v-else type="text" v-model="password" placeholder="密码">
        <div>
          <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </div>
      </div>
      <div class="verify">
        <input type="text" v-model="verifycode" placeholder="验证码">
        <img :src="img" alt>
        <p @click="changeImg">
          <span>看不清</span>
          <span>换一张</span>
        </p>
      </div>
      <div class="tip">
        <p>温馨提示 : 未注册过的账号 , 登录时将自动注册</p>
        <p>注册过的用户可凭账号密码登录</p>
      </div>
      <button class="login" @click="login()">登录</button>
      <div class="forget">
        <router-link to="/forget">重置密码?</router-link>
      </div>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      password: "",
      verifycode: "",
      img: "",
      msg: "",
      flag: false,
      value2: true
    };
  },
  methods: {
    verify() {
      this.$http({
        method: "POST",
        url: "https://elm.cangdu.org/v1/captchas",
        withCredentials: true
      }).then(res => {
        this.img = res.data.code;
      });
    },
    changeImg() {
      this.verify();
    },
    login() {
      if (
        this.name != "" &&
        this.password != "" &&
        this.verifycode != ""
      ) {
        this.$http({
          method: "POST",
          url: "https://elm.cangdu.org/v2/login",
          withCredentials: true,
          data: {
            username: this.name,
            password: this.password,
            captcha_code: this.verifycode
          }
        }).then(res => {
            if (res.data.id) {
              sessionStorage.user_id =JSON.stringify( res.data.id);
              sessionStorage.username=this.name;
              this.$router.go(-1);
              
            } else{
              this.flag = true;
              this.msg = res.data.message
            }
        })
      } else {
        this.flag = true;
        if (this.name == "") {
          this.msg = "请输入正确的手机号/邮箱/用户名";
        } else if (this.password == "") {
          this.msg = "请输入密码";
        } else if (this.verifycode == "") {
          this.msg = "请输入正确的手机号/邮箱/用户名";
        } else if (this.img != this.verifycode) {
          this.msg = "验证码不正确";
        }
      }
    },
    confirm() {
      this.flag = false;
      this.verify();
    }
  },
  created() {
    this.verify();
  }
};
</script>
<style scoped>
.header {
  position: relative;
  margin-bottom: 0.1rem;
}
.header > a {
  float: left;
  color:#fff;
  margin-left: 0.2rem;
}
.header > p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: bolder;
  font-size: 0.18rem;
}
.con input {
  text-indent: 0.2rem;
  border: none;
  background: white;
  font-size: 14px;
}
.con input {
  width: 100%;
  height: 0.5rem;
  border-bottom: 1px solid #e4e4e4;
}
.pass {
  background: white;
  position: relative;
}
.pass > input {
  height: 0.5rem;
}
.pass > div {
  position: absolute;
  right: 0.1rem;
  top: 0.2rem;
}
.verify {
  background: white;
}
.verify:after {
  content: "";
  display: block;
  clear: both;
}
.verify > input {
  float: left;
  width: 50%;
  /* height: 0.5rem; */
}
.verify > p {
  line-height: 0.25rem;
  font-size: 0.14rem;
  float: right;
  width: 20%;
}
.verify span {
  float: right;
  margin-right: 0.2rem;
}
.verify span:nth-child(2) {
  color: #3190e8;
}
.verify > img {
  padding-top: 0.1rem;
}
.tip {
  height: 0.6rem;
  padding-top: 0.1rem;
  text-indent: 0.15rem;
  font-size: 0.12rem;
  line-height: 0.2rem;
  color: red;
}
.tip > p {
  margin-bottom: 0.1rem;
}
.login {
  width: 95vw;
  margin-left: 2.5vw;
  text-align: center;
  height: 0.45rem;
  line-height: 0.45rem;
  color: white;
  font-size: 0.16rem;
  border-radius: 0.05rem;
  border: none;
  background: #4cd964;
}
.forget > a {
  font-size: 0.14rem;
  color: #3190e8;
  float: right;
  margin-top: 0.25rem;
  margin-right: 0.1rem;
}


</style>
