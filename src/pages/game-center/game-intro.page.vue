<!-- author: dreamapple -->
<template>
  <app-header :title="'游戏详情'"></app-header>
  <!-- 游戏图片介绍 -->
  <div :style="gameShowStyle" class="game-show flex">
    <div class="game-show__img-container">
      <img :src="pd.gameIcon" class="game-show__img">
    </div>
    <div class="game-show__name">{{pd.gameName}}</div>
  </div>
  <!-- 游戏的图片介绍 -->
  <!--<slider :slider-style="sliderStyle" :pages="carouselList" :sliderinit="sliderinit">-->
    <!--&lt;!&ndash; slot  &ndash;&gt;-->
  <!--</slider>-->

  <!-- 新的轮播图 -->
  <div class="carousel-outer-wrapper">
    <dr-game-slider :carousel-data="drCarouselData"
                    :gap-width="gapWidth"
                    :right-gap-width="rightGapWidth"
                    :carousel-wrapper-style="drCarouselWrapperStyle"
                    :carousel-item-style="drCarouselItemStyle"></dr-game-slider>
  </div>

  <!-- 游戏的更多信息 -->
  <!--<div class="game-other-msg">-->
    <!--<p><span class="game-intro-weight">运行平台</span>: {{pd.flatname}}</p>-->
    <!--<p><span class="game-intro-weight">开发公司</span>: {{pd.company}}</p>-->
  <!--</div>-->

  <div class="game-other-msg dr-flex">
    <div class="flex-1">
      <div class="item-info">
        <span class="item-key">游戏名称</span><span class="item-value">{{pd.gameName | substr 4 '...'}}</span>
      </div>
      <div class="item-info">
        <span class="item-key">类别细分</span><span class="item-value">{{pd.category | substr 4 '...'}}</span>
      </div>
      <div class="item-info">
        <span class="item-key">运行平台</span><span class="item-value">{{pd.flatname | substr 4 '...'}}</span>
      </div>
      <div class="item-info">
        <span class="item-key">游戏评分</span><span class="item-value">{{pd.averageScore | substr 4 '...'}}</span>
      </div>
    </div>
    <div class="flex-1">
      <div class="item-info">
        <span class="item-key">下载量</span><span class="item-value">{{pd.downNumber | substr 4 '...'}}</span>
      </div>
      <div class="item-info">
        <span class="item-key">是否联网</span><span class="item-value">{{+pd.isOnline ? '是' : '否'}}</span>
      </div>
      <div class="item-info">
        <span class="item-key">运营商</span><span class="item-value">{{pd.company | substr 4 '...'}}</span>
      </div>
      <div class="item-info">
        <span class="item-key">游戏版本</span><span class="item-value">{{pd.version | substr 4 '...'}}</span>
      </div>
    </div>
  </div>

  <!-- 游戏的文字介绍 <span class="game-intro-weight">游戏简介</span>: -->
  <div class="game-text-intro">
    {{{pd.gameIntro}}}
  </div>

  <!-- 底部按钮 -->
  <common-bottom-btn v-if="1 === +pd.type" :btn-text="bottomH5BtnText" @bottom-btn-action="beginPlay"></common-bottom-btn>
  <common-bottom-btn v-if="2 === +pd.type" :btn-text="bottomMobileBtnText" @bottom-btn-action="beginPlay"></common-bottom-btn>

  <!-- common alert -->
  <common-alert :type="alertType" :show-alert="showAlert" :alert-msg="alertMsg" :alert-status="alertStatus"></common-alert>
</template>

