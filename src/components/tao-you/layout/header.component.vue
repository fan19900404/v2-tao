<template>
  <div class="header-container" v-show="headerFlag">
    <div class="header am-wingblank wb15px">
      <div class="header__left-menu">
        <span v-show="showBack" class="header__back-icon icon-arrow-left"></span>
        <span @click="back" v-show="showBack" class="header__back-text">{{backText}}</span>
        <span v-show="showClose" class="header__close-text">{{closeText}}</span>
      </div>
      <div class="header__title am-ft-ellipsis" v-bind:style="titleStyle">{{title}}</div>
      <div class="header__right-menu">
        <span v-show="showMenu" class="header__menu icon-edit"></span>
        <span v-show="showSetting" class="header__setting icon-edit"></span>
        <span v-show="showRightSectionText" class="header__right-section-text">{{rightSectionText}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    // 标题
    title: {
      type: String,
      default: '淘游助手',
    },
    // 返回按钮文字
    backText: {
      type: String,
      default: '返回',
    },
    // 关闭按钮文字
    closeText: {
      type: String,
      default: '关闭',
    },
    rightSectionText: {
      type: String,
      default: '邮箱账单',
    },
    // 是否显示返回
    showBack: {
      type: Boolean,
      default: true,
    },
    // 是否显示关闭
    showClose: {
      type: Boolean,
      default: false,
    },
    // 是否显示设置
    showSetting: {
      type: Boolean,
      default: false,
    },
    // 是否显示菜单
    showMenu: {
      type: Boolean,
      default: false,
    },
    // 是否显示右边的文字
    showRightSectionText: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(['headerFlag']),
    titleStyle() {
      if (this.title.length >= 6) {
        return {
          fontSize: '.16rem',
        };
      }
      return {};
    },
  },
  mounted() {
    this.getHeaderFlag();
  },
  methods: {
    ...mapActions(['getHeaderFlag']),
    back() {
      window.history.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
/* 引入公共的样式 */

@import '../../../assets/tao-you/common.scss';

.header-container {
  height: 0.44rem;
  background-color: $white;
}

.header {
  display: flex;
  justify-content: space-between;
  height: 100%;

  /* 中间的标题栏 */
  &__title {
    color: $black;
    width: 1.2rem;
    height: 100%;
    text-align: center;
    line-height: 0.44rem;
    font-size: $font-size-xl;
  }
  /* 左边的菜单 */
  &__left-menu {
    flex: 1;
    display: flex;
    align-items: center;
  }
  &__back-icon {
    font-size: $font-size-lg;
    color: $black;
  }
  &__back-text,
  &__close-text {
    font-size: $font-size-md;
    color: $black;
  }
  &__close-text {
    margin-left: 0.1rem;
  }
  /* 右边的菜单 */
  &__right-menu {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: $black;
  }
  &__setting,
  &__menu {
    width: 0.2rem;
    height: 0.2rem;
    font-size: $font-size-xl;
  }
  &__menu {
    margin-right: 0.15rem;
  }
  &__right-section-text {
    color: $black;
    font-size: $font-size-md;
  }
}
</style>
