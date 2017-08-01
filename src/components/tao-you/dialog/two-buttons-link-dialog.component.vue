<template>
  <div v-if="show" class="am-dialog-mask show">
    <div v-if="show" class="am-dialog image show">
      <div class="am-dialog-wrap">
        <div class="am-dialog-body">
          <slot name="addInner">
            <p v-if="!hasSlot && showTitle" class="am-dialog-title">{{btnText}}</p>
            <p v-if="!hasSlot" class="am-dialog-brief" :class="{'spec':!hasSlot && showTitle}">{{content}}</p>
          </slot>
        </div>
        <div class="am-dialog-footer">
          <button @click="leftBtnAction" type="button" :class="{'normal-btn': 1 === normalBtn}" class="am-dialog-button" :disabled="1 === disabledBtn">{{leftBtnText}}</button>
          <button v-if="showRightBtn" @click="rightBtnAction" type="button" :class="{'normal-btn': 2 === normalBtn}" class="am-dialog-button" :disabled="2 === disabledBtn">{{rightBtnText}}</button>
        </div>
        <a @click="close" class="am-dialog-close" v-if="showCloseBtn"></a>
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
      disabledBtn: {
        type: Number,
        default: 0,
      },
      normalBtn: {
        type: Number,
        default: 1,
      },
      leftBtnText: {
        type: String,
        default: '返回',
      },
      rightBtnText: {
        type: String,
        default: '确定',
      },
      showCloseBtn: {
        type: Boolean,
        default: true,
      },
      showRightBtn: {
        type: Boolean,
        default: true,
      },
      showTitle: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      close() {
        this.show = false;
      },
      leftBtnAction() {
        this.$emit('two-btns-dialog-component-left');
        this.show = false;
      },
      rightBtnAction() {
        this.$emit('two-btns-dialog-component-right');
        this.show = false;
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
    z-index: 150;
  }
  .am-dialog:not([am-version]).image {
    margin: 0;
    top: 30%;
  }

  .am-dialog-wrap {
    background-color: $white;
    max-width: 2.65rem !important;
  }
  .am-dialog:not([am-version]) .am-dialog-body {
    padding: .25rem .1rem .15rem .1rem;
  }
  .am-dialog:not([am-version]) .am-dialog-body .am-dialog-title {
    color: #333333;
    font-size: .16rem;
    text-align: center;
    font-weight: 600;
  }
  .am-dialog:not([am-version]) .am-dialog-body .am-dialog-brief {
    color: #333333;
    font-size: .13rem;
    font-weight: 600;
    margin-top: .08rem;
  }
  .am-dialog:not([am-version]).image .am-dialog-footer {
    margin-top: 0;
  }
  .am-dialog:not([am-version]) .am-dialog-close {
    width: .35rem;
    height: .35rem;
  }
  .am-dialog:not([am-version]).image .am-dialog-footer {
    padding: 0;
    border-top: 1px solid $dialog-border-dark;
  }
  .am-dialog:not([am-version]) .am-dialog-footer .am-dialog-button {
    color: $primary;
    font-size: $dialog-font-size;
  }
  .am-dialog:not([am-version]) .am-dialog-footer .am-dialog-button {
    border-left:1px solid $dialog-border-dark ;
  }

  .normal-btn {
    color: #333333 !important;
  }

  .spec{
    font-weight: normal !important;
  }
</style>
