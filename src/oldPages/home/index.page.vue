<!-- author:yex -->
<template>
  <app-header :title="title"></app-header>
  <section class="container">

    <!-- 轮播以及热门游戏 -->
    <section class="game-hot margin-bottom border-top-bottom bgc-white">
      <div class="game-title text-default margin-bottom clearfix">热门游戏 <a v-link="'/tao-you/game-center'" class="fr text-small text-blue">进入游戏中心<i class="icon icon-right fr text-small text-blue margin-little-top"></i></a></div>

      <!-- 轮播 -->
      <div class="slider margin-bottom">
        <!--<slider :slider-style="sliderStyle" :pages="gameHot.slider" :sliderinit="sliderinit">-->
          <!--&lt;!&ndash; slot  &ndash;&gt;-->
        <!--</slider>-->

        <div class="dr-home-slider">
          <dr-home-slider :carousel-data="gameHot.slider"
                          :gap-width="gapWidth"
                          :right-gap-width="rightGapWidth"
                          :carousel-wrapper-style="drCarouselWrapperStyle"
                          :carousel-item-style="drCarouselItemStyle"></dr-home-slider>
        </div>

      </div>




      <!-- 热门游戏列表 -->
      <ul class="game-list padding-small-top border-top clearfix">
        <li class="item fl w25" v-for="item in gameHot.gameList" v-link="'/tao-you/game-intro/' + item.gameID">
          <div class="item-wrapper">
            <div class="picture">
              <img :src="item.imgUrl" alt="">
            </div>
            <div class="name overflow-ellipsis">{{ item.gameName }}</div>
          </div>
        </li>
      </ul>
    </section>

    <!-- 一元购 -->
    <section v-if="goods" class="one-mail margin-bottom border-top-bottom bgc-white clearfix position-relative flex">
      <div class="flex-1 pic-introduce border-right">
        <img :src="goods.goodsImg" alt="">
      </div>
      <div class="flex-2 detail-info">
        <div class="goods-name margin-small-bottom ">{{ goods.goodsName }}</div>
          <div class="progress-bar clearfix margin-little-bottom">
            <div class="bar-wrapper position-relative margin-small-bottom">
              <div class="bar current-bar" v-bind:style="{width: num}">&nbsp;</div>
              <div class="bar rest-bar">&nbsp;</div>
            </div>
            <div class="title fl text-sub-one">总需{{ goods.totalNum }}</div>
            <div class="rest fr text-sub-one">剩余：<span>{{ goods.leftNum }}</span></div>
          </div>
          <a :href="'http://1.lly800.com/#/details/' + goods.nowNumberID" class="join">立即参与</a>
      </div>
    </section>

    <!-- 新闻 有4种展示方式 -->
    <section class="news margin-bottom border-top-bottom bgc-white">
      <ul class="news-list" v-infinite-scroll="loadNewsHot()" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
        <li class="item margin-bottom border-bottom" v-for="item in newsList" v-link="'/tao-you/news/' + item.id">
          <!-- 类型一 两个图的 -->
          <template v-if="item.type == 1">
            <div class="type type1">
              <div class="title margin-small-bottom overflow-ellipsis">
                {{ item.title }}
              </div>
              <div class="picture margin-small-bottom">
                <img class="full-height two-ad-height" :src="item.picPath[0]" alt="">
              </div>
              <div class="more-info margin-small-bottom text-sub">
                <span class="source overflow-ellipsis">{{ item.source }}</span>
                <span class="publish-time overflow-ellipsis">{{ item.publishTime | formatDateToTimeago }}</span>
              </div>
            </div>
          </template>
          <!--  左边是图片 右边是描述文字-->
          <template v-if="item.type == 2">
            <div class="type type2 flex">
              <div class="picture flex-1">
                <img class="full-height" :src="item.picPath[0]" alt="">
              </div>
              <div class="content flex-2 flex">
                <div class="title overflow-ellipsis-multiline">{{ item.title }}</div>
                <div class="more-info text-sub">
                  <span class="source overflow-ellipsis">{{ item.source }}</span>
                  <span class="publish-time overflow-ellipsis">{{ item.publishTime | formatDateToTimeago }}</span>
                </div>
              </div>
            </div>
          </template>
          <!-- 只有文字的 -->
          <template v-if="item.type == 3">
            <div class="type type3">
              <div class="title margin-small-bottom overflow-ellipsis">{{ item.title }}</div>
              <div class="desc text-sub margin-small-bottom overflow-ellipsis-multiline">{{ item.desc }}</div>
              <div class="more-info margin-small-bottom text-sub">
                <span class="source overflow-ellipsis">{{ item.source }}</span>
                <span class="publish-time overflow-ellipsis">{{ item.publishTime | formatDateToTimeago }}</span>
              </div>
            </div>
          </template>
          <!-- 一个图在下面的 -->
          <template v-if="item.type == 4">
            <div class="type type4">
              <div class="title margin-small-bottom overflow-ellipsis">{{ item.title }}</div>
              <ul class="picture-list margin-small-bottom flex">
                <li class="item flex-1" v-for="subItem in item.picPathList" track-by="$index">
                  <div class="wrapper picture 1margin-small-right full-height">
                    <img class="full-height single-ad-height" :src="subItem" alt="">
                  </div>
                </li>
              </ul>
              <div class="more-info margin-small-bottom text-sub">
                <span class="source overflow-ellipsis">{{ item.source }}</span>
                <span class="publish-time overflow-ellipsis">{{ item.publishTime | formatDateToTimeago }}</span>
              </div>
            </div>
          </template>
        </li>
      </ul>
      <p v-show="loading" class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>加载中
      </p>
    </section>
  </section>

  <!-- 登陆注册 -->
  <toast :is-show="isShowToast" :toast-text="toastText" :show-time="toastTime"></toast>

  <!-- step 1 -->
  <s1-login-use-phone
    :tel="phone"
    @rl-bottom-btn-action="bottomBtnAction"
    :is-show="show && (1 === step)">
  </s1-login-use-phone>

  <!-- step 2 -->
  <s2-login-with-password
    :tel="phone"
    :password="password"
    @rl-forget-password="forgetPassword"
    @rl-bottom-btn-action="bottomBtnAction"
    :is-show="show && (2 === step)">
  </s2-login-with-password>

  <!-- step 3 -->
  <s3-get-verification-code
    @rl-verify-btn-action="sendVerificationCode"
    @rl-go-back="backStep"
    @rl-bottom-btn-action="bottomBtnAction"
    :v-code="verificationCode"
    :is-show="show && (3 === step)">
  </s3-get-verification-code>

  <!-- step 4 -->
  <s4-set-password
    :password="password"
    @rl-go-back="backStep"
    @rl-bottom-btn-action="bottomBtnAction"
    :is-show="show && (4 === step)">
  </s4-set-password>

  <app-footer></app-footer>
