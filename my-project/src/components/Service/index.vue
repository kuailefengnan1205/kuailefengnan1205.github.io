<template >
    <div>
        <nav>
            <div class="header" >
                <router-link to="/profile"><i class="el-icon-arrow-left"></i></router-link>
                <p v-text="title"></p>
            </div>
        </nav>
        <router-view></router-view>
        <section v-show="flag" class="service">
            <router-link to="ecs-im.ele.me" class="service_left">
                <i class="icon-fuwuzhongxin iconfont icon_left"></i><p>在线客服</p>
            </router-link>
            <router-link to="ecs-im.ele.me" class="service_right">
               <i class="icon-dianhua iconfont icon_right"></i><p>在线客服</p>
            </router-link>
        </section>
        <section v-show="flag" class="questions">
            <div class="question_header">
                热门问题
            </div>
            <ul>
                <li class="question_title"
                
                v-for="(val,index)  in questions" @click="info(val,index)" :key="index">
                <p v-text="val"></p>
                </li>
            </ul>
        </section>
       
       
    </div>
</template>
<script>
export default {
    data() {
        return {
            questions: this.$store.state.questions,
            title:"服务中心",
            flag:true,
        }
    },
    methods: {
        info(val,index){
            this.title=val;
            this.flag=false;
            this.$router.push({name:"QuestionDetail",params:{id:index}})
        }
    },
}
</script>
<style scoped>
.header > a {
  float: left;
  margin-left: 0.2rem;
  color: white;
}
.header > p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: bolder;
  font-size: 0.18rem;
}
.questions{
    text-indent: .2rem;
    color: #666;
    background: #fff;
}
.service{
    margin-top: 0.45rem;
    background: #fff;
    position: relative;
    height: 1rem;
    text-align: center;
}
.service>a{
    width: 50%;
    box-sizing:border-box;
}
.service_left{
    position: absolute;
    left: 0;
    top: 50%;
    height: 100%;
    transform: translateY(-50%);
    border-right: 1px solid #f3f3f3;
}
.service_left>i{
    display: block;
    margin-top: .25rem;
}
.service_right>i{
     display: block;
    margin-top: .1rem;
}
.service_right>p{
    margin-top: .1rem;
}
.service_left>p{
    margin-top: .05rem;
}
.service_right{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%)
}

.question_header{
    height: .6rem;
    font-size: .2rem;
    line-height: .6rem;
    border-top: 1px solid #f3f3f3;
}
.question_title{
    height: .4rem;
    line-height: .4rem;
     border-top: 1px solid #f3f3f3;
     font-size: .15rem;
}
.icon_left{
    font-size: .35rem;
    color:orange;
}
.icon_right{
    font-size: .25rem;
    color:rgb(47, 179, 47);
}
</style>