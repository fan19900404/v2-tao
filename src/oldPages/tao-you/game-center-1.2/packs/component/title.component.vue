<template>
  <!--通用头-->
  <div class="title">
    <span  v-show ="isLeft" class="title__left">{{title}}</span>
    <span v-show = "isRight" class="title__right">{{goTitle}}</span>
  </div>
</template>

<script>
  'use strict';
  export default {
    data() {
      return {

      }
    },
    components: {

    },
    props: {
    //左边内容
      title:{
        type:"",
        default:"热门礼包"
      },
    //右边内容
      goTitle:{
        type:"",
        default:"今日开服"
      },
    //是否显示左边内容
      isLeft:{
        type:Boolean,
        default:true
      },
    //是否显示右边内容
      isRight:{
        type:Boolean,
        default:false
      },
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  /*通用头*/
  .title {
    height: .42rem;
    line-height: .42rem;
    padding: 0 .15rem;
    border-top: 1px solid #E5E5E5;
    border-bottom: 1px solid #E5E5E5;
    background: white;
    &__left {
      font-size: .16rem;
      color: #333333;
      float: left;
    }
    &__right {
      font-size: .13rem;
      color: #333333;
      float: right;
      i {
        color: #ff4a4a;
      }
    }
  }
</style>