</template>

<script>
  'use strict';
  import AppHeader from '../../oldComponents/common-layout/header.component';
  import AppFooter from '../../oldComponents/common-layout/footer.component';
  import Slider from '../../oldComponents/common-slider/simple-slider.component';

  import DrHomeSlider from '../../oldComponents/common-slider/vue-dr-home-slider.component';
  import { InfiniteScroll } from 'mint-ui';
  import { Spinner } from 'mint-ui';

  import Toast from '../../oldComponents/about-user-action/toast.component';
  import S1LoginUsePhone from '../../oldComponents/about-user-action/s1-login-use-phone.component';
  import S2LoginWithPassword from '../../oldComponents/about-user-action/s2-login-with-password.component';
  import S3GetVerificationCode from '../../oldComponents/about-user-action/s3-get-verification-code.component';
  import S4SetPassword from '../../oldComponents/about-user-action/s4-set-password.component';

  import { user } from '../../vuex/getters';
  import { getUserInfo } from '../../vuex/actions';

  Vue.component('mt-spinner', Spinner);

  export default {
    vuex: {
      getters: {
        user: user
      },
      actions: {
        getUserInfo
      }
    },
    components: {
      AppHeader,
      AppFooter,
      Slider,
      InfiniteScroll,
      Spinner,
      DrHomeSlider,
      Toast,
      S1LoginUsePhone,
      S2LoginWithPassword,
      S3GetVerificationCode,
      S4SetPassword
    },
    data() {
      return {
        // 轮播的一些配置
        gapWidth: '.1rem',
        rightGapWidth: '.16rem',
        drCarouselItemStyle: {
          width: '1.66rem',
          boxSizing: 'border-box',
          backgroundColor: '#ffffff'
        },
        drCarouselWrapperStyle: {
          height: '1rem',
          backgroundColor: '#ffffff'
        },
        // 轮播配置结束
        'title': '淘游助手',
        // 游戏轮播配置
        sliderStyle: {
          // height: '20rem'
        },
        sliderinit: {
          currentPage: 1,
          start: {},
          end: {},
          tracking: false,
          thresholdTime: 360,//滑动判定距离
          thresholdDistance: 100//滑动判定时间
        },
        // 顶部轮播和游戏列表
        gameHot: {
          slider: [],
          gameList: []
        },
        // 一元购
//        'oneMail': {
//          'goodsName': '　',
//          'picPath': '　',
//          'total': 0,
//          'rest': 0
//        },
        goods: null,
        // 进度条
        num: 0,
        // 新闻列表
        loading: false, // 加载中
        allLoaded: false, // 已全部加载
        pageIndex: 1, // 当前第几页
        pageSize: 4, // 一页数据条数
        newsList: [],
        // 登录注册部分是下面的
        mID: 8,
        //// 关于toast
        isShowToast: false,
        toastText: null,
        toastTime: 2000,
        //// 关于登录注册
        // 记录组件显示的历史记录
        stepHistory: [1],
        // 显示那个组件
        step: 1,
        // 是否显示组件
        show: false,
        // 按钮是否可用
        isBtnActive: true,
        // 手机号码
        phone: null,
        // 验证码
        verificationCode: null,
        // 密码
        password: null,
        // 注册密码还是重置密码
        setActionType: null
      }
    },
    mounted() {
      $('body').css('background-color', '#f8f8f8');
      this.getUserInfo();
      this.loadBanner();
      this.loadGameHot();
      this.loadOneMailHot();
      this.loadNewsHot();
    },
    methods: {

      /* 获取轮播列表 */
      loadBanner() {
        Vue.ClientHttp().GET({
            type: 4,
            page: 1,
            limit: 8
          }, Vue.ClientUrl.game_center_banner)
          .then((res) => {
            if (res.code === 10000) {
              let sliderList = res.result;
              let itemStyle = {
                width:'60%',
                marginRight:'.15rem',
                position: 'relative'
              };
              sliderList.forEach(function(item, index){
                item.style = itemStyle;
              });
              this.gameHot.slider = sliderList;
//              return;
            }
            else {
                this.show = true;
                console.log('获取热门游戏数据失败');
            }
          });
      },

      /* 获取热门游戏列表 */
      loadGameHot() {
        Vue.ClientHttp().GET({
            type: 4,
            page: 1,
            limit: 8
          }, Vue.ClientUrl.game_center_list)
          .then((res) => {
            if (res.code === 10000) {
              this.gameHot.gameList = res.result.slice(0, 8);
              return;
            }
            console.log('获取热门游戏数据失败');
          });
      },

      /* 获取一元购相关数据 */
      loadOneMailHot() {
        let query = {
          numberID: 6
        };
        Vue.ClientHttp().GET(query, Vue.ClientUrl.one_mail)
          .then((res) => {
            if(10000 === res.code) {
              if(res.result.code == 10001){
                return;
              }
              this.goods = res.result;
              let result = res.result;
              this.num = (result.totalNum - result.leftNum) / result.totalNum * 100 + '%';
            }
            else {
                console.log(res);
            }
          });
      },

      /* 获取新闻列表 */
      loadNewsHot() {
        if (this.allLoaded) {
          return;
        }
        this.loading = true;
        Vue.ClientHttp().GET({
            page: this.pageIndex,
            limit: this.pageSize
          }, Vue.ClientUrl.news_list)
          .then((res) => {
            this.loading = false;
            if (res.code === 10000) {
              this.newsList = this.newsList.concat(res.result);
              let length = res.result.length;
              if (length > 0) {
                this.pageIndex++;
              }
              if (length < this.pageSize) {
                this.allLoaded = true;
              }
            }
          });
      },

      //// 关于登录注册部分
      // toast提示
      toast(msg) {
        this.isShowToast = true;
        this.toastText = msg;
      },
      // 监测用户的手机 看是新用户还是老用户
      checkUserPhone() {
        var query = {
          phone: this.phone
        };
        Vue.ClientHttp().GET(query, Vue.ClientUrl.common_check_phone)
          .then((res) => {
          if(10000 === res.code) {
          var isOldUser = res.result.isUsed;
          if(isOldUser) {
            this.step = 2;
            // 重置密码
            this.setActionType = 'resetPassword';
          }
          else {
            // 注册参数
            this.setActionType = 'reg';
            this.step = 3;
            this.sendVerificationCode();
          }
          // 记录顺序
          this.stepHistory.push(this.step);
        }
      })
      },
      // 发送验证码
      sendVerificationCode() {
        // TODO 发送验证码
        var query = {
          phone: this.phone,
          type: this.setActionType
        };
        Vue.ClientHttp().GET(query, Vue.ClientUrl.common_send_code)
          .then((res) => {
          if(10000 === res.code) {
          var isDone = res.result.isDone;
          if(isDone) {
            this.toast('验证码成功发送');
            this.step = 3;
            this.stepHistory.push(this.step);
          }
          else {
            // TODO 验证码发送失败
            this.toast('验证码发送失败');
          }
        }
      else {
          // TODO code不是10000
          this.toast(res.msg);
        }
      })
      },
      // 检验验证码
      checkVerificationCode() {
        var query = {
          phone: this.phone,
          code: this.verificationCode
        };
        Vue.ClientHttp().GET(query, Vue.ClientUrl.common_check_code)
          .then((res) => {
          if(10000 === res.code) {
          this.toast('验证码验证成功');
          this.step = 4;
          this.stepHistory.push(this.step);
        }
      else {
          // TODO
          this.toast(res.msg);
        }
      })
      },
      // 设置密码
      setUserPassword() {
        var that = this;
        var query;
        var requestUrl;
//            var query = {
//              phone: this.phone,
//              mID: this.mID,
//              code: this.verificationCode,
//              password: this.password
//            };
        // 判断用户是老用户还是新用户
        if('reg' == this.setActionType) {
          query = {
            phone: this.phone,
            mID: this.mID,
            code: this.verificationCode,
            password: this.password
          };
          requestUrl = Vue.ClientUrl.common_set_password;
        }
        else if('resetPassword' == this.setActionType) {
          query = {
            phone: this.phone,
            code: this.verificationCode,
            password: this.password
          };
          requestUrl = Vue.ClientUrl.common_update_password;
        }
        else {
          // TODO
        }
        Vue.ClientHttp().GET(query, requestUrl)
          .then((res) => {
          if(10000 === res.code) {
          window.location.href = '/#/tao-you/';
          that.getUserInfo();
          that.loadBanner();
          that.loadGameHot();
          that.loadOneMailHot();
          that.loadNewsHot();
//          that.$router.go({
//            path: '/tao-you'
//          });
          this.toast('密码设置成功!');
          this.show = false;
        }
      else {
          // TODO
          this.toast(res.msg);
        }
      })
      },
      // 用户登录
      userLogin() {
        var that = this;
        var query = {
          username: this.phone,
          password: this.password,
          mID: this.mID
        };
        Vue.ClientHttp().GET(query, Vue.ClientUrl.common_user_login)
          .then((res) => {
          if(10000 === res.code) {
//          window.location.href = '/';
          window.location.href = '/#/tao-you';
          that.getUserInfo();
          that.loadBanner();
          that.loadGameHot();
          that.loadOneMailHot();
          that.loadNewsHot();
//          that.$router.go({
//            path: '/tao-you'
//          });
          this.show = false;
          this.toast('登陆成功!');
        }
      else {
          // TODO
          this.toast(res.msg);
        }
      })
      },
      // 底部按钮
      bottomBtnAction() {
        // 手机登录
        if(1 === this.step) {
          this.checkUserPhone();
        }
        // 老用户登录
        else if(2 === this.step) {
          this.userLogin();
        }
        // 获取验证码
        else if(3 === this.step) {
          this.checkVerificationCode();
        }
        // 重新设置密码
        else if(4 === this.step) {
          this.setUserPassword();
        }
      },
      // 返回
      backStep() {
        // 删除当前的状态
        this.stepHistory.pop();
        // 获取前一个状态
        var preStep = this.stepHistory.pop();
        this.step = preStep;
        this.stepHistory.push(preStep);
      },
      // 忘记密码
      forgetPassword() {
        this.sendVerificationCode();
      }
    }
  }
