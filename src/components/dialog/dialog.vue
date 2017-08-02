<template>
  <div class="tm-x-dialog" @touchmove="onTouchMove">
    <transition :name="maskTransition">
      <div class="tm-x-dialog--mask" @click="hideOnBlur && (currentValue = false)" v-show="currentValue"></div>
    </transition>
    <transition :name="dialogTransition">
      <div :class="dialogClass" v-show="currentValue" :style="dialogStyle">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'tm-dialog',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    maskTransition: {
      type: String,
      default: 'tm-mask',
    },
    dialogTransition: {
      type: String,
      default: 'tm-dialog',
    },
    dialogClass: {
      type: String,
      default: 'tm-weui-dialog',
    },
    hideOnBlur: Boolean,
    dialogStyle: Object,
    scroll: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    value: {
      handler(val) {
        this.currentValue = val;
      },
      immediate: true,
    },
    currentValue(val) {
      this.$emit(val ? 'on-show' : 'on-hide');
      this.$emit('input', val);
    },
  },
  data() {
    return {
      currentValue: false,
    };
  },
  methods: {
    onTouchMove(event) {
      if (!this.scroll) {
        event.preventDefault();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/*弹窗动画*/

.tm-dialog-enter-active,
.tm-dialog-leave-active {
  opacity: 1;
  transition-duration: 400ms;
  transform: translate(-50%, -50%) scale(1)!important;
  transition-property: transform, opacity!important;
}

.tm-dialog-leave-active {
  transition-duration: 300ms;
}

.tm-dialog-enter {
  opacity: 0;
  transform: translate(-50%, -50%) scale(1.185)!important;
}

.tm-dialog-leave-active {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.85)!important;
}




/*遮罩层动画*/

.tm-mask-enter,
.tm-mask-leave-active {
  opacity: 0;
}

.tm-mask-leave-active,
.tm-mask-enter-active {
  transition: opacity 300ms;
}




/*弹窗内部默认样式*/

.tm-x-dialog--mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .6);
}

.tm-weui-dialog {
  position: fixed;
  z-index: 5000;
  max-width: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: transparent;
  text-align: center;
  overflow: hidden;
}
</style>
