<template>
  <div class="tm-header-box">
    <div class="tm-header-xheader">
      <tm-header :title="title">
        <div @click="toback" slot="left" class="xheader-back" v-if="back">
          <span class="icon-arrow-left"></span>
          <span>返回</span>
        </div>
        <!-- <div icon="more" slot="right">菜单</div> -->
      </tm-header>
    </div>
  </div>
</template>
<script>
import tmHeader from '../../../components/header/header';

export default {
  components: {
    tmHeader,
  },
  props: {
    title: {
      type: String,
      default: '淘游助手',
    },
    back: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    toback() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.tm-header-box {
  height: 88px;
  width: 100%;
}

.tm-header-xheader {
  position: fixed;
  top: 0;
  max-width: 1280px;
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0 2px 0 0 #EEEEEE;
  z-index: 1000;
}

.xheader-back {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 32px;
  color: #333;
  .icon-arrow-left {
    font-size: 38px;
  }
}
</style>
