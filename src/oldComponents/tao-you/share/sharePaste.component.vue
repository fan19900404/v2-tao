<template>
  <div class="mark" v-el:mark v-if="isShow && step==2" v-touch:tap="close($event, 1)">
    <div class="container">
      <div class="content">
        <div class="intro">长按复制下方链接，去粘贴给好友吧：</div>
        <div class="link">{{ link }}</div>
      </div>
      <div class="cancel">
        <a v-touch:tap="close($event)">取消</a>
      </div>
    </div>
  </div>
</template>
<script>
'use strict';
import Vue from 'vue';
export default {
  data() {
    return {
      isShow: false,
      step: 0,
      link: location.href
    }
  },
  methods: {
    close(e, isMark) {
      if (isMark && this.$els.mark !== e.target) {
        return false;
      }
      setTimeout(() => {
        this.isShow = false;
        // $('html,body,#app').removeClass('unscroll');
      }, 320);
      e.preventDefault();
    }
  },
  mounted() {
    this.$on('share', function(step) {
      this.step = step;
      this.isShow = (step == 2) ? true : false;
      // if(this.isShow){
      //   $('html,body,#app').addClass('unscroll');
      // }
    });
  }
};
</script>
<style lang="scss" scoped>
.mark {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 640px;
  height: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .7);
}

.container {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  color: #fff;
  background-color: #fff;
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-top: solid #dfdfdf 1px;
    border-bottom: solid #dfdfdf 1px;
    padding: 0 .15rem .31rem .15rem;
    .intro {
      font-size: .14rem;
      color: #666;
      height: .44rem;
      line-height: .44rem;
      border-top: solid #f0f1f0 1px;
      text-align: left;
    }
    .link {
      // height: .32rem;
      // line-height: .16rem;
      padding: .12rem .1rem;
      font-size: .14rem;
      color: #666;
      border: dashed #c9c9c9 1px;
      text-align: left;
      user-select: all;
    }
  }
  .cancel {
    height: .445rem;
    line-height: .445rem;
    text-align: center;
    background-color: #f5f5f9;
    a {
      display: block;
      height: 100%;
      font-size: .16rem;
      color: #999;
    }
  }
}

.container {
  animation: animations .4s linear forwards;
}

@keyframes animations {
  0% {
    transform: translateY(720px);
  }
  50% {
    transform: translateY(360px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>