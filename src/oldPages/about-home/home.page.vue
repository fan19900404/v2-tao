<style lang="scss" scoped>
  .container {
    overflow-y: scroll;
    background: #fff;
  }
  .container-header{
    /*height: 26.6rem;*/
  }
  .carousel__wrapper {
    display: block;
    width: 100%;
    height: 10.75rem;
  }
  .carousel__item,
  .carousel__link,
  .carousel__img {
    display: block;
    height: 100%;
  }
  .carousel__img {
    width: 100%;
    height: 100%;
  }
</style>

<template>
  <app-header @go-fixed-link="goFixedLink" :action="'fixedLink'" :title="title" :type="type"></app-header>
  <!--<app-slider :collection="collection"></app-slider>-->
  <!-- 使用mint-ui轮播组件 -->
  <swipe
    :auto="4000"
    :show-indicators="true"
    class="carousel__wrapper">
    <swipe-item
      v-for="v in collection"
      class="carousel__item">
      <a class="carousel__link" :href="v.linkUrl">
        <img :src="v.imgUrl" class="carousel__img">
      </a>
    </swipe-item>
  </swipe>
  <!-- 使用mint-ui轮播组件 -->

  <app-navbar></app-navbar>
  <app-notice :time="3000" :notices="msgCollection"></app-notice>
  <goods-list :show-header="showHeader"></goods-list>

  <!-- gift -->
  <gift @hide-gift="hideGift" :show-gift="showGift" @home-gift-coupon="homeGiftCoupon(true)"></gift>

  <!-- 登录注册部分 -->
  <!--<toast :is-show="isShowToast" :toast-text="toastText" :show-time="toastTime"></toast>-->

  <!-- step 1 -->
  <!--<s1-login-use-phone-->
    <!--:tel="phone"-->
    <!--@rl-bottom-btn-action="bottomBtnAction"-->
    <!--:is-show="show && (1 === step)">-->
  <!--</s1-login-use-phone>-->

  <!-- step 2 -->
  <!--<s2-login-with-password-->
    <!--:tel="phone"-->
    <!--:password="password"-->
    <!--@rl-forget-password="forgetPassword"-->
    <!--@rl-bottom-btn-action="bottomBtnAction"-->
    <!--:is-show="show && (2 === step)">-->
  <!--</s2-login-with-password>-->

  <!-- step 3 -->
  <!--<s3-get-verification-code-->
    <!--@rl-verify-btn-action="sendVerificationCode"-->
    <!--@rl-go-back="backStep"-->
    <!--@rl-bottom-btn-action="bottomBtnAction"-->
    <!--:v-code="verificationCode"-->
    <!--:is-show="show && (3 === step)">-->
  <!--</s3-get-verification-code>-->

  <!-- step 4 -->
  <!--<s4-set-password-->
    <!--:password="password"-->
    <!--@rl-go-back="backStep"-->
    <!--@rl-bottom-btn-action="bottomBtnAction"-->
    <!--:is-show="show && (4 === step)">-->
  <!--</s4-set-password>-->

  <app-bottom-bar></app-bottom-bar>
</template>

