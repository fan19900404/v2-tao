<template>
  <div class="tm-listitem">
    <div class="tm-item" :class="{'tm-item--last': isLast, 'tm-item--alone': borderType==1}">
      <div class="tm-item__oi" :class="{'tm-item__oi--alone': borderType==1}">
        <div class="tm-item__left" v-if="index">
          <span>{{index}}</span>
        </div>
        <div class="tm-item__main">
          <div class="tm-item__thumb" v-if="thumb">
            <img :src="thumb" alt="">
          </div>
          <div class="tm-item__content" :class="{'tm-item__content--index': index}">
            <div class="tm-item__title overflow-ellipsis">{{title}}</div>
            <div class="tm-item__subtitle overflow-ellipsis" v-if="subTitle">{{subTitle}}</div>
            <div class="tm-item__extra overflow-ellipsis" v-if="extra" v-html="extra"></div>
          </div>
        </div>
        <div class="tm-item__right">
          <slot name="right"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {

      // 不传、排行榜中有用到
      index: {
        type: Number,
        default: 0,
      },

      // 左边缩略图地址
      thumb: {
        type: String,
        default: '',
      },

      // 标题(一般是三行列表中的第一行)
      title: {
        type: String,
        default: '',
      },

      // 副标题或者类型信息(一般是三行列表中的第二行)
      subTitle: {
        // type: String,
        default: '',
      },

      // 详细介绍/附加的说明性文字(一般是三行列表中的第三行)
      extra: {
        // type: String,
        default: '',
      },

      // 是否是最后一条
      isLast: {
        type: Boolean,
        default: false,
      },

      // 边框类型
      // 0：两边顶住、1：左边空白右边顶住
      borderType: {
        type: Number,
        default: 0,
      },
    },
  };

</script>
<style lang="scss" scoped>
  .tm-listitem {
    background-color: #fff;
    &:active {
      background-color: #f2f2f2;
    }
  }

  .tm-item {
    border-bottom: solid #eee 1px;

    &__oi {
      display: flex;
      padding-left: 30px;
      padding-right: 30px;
      &--alone {
        padding-left: 0;
      }
    }
    &--alone {
      margin-left: 30px;
      padding-left: 0;
    }
    &--last {
      border-bottom: none;
    }
    &__left {
      padding-right: 20px;
      span {
        display: inline-block;
        width: 44px;
        height: 44px;
        line-height: 44px;
        text-align: center;
        border-radius: 50%;
        background: #f0f0f0;
        font-size: 22px;
        /*px*/
        color: #898989;
        margin-top: 36px;
      }
    }
    &__main {
      display: flex;
      flex: 1;
      width: 38px;
    }
    &__right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      min-width: 12px;
      max-width: 200px;
    }
    &__thumb {
      display: block;
      width: 90px;
      min-width: 90px;
      height: 90px;
      margin-top: 22px;
      margin-right: 20px;
      border-radius: 10px;
      overflow: hidden;
    }
    &__content {
      flex: 1;
      width: 270px;
      padding: 32px 0 24px 0;
      &--index {
        width: 226px;
      }
    }
    &__title {
      height: 32px;
      line-height: 32px;
      font-size: 32px;
      /*px*/
      color: #333;
    }
    &__subtitle,
    &__extra {
      white-space: nowrap;
      height: 28px;
      line-height: 28px;
      font-size: 28px;
      /*px*/
      color: #a5a5a5;
    }
    &__subtitle {
      margin-top: 14px;
    }
    &__extra {
      margin-top: 10px;
    }
  }

</style>
