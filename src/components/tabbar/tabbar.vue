<template>
  <div class="tm-tabbar">
    <slot></slot>
  </div>
</template>

<script>
import { parentMixin } from './multi-items';

export default {
  name: 'tabbar',
  mixins: [parentMixin],
  props: {
    iconClass: String,
  },
};
</script>

<style lang="scss" scoped>
.tm-tabbar {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    position: fixed;
    z-index: 500;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    max-width: 1280px;
}

.tm-tabbar:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #c0bfc4;
    color: #c0bfc4;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5)
}


</style>
