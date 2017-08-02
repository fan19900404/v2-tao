<template>
  <div v-if="show" class="am-dialog-mask show">
    <div v-if="show" class="am-dialog image show">
      <div class="am-dialog-wrap">
        <div class="am-dialog-body">
          <p v-if="!hasSlot" class="am-dialog-brief">{{title}}</p>
          <p v-show="isContent" class="am-dialog-context">{{context}}</p>
          <slot v-if="hasSlot"></slot>
        </div>
        <div class="am-dialog-footer">
          <p @click="oneBtnDialogAction" class="btnText">{{btnText}}</p>
        </div>
        <a v-show="isClose" @click="close" class="am-dialog-close" content="兑换失败\n淘豆数量不足"></a>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '../button/button.component';

export default {
  components: {
    AppButton,
  },
  props: {
    title: {
      type: String,
      default: '我是弹窗的主题',
    },
    context: {
      type: String,
      default: '奖励',
    },
    count: {
      type: String,
      default: '10000',
    },
    show: {
      type: Boolean,
      default: false,
    },
    isClose: {
      type: Boolean,
      default: false,
    },
    isContent: {
      type: Boolean,
      default: true,
    },
    btnText: {
      type: String,
      default: '弹窗按钮',
    },
    hasSlot: {
      type: Boolean,
      default: false,
    },
    hasAction: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.show = false;
    },
    oneBtnDialogAction() {
      if (this.hasAction) {
        this.$dispatch('one-btn-dialog-component');
      } else {
        this.show = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/* 引入公共的样式 */

@import '../../../assets/tao-you/common.scss';
@import '../../../assets/tao-you/antui-dialog.scss';

.am-dialog-mask:not([am-version]).show {
  display: flex;
  align-items: center;
  z-index: 10;
  position: fixed;
  top: 0;
  bottom: 0;
  max-width: 640px;
}

.am-dialog:not([am-version]).image {
  margin: 0;
}

.am-dialog-wrap {
  background-color: $white;
  max-width: 2.65rem !important;
}

.am-dialog:not([am-version]) .am-dialog-body {
  /*padding: .3rem .1rem .15rem .1rem;*/
  padding: 0;
}

.am-dialog:not([am-version]) .am-dialog-body .am-dialog-brief {
  color: #333333;
  font-size: .16rem;
  padding: .25rem .28rem .20rem .28rem;
  font-weight: 600;
}

.am-dialog:not([am-version]).image .am-dialog-footer {
  margin-top: 0;
  border-top: 1px solid #E5E5E5;
  padding: 0;
  p {
    width: 100%;
    text-align: center;
    padding: .12rem 0;
    font-size: .14rem;
    color: #333333;
  }
  .btnText {
    color: #00C1B3;
  }
}

.am-dialog:not([am-version]) .am-dialog-close {
  width: .35rem;
  height: .35rem;
}

.am-dialog-context {
  text-align: center;
  padding-bottom: .15rem;
  font-size: .13rem;
  color: #333333;
  span {
    color: #ff4a4a;
  }
}
</style>
