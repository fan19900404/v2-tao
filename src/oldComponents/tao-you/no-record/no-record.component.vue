<!--列表无数据-->
<template>
  <div class="no-record">
    <div class="no-record__img">
      <img :src="img">
    </div>
    <p class="no-record__text">{{ text }}</p>
  </div>
</template>
<script>
'use strict';
export default {
  props: {
    img: {
      type: String,
      default: '/oldStatic/images/common/no-record/no-record.png'
    },
    text: {
      type: String,
      default: ''
    }
  }
};
</script>
<style lang="scss" scoped>
.no-record {
  display: flex;
  align-items: center;
  flex-direction: column;
  background: none;
  &__img {
    width: 1.35rem;
    height: 1.21rem;
    margin-bottom: 45px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &__text {
    height: .175rem;
    line-height: .175rem;
    text-align: center;
    font-size: .16rem;
    /*px*/
    color: #a5a5a5;
  }
}
</style>