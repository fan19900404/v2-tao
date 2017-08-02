<template>
  <div v-if="show" class="am-dialog-mask show">
    <div v-if="show" class="am-dialog image show">
      <div class="am-dialog-wrap">
        <div class="am-dialog-body">
          <p v-if="!hasSlot" class="am-dialog-brief">{{content}}</p>
          <slot v-if="hasSlot"></slot>
        </div>
        <div class="am-dialog-footer">
          <app-button @button-component="oneBtnDialogAction" :btn-text="btnText"></app-button>
        </div>
        <a @click="close" class="am-dialog-close" content="兑换失败\n淘豆数量不足"></a>
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
      content: {
        type: String,
        default: '我是弹窗的内容',
      },
      show: {
        type: Boolean,
        default: false,
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
          this.$emit('one-btn-dialog-component');
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
  }
  .am-dialog:not([am-version]) .am-dialog-body {
    padding: .3rem .1rem .15rem .1rem;
  }
  .am-dialog:not([am-version]) .am-dialog-body .am-dialog-brief {
    color: #aaaaaa;
    font-size: $font-size-md;
  }
  .am-dialog:not([am-version]).image .am-dialog-footer {
    margin-top: 0;
  }
  .am-dialog:not([am-version]) .am-dialog-close {
    width: .35rem;
    height: .35rem;
  }
</style>
