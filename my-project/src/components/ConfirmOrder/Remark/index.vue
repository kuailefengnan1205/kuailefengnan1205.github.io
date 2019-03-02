<template>
  <div>
    <div class="wrap">
      <div class="header">
        <i @click="$router.go(-1)" class="el-icon-arrow-left"></i>
        <p>订单备注</p>
      </div>
      <div class="con">
        <p>快速备注</p>
        <ul>
          <li @click="select(index)" :class="{toBlue:arr.indexOf(index)!=-1}" v-for="(val,index) in remarks" :key="index" v-text="val"></li>
        </ul>
      </div>
      <div class="text">
        <p class="other_remark">其他备注</p>
        <textarea placeholder="请输入备注内容(可不填)"></textarea>
      </div>
       <div @click="back(arr_mark)" class="confirm">确定</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      remarks: [
        "不要辣",
        "少点辣",
        "多点辣",
        "不要香菜",
        "不要洋葱",
        "多点醋",
        "多点葱",
        "去冰",
        "少冰"
      ],
      arr:[],
      arr_mark:[],
    };
  },
methods: {
    select(index){
       if (this.arr.indexOf(index)==-1) {
          this.arr.push(index);
        this.arr_mark.push(this.remarks[index])
       }else{
         let i =this.arr.indexOf(index)
         this.arr.splice(i,1);
         this.arr_mark.splice(i,1);
       }
    },
    back(name){
      this.$emit('back',name)
        this.$router.push({name:"ConfirmOrder"})
    }
},
};
</script>
<style scoped>
.wrap{
    width: 100vw;
}
.header > i {
  float: left;
  padding-left: 0.15rem;
  box-sizing: border-box;
  color: #fff;
  font-size: 0.25rem;
  line-height: 0.45rem;
}
.header p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 0.2rem;
}
.con{
    margin-top: .45rem;
}
.con>p,.other_remark{
    font-size: .14rem;
    color: #333;
    line-height: .5rem;
    text-indent: .15rem;
}
ul{
    display: flex;
    flex-wrap: wrap;
    margin-top: .1rem;
}
ul>li{
        font-size: .15rem;
    color: #333;
    padding: .08rem .15rem;
    border: .005rem solid #3190e8;
    border-radius: .05rem;
    margin: 0 .05rem .1rem .1rem;
}
.toBlue{
    background: #3190e8;
    color: #fff;
}
textarea{
    width: 85%;
    margin-left: 4%;
    background-color: #f9f9f9;
    border: .01rem solid #eee;
    resize: none;
    min-height: .6rem;
    border-radius: .05rem;
    font-size: .15rem;
    color: #666;
    padding: .13rem;
}
.confirm {
  font-size: 0.16rem;
  color: #fff;
  font-weight: 700;
  margin-top: 0.16rem;
  background-color: #4cd964;
  width: 90%;
  margin-left: 5%;
  text-align: center;
  line-height: 0.36rem;
  border: 1px;
  border-bottom-left-radius: 0.05rem;
  border-bottom-right-radius: 0.05rem;
  outline: none;
}
</style>

