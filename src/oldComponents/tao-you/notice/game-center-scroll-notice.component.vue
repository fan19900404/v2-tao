<template>
  <div class="notice">
    <div class="J-msg-container scroll-container">
      <div v-for="v in notices" class="J-msg scroll-msg JS-statistics-notice">
        <span class="icon-notice2"></span>
        <a class="icon-text JS-statistics-notice-link" @click.stop="go(v.url)">&nbsp;{{v.title}}</a>
      </div>

      <div v-for="v in notices" class="J-msg scroll-msg JS-statistics-notice">
        <span class="icon-notice2"></span>
        <a class="icon-text JS-statistics-notice-link" @click.stop="go(v.url)">&nbsp;{{v.title}}</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      notices: {
        type: Array,
        default: [{}, {}]
      },
      time: {
        type: Number,
        default: 1720
      },
      duration: {
        type: Number,
        default: 1200
      }
    },
    data(){
      return {
        msgH: 0,
        msgFlag: 1,
        timer: null
      }
    },
    computed: {
      msgTotal() {
        return this.notices.length * 2;
      }
    },
    mounted(){
      var that = this;
      that.timer = setTimeout(function () {
        that.doCarousel();
      }, that.time);

    },
    methods: {
      doCarousel() {

        // 获取每一个滚动条的高度
        this.msgH = $('.J-msg').height();
        var that = this;

        that.timer = setInterval(() => {
          $('.J-msg-container').animate({
          marginTop: -that.msgFlag * that.msgH + 'px'
          }, that.duration, 'ease-in', function() {
          if (that.msgFlag >= that.msgTotal - 1) {
            that.msgFlag = 0;
            $('.J-msg-container').css("margin-top", 0);
            $('.J-msg-container').find('.J-msg').slice(0, that.msgTotal - 1).appendTo($('.J-msg-container'));
          }
          that.msgFlag++;
          });
        }, 3000);

      },
      go(url){
        url = url.replace('http://1.lly800.com/#','').replace('http://pre.lly800.com/#','');
        if(url.startsWith('http')){
          location.href = url;
          return;
        }
        if(!url.startsWith('/')){
          url = '/' + url;
        }
        this.$router.push(url);
      }
    },
    destroyed() {
      // 清除定时器
      clearInterval(this.timer);
    }
  }
</script>
<style lang="scss" scoped>

  /* 引入公共的样式 */
  @import '../../../assets/tao-you/common.scss';

  .notice {
    height: .42rem;
    overflow: hidden;
  }
  .scroll-container {
    height: .42rem;
    background-color: $white;
  }
  .scroll-msg {
    /*padding: 0 .15rem;*/
    height: 100%;
    line-height: 100%;
    display: flex;
    align-items: center;
    color: $scroll-msg-color;
    background-color: $white;
  }
  .icon-notice {
    font-size: $font-size-xl;
  }
  .icon-text {
    font-size: $font-size-sm;
    height: .42rem;
    line-height: .42rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #666666;
  }

</style>
