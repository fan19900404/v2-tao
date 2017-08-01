<template>
  <!-- 仿照微信的图片轮播 -->
  <div @click="toggle" v-show="isShow" :style="candyWrapperStyle" class="candy-mask">
    <div class="candy-wrapper">
      <div :style="candyStyle"
           @touchstart="touchstart"
           @touchmove="touchmove"
           @touchend="touchend"
           @touchcancel="touchend"
           v-touch:pinchstart="touchstart"
           v-touch:tap="touchstart"
           v-touch:panstart="touchstart"
           v-touch:panmove="touchmove"
           v-touch-options:pan="{ threshold: 5}"
           class="candy-container">
        <div v-for="url in imgList" class="img-container dr-flex" :style="imgContainerStyle">
          <img v-touch:tap="toggle" :style="imgStyle" class="img" :src="url" alt="图片">
        </div>
      </div>
    </div>
    <!-- 图片位置提示 -->
    <ol class="dots dr-flex">
      <li :class="{'dot--active': $index === currentId, 'dot--normal': $index !== currentId}" v-for="index in imgList.length" class="dot"></li>
    </ol>
  </div>
</template>

<script>
  'use strict';
  export default {
    props: {
      imgList: {
        type: Array,
        default: []
      },
      itemIndex: {
        type: Number
      }
    },
    data() {
      return {
        angle: 0,
        deviceWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        deviceHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
        moveDistance: 0,
        // 判断是上下滑动还是左右滑动
        direction: 0,
        movingFlag: 0,
        moveBefore: 0,
        moveDirect: 'right',
        currentId: 0,
        isShow: true
      }
    },
    computed: {
      count() {
        return this.imgList.length;
      },
      candyContainerLen() {
        return this.deviceWidth * this.count;
      },
      candyWrapperStyle() {
        return {
          width: this.deviceWidth + 'px',
          height: this.deviceHeight + 'px'
        }
      },
      candyStyle() {
        return {
          transition: null,
          width: this.candyContainerLen + 'px',
          height: this.deviceHeight + 'px',
          left: this.moveDistance + 'px'
        }
      },
      imgContainerStyle() {
        return {
          width: this.deviceWidth + 'px',
          height: this.deviceHeight + 'px'
        }
      },
      imgStyle() {
        if(0 === this.angle || 180 === this.angle) {
          return {
            width: '100%',
            height: 'auto'
          }
        }
        else {
          return {
            width: 'auto',
            height: '100%'
          }
        }
      },
      throttle() {
        return -this.deviceWidth * (this.count - 1);
      },
      halfDis() {
        return this.deviceWidth / 2;
      }
    },
    events: {
      'show-index': function(msg) {
        this.showCurrent(msg);
      }
    },
    mounted() {
      var _that = this;
      _that.angle = window.orientation;
      window.onresize = function() {
        _that.deviceWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        _that.deviceHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      };
      // 横屏和竖屏的兼容性
      window.addEventListener("orientationchange", function() {
        _that.computeInit();
      }, false);
    },
    methods: {
      computeInit() {
        var _that = this;
        _that.angle = window.orientation;
        var maxWidth = _that.deviceWidth > _that.deviceHeight ? _that.deviceWidth : _that.deviceHeight;
        var minWidth = _that.deviceWidth < _that.deviceHeight ? _that.deviceWidth : _that.deviceHeight;
        if(0 === _that.angle || 180 === _that.angle) {
          _that.moveDistance = -Math.abs(_that.currentId) * minWidth;
        }
        else if(90 === _that.angle || -90 === _that.angle) {
          _that.moveDistance = -Math.abs(_that.currentId) * maxWidth;
        }
        else {
          // 使用默认竖屏
          _that.moveDistance = -Math.abs(_that.currentId) * minWidth;
        }
      },
      showCurrent(msg) {
        this.isShow = this.itemIndex === msg.parentId ? true : false;
        this.currentId = msg.id;
        this.computeInit();
      },
      // 隐藏和显示
      toggle() {
        this.isShow = false;
      },
      // 添加transition效果
      addTransition() {
        this.candyStyle.transition = 'left .36s ease-out';
      },
      // 移除transition效果
      removeTransition() {
        this.candyStyle.transition = null;
      },
      // 滑动开始
      touchstart(e) {
        e.preventDefault();
        try {
          if(e.targetTouches[0].clientX) {
            this.moveBefore = e.targetTouches[0].clientX;
            this.moveFlag = e.targetTouches[0].clientX - this.moveDistance;
          }
        }
        catch(e) {
//          console.log('Error!');
        }
      },
      // 滑动进行
      touchmove(e) {
        e.preventDefault();
        try {
          if(0 === this.direction) {
            this.movingFlag = e.targetTouches[0].clientX;
            this.moveDistance = this.movingFlag - this.moveFlag;
          }
        }
        catch(e) {
//          console.log('Error!');
        }
      },
      // 滑动结束
      touchend(e) {
        e.preventDefault();
        if(0 === this.direction) {
          this.removeTransition();
          // 判断移动方向
          this.moveAfter = e.changedTouches[0].clientX;
          this.moveDirect = this.moveAfter - this.moveBefore > 0 ? 'right' : 'left';

//          console.log(this.moveDistance);
          if(this.moveDistance >= 0) {
            this.moveDistance = 0;
            this.currentId = 0;
          }
          else if(this.moveDistance <= this.throttle ) {
            this.moveDistance = this.throttle;
            this.moveToRight = true;
            this.currentId = this.imgList.length - 1 || 0;
          }
          else {
            // TODO
            var moveDis = Math.abs(this.moveAfter - this.moveBefore);
            if(moveDis < this.halfDis) {
              // 移动的距离小于一半
              if('left' === this.moveDirect) {
                this.moveDistance += moveDis;
              }
              else {
                this.moveDistance -= moveDis;
              }
            }
            else {
              if('left' === this.moveDirect) {
                this.moveDistance -= (this.deviceWidth - moveDis);
              }
              else {
                this.moveDistance += (this.deviceWidth - moveDis);
              }
              this.currentId = Math.abs(Math.ceil(this.moveDistance / this.deviceWidth));
            }

          }
          // 吸附效果
          this.addTransition();
        }
        console.log('currentId',this.currentId);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .candy-mask {
    position: fixed;
    top: 0;
    left: 0;
    background-color: #000;
    z-index: 1000;
  }
  .candy-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .candy-container {
    position: absolute;
  }
  .img-container {
    float: left;
    position: relative;
    align-items: center;
  }
  .img-container > .img {
    margin: 0 auto;
    display: block;
  }
  .dots {
    width: 100%;
    position: absolute;
    bottom: 2rem;
    justify-content: center;
  }
  .dot {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    float: left;
    margin-left: .5rem;
  }
  .dot--active {
    background-color: #ffffff;
  }
  .dot--normal {
    background-color: #ffffff;
    opacity: .5;
  }
</style>
