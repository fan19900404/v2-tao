<template>
  <div>
    <p class="pay-result-tip" v-show="fromWechat">支付完成，请打开相应的客户端查看结果...</p>
    <div class="game-intro-wrapper" v-show="!fromWechat">
      <!-- 头部的导航 -->
      <app-header :title="'游戏详情'"></app-header>

      <!-- 游戏的图片介绍 -->
      <div class="game-simple-intro">
        <img class="game-simple-intro__img" :src="pd.gameIcon" alt="游戏图标">
        <div class="game-simple-intro__text">
          <div class="name">{{pd.gameName}}</div>
          <div class="type">类型:{{pd.category}}</div>
          <div class="intro" v-html="pd.abstract"></div>
          <!-- <div class="share-area">
            <share-component :config="config"></share-component>
          </div> -->
          <share-component :config="config" :bind-style="{display: 'flex', position: 'absolute', top: 0, right: 0}"></share-component>
        </div>
      </div>

      <!-- 新的轮播图 -->
      <div class="carousel-section JS-statistics-enter-game-section">
        <div class="carousel-section-title">
          游戏介绍
        </div>
        <div class="carousel-outer-wrapper">
          <!--<dr-game-slider v-if="showComponent" :carousel-data="drCarouselData"-->
          <!--:gap-width="gapWidth"-->
          <!--:right-gap-width="rightGapWidth"-->
          <!--:carousel-wrapper-style="drCarouselWrapperStyle"-->
          <!--:carousel-item-style="drCarouselItemStyle">-->
          <!--</dr-game-slider>-->
          <my-swipe :swipe-data="drCarouselData"></my-swipe>
        </div>

        <!-- 游戏的更多详细信息 h5 -->
        <div v-show="+this.pd.type === 1" class="game-other-msg am-flexbox">
          <!-- h5 -->
          <div class="am-flexbox-item">
            <div class="item-info">
              <span class="item-key">游戏版本</span>
              <span class="item-value overflow-ellipsis">{{pd.version}}</span>
            </div>
            <div class="item-info">
              <span class="item-key">人气值</span>
              <span class="item-value overflow-ellipsis">{{pd.downNumber}}</span>
            </div>
            <div class="item-info">
              <span class="item-key">运营商</span>
              <span class="item-value overflow-ellipsis">{{pd.company}}</span>
            </div>
          </div>
          <div class="am-flexbox-item">
            <div class="item-info">
              <span class="item-key">是否联网</span>
              <span class="item-value overflow-ellipsis">{{+pd.isOnline ? '是' : '否'}}</span>
            </div>
            <div class="item-info">
              <span class="item-key">游戏评分</span>
              <span class="item-value overflow-ellipsis">{{pd.averageScore}}</span>
            </div>
          </div>
        </div>

        <!-- 游戏的更多详细信息 手游-->
        <div v-show="+this.pd.type === 2" class="game-other-msg am-flexbox">
          <div class="am-flexbox-item">
            <div class="item-info">
              <span class="item-key">游戏大小</span>
              <span class="item-value overflow-ellipsis">{{pd.gameSize}}</span>
            </div>
            <div class="item-info">
              <span class="item-key">是否联网</span>
              <span class="item-value overflow-ellipsis">{{+pd.isOnline ? '是' : '否'}}</span>
            </div>
            <div class="item-info">
              <span class="item-key">游戏版本</span>
              <span class="item-value overflow-ellipsis">{{pd.version}}</span>
            </div>
            <div class="item-info">
              <span class="item-key">运营商</span>
              <span class="item-value overflow-ellipsis">{{pd.company}}</span>
            </div>
          </div>
          <div class="am-flexbox-item">
            <div class="item-info">
              <span class="item-key">运行平台</span>
              <span class="item-value overflow-ellipsis">{{pd.flatname}}</span>
            </div>
            <div class="item-info">
              <span class="item-key">游戏评分</span>
              <span class="item-value overflow-ellipsis">{{pd.averageScore}}</span>
            </div>
            <div class="item-info">
              <span class="item-key">下载量</span>
              <span class="item-value overflow-ellipsis">{{pd.downNumber}}</span>
            </div>
          </div>
        </div>

        <!-- 游戏的文字介绍 <span class="game-intro-weight">游戏简介</span>: -->
        <div class="game-text-intro" v-html="pd.gameIntro"></div>
      </div>

      <!-- fix btn place-->
      <div class="btn-container-fill" v-show="isShow">
      </div>

      <!-- 底部按钮 -->
      <div class="btn-container JS-statistics-enter-game-begain" v-show="isShow">
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
  </div>
