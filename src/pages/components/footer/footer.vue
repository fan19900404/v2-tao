<template>
  <div class="tm-footer-box">
    <tabbar>
      <tabbar-item :selected="selected === 'home'" link="/tao-you/">
        <i slot="icon" class="icon-home1"></i>
        <i slot="icon-active" class="icon-home"></i>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item :selected="selected === 'game'" link="/tao-you/game-center">
        <i slot="icon" class="icon-game1"></i>
        <i slot="icon-active" class="icon-game"></i>
        <span slot="label">游戏</span>
      </tabbar-item>
      <tabbar-item :selected="selected === 'mine'" link="/tao-you/personal-center" :show-dot="showDot">
        <i slot="icon" class="icon-mine1"></i>
        <i slot="icon-active" class="icon-mine"></i>
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
import tabbar from '../../../components/tabbar/tabbar';
import tabbarItem from '../../../components/tabbar/tabbarItem';

export default {
  components: {
    tabbar,
    tabbarItem,
  },
  props: {
    selected: {
      type: String,
      default: 'home',
    },
    showDot: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  // TODO 这里缺少一个检测是否有消息的方法或者机制
};
</script>
<style lang="scss" scoped>
.tm-footer-box {
  height: 100px;
  width: 100%;
}
</style>

