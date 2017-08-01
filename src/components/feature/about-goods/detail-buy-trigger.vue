<!-- author: dreamapple -->
<template>
  <div class="buy-trigger-container">
    <div class="buy-trigger">
      <div @click="wakeBuyPopup" class="trigger-btn">立即参加</div>
    </div>
  </div>
</template>

<script>
  'use strict';
  export default {
    props: {
      showBuyPopup: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      wakeBuyPopup() {
        this.showBuyPopup = true;
      }
    }
  }
</script>

<style scoped>
  .buy-trigger-container {
    z-index: 150;
    position: fixed;
    bottom: 0;
    height: 5.5rem;
    width: 100%;
  }
  .buy-trigger {
    height: 100%;
    background-color: #f8f8f8;
    padding: 1rem 1.5rem;
  }
  .trigger-btn {
    margin: 0 auto;
    background-color: #ff4a4a;
    color: #fff;
    font-size: 1.8rem;
    border-radius: .5rem;
    display: block;
    outline: none;
    text-align: center;
    height: 3.5rem;
    line-height: 3.5rem;
  }
</style>
