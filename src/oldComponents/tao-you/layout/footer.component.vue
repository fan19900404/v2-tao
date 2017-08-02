<template>
  <div>
    <!-- 填充部分 -->
    <div v-if="!onlyLogin" class="footer-filled"></div>
    <!-- 底部菜单 -->
    <div v-if="!onlyLogin" class="footer  JS-statistics-menus">
      <div data-point="1A0001" @click="link({ name: 'TaoYouHome'})" class="menu JS-statistics-menu">
        <span :class="{'icon-tao-home': 0 === menuId, 'icon-home2': 0 !== menuId}" class="menu__icon"></span>
        <span :class="{active: 0 === menuId, normal: 0 !== menuId}" class="menu__text">首页</span>
      </div>
      <div @click="link({ name: 'TaoYouGameCenter'})" class="menu JS-statistics-menu">
        <span :class="{'icon-game-h': 1 === menuId, 'icon-game': 1 !== menuId}" class="menu__icon"></span>
        <span :class="{active: 1 === menuId, normal: 1 !== menuId}" class="menu__text">游戏</span>
      </div>
      <div @click="link({ name: 'TaoYouPersonalCenter'})" class="menu JS-statistics-menu">
        <span :class="{'icon-myself': 3 === menuId, 'icon-myself2': 3 !== menuId}" class="menu__icon diandian-wrapper">
          <div v-if="user.newNoticeFlag" class="diandian"></div>
        </span>
        <span :class="{active: 3 === menuId, normal: 3 !== menuId}" class="menu__text">我的</span>
      </div>
    </div>

    <!-- 登录注册部分 -->
    <toast :is-show="isShowToast" :toast-text="toastText" :show-time="toastTime"></toast>

    <!-- step 1 -->
    <s1-login-use-phone :tel="phone" @rl-bottom-btn-action="bottomBtnAction" :is-show="show && (1 === step)">
    </s1-login-use-phone>

    <!-- step 2 -->
    <s2-login-with-password :tel="phone" :password="password" @rl-forget-password="forgetPassword" @rl-bottom-btn-action="bottomBtnAction" :is-show="show && (2 === step)">
    </s2-login-with-password>

    <!-- step 3 -->
    <s3-get-verification-code @rl-verify-btn-action="sendVerificationCode" @rl-go-back="backStep" @rl-bottom-btn-action="bottomBtnAction" :v-code="verificationCode" :can-send-code="canSendCode" :is-show="show && (3 === step)">
    </s3-get-verification-code>

    <!-- step 4 -->
    <s4-set-password :password="password" @rl-go-back="backStep" @rl-bottom-btn-action="bottomBtnAction" :is-show="show && (4 === step)">
    </s4-set-password>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
// 登录注册部分
import Toast from '../../feature/about-tao-you-user-action/toast.component';
import S1LoginUsePhone from '../../feature/about-tao-you-user-action/s1-login-use-phone.component';
import S2LoginWithPassword from '../../feature/about-tao-you-user-action/s2-login-with-password.component';
import S3GetVerificationCode from '../../feature/about-tao-you-user-action/s3-get-verification-code.component';
import S4SetPassword from '../../feature/about-tao-you-user-action/s4-set-password.component';