<script>
  'use strict';

  import Vue from 'vue';
  import Slider from '../../components/common-slider/simple-slider.component';
  import DrGameSlider from '../../components/common-slider/vue-dr-game-slider.component.vue';
  import { Swipe, SwipeItem } from 'mint-ui';
  import AppHeader from '../../components/common-layout/header.component';
  import CommonBottomBtn from '../../components/common-btn/common-bottom-btn.component';
  import CommonAlert from '../../components/common-alert/common-alert.component';
  export default {
    components: {
      AppHeader,
      CommonBottomBtn,
      Swipe,
      SwipeItem,
      Slider,
      DrGameSlider,
      CommonAlert
    },
    data() {
      return {
        gameBackgroundUrl: 'https://placeholdit.imgix.net/~text?txtsize=28&txt=300%C3%97300&w=300&h=300',
        // 底部按钮文字
        bottomH5BtnText: '开始游戏',
        bottomMobileBtnText: '下载游戏',
        pd: {},
        // 游戏轮播配置
        sliderStyle: {
//          height: '22rem',
          margin: '1.5rem 0 1.5rem 1.6rem'
        },
        carouselList: [],
        sliderinit: {
          currentPage: 1,
          start: {},
          end: {},
          tracking: false,
          thresholdTime: 360,//滑动判定距离
          thresholdDistance: 100//滑动判定时间
        },
        // 滑动组件
        gapWidth: '1rem',
        rightGapWidth: '1.6rem',
        drCarouselData: [],
        drCarouselItemStyle: {
          width: '16.6rem',
          boxSizing: 'border-box',
          backgroundColor: '#ffffff'
        },
        drCarouselWrapperStyle: {
          height: '10rem',
          backgroundColor: '#ffffff'
        },
        // 弹框
        alertType: 0,
        showAlert: false,
        alertMsg: '',
        alertStatus: ''
      }
    },
    computed: {
      gameShowStyle() {
        return {
          backgroundImage: 'url('+ this.pd.gameBack +')'
        }
      }
    },
    methods: {
      beginPlay() {
        // // 跳转页面
        // window.location.href = this.pd.gameUrl;
        // 如果是手游，检查下是ios还是android
        // 若对应版本的游戏不存在，则弹框提示用户
        let item =  this.pd;
        if(item.type == '2'){
          let downloadUrl = mallUtils.device.isIOS? item.iosUrl: item.gameUrl;
          if(!downloadUrl || !downloadUrl.replace(/^\s+|\s+$/g,'')){
            this.showAlert = true;
            this.alertMsg = '消息提示';
            this.alertStatus = '您的手机暂不支持此版本游戏下载';
            return;
          }
          location.href = downloadUrl;
          return;
        }

        // 如果是h5游戏直接跳转
        location.href = item.gameUrl;
      },
      // 获取游戏数据
      gameInfo() {
        let query = {
          id: this.$route.params.id
        };
        Vue.ClientHttp().GET(query, Vue.ClientUrl.game_detail)
          .then((res) => {
            if(10000 === res.code) {
              this.pd = res.result;
              this.gameBackgroundUrl = this.pd.gameBackgroundUrl;
              // 计算轮播图
              let itemStyle = {
                width:'15.6rem',
                marginRight:'0px'
              };
              let length = this.pd.imgUrl.length;
              for(var i = 0; i < length; i++) {
                this.carouselList.push({
                  style: {
                    width:'15.6rem',
                    marginRight:'1rem'
                  },
                  imgUrl: this.pd.imgUrl[i]
                })
              }
              // 新的轮播图
              this.drCarouselData = res.result.imgUrl;
            }
          })
      }
    },
    mounted() {
      this.gameInfo();
      $('body').css({'background-color': '#fff'});
    },
    destroyed() {
//      $('body').css({'background-color': '#f8f8f8'});
    }
  }
</script>

<style lang="scss" scoped>
  .carousel-outer-wrapper {
    margin: 1.5rem 0 1.5rem 1.6rem;
    display: block;
  }
  .game-show {
    height: 16.3rem;
    align-items: center;
    flex-direction: column;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;

    &__img-container {
      width: 8.8rem;
      height: 8.8rem;
      box-sizing: border-box;
      border: .4rem solid #cdd2d7;
      border-radius: 50%;
      margin-top: 2.4rem;
    }

    &__img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    &__name {
      margin-top: 1.1rem;
      font-size: 1.6rem;
      text-align: center;
    }
  }

  .game-other-msg {
    margin: 0 1.6rem;
    border-top: 1px solid #dfdfdf;
    color: #898989;
    font-size: 1.4rem;
    padding: 1rem 0;
  }

  .item-info {
    line-height: 2.2rem;
  }

  .item-value {
    color: #000;
    padding-left: 1rem;
  }

  .game-text-intro {
    margin: 0 1.6rem;
    color: #898989;
    font-size: 1.4rem;
    line-height: 2.2rem;
    border-top: 1px solid #dfdfdf;
    padding-top: 1rem;
    padding-bottom: 1rem;
    text-indent: 1rem;
  }
</style>
