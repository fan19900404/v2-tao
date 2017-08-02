<template>
  <div class="login-wrapper">
    <app-header :title="title"></app-header>
    <!-- 登录部分 -->
    <div class="logo-section">
      <div class="logo-fill"></div>
      <img class="logo-image" src="/static/images/tao-you/login-register/tao-you-logo.png" alt="">
    </div>
    <!-- 用户输入 -->
    <div class="user-input">
      <!-- 用户手机 -->
      <div class="input-section">
        <span class="input-section-icon">
          <img src="/static/images/tao-you/login-register/phone.png" class="input-small-icon">
        </span>
        <input v-model="phoneNumber" class="input-section-input" placeholder="输入手机号码" type="tel" />
      </div>
      <!-- 用户密码 -->
      <div class="input-section">
        <span class="input-section-icon">
          <img src="/static/images/tao-you/login-register/password.png" class="input-small-icon">
        </span>
        <input v-model="password" class="input-section-input" placeholder="输入密码" type="password" />
        <span @click="link({name:'TaoYouUserRegisterOrFindPassword',query: { mID: mID || 8, type: 1}})" class="input-section-addon">忘记密码?</span>
      </div>
    </div>

    <!-- 按钮 -->
    <div class="login-btn-container">
      <button @click="userLogin" :disabled="!canUseLoginBtn" :class="{'login-inner-btn--active': canUseLoginBtn, 'login-inner-btn--disabled': !canUseLoginBtn}" class="login-inner-btn">登录</button>
    </div>

    <!-- 一键注册 -->
    <div class="quick-register">
      <img class="register-logo" src="/static/images/tao-you/login-register/register-logo.png" alt="">
      <span v-if="$route.query.app" @click="link({ name:'TaoYouUserRegisterOrFindPassword', query: { mID: mID || 8,type: 0,app: $route.query.app,sign: autoLoginParams.sign,time: autoLoginParams.time,mac: autoLoginParams.mac}})" class="register-text">一键注册</span>
      <span v-else @click="link({ name:'TaoYouUserRegisterOrFindPassword', query: {mID: mID || 8, type: 0}})" class="register-text">一键注册</span>
    </div>

    <!-- 第三方登录 -->
    <div class="fix-third-part">
      <div class="third-part-login-container">
        <div class="third-part-login">第三方登录</div>
      </div>
      <!-- 登陆的平台 -->
      <div class="platform-container">
        <div @click="wechatLogin" class="per-platform platform-wechat"></div>
        <div class="per-platform platform-weibo"></div>
        <div class="per-platform platform-qq"></div>
      </div>
    </div>

    <!-- toast -->
    <toast :is-show="isShowToast" :toast-text="toastText" :show-time="toastTime"></toast>

    <return-btn></return-btn>

    <wechat-qrcode :is-show="showQRcode"></wechat-qrcode>
  </div>
</template>

<style lang="scss">
@import "./login.page.scss";
</style>

<script>
import Vue from 'vue';
import $ from 'jquery';
import { rs } from './lib/generate-str';
import AppHeader from '../../../oldComponents/tao-you/layout/header.component';
import Toast from '../../../oldComponents/feature/about-tao-you-user-action/toast.component';
import ReturnBtn from '../../../oldComponents/tao-you/button/return.component';
import wechatQrcode from './qrcode.component';

