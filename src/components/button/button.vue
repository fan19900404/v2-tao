<template>
  <button class="tm-button" :class="custmoClass" :disabled="disabled" @click.stop.prevent="handle">
    {{ text }}</button>
</template>
<script>
  /**
   * @module components/button
   * @desc 按钮
   * @param {string} [type=default] - 显示类型，接受 default, primary
   * @param {boolean} [disabled=true] - 禁用
   * @param {boolean} [plain=false] - 线框按钮
   * @param {string} [size=normal] - 尺寸，接受 normal, large
   * @param {string} [native-type] - 原生 type 属性
   * @param {slot} - 显示文本
   *
   * @example
   * <tm-button s-size="large" s-type="primary">按钮</tm-button>
   */
  export default {
    props: {
      type: {
        type: String,
        default: 'default',
        validator(value) {
          return ['default', 'primary'].indexOf(value) > -1;
        },
      },
      text: {
        type: String,
        default: '',
      },
      size: {
        type: String,
        default: 'normal',
        validator(value) {
          return ['normal', 'large'].indexOf(value) > -1;
        },
      },
      plain: {
        typw: Boolean,
        default: false,
      },
      disabled: {
        typw: Boolean,
        default: false,
      },
    },
    computed: {
      custmoClass() {
        const classes = {};
        classes[`tm-button--${this.type}`] = true;
        classes[`tm-button--${this.size}`] = true;
        classes['tm-button--disabled'] = this.disabled;
        classes['tm-button--plain'] = this.plain;
        return classes;
      },
    },
    methods: {
      handle() {
        if (this.disabled) {
          return;
        }
        this.$emit('click');
      },
    },
  };

</script>
<style lang="scss" scoped>
  .tm-button {
    box-sizing: border-box;
    background-color: #fff;
    text-align: center;
    border: solid #ccc 1px;
    /*no*/
    &--normal {
      display: inline-block;
      height: 50px;
      line-height: 50px;
      padding: 0 18px;
      font-size: 26px;
      /*px*/
      border-radius: 8px;
    }
    &--large {
      display: block;
      width: 100%;
      height: 86px;
      line-height: 86px;
      font-size: 40px;
      /*px*/
      border-radius: 10px;
    }

    &--default {
      color: #333;
      background-color: #fff;
      &:active {
        background-color: #f5f5f5;
      }
    }
    &--primary {
      color: #fff;
      border-color: #00c1b3;
      background-color: #00c1b3;
      &:active {
        background-color: #00a498;
      }
    }
    &--plain {
      background-color: transparent;
    }
    &.tm-button--disabled {
      border-color: #f0f0f0;
      color: #adadad;
      background-color: #f0f0f0;
    }
  }

  .tm-button--plain.tm-button--primary:not(:disabled) {
    color: #00c1b3;
    border-color: #00c1b3;
    &:active {
      background-color: #d9f6f4;
    }
  }

</style>
