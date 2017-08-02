<template>
  <!-- 首页购买的组件 -->
  <div transition="buy" v-show="show && (2 === alertType)" :style="style" class="home-buy-container">
    <div class="home-buy">
      <div class="home-buy-inner">
        <!-- 左上角图片 -->
        <div class="good-img-container">
          <img class="good-img" src="{{url}}" alt="">
        </div>
        <!-- 主要内容 -->
        <div class="buy-alert-title">请选择您要购买的分区 <em @click="close" class="close"><i></i></em></div>
        <!-- 选择人数 -->
        <div class="compute-top select-section">
          <div class="items dr-flex">
            <div v-for="v in innerSubarea" track-by="$index"
                 @click="choose($index)"
                 :class="{
                    'sold-out': 1 === v,
                    'active': true === innerSubareaStatus[$index]
                 }"
                 class="item">{{$index+1}}</div>
          </div>
          <div class="info dr-flex">
            <div class="rule">购买一个分区即会包断本分区内的所有号码</div>
            <div v-link="{ name: 'subarea-play-intro'}" class="question">规则说明 <i class="one-mall-iconfont one-mall-icon-shuoming"></i></div>
          </div>
        </div>
        <div class="compute-bottom">
          <p class="buy-result">共<span class="main-color">{{totalTaoBi}}</span>夺宝币</p>

          <div class="button-container">
            <div @click="dispatchEvent" class="button">立即购买</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      var height =  window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      return {
        // 绑定样式
        style: {
          width: width + 'px',
          height: height + 'px'
        },
        // 逻辑部分
        count: 0, // 选中的个数
        innerSubarea: [],
        innerSubareaStatus: []
      }
    },
    props: [
      'url',
      'show',
      'alertType',
      'subarea',
      'eachSubareaNum'
    ],
    computed: {
      totalTaoBi(){
        return this.count * (+this.eachSubareaNum);
      }
    },
    mounted() {
      var that = this;
      this.$watch('subarea', function(newValue) {
        that.innerSubarea = newValue || [];
        let subLen = that.innerSubarea.length;
        for(let i = 0; i < subLen; i++) {
          if(1 === +that.innerSubarea[i]) {
            that.innerSubareaStatus.$set(i, -1);
          }
          else {
            that.innerSubareaStatus.$set(i, false);
          }
        }
      })
    },
    methods: {
      choose(n) {
        this.count = 0;
        if('boolean' === typeof this.innerSubareaStatus[n]) {
          this.innerSubareaStatus.$set(n, !this.innerSubareaStatus[n]);
        }
        else {
          // TODO Nothing
        }
        let innerSubLen = this.innerSubareaStatus.length;
        for(let i = 0; i < innerSubLen; i++) {
          if(true === this.innerSubareaStatus[i]) {
            this.count = this.count + 1 ;
          }
        }
      },
      useTip(count) {
        this.count = count;
      },
      close() {
        this.show = false;
        this.count = 0;
      },
      dispatchEvent() {
        this.show = false;
        var strArr = [], str;
        for(var i = 0; i < this.innerSubareaStatus.length; i++) {
          if(true === this.innerSubareaStatus[i]) {
            strArr.push(i+1);
          }
        }
        str = strArr.join(',');
        this.$dispatch('home-subarea-buy-action', {
            str: str,
            count: this.totalTaoBi
          }
        );
        this.count = 0;
      }
    }
  }
</script>

<style scoped>
  .main-color {
    color: #ff6709;
  }
  .main-bg-color {
    background-color: #ff6709;
  }
  .buy-transition {
    transition: all .3s ease;
    z-index: 999;
    position: fixed;
    background-color: rgba(0,0,0,.5);
    overflow: hidden;
    width: 100%;
    height: 100%;
    bottom: 0;
  }
  .buy-enter{

  }
  .buy-leave{
    background-color: rgba(0,0,0,0);
  }
  .buy-transition  .home-buy{
    transition: all .3s ease;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    font-size: 1.2rem;
  }

  /* .buy-enter 定义进入的开始状态 */
  /* .buy-leave 定义离开的结束状态 */
  .buy-enter .home-buy{
    bottom: -25rem;
    height: 0;
  }
  .buy-leave .home-buy{
    bottom: -25rem;
    height: 0;
  }
  .red {
    color: #ff4a4a;
  }
  .home-buy-container {

  }
  .home-buy-container .home-buy {

  }
  .home-buy-container .home-buy .home-buy-inner {
    height: 100%;
    position: relative;
  }
  .home-buy-inner .good-img-container {
    width: 7.25rem;
    height: 7.25rem;
    position: absolute;
    top: -4.2rem;
    left: 1.5rem;
    background-color: #fff;
  }
  .home-buy-inner .good-img-container .good-img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .fix-gap {
    height: 1rem;
  }
  .buy-alert-title {
    text-align: center;
    font-size: 1.4rem;
    font-weight: 400;
    height: 3.75rem;
    line-height: 3.75rem;
    background-color: #f2f2f7;
    border-bottom: 1px solid #e4e4e4;
  }
  .close {
    width: 3.75rem;
    height: 3.75rem;
    right: .3rem;
    top: 0;
    position: absolute
  }
  .close i {
    width: 1.4rem;
    height: 1.4rem;
    display: inline-block;
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-image: url('/oldStatic/images/close.png');
    background-size: cover;
    background-repeat: no-repeat;
  }
  .compute-bottom {
    padding: 0 1.8rem 1.5rem;
    margin-top: .5rem;
    border-top: 1px solid #dfdfdf;
  }
  .buy-result {
    height: 4rem;
    text-align: center;
    font-size: 1.4rem;
    line-height: 4rem;
  }
  .button-container .button {
    margin: 0 auto;
    background-color: #ff4a4a;
    color: #fff;
    font-size: 1.8rem;
    border-radius: .5rem;
    display: block;
    outline: none;
    text-align: center;
    height: 4.2rem;
    line-height: 4.2rem;
  }

  .select-section {
    padding: 1.6rem 2.2rem 1.5rem;
  }
  .select-section .items {
    box-sizing: border-box;
    flex-wrap: wrap;
    border-top: 1px solid #dfdfdf;
    border-left: 1px solid #dfdfdf;
  }
  .items .item {
    box-sizing: border-box;
    width: 20%;
    height: 4.8rem;
    text-align: center;
    line-height: 4.8rem;
    border: 1px solid #dfdfdf;
    border-top: 0;
    border-left: 0;
    font-size: 1.6rem;
    color: #898989;
  }
  .sold-out {
    background-color: #f1f1f1;
    background-image: url('/oldStatic/images/sold-out.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    color: #bbb;
  }
  .items .active {
    position: relative;
    background-color: #ff4a4a;
    color: #fff;
  }
  .items .active::after {
    position: absolute;
    content: '';
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    top: .2rem;
    right: .2rem;
    background-image: url('/oldStatic/images/subarea-buy-active.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
  }
  .detail-buy-title {
    height: 3.8rem;
    line-height: 3.8rem;
    font-size: 1.4rem;
    text-indent: 1.6rem;
    background-color: #f2f2f7;
    border-top: 1px solid #dfdfdf;
  }
  .info {
    margin-top: 1rem;
    font-size: 1rem;
    align-items: center;
    justify-content: space-between;
  }
  .info .question {
    color: #329dff;
  }
  .question i {
    color: #dfdfdf;
    font-size: 1rem;
  }

</style>
