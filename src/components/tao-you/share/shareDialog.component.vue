<template>
  <div class="mark" v-el:mark v-if="isShow && step==1" v-touch:tap="close($event, 1)">
    <div class="container JS-statistics-share-other">
      <ul class="content">
        <li class="item JS-statistics-share-weixin" v-touch:tap="shareIntro">
          <i class="icon icon-weixin"></i>
          <div class="text">微信分享</div>
        </li>
        <li class="item JS-statistics-share-weibo" v-touch:tap="shareTo('tsina')">
          <i class="icon icon-weibo"></i>
          <div class="text">新浪微博</div>
        </li>
        <li class="item JS-statistics-share-qq" v-touch:tap="shareIntro">
          <i class="icon icon-qq"></i>
          <div class="text">QQ好友</div>
        </li>
      </ul>
      <div class="cancel JS-statistics-share-cancel">
        <a v-touch:tap="close($event)">取消</a>
      </div>
    </div>
  </div>
</template>
<script>
'use strict';
import Vue from 'vue';
export default {
  props: {
    config: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      isShow: false,
      step: 0
    }
  },
  methods: {
    shareIntro() {
      this.step = 2;
      this.$parent.$broadcast('share', this.step);
    },
    shareTo(target) {
      Object.assign(jiathis_config, this.config);
      jiathis_mh5.sendTo(target);
    },
    close(e, isMark) {
      if (isMark && this.$els.mark !== e.target) {
        return false;
      }
      setTimeout(() => {
        this.isShow = false;
        // $('html,body,#app').removeClass('unscroll');
      }, 320);
      e.preventDefault(); // 点透
    }
  },
  mounted() {
    this.$on('share', function(step) {
      this.step = step;
      this.isShow = (step == 1) ? true : false;
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
    justify-content: space-between;
    height: 1.32rem;
    text-align: center;
    border-top: solid #dfdfdf 1px;
    border-bottom: solid #dfdfdf 1px;
    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .text {
        margin-top: .12rem;
        font-size: .12rem;
        color: #898989;
      }
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

i {
  font-size: .48rem;
}

.icon-weixin {
  color: #41ce29;
}

.icon-weibo {
  color: #ff5050;
}

.icon-qq {
  color: #18b4ed;
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
