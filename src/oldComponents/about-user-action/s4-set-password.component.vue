<!-- author: dreamapple -->
<template>
  <div v-if="isShow" class="mask flex">
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

      <!-- 输入内容 密码-->
      <div class="input-group fix-input-btn">
        <input v-model="password" class="input-control" type="password" placeholder="请输入6-14位密码,数字/字母">
      </div>

      <!-- 按钮 -->
      <button :class="{'action-btn--active': isBtnActive, 'action-btn--disabled': !isBtnActive}"
              @click="btnAction" class="action-btn fix-no-forget">{{btnText}}</button>

    </div>
  </div>
</template>

<script>
  'use strict';
  export default {
    props: {
      // 设置的密码
      password: {
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
        default: '设置密码'
      },
      // 按钮内容
      btnText: {
        type: String,
        default: '下一步'
      }
    },
    computed: {
      // 实时判断内容是否合法
      isBtnActive() {
        let pwdRegExp = /^[A-Za-z\d]{6,14}$/;
        return pwdRegExp.test(this.password) ? true : false;
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
  .close {
    position: relative;
    display: inline-block;
    width: 1.8rem;
    height: 1.8rem;
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
    margin-left: -.9rem;
    position: relative;
    display: inline-block;
    width: 1.8rem;
    height: 1.8rem;
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
    transform: rotate(40deg) translateX(.9rem);
  }
  .back:after {
    transform: rotate(-40deg) translateX(.9rem);
  }
  .flex {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
  }
  .flex-1 {
    flex: 1;
    box-flex: 1;
    -webkit-box-flex: 1;
    display: block;
  }
  .mask {
    z-index: 350;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    background-color: rgba(0,0,0,.5);
  }
  .action-container {
    max-width: 28rem;
    width: 78%;
    background-color: #fff;
    border-radius: .5rem;
    padding: 1.2rem 1.5rem 0 1.5rem;
  }
  .action-header {
    height: 1.8rem;
    /*margin-bottom: 1.5rem;*/
    margin-bottom: .5rem;
    justify-content: center;
  }
  .header-title {
    height: 1.8rem;
    text-align: center;
    line-height: 1.8rem;
    font-size: 1.8rem;
  }

  .input-group {
    height: 5.2rem;
    border-bottom: 1px solid #dfdfdf;
  }
  .input-control {
    margin-top: 2.2rem;
    margin-bottom: 1.5rem;
    font-size: 1.6rem;
    width: 100%;
    outline:none;
    border: none;
    appearance:none;
  }
  .input-control::-webkit-input-placeholder,
  .verification-code-text::-webkit-input-placeholder {
    font-size: 1.6rem;
    color: #dfdfdf;
  }
  /* 调整与下面btn之间的距离 */
  .fix-input-btn {
    margin-bottom: 2rem;
  }
  /* 没有忘记密码 */
  .fix-no-forget {
    margin-bottom: 2rem;
  }
  .action-btn {
    display: block;
    width: 100%;
    outline: none;
    border: none;
    height: 4.5rem;
    line-height: 4.5rem;
    text-align: center;
    font-size: 1.4rem;
    color: #fff;
    border-radius: .5rem;
  }
  .action-btn--active {
    background-color: #ff4a4a;
  }
  .action-btn--disabled {
    background-color: #bbbbbb;
  }
  .forget-pwd {
    color: #bbbbbb;
    margin: 1.4rem auto;
    font-size: 1.4rem;
    line-height: 1.4rem;
  }
  .verification-code {

  }
  .verification-code-text {
    margin-top: 2.2rem;
    margin-bottom: 1.5rem;
    font-size: 1.6rem;
    outline:none;
    border: none;
    appearance:none;
  }
  .verification-code-btn {
    outline: none;
    border: none;
    width: 8.2rem;
    height: 2.4rem;
    border-radius: .5rem;
    text-align: center;
    line-height: 2.4rem;
    margin-top: 1.8rem;
    margin-bottom: 1rem;
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

