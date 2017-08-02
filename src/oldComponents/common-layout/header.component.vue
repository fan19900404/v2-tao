<!-- author: dreamapple -->
<template>
  <div class="header flex">
    <div class="header__back">
      <span @click="back" :class="backClass" class="header__back-icon"></span>
    </div>
    <div class="header__content flex-1">{{title}}</div>
    <div class="header__action">
      <span @click="action" :class="actionClass" class="header__action-icon"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 页面的标题
    title: {
      type: String,
      default: '淘游助手',
    },
    // 左侧的导航是否需要跳到指定的路由
    specialRoute: {
      type: Object,
      default() {
        return null;
      },
    },
    // 左边图标类名
    backClass: {
      type: String,
      default: 'icon-back',
    },
    hasBackAction: {
      type: Boolean,
      default: false,
    },
    // 右边图标类名
    actionClass: {
      type: String,
      default: '',
    },
  },
  methods: {
    // 点击左边触发
    back() {
      if (this.specialRoute) {
        this.$router.push(this.specialRoute);
      } else if (!this.hasBackAction) {
        history.go(-1);
      } else {
        this.$emit('header-back-action');
      }
    },
    // 点击右边触发
    action() {
      this.$emit('header-action');
    },
  },
  mounted() {
    // TODO 打印一些信息
  },
};
</script>

<style lang="scss" scoped>
.header {
  padding: 0 0.16rem;
  background-color: #ff4a4a;
  height: 0.48rem;
  &__content {
    text-align: center;
    height: 100%;
    line-height: 0.48rem;
    font-size: 0.18rem;
    color: #fff;
  }
  /* 左右两边的导航或者操作 */
  &__back,
  &__action {
    height: 100%;
  }

  &__back-icon {
    height: 100%;
    line-height: 0.48rem;
    font-size: 0.18rem;
    color: #fff;
    font-weight: 800;
  }
  &__action-icon {
    height: 100%;
    line-height: 0.48rem;
    font-size: 0.18rem;
    color: #fff;
    font-weight: 800;
  }
}
</style>