export default {
  components: {
    AppHeader,
    Toast,
    ReturnBtn,
    wechatQrcode,
  },
  data() {
    return {
      title: '淘游登录',
      // toast
      isShowToast: false,
      toastText: undefined,
      toastTime: 2000,
      phoneNumber: undefined,
      password: undefined,
      // 注册渠道,通过链接上的参数来获取默认是8
      mID: this.$route.query.mID || localStorage.getItem('mID') || 8,
      // 成功后的跳转链接
      nextUrl: localStorage.getItem('Q_next_url') || '/tao-you',
      showQRcode: false,
      wechatTimer: null,
      autoLoginParams: null,
    };
  },
  computed: {
    // 登录按钮是否可以点击
    canUseLoginBtn() {
      return (this.phoneNumber && this.password);
    },
    qrcodeUrl() {
      if (window.API_USE === 1) {
        return `http://interface.lly800.com${this.scanWechatUrl()}`;
      }

      return `http://pre-interface.lly800.com${this.scanWechatUrl()}`;
    },
  },
  methods: {
    link(url) {
      this.$router.push(url);
    },
    scanWechatUrl() {
      let mID;
      let fromUrl;
      let fromHash;
      try {
        mID = this.$route.query.mID || localStorage.getItem('mID');
        fromHash = '/tao-you/wechat-login-success';
        fromUrl = encodeURIComponent(`${location.origin}/#${fromHash}?mID=${mID}&from=wechat`);
      } catch (e) {
        console.log(e);
      }
      return `${Vue.ClientUrl.wechat_login}?fromUrl=${fromUrl}&mID=${mID}&loginkey=${rs}`;
    },
    wechatLoginUrl() {
      let mID;
      let fromUrl;
      let fromHash;
      try {
        mID = this.$route.query.mID || localStorage.getItem('mID');
        fromHash = localStorage.getItem('Q_next_url') || '/tao-you';
        fromUrl = encodeURIComponent(`${location.origin}/#${fromHash}?mID=${mID}&from=wechat`);
      } catch (e) {
        console.log(e);
      }
      return `${Vue.ClientUrl.wechat_login}?fromUrl=${fromUrl}&mID=${mID}`;
    },
    wechatLogin() {
      if (this.isWechat()) {
        if (window.API_USE === 1) {
          window.location.href = `http://interface.lly800.com${this.wechatLoginUrl()}`;
        } else {
          window.location.href = `http://pre-interface.lly800.com${this.wechatLoginUrl()}`;
        }
      } else { // 使用二维码
        this.showQRcode = true;
        // 向后台轮询 修复多个计时器存在的问题
        if (this.wechatTimer) {
          return;
        }
        this.wechatTimer = setInterval(() => {
          const query = {
            nologin: 1,
            loginkey: rs,
          };
          const url = Vue.ClientUrl.check_wechat_login;
          Vue.ClientHttp().GET(query, url)
            .then((res) => {
              if (res.code === 10000) {
                this.showQRcode = false;
                localStorage.setItem('login', 1);
                try {
                  localStorage.setItem('uID', res.result.uID);
                } catch (e) { console.log(e); }
                this.toast('登陆成功!');
                clearInterval(this.wechatTimer);
                if (this.$route.query.hasOwnProperty('gameID')) {
                  this.playGame();
                } else {
                  this.$router.push({
                    path: this.nextUrl,
                    query: {
                      from: 'login',
                    },
                    replace: true,
                  });
                }
              }
            });
        }, 3000);
      }
    },
    isWechat() {
      const wechatFlag = 'MicroMessenger'.toLowerCase();
      return navigator.userAgent.toLowerCase().indexOf(wechatFlag) !== -1;
    },
    toast(msg) {
      this.isShowToast = true;
      this.toastText = msg;
    },
    // 检测用户的输入
    isUserInputValid() {
      const phoneRegExp = /^(0|86)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
      const pwdRegExp = /^[A-Za-z\d]{6,14}$/;
      if (!phoneRegExp.test(this.phoneNumber)) {
        this.toastText = '手机号码格式不正确';
        return false;
      }
      if (!pwdRegExp.test(this.password)) {
        this.toastText = '密码的格式不正确';
        return false;
      }
      return true;
    },
    playGame() {
      let domain = '';
      if (window.API_USE === 1) {
        domain = 'http://interface.lly800.com';
      } else {
        domain = 'http://pre-interface.lly800.com';
      }
      const gameID = this.$route.query.gameID;
      const mID = this.$route.query.mID;
      const url = `${domain + Vue.ClientUrl.special_game_url}?gameID=${gameID}&mID=${mID}`;
      window.location.href = url;
    },
    userLogin() {
      if (this.isUserInputValid()) {
        let query = {
          username: this.phoneNumber,
          password: this.password,
          mID: this.mID,
        };
        query = Object.assign({}, query, this.autoLoginParams);
        console.log('login: userLogin');
        console.log(query);
        Vue.OneMallHttp().GET(query, Vue.OneMallUrl.common_user_login)
          .then((res) => {
            if (res.code === 10000) {
              localStorage.setItem('login', 1);
              try {
                localStorage.setItem('uID', res.result.uID);
              } catch (e) {
                console.log(e);
              }
              this.toast('登陆成功!');
              try {
                if (this.$route.query.hasOwnProperty('gameID')) {
                  this.playGame();
                } else {
                  this.$router.push({
                    path: this.nextUrl,
                    query: {
                      from: 'login',
                    },
                    replace: true,
                  });
                }
              } catch (e) {
                console.log(e);
              }
            } else {
              // 处理用户多次输入密码错误
              this.toast(res.msg);
            }
          });
      } else {
        this.isShowToast = true;
      }
    },
  },
  mounted() {
    $('body').css({ 'background-color': '#f5f5f9' });
    const query = this.$route.query;
    if (query.app) {
      this.autoLoginParams = {
        sign: query.sign,
        time: query.time,
        mac: query.mac,
      };
      console.log('login: compiled autoLoginParams');
      console.log(this.autoLoginParams);
    }
    // 跳转到首页
    if (String(localStorage.getItem('Q_next_url')).indexOf('/tao-you/user-login') !== -1) {
      this.nextUrl = `/tao-you/game-center?mID=${this.mID}`;
    } else {
      // decodeURIComponent
      const reg = /^https*:\/\//;
      let count = 0;
      let url = String(localStorage.getItem('Q_next_url'));
      if (url.indexOf('http') === 0) {
        while (!reg.test(url)) {
          url = window.decodeURIComponent(url);
          if (count > 10) {
            break;
          }
          count++;
        }
      }
      //          console.log(url);
      this.nextUrl = url;
    }
  },
  destroyed() {
    clearInterval(this.wechatTimer);
  },
};
</script>
