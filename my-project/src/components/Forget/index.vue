<template >
  <div>
    <div class="header"><router-link to="/profile"> <i class="el-icon-arrow-left"></i> </router-link><p>重置密码</p></div>
    <div class="con">
      <div>
        <input type="text" v-model="username" placeholder="账号">
      </div>
      <div>
        <input type="text" v-model="password" placeholder="旧密码">
      </div>
      <div>
        <input type="text" v-model="newpass" placeholder="请输入新密码">
      </div>
      <div>
        <input type="text" v-model="renewpass" placeholder="请确认密码">
      </div>
      <div class="verify">
        <input type="text" v-model="verifycode" placeholder="验证码">
        <img :src="img" alt>
        <p @click="changeImg">
          <span>看不清</span>
          <span>换一张</span>
        </p>
      </div>
      <button class="reset" @click="reset()">确认修改</button>
      <div class="container animation bounceIn" v-show="flag">
        <div class="flag">
          <div class="warn">
            <span></span>
            <span></span>
          </div>
          <p v-text="msg"></p>
          <div @click="confirm" class="confirm">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      img: "",
      verifycode: "",
      flag: false,
      username: "",
      password: "",
      newpass: "",
      renewpass: "",
      verifycode: "",
      msg: ""
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
    reset() {
      if (this.username == "") {
        this.flag = true;
        this.msg = "请输入正确的账号";
      } else if (this.password == "") {
        this.flag = true;
        this.msg = "请输入旧密码";
      } else if ((this.newpass == "")) {
        this.flag = true;
        this.msg = "请输入新密码";
      } else if (this.rennewpass == "") {
        this.flag = true;
        this.msg = "请输入确认密码";
      } else if (this.newpass != this.renewpass) {
        this.flag = true;
        this.msg = "两次输入的密码不一致";
      } else if (this.verifycode == "") {
        this.flag = true;
        this.msg = "请输入验证码";
      } else {
        this.$http({
          method: "POST",
          url: "https://elm.cangdu.org/v2/changepassword",
          withCredentials: true,
          data: {
            username: this.username,
            oldpassWord: this.password,
            newpassword: this.newpass,
            confirmpassword: this.renewpass,
            captcha_code: this.verifycode
          }
        }).then(res => {
          if (res.data.success) {
            this.flag = true;
            this.msg = "密码修改成功";
          }else{
            this.flag = true;
            this.msg = res.data.message;
          }
        });
      }
    },
    confirm() {
        this.flag=false;
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
.header>a{
    float: left;
    padding-left: .2rem;
    color: #fff;
}
.header>p{
    position: absolute;
    left: 50%;
    transform:translate(-50%);
}
.con input {
  width: 100%;
  height: 0.5rem;
  border-bottom: 1px solid #e4e4e4;
  text-indent: 0.2rem;
  font-size: 0.16rem;
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
  border: none;
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
.reset {
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
  margin-top: 0.25rem;
}
.container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
}
.flag {
 transform: translateY(-15%)
}

</style>