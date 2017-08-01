<template>
  <div id="J-normal-detail-buy-container-copy"></div>
  <div id="J-normal-detail-buy-container" class="detail-buy-container">
    <!-- 本期正在进行 -->
    <div v-show="!done" class="compute-section-container dr-bt-1">
      <div class="compute-section dr-flex ">
        <div class="cs-info">参与人次</div>
        <div class="cs-action">
          <div class="buy-action dr-flex">
            <span @click="decrement" :class="{'disable': this.count <= 10}" class="reduce dr-normal-bg"></span>
            <span class="input-wrap flex-1"><input v-model="count" type="tel"></span>
            <span @click="increment" :class="{'disable': this.count >= maxNum}" class="add dr-normal-bg"></span>
          </div>
        </div>
      </div>
    </div>
    <div v-show="!done" class="btn-section-container dr-bt-1">
      <div class="btn-section">
        <div class="bs-info">共需付款<span class="dr-btn-color">{{count}}</span>淘币</div>
        <div class="join">
          <div @click="pay" class="join-btn">立即参与</div>
        </div>
      </div>
    </div>
    <!-- 本期已经结束 -->
    <div v-show="done" class="btn-section-container dr-bt-1">
      <div class="btn-section">
        <div class="bs-info"><span>新一期正在火热进行</span></div>
        <div class="join">
          <div @click="directTo" class="join-btn">立即前往</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    props: [
      'done',
      'maxNum'
    ],
    data() {
      return {
        count: 50
      }
    },
    mounted() {
      // fix hide bug 修复弹出框太高遮挡住了下面内容的bug
      this.$watch('done', function(newValue) {
        if(0 == +newValue) {
          var buyContainerHeight = document.getElementById('J-normal-detail-buy-container').offsetHeight;
          var bottomHeight = document.getElementById('J-bottom-menu').offsetHeight;
          var copyHeight = buyContainerHeight - bottomHeight;
          document.getElementById('J-normal-detail-buy-container-copy').style.height = copyHeight + 'px';
        }
      })
    },
    methods: {
      increment() {
        if(this.count < this.maxNum) {
          this.count += 10;
        }
        else {
          // TODO
        }
      },
      decrement() {
        if (this.count > 10) {
          this.count = this.count - 10;
        }
        else {
          // TODO
        }
      },
      pay() {
        this.$dispatch('detail-buy-action', {
            count: this.count
          }
        );
        this.count = 50;
      },
      directTo() {
        this.$dispatch('detail-direct')
      }
    }
  }

</script>

<style scoped>
  .detail-buy-container {
    position: fixed;
    z-index: 200;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    font-size: 1.6rem;
  }

  .compute-section-container {

  }

  .compute-section {
    height: 6.2rem;
    margin: 0 1.4rem;
    align-items: center;
  }

  .compute-section .cs-info {
    text-align: center;
    width: 7rem;
    font-size: 1.4rem;
  }

  .compute-section .cs-action {
    flex: 1 0 auto;
    justify-content: flex-start;
  }

  .compute-section .cs-action .buy-action {

  }

  .buy-action {
    margin: 0 auto;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    height: 3.7rem;
    line-height: 3.7rem;
    background: #fff;
    border: 1px solid #d8d8d8;
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
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0
  }

  .buy-action input :focus {
    text-align: center
  }

  .buy-action span {
    display: block;
    position: relative
  }

  .buy-action span.input-wrap {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1
  }

  .dr-normal-bg {
    background-color: #f2f2f7;
  }
  .buy-action span.add, .buy-action span.reduce {
    width: 3.7rem;
    height: 3.7rem
  }

  .buy-action span.add {
    border-left: 1px solid #d8d8d8
  }

  .buy-action span.add:after, .buy-action span.add:before {
    display: block;
    background: #8e8e8e;
    content: ' ';
    position: absolute
  }

  .buy-action span.add:before {
    width: 44.44444444%;
    height: 4px;
    top: 50%;
    margin-top: -2px;
    left: 27.77777778%
  }

  .buy-action span.add:after {
    height: 38%;
    width: 4px;
    left: 50%;
    margin-left: -2px;
    top: 31%
  }

  .buy-action span.reduce {
    border-right: 1px solid #d8d8d8
  }

  .buy-action span.reduce:before {
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

  .buy-action span.disable {
    color: #aaa;
    background: #f6f6f4
  }

  .btn-section-container {
    height: 6rem;
    background-color: #f8f8f8;
  }

  .btn-section {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 0 auto;
    height: 100%;
    align-items: center;
  }

  .btn-section .join {

  }

  .join-btn {
    font-size: 1.6rem;
    height: 3.5rem;
    width: 9.75rem;
    background-color: #ff4a4a;
    border-radius: .5rem;
    color: #fff;
    line-height: 3.5rem;
    text-align: center;
  }

  .dr-btn-color {
    color: #ff4a4a;
  }

  .dr-bt-1 {
    border-top: 1px solid #dfdfdf;
  }

  .btn-section .bs-info {
    font-size: 1.4rem;
  }

  .btn-section .join .pay {
    font-size: 1.6rem;
  }


</style>

