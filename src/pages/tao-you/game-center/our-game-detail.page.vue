<template>
  <div>
    <!-- 头部的导航 -->
    <app-header :title="'游戏详情'"></app-header>

    <!-- 游戏的图片介绍 -->
    <div class="game-simple-intro">
      <img class="game-simple-intro__img" :src="pd.gameIcon" alt="游戏图标">
      <div class="game-simple-intro__text">
        <span class="name">{{pd.gameName}}</span>
        <span class="type">期号:{{pd.number}}</span>
        <div class="intro">开奖时间:
          <app-timer @timer-action="gameInfo" :endtime="+pd.opentime"></app-timer>
        </div>
      </div>
      <a class="exchange_link  JS-statistics-our-game-jion" @click="link({name:'TaoYouPersonalCenterGameRule'})">参赛规则</a>
    </div>

    <!-- 新的轮播图 -->
    <div class="carousel-section JS-statistics-our-game-sec">
      <div class="carousel-section-title">
        游戏介绍
      </div>
      <div class="carousel-outer-wrapper">

        <my-swipe :swipe-data="drCarouselData"></my-swipe>
      </div>

      <!-- 游戏的更多详细信息 h5 -->
      <div class="game-other-msg am-flexbox">
        <!-- h5 -->
        <div class="am-flexbox-item">
          <div class="item-info">
            <span class="item-key">游戏人数</span>
            <span class="item-value overflow-ellipsis">{{pd.playNumber}}</span>
          </div>
          <div class="item-info">
            <span class="item-key">游戏状态</span>
            <span class="item-value overflow-ellipsis">{{gameStatus}}</span>
          </div>
        </div>
        <div class="am-flexbox-item">
          <div class="item-info">
            <span class="item-key">游戏评分</span>
            <span class="item-value overflow-ellipsis">{{pd.averageScore}}</span>
          </div>
        </div>
      </div>

      <!-- 游戏的文字介绍 <span class="game-intro-weight">游戏简介</span>: -->
      <div class="game-text-intro" v-html="pd.gameIntro"></div>
    </div>

    <!-- fix btn place-->
    <div class="btn-container-fill">
    </div>

    <!-- 底部按钮 -->
    <div class="btn-container JS-statistics-our-game-begain">
      <app-button :btn-text="btnMsg" @button-component="isUserLogin"></app-button>
    </div>

    <!-- 弹窗 -->
    <one-simple-button :show="showAlert" :content="alertMsg" :btn-text="'确定'" @one-btn-dialog-component="closeAlert" :has-slot="false">
    </one-simple-button>
    <!-- 添加底部的组件 -->
    <div class="GAME-DETAIL-footer-container">
      <footer-component :copy-right="false" :only-login="true" :menu-id="1"></footer-component>
    </div>
    <return-btn></return-btn>
  </div>
</template>

<script>

import Vue from 'vue';
import { Swipe, SwipeItem } from 'mint-ui';
import AppHeader from '../../../components/tao-you/layout/header.component';
import FooterComponent from '../../../components/tao-you/layout/footer.component';
import Slider from '../../../components/common-slider/simple-slider.component';
import DrGameSlider from '../../../components/common-slider/vue-dr-game-slider.component';
import CommonBottomBtn from '../../../components/common-btn/common-bottom-btn.component';
import CommonAlert from '../../../components/common-alert/common-alert.component';
import AppButton from '../../../components/tao-you/button/button.component';
import OneSimpleButton from '../../../components/tao-you/dialog/one-button-simple-dialog.component';
import ReturnBtn from '../../../components/tao-you/button/return.component';
import AppTimer from '../../../components/tao-you/timer/match-timer.component';
import Statistics from '../statistics/game-center/our-game';
import MySwipe from '../../../components/tao-you/horizontal-swiper/horizontal-swiper.component';

