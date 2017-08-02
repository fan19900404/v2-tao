<template>
  <div @touchmove="onTouchMove">
    <x-dialog v-model="showValue" class="dialog-demo" @on-hide="$emit('on-hide')" @on-show="$emit('on-show')" :hide-on-blur="hideOnBlur">
      <div class="tm-alert-box">
        <div class="tm-alert-title" v-html="title"></div>
        <div class="tm-alert-content">
          <slot>
            <div v-html="content"></div>
          </slot>
        </div>
        <div class="tm-alert-control">
          <div class="tm-alert-btn-cancel" @click="_onOk" :style="buttonTextColor?{color:buttonTextColor}:''">{{buttonText ||"确定"}}</div>
        </div>
        <span class="icon-close" @click="close"></span>
      </div>

    </x-dialog>
  </div>
</template>


<script>
import XDialog from '../dialog/dialog';

export default {
  name: 'alert',
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
    buttonText: String,
    buttonTextColor: String,
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
    close() {
      this.showValue = false;
    },
    _onOk() {
      this.showValue = false;
      this.$emit('on-ok');
    },
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
.tm-alert-box {
  width: 530px;
  border-radius: 12px;
  background-color: rgba(256, 256, 256, 0.98);
  text-align: center;
  overflow: hidden;
  margin: auto;
}

.tm-alert-title {
  font-size: 32px;
  line-height: 40px;
  font-weight: bold;
  color: #333;
  margin: 50px 54px 40px;
}

.tm-alert-content {
  font-size: 28px;
  line-height: 36px;
  color: #666;
  margin: 30px 76px;
}

.tm-alert-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: solid 1px #eee;
}

.tm-alert-btn-cancel,
.tm-alert-btn-ok {
  flex-grow: 1;
  flex-shrink: 0;
  font-size: 30px;
  line-height: 88px;
  height: 88px;
  color: #333;
}

.tm-alert-btn-ok {
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
