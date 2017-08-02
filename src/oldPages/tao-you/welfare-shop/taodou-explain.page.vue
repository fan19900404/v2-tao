<template>
  <div>
    <div class="content-wrapper">
      <header-component :title="title"></header-component>
      <div class="explain_wrapper">
        <h5>淘豆及使用说明</h5>
        <p>淘豆是淘游中心的虚拟货币，目前主要通过有奖小游戏、绑定手机号及活动等途径获得，未来会增加更多淘豆获取方式并公告。 淘豆的主要用处是在兑换商城中兑换各类稀有充值优惠券，未来会增加更多奖品。
        </p>
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
      title: '淘豆说明',
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
