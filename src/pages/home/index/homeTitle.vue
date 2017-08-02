<template>
  <div class="home-title-header" @click="link">
    <div>{{title}}</div>
    <div class="home-title__right" v-if="linkTitle">
      <span>{{linkTitle}}</span>
      <i class="icon-arrow-right"></i>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    linkTitle: {
      type: String,
      default: '',
    },
    linkUrl: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {};
  },
  methods: {
    link() {
      if (this.linkUrl) {
        this.$router.push(this.linkUrl);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.home-title-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 86px;
  padding: 0 30px;
  font-size: 32px;
  color: #333333;
  letter-spacing: -0.77px;
  background: #FFFFFF;
  box-shadow: inset 0 -2px 0 0 #EEEEEE;
}

.home-title__right {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  color: #A5A5A5;
  letter-spacing: -0.63px;
}
.home-title__right i{
  color: #ccc;
  margin-left: 10px;
}
</style>
