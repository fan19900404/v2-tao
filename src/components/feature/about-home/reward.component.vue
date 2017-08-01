<!-- author: dreamapple -->
<template>
  <div transition="action" v-show="show" class="mask">
    <div class="mask-inner action-container">
      <div @click="close" class="close-container">
        <span class="close"></span>
      </div>
      <div class="fix-reward"></div>
      <div class="reward dr-flex">
        <div class="we">淘游夺宝恭喜您获得</div>
        <div class="which-term">第{{obj.number}}期</div>
      </div>
      <div class="what">{{obj.name}}</div>
      <div @click="action" class="action-btn">查看</div>
    </div>
  </div>
</template>

<script>
  'use strict';
  export default {
    props: {
      show: {
        type: Boolean,
        twoWay: true
      },
      obj: {
        type: Object
      }
    },
    mounted() {
      // TODO
      this.$watch('show', function(newValue) {
        console.log(newValue,777);
      })
    },
    methods: {
      close() {
        this.show = false;
        this.$dispatch('reward-close')
      },
      action() {
        this.show = false;
        this.$dispatch('reward-action')
      }
    }
  }
</script>

<style scoped>
  .action-transition .action-container {
    transition: all .3s linear;
    opacity: 1;
    transform: translateY(0);
  }
  .action-enter .action-container {
    opacity: 0;
    transform: translateY(-720px);
  }
  .action-leave .action-container {

  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .7);
  }
  .mask-inner {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .close-container {
    position: absolute;
    right: 1.4rem;
    top: 8.6rem;
    width: 1.8rem;
    height: 1.8rem;
  }
  .close {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .close::before,
  .close::after {
    content: '';
    position: absolute;
    height: 3px;
    width: 1.8rem;
    background: #dfdfdf;
  }
  .close::after {
    transform: rotate(-45deg);
  }
  .close::before {
    transform: rotate(45deg);
  }
  .fix-reward {
    height: 8rem;
  }
  .reward {
    margin: 0 3.2rem;
    background-image: url('/static/images/index/reward.png');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    height: 44%;
    max-height: 26.6rem;
    flex-direction: column;
    justify-content: flex-end;
  }
  .we {
    font-size: 1.6rem;
    color: #fff;
    text-align: center;
    height: 1.6rem;
    line-height: 1.6rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  .which-term {
    font-size: 1.6rem;
    color: #fde72a;
    text-align: center;
    height: 1.6rem;
    line-height: 1.6rem;
    font-weight: 600;
  }
  .what {
    color: #fde72a;
    font-size: 2.2rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
    font-weight: 600;
  }
  .action-btn {
    max-width: 18.6rem;
    width: 52%;
    height: 4.4rem;
    text-align: center;
    color: #fff;
    line-height: 4.4rem;
    font-size: 1.8rem;
    background-color: #ff5858;
    font-weight: 600;
    border-radius: 2rem;
    margin: 0 auto;
  }
</style>
