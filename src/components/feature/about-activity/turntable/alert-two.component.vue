<template>
  <div v-if = "isShow" class="mask" transition="action">
      <div class ="about-alert">
        <div class ="about-alert-head" >心动吗？</div>
        <div class ="about-alert-img"><img src="../../../../../static/images/activity/turntable/20161208.png"></div>
        <p>已经有<span>{{count}}</span>人获得 “<span>iPhone7</span>”<p>
        <button @click="goIndex">心动</button>
        <div @click="nowant" class ="about-button"><div class="button1"></div><div class="button2"></div></div>
      </div>
  </div>
</template>
<style scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
}
.mask .about-alert{
    width: 26rem;
    height: 32rem;
    background: #fff;
    border-radius: 0.5rem;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -13rem;
    margin-top: -16rem;
}
.about-alert-head{
    width: 100%;
    height: 7rem;
    text-align: center;
    line-height: 7rem;
    font-size: 2.6rem;
    font-weight: bold;
    background-image:url("../../../../../static/images/activity/turntable/201612008.png");
    color: #fff;
}
.about-alert-img{
  width:100%;
  height:14rem;
  margin:0 auto;
  background:#f2f2f2;
}
.about-alert-img img{
  width:100%;
  height:100%;
}
p{
    height: 5rem;
    text-align: center;
    line-height: 5rem;
    font-size: 1.4rem;
}
p span{
  color:red;
}
button{
  width:80%;
  height:3.2rem;
  text-align:center;
  line-height:3.2rem;
  font-size:1.8rem;
  color:#fff;
  background-color: rgb(255,54,54);
  border:none;
  border-radius:3rem;
}
.about-button{
  width:2rem;
  height:2rem;
  position:absolute;
  top:-.5rem;
  right:-.5rem;
  background:red;
  border-radius:50%;
}
.button1{
  position:absolute;
  width:.19rem;
  height:1.7rem;
  left:50%;
  margin-left:-0.085rem;
  top:5%;
  background:#fff;
  transform:rotate(45deg);
}
.button2{
  position:absolute;
  width:.19rem;
  height:1.7rem;
  left:50%;
  margin-left:-0.085rem;
  top:5%;
  margin:0 auto;
  background:#fff;
 transform:rotate(-45deg);
}
  .action-transition {
    transition: all .3s linear;
    opacity: 1;
  }
  .action-enter {
    opacity: 0;
  }
  .action-leave {
    opacity: 0;
  }
</style>
<script>
  export default {
    props:{
      isShow:{
        type: Boolean,
        default:true
      },
      //显示已经有多少人获得了iPhone7
      count:{
        type:   Number,
        default:88
      }
    },
    methods:{
    //本页面点击关闭按钮
      nowant:function(){
      //第二次页面仍然关闭时执行操作
        this.$dispatch('dont');
      },
    //本页确定按钮
    goIndex:function(){
        this.$dispatch('go-index')
      }
    }
  }
</script>
