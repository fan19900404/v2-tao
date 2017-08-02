<template>
  <div class="tm-linksearch-box" @click="toLink">
    <div class="icon-search tm-linksearch-icon"></div>
    <div class="tm-linksearch-text">{{text}}</div>
  </div>
</template>

<script>
export default {
  props: {
    text: { // 标题
      type: String,
      default: '',
    },
    link: { // 跳转的链接，使用相对路径 比如 '/demo/confirm'
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  methods: {
    /**
     * 跳转方法(理论上是跳转到搜索查询页面)
     *
     * @returns
     */
    toLink() {
      if (this.link) {
        this.$router.push(this.link);
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.tm-linksearch-box {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F0F0F0;
  border-radius: 10px;
  height: 56px;
  width: 100%;
}

.tm-linksearch-icon {
  font-size: 24px;
  color: #A5A5A5;
}

.tm-linksearch-text {
  font-size: 26px;
  color: #A5A5A5;
  letter-spacing: -0.63px;
  line-height: 50px;
  margin-left: 14px;
}
</style>
