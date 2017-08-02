<template>
  <a class="back" @touchstart.stop.prevent="goback">
    <span class="icon1 icon-goback flex-1"></span>
  </a>
</template>

<script>
  'use strict';
  export default {
    props: {
      innertext: {
        type: String,
        default: '返回'
      },
      path: {
        default: null
      },
      hasAction: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      goback() {
        if(this.hasAction){
          this.$dispatch('goback');
          return;
        }
        if(this.path){
          this.$router.push(this.path);
          return;
        }
        history.go(-1);
      }
    }
  }
</script>

<style scoped>
  .back{
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    font-size: 1rem;
    line-height: 3rem;
    padding: .5rem;
    position: fixed;
    width: 3rem;
    height: 3rem;
    bottom: 6.5rem;
    right: 1.5rem;
    border-radius: 50%;
    background-color: #ff4a4a;
    text-align: center;
    color: #fff;
  }
  .icon-goback{
    font-size: 3rem;
  }
</style>
