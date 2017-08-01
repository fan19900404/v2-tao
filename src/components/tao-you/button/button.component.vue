<template>
  <!-- 按钮部分 -->
  <button type="button" @click="action" v-if="1 === btnType" :class="{primary: 0 === btnTheme, white: 1 === btnTheme,disabled: 2 === btnTheme }" :disabled="2 === btnTheme" class="am-button ty-btn btn-radius JS-statistics-enter-game-begain">{{btnText}}
  </button>
  <!-- 链接按钮 -->
  <a :href="linkConfig.path" v-else-if="0 === btnType && !linkType" :class="{primary: 0 === btnTheme,white: 1 === btnTheme, disabled: 2 === btnTheme }" :disabled="2 === btnTheme" class="am-button btn-radius">{{linkText}}</a>

  <a v-link="linkConfig" v-else-if="0 === btnType && linkType" :class="{ primary: 0 === btnTheme, white: 1 === btnTheme, disabled: 2 === btnTheme }" :disabled="2 === btnTheme" class="am-button btn-radius">{{linkText}}</a>
</template>

<script>
export default {
  props: {
    // 按钮的类型 type:1 表示按钮，type:0 表示链接
    btnType: {
      type: Number,
      default: 1,
    },
    // 按钮的样式 0 表示主色， 1 表示白色，2表示禁止点击
    btnTheme: {
      type: Number,
      default: 0,
    },
    // 按钮的文字
    btnText: {
      type: String,
      default: '主按钮',
    },
    // 链接的文字
    linkText: {
      type: String,
      default: '链接按钮',
    },
    // 原生的链接还是应用内的链接 true 应用内的链接 false原生的链接
    linkType: {
      type: Boolean,
      default: true,
    },
    linkConfig: {
      type: Object,
      default() {
        return {
          path: '/',
        };
      },
    },
  },
  methods: {
    action() {
      this.$emit('button-component');
    },
  },
};
</script>

<style lang="scss" scoped>
/* 引入公共的样式 */

@import '../../../assets/tao-you/common.scss';

.primary {
  border: 0;
  color: $white;
  background-color: $primary !important;
  &:active {
    background-color: #00ada0 !important;
  }
}

.am-button:not([am-version]).white {
  color: #666;
}

.ty-btn {
  font-size: $font-size-xl;
}

.btn-radius {
  border-radius: .05rem;
}
</style>
