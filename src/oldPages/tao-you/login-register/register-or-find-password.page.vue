<template>
  <div>
    <app-header :title="title"></app-header>
    <!-- 用户输入 -->
    <div class="user-input">
      <!-- 用户手机 -->
      <div class="input-section">
        <span class="input-section-icon">
          <img src="/static/images/tao-you/login-register/phone.png" class="input-small-icon">
        </span>
        <input v-model="phoneNumber" class="input-section-input" placeholder="输入手机号" type="tel" />
      </div>
      <!-- 输入验证码 -->
      <div class="input-section">
        <span class="input-section-icon">
          <img src="/static/images/tao-you/login-register/protect-logo.png" class="input-small-icon">
        </span>
        <input v-model="code" class="input-section-input" placeholder="请输入验证码" type="tel" />
        <button :class="{'input-section-btn--active': canUseSendCodeBtn, 'input-section-btn--disabled': !canUseSendCodeBtn}" :disabled="!canUseSendCodeBtn" @click="sendVerificationCode" class="input-section-btn">{{sendCodeMsg}}</button>
      </div>
      <!-- 用户密码 -->
      <div class="input-section">
        <span class="input-section-icon">
          <img src="/static/images/tao-you/login-register/password.png" class="input-small-icon">
        </span>
        <input v-model="password" class="input-section-input" placeholder="请输入6-14位密码,数字或字母" type="password" />
      </div>
      <!-- 用户密码确认 -->
      <div class="input-section">
        <span class="input-section-icon">
          <img src="/static/images/tao-you/login-register/password.png" class="input-small-icon">
        </span>
        <input v-model="passwordConfirm" class="input-section-input" placeholder="请输入6-14位密码,数字或字母" type="password" />
      </div>
    </div>

    <!-- 按钮 -->
    <div class="set-password-btn-container">
      <button :disabled="!canClickBtn" @click="checkVerificationCode" :class="{'set-password-inner-btn--active': canClickBtn, 'set-password-inner-btn--disabled': !canClickBtn}" class="set-password-inner-btn">{{btnText}}</button>
    </div>

    <!-- toast -->
    <toast :is-show="isShowToast" :toast-text="toastText" :show-time="toastTime"></toast>

    <return-btn></return-btn>
  </div>
</template>

<style lang="scss" scoped>
@import "./register-or-find-password.page.scss";
</style>

<script>
import Vue from 'vue';
import $ from 'jquery';
import AppHeader from '../../../oldComponents/tao-you/layout/header.component';
import Toast from '../../../oldComponents/feature/about-tao-you-user-action/toast.component';
import ReturnBtn from '../../../oldComponents/tao-you/button/return.component';

