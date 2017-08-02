<template>
  <div @touchmove="onTouchMove">
    <x-dialog v-model="showValue" class="dialog-demo" @on-hide="$emit('on-hide')" @on-show="$emit('on-show')" :hide-on-blur="hideOnBlur">
      <div class="tm-confirm-box">
        <div class="tm-confirm-title" v-html="title"></div>
        <div class="tm-confirm-content">
          <slot>
            <div v-html="content"></div>
          </slot>
        </div>
        <div class="tm-confirm-control">
          <div class="tm-confirm-btn-cancel" @click="_onCancel" :style="cancelTextColor?{color:cancelTextColor}:''">{{cancelText ||"取消"}}</div>
          <div class="tm-confirm-btn-ok" @click="_onConfirm" :style="confirmTextColor?{color:confirmTextColor}:''">{{confirmText ||"确定"}}</div>
        </div>
        <span class="icon-close" @click="close"></span>
      </div>

    </x-dialog>
  </div>
</template>


<script>
import XDialog from '../dialog/dialog';

export default {
  name: 'confirm',
  components: {
    XDialog,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    hideOnBlur: {
      type: Boolean,
      default: false,
    },
    title: String,
    content: String,
    confirmText: String,
    cancelText: String,
    confirmTextColor: String,
    cancelTextColor: String,
    closeOnConfirm: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      showValue: false,
    };
  },
  methods: {
    /**
     * 关闭
     *
     * @returns
     */
    close() {
      this.showValue = false;
    },
    /**
     * 确定按钮上的事件
     *
     * @returns
     */
    _onConfirm() {
      if (this.closeOnConfirm) {
        this.showValue = false;
      }
      this.$emit('on-confirm');
    },
    /**
     * 取消按钮上的事件
     *
     * @returns
     */
    _onCancel() {
      this.showValue = false;
      this.$emit('on-cancel');
    },
    /**
     * 防止底下滚动
     *
     * @param event 环境事件
     * @returns
     */
    onTouchMove(event) {
      if (!this.scroll) {
        event.preventDefault();
      }
    },
  },
  watch: {
    value: {
      handler(val) {
        this.showValue = val;
      },
      immediate: true,
    },
    showValue(val) {
      this.$emit('input', val);
    },
  },
  created() {
    this.showValue = this.show;
    if (this.value) {
      this.showValue = this.value;
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../../config/themes.scss';

.tm-confirm-box {
  width: 530px;
  border-radius: 12px;
  background-color: rgba(256, 256, 256, 0.98);
  text-align: center;
  overflow: hidden;
  margin: auto;
}

.tm-confirm-title {
  font-size: 32px;
  line-height: 40px;
  font-weight: bold;
  color: #333;
  margin: 50px 54px 40px;
}

.tm-confirm-content {
  font-size: 28px;
  line-height: 36px;
  color: #666;
  margin: 30px 76px;
}

.tm-confirm-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: solid 1px #eee;
}

.tm-confirm-btn-cancel,
.tm-confirm-btn-ok {
  flex-grow: 1;
  flex-shrink: 0;
  font-size: 30px;
  line-height: 88px;
  height: 88px;
  color: #333;
}
/* TODO 此处只是举例后期删除 */
// @each $name, $theme in $themes {
//   .#{$name} .tm-confirm-btn-ok {
//     color: map-get($theme, 'contrast');
//     background: map-get($theme, 'primary');

//     &:hover {
//       background: map-get($theme, 'secondary');
//     }
//   }
// }

.tm-confirm-btn-ok {
  border-left: solid 1px #eee;
}

.icon-close {
  font-size: 30px;
  position: absolute;
  right: 24px;
  top: 24px;
}

.icon-close:before {
  content: "\e904";
  color: #c9c9c9;
}
</style>