</script>

<style lang="scss" scoped>
  $gray: #dfdfdf;
  /* 轮播样式 */
  .dr-home-slider {
    margin-left: 0.16rem;
  }

  .game-hot{
    .game-title{
      margin: 0.125rem 0.16rem;
    }
  }
  .one-mail, .news{
    padding: 0.1rem 0.16rem;
  }

  /* 游戏列表 */
  .game-list {
    .item{
      @at-root {
        .item-wrapper{
          margin: 0.075rem;

          .picture{
            width: 0.45rem;
            height: 0.45rem;
            margin: 0 auto;
            img {
              width: 100%;
              height: 100%;
              border-radius: 0.1rem;
            }
          }
          .name{
              width: 100%;
              margin-top: 0.05rem;
              text-align: center;
              font-size: 0.12rem;
            }
        }
      }
    }
  }

  // 一元购
  .one-mail{
    align-items: center;
    text-justify: center;
    .wrapper{
      margin: 0.05rem 0.1rem;
    }
    .pic-introduce{
      padding-right: .2rem;
      margin-right: .2rem;
      .wrapper{
        padding-right: .1rem;
      }
    }
    .detail-info{

      .goods-name{
        height: .2rem;
        line-height: .2rem;
        overflow: hidden;
        font-size: .16rem;
      }
      .progress-bar{
        .bar{
          height: 0.05rem;
          border-radius: 0.05rem;
        }
        .rest-bar{
          background-color: $gray;
        }
        .current-bar{
          position: absolute;
          background-color: #ff695a;
        }
      }
      .join{
        display: inline-block;
        margin-top: 0.05rem;
        width: 100%;
        padding: 0.05rem 0;
        color: #fff;
        background-color: #ff4a4a;
        text-align: center;
        border-radius: 0.05rem;
      }
      .rest{
        span{
          color: #ff4a4a;
        }
      }
    }
  }

  /* 新闻 */
  .news-list{
    > .item{

      .title{
        font-size: .14rem;
      }

      .more-info{
        .source, .publish-time{
          display: inline-block;
        }
        .source{
          max-width: .9rem;
          margin-right: 0.05rem;
        }
        .publish-time{
          max-width: 5rem;
        }
      }

      .picture{
        img{
          width: 100%;
        }
      }
      .type4{
        .item:not(:last-child){
          margin-right: 0.05rem;

        }
      }
      .type2{
        margin: 0.08rem 0 0.05rem;
        .content{
          padding: 0 0.8rem;
          -webkit-box-orient:vertical;
          box-orient:vertical;
          -webkit-box-direction:normal;
          box-direction:normal;
          -webkit-flex-direction: column;
          flex-direction: column;

          -webkit-justify-content: space-between;
          justify-content: space-between;
          -webkit-box-pack:justify;
          box-pack:justify;
        }
      }
      .type4
      .type .desc{
        height: .24rem;
        line-height: .12rem;
        overflow-y: hidden;
      }
    }
  }

  /* 修复样式 */
  /* 一元购的链接 */
  .text-sub-one {
    font-size: .12rem;
    color: #bbb;
  }
  .one-yuan-buy {
    max-width: 1rem;
    max-height: 1rem;
  }
  .full-height {
  }
  .single-ad-height {
    max-height: .94rem;
  }
  .three-ad-height {
    max-height: .82rem;
  }
  .two-ad-height {
    max-height: .82rem;
  }
</style>
