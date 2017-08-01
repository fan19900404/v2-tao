<!-- author: dreamapple -->
<template>
  <div v-show="isShow" transition="toast" class="mask flex">
    <div @click="closeToast" class="toast flex">
      <p class="toast-text">{{toastText}}</p>
    </div>
  </div>
</template>

<style scoped>
  .toast-transition .toast {
    transition: all .3s linear;
    width: 15rem;
    height: 6.1rem;
    color: #fff;
    border-radius: .5rem;
    justify-content: center;
    background-color: rgba(0, 0, 0, .8);
    margin-bottom: -25rem;
  }
  .toast-enter .toast, .toast-leave .toast {
    margin-bottom: -60rem;
  }
  .flex {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }
  .mask {
    position: absolute;
    z-index: 360;
    width: 100%;
    height: 100%;
    top: 0;
    justify-content: center;
  }
  .toast-text {
    text-align: center;
    font-size: 1.4rem;
  }
</style>

<script>
  'use strict';
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      toastText: {
        type: String,
        default: '欢迎来到这里'
      },
      showTime: {
        type: Number,
        default: 2000
      }
    },
    methods: {
      closeToast() {
        this.isShow = false;
      }
    },
    mounted() {
      this.$watch('isShow', (newValue) => {
        if(newValue) {
            setTimeout(() => {
              this.isShow = false;
            }, this.showTime);
        }
      })
    }
  }
</script>
