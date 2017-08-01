<!-- author: dreamapple -->
<template>
  <div @click="closeToast" v-show="show" class="mask dr-flex">
    <div class="toast">
      <div class="title text">{{title}}</div>
      <div class="content text">{{content}}</div>
    </div>
  </div>
</template>

<script>
  'use strict';
  export default {
    props: {
      /* 是否显示toast */
      show: {
        type: Boolean,
        default: false
      },
      /* toast 内容 */
      content: {
        type: String
      },
      /* toast 标题 */
      title: {
        type: String
      },
      /* time 多少秒后关闭toast */
      time: {
        type: Number,
        default: 2
      }
    },
    methods: {
      closeToast() {
        this.show = false;
      },
      closeToastAfterSeconds() {
        setTimeout(() => {
          this.show = false
        }, this.time * 1000);
      }
    },
    mounted() {
      this.closeToastAfterSeconds();
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
  .toast {
    margin: auto;
    width: 14rem;
    padding: 2rem 1.6rem;
    background-color: #000;
    color: #fff;
    border-radius: .5rem;
    text-align: center;
  }
  .toast .text {
    height: 1.5rem;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.5rem;
  }
</style>
