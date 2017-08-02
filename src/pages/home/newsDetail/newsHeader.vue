<template>
  <div class="news-header-box">
    <div>{{title}}</div>
    <div class="news-header-info">{{publishTime}} {{author}}</div>
  </div>
</template>
<script>

export default {
  props: {
    /** 文章标题 */
    title: String,
    /** 文章发布日期时间 */
    publishTime: String,
    /** 发布者 */
    author: {
      type: String,
      default: '淘游',
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.news-header-box {
  padding: 35px 30px;
  background: #f5f5f9;
  font-size: 40px;
  color: #000;
  line-height: 50px;
  box-shadow: 0 2px 0 0 #EEEEEE;
}

.news-header-info {
  font-size: 24px;
  color: #a5a5a5;
  line-height: 30px;
  margin-top: 10px;
}
</style>
