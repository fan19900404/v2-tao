<!-- author: dreamapple -->
<template>
  <div v-show="show" class="mask dr-flex">
    <!-- popup with title -->
    <div v-show="withTitle" class="popup-with-title">

    </div>
    <!-- popup without title -->
    <div v-show="!withTitle" class="popup-without-title">
      <div class="content">{{content}}</div>
      <div class="btns-container dr-flex">
        <div @click="leftBtnAction" :class="{normal: (0 === btnStyleType) || (2 === btnStyleType),
                                             stress: (1 === btnStyleType) || (3 === btnStyleType)}"
             class="left-btn flex-1">{{leftBtnText}}</div>
        <div @click="rightBtnAction" :class="{normal: (0 === btnStyleType) || (1 === btnStyleType),
                                             stress: (2 === btnStyleType) || (3 === btnStyleType)}"
             class="right-btn flex-1">{{rightBtnText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  'use strict';
  export default {
    props: {
      /*
       * withTitle: 弹窗是否带标题,默认带标题
       * 0: 表示不带标题
       * 1: 表示带标题
       * */
      withTitle: {
        type: Boolean,
        default: true
      },
      /*
       * content 表示弹窗的内容部分
       * */
      content: {
        type: String
      },
      /*
       * 左边按钮的文字
       * */
      leftBtnText: {
        type: String
      },
      /*
       * 右边按钮的文字
       * */
      rightBtnText: {
        type: String
      },
      /*
       * 按钮的样式种类
       * 0:都是normal 1:左边stress右边normal
       * 2:左边normal右边stress 3:都是stress
       * */
      btnStyleType: {
        type: Number,
        default: 0
      },
      /*
       * 是否显示弹窗
       * */
      show: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      leftBtnAction() {
        this.show = false;
        this.$dispatch('left-btn-action');
      },
      rightBtnAction() {
        this.show = false;
        this.$dispatch('right-btn-action');
      }
    }
  }
</script>

<style scoped>
  /* 遮罩层 */
  .mask {
    position: fixed;
    background-color: rgba(0, 0, 0, .5);
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 200;
    flex-direction: column;
    justify-content: center;
  }
  /* 不带标题的弹窗 */
  .popup-without-title {
    display: block;
    margin: auto 4rem;
    padding: 0 1.5rem 2.4rem;
    border-radius: .5rem;
    background-color: #fff;
  }
  .popup-without-title .content {
    display: block;
    margin: 3.8rem auto;
    text-align: center;
    color: #000;
    font-size: 1.6rem;
  }
  .popup-without-title .btns-container {
    text-align: center;
    font-size: 1.4rem;
  }
  .popup-without-title .btns-container .left-btn,
  .popup-without-title .btns-container .right-btn {
    height: 3.7rem;
    line-height: 3.7rem;
    border-radius: .5rem;
  }
  .popup-without-title .btns-container .right-btn {
    margin-left: 1rem;
  }
  .popup-without-title .btns-container .stress {
    background-color: #ff4a4a;
    color: #fff;
  }
  .popup-without-title .btns-container .normal {
    background-color: #f8f8f8;
    color: #898989;
  }
  /* 带标题的弹窗 */
</style>
