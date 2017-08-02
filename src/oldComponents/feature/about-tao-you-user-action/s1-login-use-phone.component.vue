<!-- author: dreamapple -->
<template>
  <div transition="action" v-if="isShow" class="mask flex">
    <div class="action-container">
      <div class="action-header flex">
        <div v-show="showBack" class="left-btn-action">
          <span class="back"></span>
        </div>
        <div class="header-title flex-1">{{actionTitle}}</div>
        <div v-show="showClose" class="right-btn-action">
          <span class="close"></span>
        </div>
      </div>

      <!-- 输入内容 手机号码 -->
      <div class="input-group fix-input-btn">
        <input v-model="tel" class="input-control" type="tel" placeholder="请输入登录的手机号码">
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
      tel: {
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
        default: false
      },
      // 标题内容
      actionTitle: {
        type: String,
        default: '快速登录'
      },
      // 按钮内容
      btnText: {
        type: String,
        default: '下一步'
      }
    },
    computed: {
      // 检验手机号码
      isBtnActive() {
        let phoneRegExp = /^(0|86)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
        return phoneRegExp.test(this.tel) ? true : false;
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
        this.$dispatch('rl-verify-btn-action');
      }
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
    background-color: #898989;
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
    width: .82rem;
    height: .24rem;
    border-radius: .05rem;
    text-align: center;
    line-height: .24rem;
    margin-top: .18rem;
    margin-bottom: .1rem;
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

