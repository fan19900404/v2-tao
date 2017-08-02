<template>
  <!-- 文字跑马灯效果 author: dreamapple -->
  <div class="marquee-container">
    <div class="marquee" :style="marqueeStyle">
      <div v-for="i in 2" class="marquee-item">x{{$index}}</div>
    </div>
  </div>
  <!-- test -->
  <button @click="a">99</button>
  <button @click="b">00</button>
</template>

<script>
  'use strict';
  export default {
    data() {
      return {
        // TODO
        // 向左移动的距离
        leftMove: 0
      }
    },
    computed: {
      marqueeStyle() {
        return {
          left: this.leftMove + 'px'
        }
      }
    },
    methods: {
      a() {
        this.leftMove -= 10;
      },
      b() {
        this.leftMove += 10;
      }
    }
  }
</script>

<style scoped lang="scss">
  .marquee-container {
    position: relative;
    overflow: hidden;
  }
  .marquee {
    top: 0;
    left: 0;
    position: absolute;
    height: 100%;
    width: 800px;
  }
  .marquee-item {
    text-align: center;
    width: 200px;
    height: 20px;
    float: left;
    background-color: #999;
    color: #fff;
  }
</style>