export default {
  components: {
    ReturnBtn,
    AppHeader,
    CommonBottomBtn,
    Swipe,
    SwipeItem,
    Slider,
    DrGameSlider,
    CommonAlert,
    AppButton,
    OneSimpleButton,
    FooterComponent,
    AppTimer,
    MySwipe,
  },
  data() {
    return {
      gameBackgroundUrl: 'https://placeholdit.imgix.net/~text?txtsize=28&txt=300%C3%97300&w=300&h=300',
      // 底部按钮文字
      bottomH5BtnText: '开始游戏',
      bottomMobileBtnText: '下载游戏',
      pd: {
        opentime: 0,
      },
      // 游戏轮播配置
      sliderStyle: {
        //          height: '22rem',
        margin: '.15rem 0 .15rem .16rem',
      },
      carouselList: [],
      sliderinit: {
        currentPage: 1,
        start: {},
        end: {},
        tracking: false,
        thresholdTime: 360, // 滑动判定距离
        thresholdDistance: 100, // 滑动判定时间
      },
      // 滑动组件
      gapWidth: '.1rem',
      rightGapWidth: '.16rem',
      drCarouselData: [],
      drCarouselItemStyle: {
        width: '1.66rem',
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
      },
      drCarouselWrapperStyle: {
        height: '1rem',
        backgroundColor: '#ffffff',
      },
      // 弹框
      showAlert: false,
      alertMsg: null,
      // 按钮的文字提示
      btnMsg: '开始游戏',
      // 是否显示组件
      showComponent: false,
      // 游戏状态
      gameStatus: null,
    };
  },
  computed: {
    gameShowStyle() {
      return {
        backgroundImage: `url(${this.pd.gameBack})`,
      };
    },
  },
  methods: {
    link(url) {
      this.$router.push(url);
    },
    closeAlert() {
      this.showAlert = false;
    },
    beginPlay() {
      // // 跳转页面
      // ?gid=20&type=2
      const item = this.pd;

      try {
        const gametype = this.$route.query.type;
        if (typeof gametype !== 'undefined' || this.pd.gameUrl.indexOf('&type=') < 0) {
          location.href = `${this.pd.gameUrl}&type=${gametype}`;
        } else {
          location.href = this.pd.gameUrl;
        }
      } catch (e) {
        location.href = this.pd.gameUrl;
      }
    },
    // 判断用户是否登录
    isUserLogin() {
      const query = {};
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.get_user_info)
        .then((res) => {
          if (res.code === 10000) {
            const gid = this.$route.params.id;

            if (typeof gid !== 'undefined') {
              Vue.ClientHttp(this).GET({
                type: 0,
                gid,
              }, Vue.ClientUrl.sendGameStatistics)
                .then((res) => {
                  if (res.code === 10000) {
                    // 用户开始玩游戏
                    this.beginPlay();
                  }
                });
            } else {
              // 用户开始玩游戏
              this.beginPlay();
            }
          }
        });
    },
    // 获取游戏数据
    gameInfo() {
      const query = {
        gid: this.$route.params.id,
        // 用户不登录也可以查看相关信息
        nologin: 1,
        type: this.$route.query.type,
      };
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.our_small_game_intro)
        .then((res) => {
          if (res.code === 10000) {
            this.pd = res.result;
            this.gameBackgroundUrl = this.pd.gameBackgroundUrl;
            // 获取游戏的名字
            document.title = res.result.gameName;
            // 按钮的文案
            this.btnMsg = '开始游戏';
            if (+this.pd.status == 1) {
              this.gameStatus = '进行中';
            } else if (+this.pd.status == 2) {
              this.gameStatus = '开奖中';
            } else if (+this.pd.status == 3) {
              this.gameStatus = '已结束';
            } else if (+this.pd.status == 0) {
              this.gameStatus = '未开始';
            } else {
              // TODO
            }

            // 计算轮播图
            const itemStyle = {
              width: '1.56rem',
              marginRight: '0px',
            };
            const length = this.pd.imgUrl.length;
            for (let i = 0; i < length; i++) {
              this.carouselList.push({
                style: {
                  width: '1.56rem',
                  marginRight: '.1rem',
                },
                imgUrl: this.pd.imgUrl[i],
              });
            }
            // 新的轮播图
            this.drCarouselData = res.result.imgUrl;
          }
        });
    },
  },
  mounted() {
    // 使用统计代码
    Statistics(this);
    localStorage.setItem('originUrl', location.href);
    this.gameInfo();
    $('body').css({ 'background-color': '#f5f5f9' });
    setTimeout(() => {
      this.showComponent = true;
    }, 360);
  },
  destroyed() {
    // TODO
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/tao-you/common.scss";

.btn-container-fill {
  height: .62rem;
}




/* 按钮容器 */

.btn-container {
  // padding: .3rem .15rem;
  z-index: 1000;
  position: fixed;
  /*left: 0;*/
  /*right: 0;*/
  width: 100%;
  max-width: 640px;
  box-sizing: border-box;
  bottom: 0;
  border-top: 1px solid #e5e5e5;
  padding: .1rem .15rem;
  background-color: #f8f8f8;
}




/* 游戏的简单介绍 */

.game-simple-intro {
  display: flex;
  padding: .15rem;
  box-sizing: border-box;
  height: 1rem;
  background-color: $white;
  align-items: center;
  border-top: 1px solid $primary-border;
  border-bottom: 1px solid $primary-border;
  margin-bottom: .15rem;
  position: relative;

  .exchange_link {
    top: .14rem;
    right: .16rem;
    background-color: $primary;
    color: $white;
    font-size: $font-size-md;
    height: .25rem;
    line-height: .25rem;
    display: block;
    padding: 0 .1rem;
    text-align: center;
    border-radius: .05rem;
    font-size: $font-size-sm;
    position: absolute;
  }

  &__img {
    height: .7rem;
    width: .7rem;
    margin-right: .1rem;
    border-radius: .15rem;
  }
  &__text {
    display: flex;
    flex-direction: column;
    height: .6rem;
    justify-content: space-between;
    ;

    .name {
      color: #333;
      font-size: $font-size-lg;
      height: $font-size-lg;
      line-height: $font-size-lg;
    }
    .type,
    .intro {
      color: #a5a5a5;
      font-size: $font-size-md;
      height: $font-size-md;
      line-height: $font-size-md;
    }
  }
}

.carousel-section {
  background-color: $white;
  border-top: 1px solid $primary-border;
  /*border-bottom: 1px solid $primary-border;*/
  /*margin-bottom: .62rem;*/
  padding-left: .15rem;
}

.carousel-section-title {
  height: .44rem;
  line-height: .44rem;
  font-size: $font-size-lg;
  color: $dark;
  border-bottom: 1px solid $primary-border;
}

.carousel-outer-wrapper {
  background-color: $white;
  margin: .15rem 0 .15rem 0;
  display: block;
  overflow: hidden;
}

.game-show {
  height: 1.63rem;
  align-items: center;
  flex-direction: column;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;

  &__img-container {
    width: .88rem;
    height: .88rem;
    box-sizing: border-box;
    border: .04rem solid #cdd2d7;
    border-radius: 50%;
    margin-top: .24rem;
  }

  &__img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  &__name {
    margin-top: .11rem;
    font-size: .16rem;
    text-align: center;
  }
}

.game-other-msg {
  align-items: stretch;
  border-top: 1px solid #dfdfdf;
  color: #898989;
  font-size: .14rem;
  padding: .1rem .15rem .1rem 0;
}

.item-info {
  display: flex;
  line-height: .22rem;

  .item-key {
    width: .61rem;
    min-width: .61rem;
  }
  /*// .item-value{*/
  /*//   width: .88rem;*/
  /*// }*/
}

.item-value {
  width: .88rem;
  color: #000;
  padding-left: .05rem;
}

.game-text-intro {
  padding-right: .15rem;
  color: #898989;
  font-size: .14rem;
  line-height: .22rem;
  border-top: 1px solid #dfdfdf;
  padding-top: .1rem;
  padding-bottom: .1rem;
  text-indent: .1rem;
}

.GAME-DETAIL-footer-container {}
</style>
