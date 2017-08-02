<style scoped>
  .img-container {
    box-sizing: border-box;
    width: 100%;
  }
  .img {
    display: inline-block;
    width: 100%;
  }
  .GOODS-GRAPHIC-DETAIL__detail-content {
    box-sizing: border-box;
    color: #898989;
    font-size: 1.4rem;
    line-height: 2.2rem;
    text-indent: 1rem;
  }
</style>

<template>
  <app-header :title="'图文详情'"></app-header>
  <div class="GOODS-GRAPHIC-DETAIL__detail-content">
    {{{imgList}}}
  </div>
  <app-bottom-bar></app-bottom-bar>
</template>

<script>
  import Vue from 'vue';
  import AppHeader from '../../oldComponents/common/header/app-header';
  import AppBottomBar from '../../oldComponents/common/footer/app-bottom-bar';

  export default {
    components: {
      AppHeader,
      AppBottomBar
    },
    data() {
      return {
        imgList:""
      }
    },
    mounted() {
      var that = this;
      Vue.OneMallHttp(this).GET({
        goodsID: this.$route.params.id
      }, Vue.OneMallUrl.goods_graphic_details)
        .then(function(res) {
          that.imgList = res.result.desc;
          if (10000 === res.code) {
            that.imgList = res.result.desc;

            // 处理布局问题
            setTimeout(() => {
              // 添加样式
              $.each($('.GOODS-GRAPHIC-DETAIL__detail-content p'), function(index, item) {
                if($(item).has('img').length) {
                  $(item).addClass('GOODS-GRAPHIC-DETAIL__imgInP')
                }
              })
            }, 360);
          }
          // 处理异常的请求
          else {
            //  TODO
          }

        })
    }
  }
</script>