</template>

<script>

import Vue from 'vue';
import AppHeader from '../../../oldComponents/tao-you/layout/header.component';
import FooterComponent from "../../../oldComponents/tao-you/layout/footer.component.vue";
import Slider from '../../../oldComponents/common-slider/simple-slider.component';
import DrGameSlider from '../../../oldComponents/common-slider/vue-dr-game-slider.component.vue';
import { Swipe, SwipeItem } from 'mint-ui';
import CommonBottomBtn from '../../../oldComponents/common-btn/common-bottom-btn.component';
import CommonAlert from '../../../oldComponents/common-alert/common-alert.component';
import AppButton from '../../../oldComponents/tao-you/button/button.component';
import OneSimpleButton from '../../../oldComponents/tao-you/dialog/one-button-simple-dialog.component';
import ReturnBtn from '../../../oldComponents/tao-you/button/return.component.vue';
import ShareComponent from '../../../oldComponents/tao-you/share/share.component';
//统计脚本
import Statistics from '../statistics/game-detail/index.statistics.js';
import MySwipe from '../../../oldComponents/tao-you/horizontal-swiper/horizontal-swiper.component.vue';
import { user } from '../../../vuex/getters';
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
    ShareComponent,
    MySwipe
  },
  data() {
    return {
      fromWechat: false,
      //是否显示底部按钮
      isShow: false,
      gameBackgroundUrl: 'https://placeholdit.imgix.net/~text?txtsize=28&txt=300%C3%97300&w=300&h=300',
      // 底部按钮文字
      bottomH5BtnText: '开始游戏',
      bottomMobileBtnText: '下载游戏',
      pd: {},
      // 游戏轮播配置
      sliderStyle: {
        //          height: '22rem',
        margin: '.15rem 0 .15rem .16rem'
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
      gapWidth: '.1rem',
      rightGapWidth: '.16rem',
      drCarouselData: [],
      drCarouselItemStyle: {
        width: '1.66rem',
        boxSizing: 'border-box',
        backgroundColor: '#ffffff'
      },
      drCarouselWrapperStyle: {
        height: '1rem',
        backgroundColor: '#ffffff'
      },
      // 弹框
      showAlert: false,
      alertMsg: null,
      // 按钮的文字提示
      btnMsg: '开始游戏',
      // 是否显示组件
      showComponent: false,
      // 设备的宽高
      screenWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      screenHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
      config: {
        url: location.href
      }
    }
  },
  vuex: {
    getters: {
      user: user
    },
    actions: {
      // TODO
    }
  },
  computed: {
    gameShowStyle() {
      return {
        backgroundImage: 'url(' + this.pd.gameBack + ')'
      }
    }
  },
  methods: {
    closeAlert() {
      this.showAlert = false;
    },
    beginPlay() {
      // // 跳转页面
      // window.location.href = this.pd.gameUrl;
      // 如果是手游，检查下是ios还是android
      // 若对应版本的游戏不存在，则弹框提示用户
      let item = this.pd;
      let myGameUrl;
      if (+item.type == 2) {
        let downloadUrl = mallUtils.device.isIOS ? item.iosUrl : item.gameUrl;
        if (!downloadUrl || !downloadUrl.replace(/^\s+|\s+$/g, '')) {
          this.showAlert = true;
          this.alertMsg = '您的手机暂不支持此版本游戏下载';
          return;
        }
        location.href = downloadUrl;
        return;
      }
      else if (+item.type == 1) {
        // 如果是h5游戏直接跳转
        this.$router.push({
          name: 'TaoYouPlayMyGame',
          params: {
            id: this.$route.params.id
          },
          query: {
            d: this.pd.direction,
            gameUrl: this.pd.gameUrl,
            gameName: this.pd.gameName
          }
        })
      }
      // 我们的小游戏
      else if (+item.type == 3) {
        location.href = this.pd.gameUrl;
      }
      else {
        // TODO
      }
    },
    // 判断用户是否登录
    isUserLogin() {
      // 未登录状态下
      if (0 === +localStorage.getItem('login')) {
        localStorage.setItem('Q_next_url', window.location.hash.slice(1));
        localStorage.setItem('Q_from_url', window.encodeURIComponent(window.location.href));
        this.$router.push({
          name: 'TaoYouUserLogin',
          query: {
            mID: localStorage.getItem('mID') || 8
          },
          replace: true
        });
      }
      else {
        this.beginPlay();
      }
    },
    // 获取游戏数据
    gameInfo() {
      let query = {
        id: this.$route.params.id,
        // 用户不登录也可以查看相关信息
        nologin: 1
      };
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.game_detail)
        .then((res) => {
          if (10000 === res.code) {
            this.pd = res.result;
            this.gameBackgroundUrl = this.pd.gameBackgroundUrl;
            // 获取游戏的名字
            document.title = res.result.gameName;

            Object.assign(this.config, {
              title: this.pd.gameName,
              summary: this.pd.abstract,
              pic: this.pd.gameIcon
            });

            try {
              if (1 === +this.$route.query.redirect) {

                this.$router.push({
                  name: 'TaoYouPlayMyGame',
                  params: {
                    id: this.$route.params.id
                  },
                  query: {
                    d: this.pd.direction,
                    gameUrl: this.pd.gameUrl,
                    gameName: this.pd.gameName,
                    from: 1
                  },
                  replace: true
                })
              }
            } catch (e) { console.log(e) }

            wx.ready(() => {
              // 分享的文案
              let mID = this.$route.query.mID || window.mID || 8;
              let apiType;
              if (1 === window.API_USE) {
                apiType = 'http://interface.lly800.com'
              }
              else {
                apiType = 'http://pre-interface.lly800.com'
              }
              let share_link = apiType + '/Api/Weixin/index?gid=' + this.$route.params.id + '&mID=' + mID;
              let shareInfo = {
                title: this.pd.gameName, // 分享标题
                link: share_link, // 分享链接
                desc: this.pd.abstract,
                imgUrl: this.pd.gameIcon // 分享图标
              };
              // 分享到朋友圈
              wx.onMenuShareTimeline(shareInfo);
              // 分享给朋友
              wx.onMenuShareAppMessage(shareInfo);

              let otherShareInfo = {
                title: this.pd.gameName, // 分享标题
                link: window.location.href, // 分享链接
                desc: this.pd.abstract,
                imgUrl: this.pd.gameIcon // 分享图标
              };

              wx.onMenuShareQQ(otherShareInfo);
              wx.onMenuShareWeibo(otherShareInfo);
              wx.onMenuShareQZone(otherShareInfo);
            });

            // 按钮的文案
            if (1 === +this.pd.type) {
              //隐藏底部按钮，暂时不让下载
              this.isShow = true;
              this.btnMsg = '开始游戏';
            }
            else if (2 === +this.pd.type) {
              this.btnMsg = '下载游戏';
            }
            else {
              // TODO
            }

            // 计算轮播图
            let itemStyle = {
              width: '1.56rem',
              marginRight: '0px'
            };
            let length = this.pd.imgUrl.length;
            for (var i = 0; i < length; i++) {
              this.carouselList.push({
                style: {
                  width: '1.56rem',
                  marginRight: '.1rem'
                },
                imgUrl: this.pd.imgUrl[i]
              })
            }
            // 新的轮播图
            this.drCarouselData = res.result.imgUrl;
          }
        })
    },
    // 获取游戏数据
    gameInfoWithoutLogin() {
      let query = {
        id: this.$route.params.id,
        // 用户不登录也可以查看相关信息
        nologin: 1
      };
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.game_detail)
        .then((res) => {
          if (10000 === res.code) {
            this.pd = res.result;
            this.gameBackgroundUrl = this.pd.gameBackgroundUrl;
            // 获取游戏的名字
            document.title = res.result.gameName;

            Object.assign(this.config, {
              title: this.pd.gameName,
              summary: this.pd.abstract,
              pic: this.pd.gameIcon
            });

            wx.ready(() => {
              // 分享的文案
              let mID = this.$route.query.mID || window.mID || 8;
              let apiType;
              if (1 === window.API_USE) {
                apiType = 'http://interface.lly800.com'
              }
              else {
                apiType = 'http://pre-interface.lly800.com'
              }
              let share_link = apiType + '/Api/Weixin/index?gid=' + this.$route.params.id + '&mID=' + mID;
              let shareInfo = {
                title: this.pd.gameName, // 分享标题
                link: share_link, // 分享链接
                desc: this.pd.abstract,
                imgUrl: this.pd.gameIcon // 分享图标
              };
              // 分享到朋友圈
              wx.onMenuShareTimeline(shareInfo);
              // 分享给朋友
              wx.onMenuShareAppMessage(shareInfo);

              let otherShareInfo = {
                title: this.pd.gameName, // 分享标题
                link: window.location.href, // 分享链接
                desc: this.pd.abstract,
                imgUrl: this.pd.gameIcon // 分享图标
              };

              wx.onMenuShareQQ(otherShareInfo);
              wx.onMenuShareWeibo(otherShareInfo);
              wx.onMenuShareQZone(otherShareInfo);
            });

            // 按钮的文案
            if (1 === +this.pd.type) {
              //隐藏底部按钮，暂时不让下载
              this.isShow = true;
              this.btnMsg = '开始游戏';
            }
            else if (2 === +this.pd.type) {
              this.btnMsg = '下载游戏';
            }
            else {
              // TODO
            }

            // 计算轮播图
            let itemStyle = {
              width: '1.56rem',
              marginRight: '0px'
            };
            let length = this.pd.imgUrl.length;
            for (var i = 0; i < length; i++) {
              this.carouselList.push({
                style: {
                  width: '1.56rem',
                  marginRight: '.1rem'
                },
                imgUrl: this.pd.imgUrl[i]
              })
            }
            // 新的轮播图
            this.drCarouselData = res.result.imgUrl;
          }
        })
    },
    // 获取当前用户的信息
    getCurrentUser() {
      Vue.ClientHttp().GET({}, Vue.ClientUrl.user_info)
        .then((res) => {
          if ((10000 === res.code) && (res.result.userId)) {
            // TODO
            this.gameInfo();
          }
          else if ('wechatpay' === this.$route.query.from) {
            this.fromWechat = true;
          }
        })
    }
  },
  mounted() {
    if (('wechatpay' === this.$route.query.from) && (!this.$route.query.reload)) {
      let path = this.$route.path;
      try {
        parent.window.location.href = '/#' + path + '&reload=1';
      } catch (e) {
        console.log(e);
      }
    }
    this.getCurrentUser();
    this.gameInfoWithoutLogin();
    //      this.gameInfo();
    //      console.log(this.$route)
  },
  mounted() {
    //使用统计脚本
    Statistics(this);
    $('body').css({ 'background-color': '#f5f5f9' });
    setTimeout(() => {
      this.showComponent = true;
    }, 360);
  },
  destroyed() {
    // TODO
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/tao-you/common.scss";

.btn-container-fill {
  height: .62rem;
}


/* 按钮容器 */

.btn-container {
  // padding: .3rem .15rem;
  z-index: 1;
  position: fixed;
  box-sizing: border-box;
  bottom: 0;
  width: 100%;
  max-width: 640px;
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

  &__img {
    height: .7rem;
    width: .7rem;
    min-width: .7rem;
    margin-right: .1rem;
    border-radius: .15rem;
  }
  &__text {
    display: flex;
    flex-direction: column;
    height: .6rem;
    justify-content: space-between;

    position: relative;
    width: 100%;

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
    .share-area {
      display: flex;
      position: absolute;
      top: 0;
      right: 0;
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
  } // .item-value{
  //   width: .88rem;
  // }
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
