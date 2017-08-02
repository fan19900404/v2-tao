<template>
    <!-- 首页购买的组件 -->
    <div transition="buy" v-show="show && (1 === alertType)" :style="style" class="home-buy-container">
        <div class="home-buy">
            <div class="home-buy-inner">
                <!-- 左上角图片 -->
                <div class="good-img-container">
                    <img class="good-img" :src="url" alt="">
                </div>
                <!-- 主要内容 -->
                <div class="buy-alert-title">请选择参与的人次 <em @click="close" class="close"><i></i></em></div>
                    <!-- 选择人数 -->
                <div class="compute">
                  <div class="dr-flex buy-action">
                    <button v-touch:tap="decrement" :class="{'disable': this.count <= 1}" class="reduce action-btn-color"></button>
                    <span class="input-wrap"><input v-model="count" type="tel"></span>
                    <button v-touch:tap="increment"  :class="{'disable': this.count >= canBuyNum}" class="add action-btn-color"></button>
                  </div>

                  <div class="dr-flex buy-tips">
                    <span v-touch:tap="useTip(5)"
                          @touchstart="useTip(5)"
                          @click="useTip(5)"
                          class="tip flex-1"
                          :class="{'tip--normal': 5 <= canBuyNum, 'tip--disabled': 5 > canBuyNum}">
                      5 <i></i>
                    </span>
                    <span v-touch:tap="useTip(20)" @touchstart="useTip(20)" @click="useTip(20)" class="tip flex-1" :class="{'tip--normal': 20 <= canBuyNum, 'tip--disabled': 20 > canBuyNum}">20</span>
                    <span v-touch:tap="useTip(50)" @touchstart="useTip(50)" @click="useTip(50)" class="tip flex-1" :class="{'tip--normal': 50 <= canBuyNum, 'tip--disabled': 50 > canBuyNum}">50</span>
                    <span v-touch:tap="useTip(100)" @touchstart="useTip(100)" @click="useTip(100)" class="tip flex-1" :class="{'tip--normal': 100 <= canBuyNum, 'tip--disabled': 100 > canBuyNum}">100</span>
                  </div>

                  <p class="buy-result">共<span class="main-color">{{count}}</span>淘币</p>

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
            count: 1
        }
    },
    props: [
         'url',
         'show',
         'alertType',
         'canBuyNum'
    ],
    mounted() {
      console.log(this.canBuyNum);
    },
    methods: {
        increment() {
            if(this.count < this.canBuyNum) {
              this.count++;
            }
            else {
              // TODO
            }
        },
        decrement() {
            if(this.count > 1) {
                this.count--;
            }
            else {
                // TODO
            }
        },
        useTip(count) {
            if(this.canBuyNum >= count) {
              this.count = count;
            }
            else {
              // TODO nothing
              console.log('抱歉,不可以购买那么多!');
            }
        },
        close() {
            this.show = false;
            this.count = 1;
        },
        dispatchEvent() {
            this.show = false;
            this.$dispatch('buy-action', {
                count: this.count
                }
            );
            this.count = 1;
        }
    }
}
</script>

<style scoped>
  .main-color {
    color: #ff4a4a;
  }
  .main-bg-color {
    background-color: #ff4a4a;
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
    z-index: 9999;
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
    background-image: url('/static/images/close.png');
    background-size: cover;
    background-repeat: no-repeat;
}
.compute {
  padding: 0 1.8rem 1.5rem;
}
.buy-tips {
    /*height: 5.5rem;*/
    height: 4.5rem;
    justify-content: space-between;
    align-items: stretch;
}
.tip {
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    text-align: center;
    width: 6rem;
    height: 3rem;
    line-height: 3rem;
    border: 1px solid #e4e4e4;
    border-radius: .5rem;
}
.tip:not(:last-child) {
  margin-right: 1.25rem;
}
.tip--normal {
  color: #999;
  background-color: #fff;
}
.tip--disabled {
  color: #aaa;
  background-color: #f2f2f7
}

.buy-action {
    margin-top: 1rem;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    height: 3.7rem;
    line-height: 3.7rem;
    background: #fff;
    border: 1px solid #e4e4e4;
    -webkit-border-radius: .5rem;
    border-radius: .5rem
}
.buy-action input {
    -webkit-appearance: none;
    -webkit-user-select: auto;
    -moz-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
    border: none;
    background: #fff;
    text-align: center;
    font-size: 1.41666667rem;
    display: block;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0
}
.action-btn-color {
  background-color: #f2f2f7;
}
.buy-action input :focus {
    text-align: center
}

.buy-action button {
  border: none;
}

.buy-action span,
.buy-action button {
    display: block;
    position: relative
}

.buy-action span.input-wrap,
.buy-action button.input-wrap {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1
}

.buy-action span.add,
.buy-action button.add,
.buy-action span.reduce,
.buy-action button.reduce {
    width: 3.7rem;
    height: 3.7rem;
}

.buy-action span.add,
.buy-action button.add {
    border-left: 1px solid #e4e4e4;
}

.buy-action span.add:after,
.buy-action button.add:after,
.buy-action span.add:before,
.buy-action button.add:before {
    display: block;
    background: #8e8e8e;
    content: ' ';
    position: absolute
}

.buy-action span.add:before,
.buy-action button.add:before {
    width: 44.44444444%;
    height: 4px;
    top: 50%;
    margin-top: -2px;
    left: 27.77777778%
}

.buy-action span.add:after,
.buy-action button.add:after {
    height: 38%;
    width: 4px;
    left: 50%;
    margin-left: -2px;
    top: 31%
}

.buy-action span.reduce,
.buy-action button.reduce {
    border-right: 1px solid #d8d8d8
}

.buy-action span.reduce:before,
.buy-action button.reduce:before {
    display: block;
    width: 44.44444444%;
    height: 4px;
    background: #8e8e8e;
    content: ' ';
    top: 50%;
    margin-top: -2px;
    left: 27.77777778%;
    position: absolute
}

.buy-action span.disable,
.buy-action button.disable {
    color: #aaa;
    background: #f6f6f4
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
</style>
