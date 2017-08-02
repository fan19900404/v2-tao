<template>
  <div>
    <app-header></app-header>
    <ul class="list">
      <li class="list__item am-flexbox" v-for="(item,index) in list" v-cloak :key="index">
        <img class="list__item__avator" :src="item.avator" alt="">
        <p class="list__item__text am-flexbox-item">{{item.qq}}</p>
      </li>
    </ul>
    <p class="remark">客服工作时间 9:00-22:00</p>
    <return-btn></return-btn>
  </div>
</template>

<script>
import Vue from 'vue';
import $ from 'jquery';
import AppHeader from '../../../oldComponents/tao-you/layout/header.component';
import ReturnBtn from '../../../oldComponents/tao-you/button/return.component';

export default {
  components: {
    ReturnBtn,
    AppHeader,
  },
  data() {
    return {
      type: 'back',
      title: '淘游客服',
      list: [
        {
          avator: '/static/images/personal/s-head.jpg',
          qq: '客服1号 静静QQ 3314210091',
          id: '5',
        },
        {
          avator: '/static/images/personal/s-head.jpg',
          qq: '客服2号 楠楠QQ 2785767272',
          id: '5',
        },
        {
          avator: '/static/images/personal/s-head.jpg',
          qq: '客服3号 笑笑QQ 2837625029',
          id: '5',
        },
        {
          avator: '/static/images/personal/s-head.jpg',
          qq: '客服群号QQ 13585910',
          id: '5',
        },
      ],
    };
  },
  mounted() {
    $('body').css('background-color', '#f8f8f8');
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/tao-you/common.scss';

.list {
  margin-top: .155rem;
  padding: 0 .15rem;
  border-top: solid $primary-border 1px;
  border-bottom: solid $primary-border 1px;
  background: #fff;

  &__item {
    border-bottom: 1px $primary-border solid;
    padding: .13rem 0;
    min-height: .295rem;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    font-size: $font-size-md;

    &:last-child {
      border-bottom: none;
    }

    &__avator {
      width: .29rem;
      margin-right: .07rem
    }

    &__text {
      text-align: left;
      font-size: $font-size-lg;
    }
  }
}

.remark {
  margin: .14rem 0;
  font-size: 0.13rem;
  color: #cccccc;
  display: block;
  position: relative;
  text-indent: .15rem;
}
</style>
