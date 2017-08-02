<template>
  <div  id="J-bottom-menu" class="bottom-menu">
    <div :class="{'bottom-bar-replace':bottomMenuShow,
                  'bottom-bar-replace-copy':!bottomMenuShow}"></div>
    <div v-show="bottomMenuShow" :class="{'bottom-bar-container--normal': !show, 'bottom-bar-container--active': show}" class="bottom-bar-container dr-flex">
      <div class="menu dr-flex" v-link="{ path: '/', activeClass: 'active', exact: true }">
          <span class="icon-container">
            <i class="one-mall-iconfont one-mall-icon-duobao"></i>
          </span>
        <span class="menu-text">夺宝</span>
      </div>
      <div class="menu dr-flex" v-link="{ path: '/publish', activeClass: 'active', exact: true }">
          <span class="icon-container">
            <i class="one-mall-iconfont one-mall-icon-jiexiao"></i>
          </span>
        <span class="menu-text">揭晓</span>
      </div>
      <div class="menu dr-flex" v-link="{ name: 'TaoYouHome', activeClass: 'active', exact: true }">
          <span style="text-align: center;" class="icon-container">
              <i style="line-height:1.3;font-size: 1.6rem" class="one-mall-iconfont-shaidan icon-game"></i>
          </span>
        <span class="menu-text">游戏</span>
      </div>

      <div class="menu dr-flex" v-link="{ path: '/shaidanshare', activeClass: 'active', exact: true }">
          <span class="icon-container">
            <i style="line-height: 0.8;" class="one-mall-iconfont-shaidan one-mall-iconfont-shaidan-sd"></i>
          </span>
        <span class="menu-text">晒单</span>
      </div>
      <div class="menu dr-flex" v-link="{ path: '/personal', activeClass: 'active', exact: true }">
          <span class="icon-container">
            <i class="one-mall-iconfont one-mall-icon-yonghu"></i>
          </span>
        <span class="menu-text">我的</span>
      </div>
    </div>
    <!-- 为了WTF审核 -->
    <!--<div v-show="show" class="review">-->
      <!--新ICP备 16002519号-1-->
    <!--</div>-->
  </div>
  <div v-show="bottomMenuShow" class="review">©杭州淘游科技有限公司</div>


  <!-- 登录注册部分 -->
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
</template>

<script>
  import Vue from 'vue';
  import {showReview} from '../../../vuex/actions';
  // 登录注册部分
  import Toast from '../../feature/about-user-action/toast.component';
  import S1LoginUsePhone from '../../feature/about-user-action/s1-login-use-phone.component';
  import S2LoginWithPassword from '../../feature/about-user-action/s2-login-with-password.component';
  import S3GetVerificationCode from '../../feature/about-user-action/s3-get-verification-code.component';
  import S4SetPassword from '../../feature/about-user-action/s4-set-password.component';
  export default {
    components: {
      Toast,
      S1LoginUsePhone,
      S2LoginWithPassword,
      S3GetVerificationCode,
      S4SetPassword
    },
    props: {
    },
    data() {
      return {
        // 关于添加copyright
        bottomMenuShow: true,
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
        // 注册渠道,默认是8
        mID: 8,
        // 修复首页图片高度的问题
        picHeight: null,
        timer: null
      }
    },
    mounted() {
      this.$on('forbidden', function(value) {
        console.log('user need login');
        this.show = true;
      });
      // 获取用户的mID
      this.mID = this.$route.query.mID || window.mID || 8;
      // 隐藏底部的菜单栏
      this.$on('hide-copyright', function() {
        this.bottomMenuShow = false;
      })
    },
    mounted() {
      // TODO
    },
    methods: {
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
          code: this.verificationCode,
          type: this.setActionType
        };
        Vue.OneMallHttp(this).GET(query, Vue.OneMallUrl.common_check_code)
          .then((res) => {
          if(10000 === res.code) {
            if(1 === res.result.isCorrect) {
              this.toast('验证码验证成功');
              this.step = 4;
              this.stepHistory.push(this.step);
            }
            else {
              this.toast(res.msg);
            }
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
//          window.location.href = '/';
          window.location.reload(true);
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
//          window.location.href = '/';
          // 刷新
          window.location.reload(true);
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
        show: ({component}) => component.show
      },
      actions: {
        showReview
      }
    }
  }
</script>

<style scoped>
  .review {
    background-color: #fff;
    font-size: 1rem;
    position: fixed;
    bottom: 0;
    width: 100%;
    color: #898989;
    padding: .6rem auto;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    z-index: 100;
  }
  .active {
    color: #ff4a4a;
  }

  .normal {
    color: #898989;
  }

  .bottom-bar-replace {
    /*height: 5.5rem;*/
    height: 6.7rem;
  }
  .bottom-bar-replace-copy {
    /*height: 5.5rem;*/
    height: 5.5rem;
  }


  .bottom-bar-container {
    position: fixed;
    z-index: 100;
    width: 100%;
    left:0;
    /*bottom: 0;*/
    bottom: 1.2rem;
    height: 5.5rem;
    /*height: 7.7rem;*/
    background-color: #fff;
    align-items: center;
    border-top: 1px solid #dfdfdf;
  }
  .bottom-bar-container--active {
    /*bottom: 1.2rem;*/
    bottom: 0;
  }
  .bottom-bar-container--normal {
    bottom: 1.2rem;
    /*bottom: 0;*/
  }

  .menu {
    flex: 1;
    font-size: 1.2rem;
    /*font-weight: 400;*/
    flex-direction: column;
    align-items: center;
  }
  .menu .one-mall-iconfont{
    font-size: 2rem;
  }
  .menu .one-mall-iconfont-shaidan {
    font-size: 2.2rem;
  }
  .menu .menu-text {
    margin-top: .1rem;
  }
  .icon-container{
    position: relative;
    width: 2rem;
    height: 2rem;
    overflow: hidden;
    text-align: center;
  }
</style>
