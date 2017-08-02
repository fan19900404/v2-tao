<template>
  <div v-if="show" class="am-dialog-mask show" transition="expand">
    <div v-show="show"  class="container" >
      <div class="container__title">{{title}}</div>
      <div class="container__img" v-if="1==1">
        <img :src="imgUrl">
      </div>
      <div v-else class="container__img">
        文字内容根据后台设置直接跳转至相应详情页，或进入消息详情页，消息详情页修改具体见附件图3
      </div>
      <div class="container__button" @click="oneMessage">{{text}}</div>
      <a class="am-dialog-close icon-h5" @click="close"></a>
    </div>
  </div>
</template>

<script>
  export default {
    components: {

    },
    props: {
    // 是否显示弹窗
      show: {
        type: Boolean,
        default: false,
      },
      // 弹窗标题
      title: {
        type: String,
        default: '最多最多最多最多最',
      },
      // 弹窗图片地址
      imgUrl: {
        type: String,
        default: 'http://image.lly800.com/goods/20170527/1495869001773935.jpg',
      },
      // 弹窗按钮文字
      text: {
        type: String,
        default: '查看详情',
      },
    },
    methods: {
      close() {
       this.show = false;
     },
      oneMessage() {
       this.$emit('one-message-dialog');
     },
    },
  };
</script>

<style lang="scss" scoped>
  /* 引入公共的样式 */
  @import '../../../assets/tao-you/common.scss';
  @import '../../../assets/tao-you/antui-dialog.scss';
  .am-dialog-mask:not([am-version]).show {
    display: flex;
    align-items: center;
    z-index: 10;
    position: fixed;
    top: 0;
    bottom: 0;
    max-width: 640px;
    width: 100%;
  }
  .container{
    width: 2.65rem;
    height: 2.5rem;
    background: #FFFFFF;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -1.325rem;
    margin-top: -1.25rem;
    border-radius: .05rem;
    &__title{
      width: 2.15rem;
      height: .44rem;
      margin: 0 auto;
      font-size: .16rem;
      line-height: .44rem;
      text-align: center;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &__button{
      width: 1.8rem;
      height: .33rem;
      border: 1px solid #000;
      margin: .15rem auto;
      border-radius: .05rem;
      line-height: .33rem;
      text-align: center;
      font-size: .15rem;
    }
    &__img{
      height: 1.4rem;
      img {
        display: block;
        height: 100%;
      }
    }
  }
   .am-dialog-close {
     display: inline-block;
     width: .16rem;
     height: .16rem;
     position: absolute;
     top: .14rem;
     right: .10rem;
  }
  .expand-transition {
    transition: all .2s ease;
    opacity: 1;
  }
  .expand-enter, .expand-leave {
    opacity: 0;
  }
</style>
