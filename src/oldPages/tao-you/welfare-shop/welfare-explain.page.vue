<template>
  <div>
    <div class="content-wrapper">
      <header-component :title="title"></header-component>
      <div class="explain_wrapper">
        <h5>如何获得优惠券</h5>
        <p>1、用户试玩各个页面上的H5小游戏，会获得相应的淘豆奖励</p>
        <p>2、进入福利商城，选择你想兑换的优惠券，消费一定数量的淘豆即可进行兑换。</p>
        <h5>优惠券怎么使用</h5>
        <p>1、每张优惠券均需满足一定的使用条件才可使用</p>
        <p>2、用户在游玩H5页游时，比如《传奇世界H5》，如果需要充值，进入充值页面，在游戏抵扣券列表中选择相应的优惠券即可。</p>
        <p>3、游戏优惠券只能用在支付金额大于等于优惠券限制金额的情况下，比如满6减1的优惠券，必须在充值金额≥6的情况下使用。</p>
        <p>4、优惠券必须在有效期内使用，每次支付订单只能使用一张优惠券，一旦使用将无法退回。</p>
        <p>5、本细则最终解释权归淘游所有。</p>
      </div>
    </div>
    <return-btn></return-btn>
  </div>
</template>
<script>
import HeaderComponent from '../../../oldComponents/tao-you/layout/header.component';
import ReturnBtn from '../../../oldComponents/tao-you/button/return.component';

export default {
  data() {
    return {
      title: '使用说明',
    };
  },
  components: {
    ReturnBtn,
    HeaderComponent,
  },
};
</script>
<style lang="scss" scoped>
@import "../../../assets/tao-you/common.scss";

.content-wrapper {
  /*position: absolute;*/
  overflow: auto;
  top: 0;
  bottom: 0;
  margin: 0;
  background-color: #FFFFFF;
}

.explain_wrapper {
  margin: .14rem .17rem;
}

.explain_wrapper h5 {
  color: #000000;
  font-size: $font-size-lg;
  line-height: 1.6;
  margin-top: .06rem;
  font-weight: 400;
}

.explain_wrapper p {
  color: $words;
  font-size: $font-size-md;
  line-height: 1.6;
}
</style>