export default {
  components: {
    Toast,
    S1LoginUsePhone,
    S2LoginWithPassword,
    S3GetVerificationCode,
    S4SetPassword,
  },
  props: {
    // 表示当前处于哪个菜单 0, 1, 2, 3 表示从左到右的菜单
    menuId: {
      type: Number,
      default: 0,
    },
    onlyLogin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 是否可以发送验证码
      canSendCode: false,
      // 登录注册部分是下面的
      // // 关于toast
      isShowToast: false,
      toastText: null,
      toastTime: 2000,
      // // 关于登录注册
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
      // 注册渠道,默认是8
      mID: 8,
      // 修复首页图片高度的问题
      picHeight: null,
      timer: null,
    };
  },
  computed: {
    ...mapGetters(['user', 'showFlag']),
  },
  methods: {
    ...mapActions(['getFooterFlag']),
    link(url){
      this.$router.push(url);
    },
    // // 关于登录注册部分
    // toast提示
    toast(msg) {
      this.isShowToast = true;
      this.toastText = msg;
    },
    // 监测用户的手机 看是新用户还是老用户
    checkUserPhone() {
      let query = {
        phone: this.phone,
      };
      Vue.OneMallHttp(this).GET(query, Vue.OneMallUrl.common_check_phone)
        .then((res) => {
          if (res.code === 10000) {
            let isOldUser = res.result.isUsed;
            if (isOldUser) {
              this.step = 2;
              // 重置密码
              this.setActionType = 'resetPassword';
            } else {
              // 注册参数
              this.setActionType = 'reg';
              this.step = 3;
              this.canSendCode = true;
              //              this.sendVerificationCode();
            }
            // 记录顺序
            this.stepHistory.push(this.step);
          } else {
            // TODO
          }
        });
    },
    // 发送验证码
    sendVerificationCode() {
      // TODO 发送验证码
      let query = {
        phone: this.phone,
        type: this.setActionType,
      };
      Vue.OneMallHttp(this).GET(query, Vue.OneMallUrl.common_send_code)
        .then((res) => {
          if (res.code === 10000) {
            let isDone = res.result.isDone;
            if (isDone) {
              this.toast('验证码成功发送');
              this.step = 3;
              this.stepHistory.push(this.step);
            } else {
              // TODO 验证码发送失败
              this.toast('验证码发送失败');
            }
          } else {
            // TODO code不是10000
            this.toast(res.msg);
          }
        });
    },
    // 检验验证码
    checkVerificationCode() {
      let query = {
        phone: this.phone,
        code: this.verificationCode,
        type: this.setActionType,
      };
      Vue.OneMallHttp(this).GET(query, Vue.OneMallUrl.common_check_code)
        .then((res) => {
          if (res.code === 10000) {
            if (res.result.isCorrect === 1) {
              this.toast('验证码验证成功');
              this.step = 4;
              this.stepHistory.push(this.step);
            } else {
              this.toast(res.msg);
            }
          } else {
            // TODO
            this.toast(res.msg);
          }
        });
    },
    // 设置密码
    setUserPassword() {
      let query;
      let requestUrl;
      // 判断用户是老用户还是新用户
      if (this.setActionType == 'reg') {
        query = {
          phone: this.phone,
          mID: this.mID,
          code: this.verificationCode,
          password: this.password,
        };
        requestUrl = Vue.OneMallUrl.common_set_password;
      } else if (this.setActionType == 'resetPassword') {
        query = {
          phone: this.phone,
          code: this.verificationCode,
          password: this.password,
        };
        requestUrl = Vue.OneMallUrl.common_update_password;
      } else {
        // TODO
      }
      Vue.OneMallHttp(this).GET(query, requestUrl)
        .then((res) => {
          if (res.code === 10000) {
            //          window.location.href = '/';
            window.location.reload(true);
            this.toast('密码设置成功!');
            this.show = false;
          } else {
            // TODO
            this.toast(res.msg);
          }
        });
    },
    // 用户登录
    userLogin() {
      let query = {
        username: this.phone,
        password: this.password,
        mID: this.mID,
      };
      Vue.OneMallHttp(this).GET(query, Vue.OneMallUrl.common_user_login)
        .then((res) => {
          if (res.code === 10000) {
            //          window.location.href = '/';
            this.show = false;
            this.toast('登陆成功!');
            window.location.reload(true);
          } else {
            // TODO
            this.toast(res.msg);
          }
        });
    },
    // 底部按钮
    bottomBtnAction() {
      // 手机登录
      if (this.step === 1) {
        this.checkUserPhone();
      }
      // 老用户登录
      else if (this.step === 2) {
        this.userLogin();
      }
      // 获取验证码
      else if (this.step === 3) {
        this.checkVerificationCode();
      }
      // 重新设置密码
      else if (this.step === 4) {
        this.setUserPassword();
      }
    },
    // 返回
    backStep() {
      // 删除当前的状态
      this.stepHistory.pop();
      // 获取前一个状态
      let preStep = this.stepHistory.pop();
      this.step = preStep;
      this.stepHistory.push(preStep);
    },
    // 忘记密码
    forgetPassword() {
      this.sendVerificationCode();
    },
  },
  mounted() {
    this.$on('forbidden', function (value) {
      this.show = true;
    });
    // 获取用户的mID
    this.mID = this.$route.query.mID || window.mID || 8;

    // 是否显示注册奖励弹窗
    Vue.OneMallHttp(this).GET({
      nologin: 1,
    }, Vue.OneMallUrl.welcome_alert)
      .then((res) => {
        if (res.code === 10000) {
          if (res.result.isShowAlter) {
            this.$emit('regCompleted');
          }
        }
      });
    this.getFooterFlag();

    this.$on('notice', function (showFlag) {
      this.noticeFlag = showFlag;
    });
  },
};
</script>

<style lang="scss" scoped>
/* 引入公共的样式 */

@import '../../../assets/tao-you/common.scss';

.footer-filled {
  max-width: 640px;
  width: 100%;
  height: .49rem;
}

.footer {
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  max-width: 640px;
  width: 100%;
  height: .49rem;
  background-color: $white;
  display: flex;
  padding-top: .095rem;
  padding-bottom: .045rem;
  justify-content: space-around;
  border-top: 1px solid $primary-border;
  z-index: 100;
}

.menu {
  height: .34rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  color: $footer-words;
}

.menu__icon {
  width: .22rem;
  height: .22rem;
  font-size: .22rem;
}

.menu__text {
  text-align: center;
  font-size: $footer-words-text;
  height: .1rem;
  line-height: .1rem;
  margin-top: .05rem;
}

.active {
  color: $primary;
}

.normal {
  color: $footer-words;
}

.icon-game-h,
.icon-tao-home,
.icon-myself {
  color: $primary;
}

.diandian-wrapper {
  position: relative;
}

.diandian {
  position: absolute;
  top: -5px;
  left: 100%;

  width: .08rem;
  height: .08rem;
  margin-left: .06rem;
  background-color: red;
  border-radius: 50%;
}
</style>
