<template>
  <div class="outer">
    <div class="outer__top">
      <div class="outer__bottom" :class="{'active':isTotal}" :style="progressStyle"></div>
    </div>
    <p class="outer__text">{{now}} / {{total}}</p>
  </div>
</template>

<script>
  'use strict';
  export default {
    data(){
      return {
        now:0
      }
    },
    props:{
      used:{
        type:Number,
        default:60
      },
      total:{
        type:Number,
        default:100
      }
    },
    computed:{
      progressStyle(){
        return {
            width: parseInt(this.now)*100/parseInt(this.total) + '%'
        }
      },
      //是否全部做完
      isTotal(){
        return (parseInt(this.now)/parseInt(this.total))===1?true:false
      }
    },
    components: {

    },
    methods: {

    },
    mounted(){
      //添加动态效果
      var _this = this;
      if(this.used===0){
          return;
      }
      var timer = setInterval(function(){
          _this.now += 1;
          if( _this.now==_this.used){
            clearInterval(timer);
          }
      },20)
    }
  }
</script>

<style lang="scss" scoped>
  .outer {
    margin: .07rem 0 0 0;
    &__top{
      height: .04rem;
      background:#e5e5e5;
      border-radius: .05rem;
      position: relative;
    }
    &__bottom{
      height: .04rem;
      background: #00C1B3;
      border-top-left-radius: .05rem;
      border-bottom-left-radius: .05rem;
  }
    &__text {
      font-size: .12rem;
      color: #00C1B3;
      line-height: .12rem;
      padding-top: .05rem;
    }
  }
  .active {
    border-top-right-radius: .05rem;
    border-bottom-right-radius: .05rem;
  }
</style>
