<style scoped>
  .img-container {
    box-sizing: border-box;
    width: 100%;
  }
  .img {
    display: inline-block;
    width: 100%;
  }
</style>

<template>
  <app-header :title="'图文详情'"></app-header>
  <div class="goods-graphic-details-container">
    <ul class="img-items-container">
      <li v-for="v in imgList" track-by="$index" class="img-container">
        <img class="img" src="{{v}}">
      </li>
    </ul>
  </div>

  <app-bottom-bar></app-bottom-bar>
</template>

<script>
  import Vue from 'vue';
  import AppHeader from '../../components/common/header/app-header';
  import AppBottomBar from '../../components/common/footer/app-bottom-bar';

  export default {
    components: {
      AppHeader,
      AppBottomBar
    },
    data() {
      return {
        imgList: []
      }
    },
    mounted() {
      var that = this;
      Vue.OneMallHttp(this).GET({
        goodsID: this.$route.params.id
      }, Vue.OneMallUrl.goods_graphic_details)
        .then(function(res) {

          if (10000 === res.code) {
            var temp = res.result;
            that.imgList = temp.introImgUrl;
          }
          // 处理异常的请求
          else {
            //  TODO
          }

        })
    }
  }
</script>
