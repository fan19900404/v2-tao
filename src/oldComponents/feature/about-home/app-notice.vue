<template>
  <section v-show="msgTotal > 0" class="J-notice notice-container">
    <div id="J-msg-container" class="J-msg-container">
      <div v-for="m in msgs" class="J-msg notice flex bg-fff {{m.goodId}}" track-by="numberID">
        <i class="one-mall-iconfont one-mall-icon-gonggao"></i>
        <a class="flex-1 text" @click="gotoPage(m)">
          <template v-if="m.status==4">
            &nbsp;&nbsp;恭喜 <em class="name">{{m.username | substr 6 '...'}}</em>&nbsp;获取&nbsp;<span class="good-name">{{m.goodsName | substr 10 '...'}}</span>
          </template>
          <template v-else>
            &nbsp;&nbsp;即将揭晓&nbsp;<span class="good-name">{{m.goodsName | substr 10 '...'}}</span>
          </template>
        </a>
        <i class="icon icon-guide"></i>
      </div>
      <div v-for="m in msgs" class="J-msg notice flex bg-fff {{m.goodId}}" track-by="numberID">
        <i class="one-mall-iconfont one-mall-icon-gonggao"></i>
        <a class="flex-1 text" @click="gotoPage(m)">
          <template v-if="m.status==4">
            &nbsp;&nbsp;恭喜 <em class="name">{{m.username | substr 6 '...'}}</em>&nbsp;获取&nbsp;<span class="good-name">{{m.goodsName | substr 10 '...'}}</span>
          </template>
          <template v-else>
            &nbsp;&nbsp;即将揭晓&nbsp;<span class="good-name">{{m.goodsName | substr 10 '...'}}</span>
          </template>
        </a>
        <i class="icon icon-guide"></i>
      </div>
    </div>
  </section>
</template>
<script>
  export default {
    props: [
      'notices',
      'time'
    ],
    data(){
      return {
        timer: '',
        msgs: [],
        msgH: 0,
        msgFlag: 1
      }
    },
    computed: {
      msgTotal() {
        return this.msgs.length;
      }
    },
    mounted(){
      var that = this;
      this.$watch('notices', function(newValue) {
        if(newValue instanceof Array && newValue.length > 0) {
          that.msgs = that.notices;
          // 轮播滚动
          that.timer = setInterval(function () {
            that.doCarousel();
          }, that.time);
        }
      });
    },
    methods: {
      doCarousel() {
        // 获取每一个滚动条的高度
        this.msgH = $('.J-msg').height();
        var that = this;
        $('.J-msg-container').animate({
          'marginTop': -that.msgFlag * this.msgH + 'px'
        }, 1000, 'linear', function () {
          if (that.msgFlag >= that.msgTotal+1) {
            that.msgFlag = 1;
            $('.J-msg-container').find('.J-msg').slice(0, 1).appendTo($('.J-msg-container'));
            $(this).css("margin-top", 0);
          }
          else {
            that.msgFlag++;
          }
        });

      },
      gotoPage(m){
        if(m.isSubarea){
          this.$router.push({
            name: 'subarea-detail',
            params: {id: m.numberID}
          });
          return;
        }
        this.$router.push({
          name: 'goods-detail',
          params: {
            id: m.numberID
          },
          query: {
            isTen: m.isTen
          }
        });
      }
    },
    destroyed() {
        // 清除定时器
        clearInterval(this.timer);
    }
  }
</script>
<style scoped>
  .notice-container {
    height: 3.5rem;
    overflow: hidden;
  }

  .notice {
    height: 3.5rem;
    line-height: 3.5rem;
    padding: 0 1rem;
    position: relative;
    font-size: 1.1rem;
  }

  .notice .name {
    color: #000;
  }

  .notice .text {
    font-size: 1.1rem;
    color: #898989;
  }

  .notice .icon-guide {
    color: #aaa;
  }

  .notice .one-mall-iconfont {
    font-size: 1.5rem;
    color: #8e8e8e;
  }
  .notice .good-name {
    color: #ff6709;
  }
</style>
