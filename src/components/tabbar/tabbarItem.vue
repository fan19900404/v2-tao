<template>
  <a href="javascript:;" class="tm-tabbar__item" :class="{'tm-bar__item_on': isActive, 'tm-tabbar-simple': simple}" @click="onItemClick(true)">
    <div class="tm-tabbar__icon" :class="[iconClass || $parent.iconClass, {'tm-reddot': showDot}]" v-if="!simple">
      <slot name="icon" v-if="!simple && !(hasActiveIcon && isActive)"></slot>
      <slot name="icon-active" v-if="!simple && hasActiveIcon && isActive"></slot>
    </div>
    <p class="tm-tabbar__label">
      <slot name="label"></slot>
    </p>
  </a>
</template>

<script>
import { childMixin } from './multi-items';

export default {
  name: 'tabbar-item',
  beforeMount() {
    if (!this.$slots.icon) {
      this.simple = true;
    }
    if (this.$slots['icon-active']) {
      this.hasActiveIcon = true;
    }
  },
  mixins: [childMixin],
  props: {
    showDot: {
      type: Boolean,
      default: false,
    },
    badge: String,
    link: [String, Object],
    iconClass: String,
  },
  computed: {
    isActive() {
      return this.$parent.index === this.currentIndex;
    },
  },
  data() {
    return {
      simple: false,
      hasActiveIcon: false,
    };
  },
};
</script>
<style lang="scss" scoped>
@import '../../config/themes.scss';

.tm-tabbar__item {
  display: block;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  padding: 16px 0 0;
  font-size: 0;
  color: #999;
  text-align: center;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
}

.tm-tabbar__item.tm-bar__item_on .tm-tabbar__icon,
.tm-tabbar__item.tm-bar__item_on .tm-tabbar__icon>i,
.tm-tabbar__item.tm-bar__item_on .tm-tabbar__icon>i:before,
.tm-tabbar__item.tm-bar__item_on .tm-tabbar__label {
  color: #00c1b3;
}

// TODO 色系还没有确定，此处暂时放置
@each $name,
$theme in $themes {
  .#{$name} {
    .tm-tabbar__item.tm-bar__item_on .tm-tabbar__icon,
    .tm-tabbar__item.tm-bar__item_on .tm-tabbar__icon>i,
    .tm-tabbar__item.tm-bar__item_on .tm-tabbar__icon>i:before,
    .tm-tabbar__item.tm-bar__item_on .tm-tabbar__label {
      color: map-get($theme, 'primary');
    }
  }
}

.tm-tabbar__icon {
  position: relative;
  display: inline-block;
  width: 42px;
  height: 42px;
}

.tm-tabbar__icon>i,
.tm-tabbar__icon>i:before,
i.tm-tabbar__icon,
{
  font-size: 42px;
  color: #999
}

.tm-tabbar__icon img {
  width: 100%;
  height: 100%
}

.tm-tabbar__label {
  text-align: center;
  color: #999;
  font-size: 22px;
  line-height: 24px;
  margin: 8px auto 10px;
}

.tm-tab {
  position: relative;
  height: 100%
}

.tm-tab__panel {
  box-sizing: border-box;
  height: 100%;
  padding-bottom: 50px;
  overflow: auto;
  -webkit-overflow-scrolling: touch
}

.tm-tab__content {
  display: none
}

.tm-reddot:after {
  content: "";
  position: absolute;
  background-color: #f74c31;
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 16px;
  background-clip: padding-box;
  right: -3px;
  top: -5px;
}
</style>
