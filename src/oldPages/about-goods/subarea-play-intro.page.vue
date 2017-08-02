<style scoped>
.step-container {
 background-color: #fff;
}
  .step {
    margin: 0 1.6rem;
  }
  .step-label-container {
    height: 5.2rem;
    position: relative;
  }
  .step-label {
    position: absolute;
    font-size: 1.4rem;
    width: 7.2rem;
    height: 2.8rem;
    line-height: 2.8rem;
    background-color: #ff4a4a;
    left: -1.6rem;
    top: 1.4rem;
    text-align: center;
    color: #fff;
  }
  .step-label-inner {
    height: 100%;
    position: relative;
  }
  .step-label-inner::after {
    position: absolute;
    content: ' ';
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-top: 1.4rem solid transparent;
    border-right: 1.4rem solid #fff;
    border-bottom: 1.4rem solid transparent;
  }
  .step-title {
    font-size: 1.2rem;
    color: #898989;
    line-height: 1.5rem;
  }
  .step-img {
    margin-top: 1rem;
    width: 100%;
    display: block;
  }

</style>
<template>
  <app-header :title="title"></app-header>
  <div class="step-container">
    <!-- 1 -->
    <div class="step">
      <div class="step-label-container">
        <div class="step-label">
          <div class="step-label-inner">
            步骤1
          </div>
        </div>
      </div>
      <p class="step-title">某期商品即将开始夺宝时，将预算好与商品价值相等的等份夺宝号码；（以100元移动充值卡为例）</p>
      <img class="step-img" src="/oldStatic/images/step-1.png">
    </div>
    <!-- 2 -->
    <div class="step">
      <div class="step-label-container">
        <div class="step-label">
          <div class="step-label-inner">
            步骤2
          </div>
        </div>
      </div>
      <p class="step-title">分区玩法中，系统会根据号码大小，依次将商品夺宝号平均分成10个区；(例1张电话卡分成120份，10个区，如下图所示)</p>
      <img class="step-img" src="/oldStatic/images/step-2.png">
    </div>
    <!-- 3 -->
    <div class="step">
      <div class="step-label-container">
        <div class="step-label">
          <div class="step-label-inner">
            步骤3
          </div>
        </div>
      </div>
      <p class="step-title">你可以选择购买多个未被占用的夺宝分区，每购买一个分区则将包断该分区内的全部夺宝号码；</p>
      <img class="step-img" src="/oldStatic/images/step-3.png">
    </div>
    <!-- 4 -->
    <div class="step">
      <div class="step-label-container">
        <div class="step-label">
          <div class="step-label-inner">
            步骤4
          </div>
        </div>
      </div>
      <p class="step-title">开奖时，会根据中奖号码的分区归属，确定中奖的分区；</p>
      <img class="step-img" src="/oldStatic/images/step-4.png">
    </div>
    <!-- 5 -->
    <div class="step">
      <div class="step-label-container">
        <div class="step-label">
          <div class="step-label-inner">
            步骤5
          </div>
        </div>
      </div>
      <p class="step-title">为了提高您的中奖概念，我们还为您提供了往期开奖走势图，供您参考。</p>
      <img class="step-img" src="/oldStatic/images/step-5.png">
    </div>
  </div>

  <app-bottom-bar></app-bottom-bar>
</template>

<script>
  import AppHeader from '../../oldComponents/common/header/app-header';
  import AppBottomBar from '../../oldComponents/common/footer/app-bottom-bar';

  export default {
    components: {
      AppHeader,
      AppBottomBar
    },
    data() {
      return {
        title: '分区玩法说明'
      }
    }
  }
</script>
