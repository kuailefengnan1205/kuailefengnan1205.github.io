<template>
    <div class="wrap">
        <div class="header">
            <i @click.stop="$router.go(-1)" class="el-icon-arrow-left"></i>
            <p>选择发票抬头</p>
        </div>
        <div class="con">
            <p>不需要开发票</p>
            <i @click.stop="ischecked=!ischecked" :class="{icon_select:ischecked}" class='el-icon-circle-check selected_icon'></i>
        </div>
          <div @click.stop="$router.go(-1)" class="confirm">确定</div>
    </div>
</template><script>
export default {
    data() {
        return {
            ischecked:false
        }
    },
}
</script>
<style scoped>
.wrap{
    background: #f5f5f5;
}
.header > i {
  float: left;
  padding-left: 0.15rem;
    box-sizing: border-box;
  color: #fff;
  font-size: 0.25rem;
  line-height: 0.45rem;
}
.header > p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 0.2rem;
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
.con{
    margin-top: .6rem;
    height: .5rem;
    line-height: .5rem;
    box-sizing: border-box;
    padding: 0 .15rem;
    display: flex;
    justify-content: space-between;
    background: #fff;
    font-size: .16rem;  
}
.con>i{
font-size: .25rem;
line-height: .5rem;
}
.icon_select{
    color:#4cd964!important;
}
</style>


