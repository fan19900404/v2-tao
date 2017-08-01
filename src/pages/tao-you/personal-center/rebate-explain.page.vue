<template>
  <div>
    <header-component :title="title"></header-component>
    <div class="content-wrapper">
      <div class="explain_wrapper">
        <h5>如何获得抵扣券</h5>
        <p>1、激活支付宝卡通时赠送抵价券编码</p>
        <p>2、凭支付宝龙卡卡号到抵价券兑换中心兑换</p>
        <p>3、凭交易金额大于50元的交易号到抵价券</p>
        <p>4、参加“三重新人大礼包活动”？包括 注意:</p>
        <h5>抵扣券怎么使用</h5>
        <p>1、激活支付宝卡通时赠送抵价券编码，</p>
        <p>2、凭支付宝龙卡卡号到抵价券兑换中心兑换</p>
        <p>3、凭交易金额大于50元的交易号到抵价券</p>
        <p>4、参加“三重新人大礼包活动”？包括 注意:抵价券编码兑换抵价券、抵价券的</p>
        <p>如果我的回答对您有帮助，请点击如果你要得到很多抵价券就去注抵价的宝贝名称旁边有一个“抵”。 需要多说明的是淘宝的抵价券是不会返去注抵价的宝贝名称旁边有一个“抵”。 需要多说明的是淘宝的抵价券是不会返您有帮助，请点击如果你要得到很多抵价券就去注抵价的宝贝名称旁边有一个“抵”。 需要多说明的是淘宝的抵价券是不会返去注抵价的宝贝名称旁边有一个就</p>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderComponent from '../../../components/tao-you/layout/header.component';

export default {
  data() {
    return {
      title: '使用说明',
    };
  },
  components: {
    HeaderComponent,
  },
};
</script>
<style lang="scss" scoped>
@import "../../../assets/tao-you/common.scss";

.content-wrapper {
  position: absolute;
  overflow: auto;
  top: .44rem;
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
  color: #666666;
  font-size: $font-size-md;
  line-height: 1.6;
}
</style>
