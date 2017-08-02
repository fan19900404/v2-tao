<template>
  <div class="news-cb-box">
    <div class="news-cb-main">
      <div class="news-cb-input">我也来说几句...</div>
      <div class="news-cb-send">发表</div>
      <i class="icon-share"></i>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.news-cb-box {
  width: 100%;
  height: 90px;
}

.news-cb-main {
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 1280px;
  height: 90px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #fff;
  padding: 0 30px;
  font-size: 24px;
  color: #A5A5A5;
  letter-spacing: 0;
  line-height: 24px;
  box-sizing: border-box;
  box-shadow: inset 0 2px 0 0 #EEEEEE;
}

.news-cb-input {
  border: 2px solid #EEEEEE;
  border-radius: 8px;
  padding: 13px 20px;
  flex: 1 1 auto;
  margin-right: 30px;
}

.news-cb-send {
  font-size: 26px;
  color: #333333;
  letter-spacing: 0;
  line-height: 26px;
  border: 2px solid #CCCCCC;
  border-radius: 8px;
  padding: 11px 20px;
}

.news-cb-main .icon-share {
  font-size: 40px;
  margin-left: 30px;
}
</style>