export default {
  components: {
    AppHeader,
    Toast,
    ReturnBtn,
  },
  data() {
    return {
      // 成功后的跳转链接
      nextUrl: localStorage.getItem('Q_next_url') || '/tao-you',
      // type 0:表示注册 1:表示找回密码
      title: (+this.$route.query.type === 0) ? '注册' : '找回密码',
      btnText: (+this.$route.query.type === 0) ? '注册' : '确定',
      // 发送验证码的类型
      setActionType: (+this.$route.query.type === 0) ? 'reg' : 'resetPassword',
      // 多少秒后可以重发验证码
      timeInterval: 120,
      // 倒计时
      seconds: 120,
      // 计数器
      timer: undefined,
      // 是否可以再次发送验证码
      canClickSendCodeBtn: true,
      // 手机号码
      phoneNumber: undefined,
      // 是否显示toast
      isShowToast: false,
      toastText: undefined,
      toastTime: 2000,
      // 注册渠道,通过链接上的参数来获取默认是8
      mID: this.$route.query.mID || localStorage.getItem('mID') || 8,
      autoLoginParams: null,
      code: '',
      passwordConfirm: '',
      password: '',
    };
  },
  computed: {
    // 注册或者找回密码的按钮是否可以点击
    canClickBtn() {
      return (this.phoneNumber && this.code && this.password && this.passwordConfirm);
    },
    // 手机号码是否正确
    isValidPhone() {
      const phoneRegExp = /^(0|86)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
      return !!phoneRegExp.test(this.phoneNumber);
    },
    // 发送验证码按钮的文字
    sendCodeMsg() {
      // 118秒后重发
      if (this.canClickSendCodeBtn) {
        return '发送验证码';
      }

      return `${this.seconds}秒后重发`;
    },
    // 是否可以发送验证码
    canSendCode() {
      return this.canClickSendCodeBtn;
    },
    // 发送验证码按钮是否可以使用
    canUseSendCodeBtn() {
      return (this.isValidPhone && this.canSendCode);
    },
  },
  methods: {
    // 显示toast
    showToast(msg) {
      this.isShowToast = true;
      this.toastText = msg;
    },
    // 激活发送验证码按钮
    activeSendCodeBtn() {
      this.timer = setInterval(() => {
        if (this.seconds === 1) {
          clearInterval(this.timer);
          this.canClickSendCodeBtn = true;
          this.seconds = this.timeInterval;
        } else {
          this.seconds -= 1;
        }
      }, 1000);
    },
    // 发送验证码
    sendVerificationCode() {
      // 发送验证码
      const query = {
        phone: this.phoneNumber,
        type: this.setActionType,
        codeType: (+this.$route.query.type === 0) ? 'reg' : 'find',
      };
      Vue.OneMallHttp().GET(query, Vue.OneMallUrl.common_send_code)
        .then((res) => {
          if (res.code === 10000) {
            // 成功发送验证码之后开始计时
            this.canClickSendCodeBtn = false;
            this.activeSendCodeBtn();
            // 验证码是否发送成功
            const isDone = res.result.isDone;
            if (isDone) {
              this.showToast('验证码发送成功');
            } else {
              this.showToast('验证码发送失败');
              clearInterval(this.timer);
              this.seconds = this.timeInterval;
              this.canClickSendCodeBtn = true;
            }
          } else {
            this.showToast(res.msg);
            clearInterval(this.timer);
            this.seconds = this.timeInterval;
            this.canClickSendCodeBtn = true;
          }
        });
    },
    // 验证密码是否合法
    isValidPassword() {
      const pwdRegExp = /^[A-Za-z\d]{6,14}$/;
      if (this.password !== this.passwordConfirm) {
        this.toastText = '两次输入的密码不一致';
        return false;
      }
      if (!pwdRegExp.test(this.password)) {
        this.toastText = '密码的格式不正确';
        return false;
      }
      return true;
    },
    // 注册或者找回密码
    checkVerificationCode() {
      if (this.isValidPassword()) {
        // 获取adID
        const adID = localStorage.getItem('adID');
        // 先检验验证码是否正确
        const query = {
          phone: this.phoneNumber,
          code: this.code,
          type: this.setActionType,
          adID,
        };
        Vue.OneMallHttp().GET(query, Vue.OneMallUrl.common_check_code)
          .then((res) => {
            if (res.code === 10000) {
              if (res.result.isCorrect === 1) {
                // 设置密码
                this.setPassword();
              } else {
                this.showToast(res.msg);
              }
            } else {
              // TODO
              this.showToast(res.msg);
            }
          });
      } else {
        this.isShowToast = true;
      }
    },
    // 设置密码
    setPassword() {
      let query;
      let requestUrl;
      // 获取adID
      const adID = localStorage.getItem('adID');
      if (this.setActionType == 'reg') {
        query = {
          phone: this.phoneNumber,
          mID: this.mID,
          code: this.code,
          password: this.password,
          adID,
        };
        query = Object.assign({}, query, this.autoLoginParams);
        console.log('register: setPassword');
        requestUrl = Vue.OneMallUrl.common_set_password;
      } else if (this.setActionType === 'resetPassword') {
        query = {
          phone: this.phoneNumber,
          code: this.code,
          password: this.password,
        };
        requestUrl = Vue.OneMallUrl.common_update_password;
      } else {
        // TODO
      }
      Vue.OneMallHttp().GET(query, requestUrl)
        .then((res) => {
          if (res.code === 10000) {
            localStorage.setItem('login', 1);
            if (+this.$route.query.type === 0) {
              this.showToast('注册成功!');
              this.$router.push({
                path: this.nextUrl,
                replace: true,
              });
            } else {
              // 修改密码成功,进行登录
              this.showToast('密码设置成功,前去登录');
              setTimeout(() => {
                this.$router.push({
                  name: 'TaoYouUserLogin',
                });
              }, 2500);
            }
          } else {
            this.showToast(res.msg);
          }
        });
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
      console.log('register: compiled autoLoginParams');
      console.log(this.autoLoginParams);
    }

    // 跳转到首页
    if (String(localStorage.getItem('Q_next_url')).indexOf('/tao-you/user-login') !== -1) {
      this.nextUrl = `/tao-you?mID=${this.mID}`;
    }
  },
};
</script>
