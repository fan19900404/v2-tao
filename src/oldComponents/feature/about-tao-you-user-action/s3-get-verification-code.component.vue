<!-- author: dreamapple -->
<template>
  <div transition="action" v-if="isShow" class="mask flex">
    <div class="action-container">
      <div class="action-header flex">
        <div @click="back" v-show="showBack" class="left-btn-action">
          <span class="back"></span>
        </div>
        <div class="header-title flex-1">{{actionTitle}}</div>
        <div v-show="showClose" class="right-btn-action">
          <span class="close"></span>
        </div>
      </div>

      <!-- 输入内容 验证码 -->
      <div class="input-group verification-code am-flexbox fix-input-btn">
        <input v-model="vCode" class="verification-code-text am-flexbox-item" type="tel" placeholder="请输入验证码">
        <button :class="{'code-btn-normal': canSendCode, 'code-btn-disabled': !canSendCode}"
                @click="verify"
                :disabled="!canSendCode"
                class="verification-code-btn">{{verificationText}}</button>
      </div>

      <!-- 按钮 -->
      <button :class="{'action-btn--active': isBtnActive, 'action-btn--disabled': !isBtnActive}"
              @click="btnAction"
              :disabled="!isBtnActive"
              class="action-btn 1fix-no-forget">{{btnText}}</button>

    </div>
  </div>
</template>

<script>
  'use strict';
  export default {
    props: {
      vCode: {
        type: String
      },
      // 是否显示组件
      isShow: {
        type: Boolean,
        default: false
      },
      // 是否显示关闭按钮
      showClose: {
        type: Boolean,
        default: false
      },
      // 是否显示回退按钮
      showBack: {
        type: Boolean,
        default: true
      },
      // 标题内容
      actionTitle: {
        type: String,
        default: '输入验证码'
      },
      // 按钮内容
      btnText: {
        type: String,
        default: '下一步'
      },
      // 是否可以发送验证码
      canSendCode: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
//        canSendCode: false,
        initSeconds: 59,
        leftSeconds: 59,
        clock: null
      }
    },
    computed: {
      verificationText() {
        let text;
        if(this.canSendCode) {
//          text = '重新发送';
          text = '发送验证码';
        }
        else {
          text = this.leftSeconds + '秒后重发'
        }
        return text;
      },
      isBtnActive() {
        // 验证码是否正确
        if(this.vCode) {
          return true;
        }
        else {
          return false;
        }
      }
    },
    methods: {
      close() {
        this.isShow = false;
      },
      back() {
        this.$dispatch('rl-go-back');
      },
      btnAction() {
        this.$dispatch('rl-bottom-btn-action');
      },
      verify() {
        this.canSendCode = false;
        this.leftSeconds = this.initSeconds;
        this.$dispatch('rl-verify-btn-action');
        if(this.clock) {
          clearInterval(this.clock);
          this.timer();
        }
      },
      timer() {
        this.clock = setInterval(() => {
          if(this.leftSeconds > 1) {
            this.leftSeconds--;
          }
          else {
            this.canSendCode = true;
          }
        }, 1000)
      }
    },
    mounted() {
      this.$watch('isShow', (newValue) => {
        if(newValue) {
          if(this.clock) {
            clearInterval(this.clock);
            this.timer();
          }
          else {
            this.timer();
          }
        }
      });
    }
  }
</script>

<style scoped>
  .action-transition .action-container {
    transition: all .3s linear;
    opacity: 1;
    transform: translateX(0);
  }
  .action-enter .action-container {
    opacity: 0;
    transform: translateX(720px);
  }
  .action-leave .action-container {

  }
  .close {
    position: relative;
    display: inline-block;
    width: .18rem;
    height: .18rem;
    overflow: hidden;
  }
  .close::before, .close::after {
    content: '';
    position: absolute;
    height: 2px;
    width: 100%;
    top: 50%;
    left: 0;
    margin-top: -1px;
    background-color: #898989;
  }
  .close::before {
    transform: rotate(45deg);
  }
  .close:after {
    transform: rotate(-45deg);
  }
  .back {
    margin-left: -.09rem;
    position: relative;
    display: inline-block;
    width: .18rem;
    height: .18rem;
    overflow: hidden;
  }
  .back::before, .back::after {
    content: '';
    position: absolute;
    height: 2px;
    width: 100%;
    top: 50%;
    left: 0;
    margin-top: -1px;
    background-color: #dfdfdf;
  }
  .back::before {
    transform: rotate(40deg) translateX(.09rem);
  }
  .back:after {
    transform: rotate(-40deg) translateX(.09rem);
  }
  .flex {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }
  .flex-1 {
    flex: 1;
    box-flex: 1;
    -webkit-box-flex: 1;
    display: block;
  }
  .mask {
    z-index: 350;
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    background-color: rgba(0,0,0,.5);
  }
  .action-container {
    max-width: 2.8rem;
    width: 78%;
    background-color: #fff;
    border-radius: .05rem;
    padding: .12rem .15rem .2rem .15rem;
  }
  .action-header {
    height: .18rem;
    /*margin-bottom: 1.5rem;*/
    margin-bottom: .05rem;
    justify-content: center;
  }
  .header-title {
    height: .18rem;
    text-align: center;
    line-height: .18rem;
    font-size: .18rem;
  }

  .input-group {
    height: .52rem;
    border-bottom: 1px solid #dfdfdf;
  }
  .input-control {
    margin-top: .22rem;
    margin-bottom: .15rem;
    font-size: .16rem;
    width: 100%;
    outline:none;
    border: none;
    appearance:none;
  }
  .input-control::-webkit-input-placeholder,
  .verification-code-text::-webkit-input-placeholder {
    font-size: .16rem;
    color: #dfdfdf;
  }
  /* 调整与下面btn之间的距离 */
  .fix-input-btn {
    margin-bottom: .2rem;
  }
  /* 没有忘记密码 */
  .fix-no-forget {
    margin-bottom: .2rem;
  }
  .action-btn {
    display: block;
    width: 100%;
    outline: none;
    border: none;
    height: .45rem;
    line-height: .45rem;
    text-align: center;
    font-size: .14rem;
    color: #fff;
    border-radius: .05rem;
  }
  .action-btn--active {
    background-color: #00c1b3;
  }
  .action-btn--disabled {
    background-color: #bbbbbb;
  }
  .forget-pwd {
    color: #bbbbbb;
    margin: .14rem auto;
    font-size: .14rem;
    line-height: .14rem;
  }
  .verification-code {

  }
  .verification-code-text {
    margin-top: .22rem;
    margin-bottom: .15rem;
    font-size: .16rem;
    outline:none;
    border: none;
    appearance:none;
  }
  .verification-code-btn {
    outline: none;
    border: none;
    width: .865rem;
    height: .24rem;
    border-radius: .05rem;
    text-align: center;
    line-height: .24rem;
    margin-top: .18rem;
    margin-bottom: .1rem;
    font-size: .12rem;
    background-color: #fff;
  }
  .code-btn-normal {
    border: 1px solid #898989;
    color: #898989;
  }
  .code-btn-disabled {
    border: 1px solid #bbbbbb;
    color: #bbbbbb;
  }
</style>