<script>
  'use strict';
  import {updateUserStatus} from '../../vuex/actions';
  import {showReview} from '../../vuex/actions';
  import Vue from 'vue';
  import AppHeader from '../../oldComponents/common/header/app-header';
  import AppBottomBar from '../../oldComponents/common/footer/app-bottom-bar';
  import AppSlider from '../../oldComponents/feature/about-home/app-slider';
  import AppNavbar from '../../oldComponents/feature/about-home/app-navbar';
  import GoodsList from '../../oldComponents/feature/about-home/goods-list-v1';
  import AppNotice from '../../oldComponents/feature/about-home/app-notice';
  import Gift from '../../oldComponents/feature/about-home/gift.component';
  // 登录注册部分
  import Toast from '../../oldComponents/feature/about-user-action/toast.component';
  import S1LoginUsePhone from '../../oldComponents/feature/about-user-action/s1-login-use-phone.component';
  import S2LoginWithPassword from '../../oldComponents/feature/about-user-action/s2-login-with-password.component';
  import S3GetVerificationCode from '../../oldComponents/feature/about-user-action/s3-get-verification-code.component';
  import S4SetPassword from '../../oldComponents/feature/about-user-action/s4-set-password.component';

  // 使用新的轮播组件
  import { Swipe, SwipeItem } from 'mint-ui';
  export default {
    components: {
      AppHeader,
      AppSlider,
      AppNavbar,
      GoodsList,
      AppNotice,
      Gift,
      Toast,
      S1LoginUsePhone,
      S2LoginWithPassword,
      S3GetVerificationCode,
      S4SetPassword,
      AppBottomBar,
      Swipe,
      SwipeItem
    },
    data(){
      var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      return {
        title: "淘游夺宝",
        type: "account",
        toolbtns: "top,refresh",
        collection: [],
        msgCollection: [],
        allLoaded: false,
        waypoint: null,
        showHeader: true,
        // 展示夺宝券
        showGift: false,
        // 一元变20元
        ott: {},
        // 登录注册部分是下面的
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
        setActionType: null,
        // 注册渠道
        mID: 8,
        // 修复首页图片高度的问题
        picHeight: null,
        timer: null
      }
    },
    computed: {
      swipeStyle() {
        let height;
        if(this.picHeight) {
          height = this.picHeight + 'px';
        }
        else {
          height = '10.75rem';
        }
        return {
          height: height
        }
      }
    },
    mounted() {
      var that = this;
      // 获取一元变二十元的链接
      var query = {
        goodsID: 200,
        type: 2
      };
      Vue.OneMallHttp(this).GET(query, Vue.OneMallUrl.one_to_twenty)
        .then(function(res) {
          if (10000 === res.code) {
            that.ott = res.result;
          }
          // 处理异常的请求
          else {
            //  TODO
          }
        });
      // 获取首页的轮播资源
      Vue.OneMallHttp(this).GET({}, Vue.OneMallUrl.home_top_banner)
        .then(function (res) {
          if (10000 === res.code) {
            that.collection = res.result;
          }
          // 处理异常的请求
          else {
            //  TODO
            // 判断用户没有登录
            that.show = true;
          }
        });

      // 每60秒获取一次新的获奖消息(含即将揭晓)
      this.getNotices();
      this.timer = setInterval(()=>{
        this.getNotices();
      }, 60000);

      // 获取是否显示ICP备案
      this.showReview(true);

      // 获取用户登录状态
//            console.log(123, this.$route.query, this.status);
    },
    mounted() {
      $('body').css({'background-color': '#f8f8f8'});

      var that = this;
      // TODO
      setTimeout(function() {
        that.waypoint = new Waypoint({
          element: document.getElementById('J-goods-container'),
          handler: function(direction) {
            console.log(123, direction);
            if('down' === direction) {
              that.showHeader = false;
            }
            else if('up' === direction) {
              that.showHeader = true;
            }
          }
        })
      }, 1000);

      // 获取夺宝券的情况
      this.homeGiftCoupon();
      // 获取是否登录的状态
//            if(0 === +this.$route.query.login) {
//              this.show = true;
//            }
//            else {
//              // TODO
//            }
//            console.log(123, this.$route.query.login, this.status);
      // 添加mID获取
      if(this.$route.query.mID) {
        this.mID = this.$route.query.mID;
      }
      else {
        // TODO
      }

    },
    destroyed() {
//            $('body').css({'background-color': '#fff'});
      clearInterval(this.timer);
      if(this.waypoint) {
        console.log('has waypoint');
        this.waypoint.destroy();
      }
      this.showReview(false);
    },
    methods: {
      getNotices(){
        Vue.OneMallHttp(this).GET({}, Vue.OneMallUrl.home_notice_msg)
          .then((res)=> {
            if (10000 === res.code) {

              // 第一次消息为空，直接更新
              if (res.result.length != this.msgCollection.length) {
                this.msgCollection = res.result;
                return;
              }

              // 第二次以后，频繁给数组赋值将会影响滚动动画
              // 这里对检查数组元素进行检查，只在数组发生变化场合才对数组做更新
              for (let i = 0; i < res.result.length; i++) {
                for (let p in res.result[i]) {
                  if (res.result[i][p] != this.msgCollection[i][p]) {
                    this.msgCollection = res.result;
                  }
                }
              }
            }
            // 处理异常的请求
            else {
              //  TODO
            }
          });
      },
      // 处理图片自适应问题
      hackImage(e) {
        var deviceWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var naturalHeight;
        var naturalWidth;
        if(document.querySelector('.carousel__img')) {
          naturalHeight =  document.querySelector('.carousel__img').naturalHeight;
          naturalWidth =  document.querySelector('.carousel__img').naturalWidth;
          this.picHeight = deviceWidth * (naturalHeight / naturalWidth);
        }
      },
      // 隐藏新人礼物
      hideGift() {
        this.showGift = false;
      },
      // go to fixed link
      goFixedLink() {
        if(this.ott.reffer) {
          window.location.href = this.ott.reffer;
        }
      },
      homeGiftCoupon(action) {
        var that = this;
        var query;
        if(action) {
          query = {
            sign: 1
          }
        }
        else {
          query = {};
        }
        Vue.OneMallHttp(this).GET(query, Vue.OneMallUrl.home_show_gift)
          .then(function(res) {
            if(10000 === res.code) {
              var show = (1 === res.show) ? true : false;
              that.showGift = show;
              if(query.hasOwnProperty('sign')) {
                console.log(that.ott);
                that.$router.go({
                  name: 'goods-detail',
                  params: {
                    id: that.ott.numberID
                  }
                })
              }
            }
            else {
              // TODO
            }
          })
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
        Vue.OneMallHttp(this).GET(query, Vue.OneMallUrl.common_check_phone)
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
        Vue.OneMallHttp(this).GET(query, Vue.OneMallUrl.common_send_code)
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
        Vue.OneMallHttp(this).GET(query, Vue.OneMallUrl.common_check_code)
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
          requestUrl = Vue.OneMallUrl.common_set_password;
        }
        else if('resetPassword' == this.setActionType) {
          query = {
            phone: this.phone,
            code: this.verificationCode,
            password: this.password
          };
          requestUrl = Vue.OneMallUrl.common_update_password;
        }
        else {
          // TODO
        }
        Vue.OneMallHttp(this).GET(query, requestUrl)
          .then((res) => {
          if(10000 === res.code) {
          window.location.href = '/';
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
        var query = {
          username: this.phone,
          password: this.password,
          mID: this.mID
        };
        Vue.OneMallHttp(this).GET(query, Vue.OneMallUrl.common_user_login)
          .then((res) => {
          if(10000 === res.code) {
          window.location.href = '/';
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
    },
    vuex: {
      getters: {
        status: ({home}) => home.status
    },
    actions: {
      showReview,
      updateUserStatus
    }
  }
  }
</script>
