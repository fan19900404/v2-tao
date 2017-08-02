<style scoped>
    .g-header-fixed {
        position: fixed;
        top: 0;
        left: 0;
    }

    .g-header {
        width: 100%;
        height: 4.0rem;
        line-height: 4.0rem;
        background-color: #ff4a4a;
    }

    .g-header.personal {
        /*background: url(/static/images/persona_nav_bg.jpg) no-repeat top center;*/
    }

    .g-header-h1 {
        color: #fff;
        margin: 0;
        font-size: 1.8rem;
    }

    .icon {
        top: 0;
        font-size: 4rem;
        color: #fff;
        position: absolute;
    }

    .icon-keyboard_arrow_left {
        left: 0;
        line-height: 4rem;
    }

    .icon-settings {
        /*top: .6rem;*/
        /*right: 0;*/
        /*font-size: 2.5rem;*/
        /*padding: 0 1.5rem;*/
      right: 0;
      font-size: 2.8rem;
      padding: 0 1.5rem;
      line-height: 4rem;
    }

    .icon-account {
        /*top: .6rem;*/
        right: 0;
        font-size: 2.8rem;
        padding: 0 1.5rem;
        line-height: 4rem;
    }

    .icon-question {
        right: 0;
        font-size: 2.8rem;
        padding: 0 1.5rem;
        line-height: 4rem;
    }

    .icon-home {
        right: 0;
        font-size: 2.5rem;
        padding: 0 1.5rem;
        line-height: 4rem;
    }

    .redpag {
        right: 1rem;
        color: #fff;
        font-size: 1.4rem;
        font-weight: bold;
    }

    .g-header-right {
        position: absolute;
        top: 0;
        right: 0;
        height: 4.0rem;
        padding-right: 1.6rem;
        color: #fff;
        font-size: 1.3rem;
    }
    .g-header-right button{
        border: none;
        background: transparent;
        -webkit-appearance: none;
    }
    .right-btn-two {
        position: absolute;
        height: 4rem;
        top: 0;
        right: 4.4rem;
        line-height: 4rem;
    }
    .fix-back {
      position: absolute;
      color: #fff;
      font-size: 1.4rem;
      font-weight: 600;
      left: 3rem;
      line-height: 4rem;
    }

</style>

<template>
    <header class="g-header" :class="{'personal':personal==1}" v-show="headerFlag">
        <i class="icon icon-keyboard_arrow_left" v-show="isprev !== 0"></i>
        <span @click="gopre()" class="fix-back">返回</span>
        <div class="g-header-h1 center">{{ title || "畅游一元购" }}</div>
        <div class="right-btn-two">
            <slot name="two"></slot>
        </div>
        <div class="g-header-right">
            <slot name="right"></slot>
        </div>
        <i v-if="type.indexOf('setting') !== -1" class="icon icon-settings" @touchstart="goto('/personal/userinfo')"></i>
        <i v-if="type.indexOf('account') !== -1" class="icon icon-account" @touchstart="goto('/personal')"></i>
        <i v-if="type.indexOf('explain') !== -1" class="icon icon-question" @touchstart="goto('/recharge/explain')"></i>
        <i v-if="type.indexOf('home') !== -1" class="icon icon-home" @touchstart="goto('/')"></i>
        <i v-if="type.indexOf('redbag') !== -1" class="icon redpag" @touchstart="goto('')">兑换红包</i>
        <i v-if=" 'shareOrder' === action" class="icon redpag" @click="shareOrder">发布</i>
        <i v-if=" 'confirmGoods' === action" class="icon redpag" @click="shareOrder">分享</i>
    </header>
</template>

<script>
  'use strict';
  import Vue from 'vue';
  import { headerFlag } from '../../../vuex/getters';
  import { getHeaderFlag } from '../../../vuex/actions';
  export default {
    props: ['title','type','personal','action','prev','isprev'],
    data(){
      return {
        isWeixin: false || mallUtils.device.isWeixin
      }
    },
    vuex: {
      getters: {
        headerFlag: headerFlag
      },
      actions: {
        getHeaderFlag
      }
    },
    mounted() {
      this.getHeaderFlag();
    },
    methods: {
      gopre(){
        if(this.prev){
            this.$router.push(this.prev);
        }else{
            history.go(-1);
        }
      },
      goto(hash){
        location.hash = hash;
      },
      shareOrder(){
        // 晒单事件
        this.$dispatch('share-order');
      }
    }
  }
</script>
