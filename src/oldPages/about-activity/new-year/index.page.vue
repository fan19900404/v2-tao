<template>
  <app-header :title="title"></app-header>
  <div class="main_content">
    <img src="/oldStatic/images/activity/newyear/newyear-bg.jpg">
    <a class="link link1" href="/#/personal/recharge"></a>
    <a class="link link2" href="/#/personal/recharge"></a>
    <a class="link link3" href="/#/personal/recharge"></a>
  </div>

  <!-- 返回首页 -->
  <go-back :path="'/?mID=' + mID"></go-back>
</template>
<style type="text/css" scoped>
  .main_content{position: absolute;overflow: hidden;}
  .main_content img{display: block;}
  .link{display: block;width: 84px;height: 46px;position: absolute;top: 0;}
  .link1{margin-top: 51%;margin-left: 68%;}
  .link2{margin-top: 72%;margin-left: 68%;}
  .link3{margin-top: 94%;margin-left: 68%;}
</style>
<script>
  import AppHeader from '../../../oldComponents/common/header/app-header';
  import GoBack from '../../../oldComponents/feature/common/goback.component';

  export default {
    components: {
      AppHeader,
      GoBack
    },
    data() {
      return {
        title: '商品详情',
        mID: this.$route.query.mID || 8
      }
    }
  }
</script>
