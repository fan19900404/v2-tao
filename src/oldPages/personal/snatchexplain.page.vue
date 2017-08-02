<template>
  <header-component :title="title"></header-component>

  <div class="explain_wrapper">
    <h5>如何获取优惠券</h5>
    <p>1）绿盒子官网会不定期举行各种赠券活动，凡是参加活动都有
      可能获得一定数量的赠送优惠券。我们将优惠券直接赠送到您
      的官网账户中；</p>
    <p>2）通过参加线上的各种活动来获取绿盒子官网优惠券，例如：
      网易优惠券活动、淘宝店铺相关活动；</p>
    <h5>二、优惠券使用细则</h5>
    <p>1）消费达到一定的购买金额时优惠券才能使用，请在参与获取
      优惠券前仔细阅读活动的说明；</p>
    <p>2）使用优惠券支付的订单，如发生退货，退款结算按照实际结
      算金额退款，优惠券不予兑现；</p>
    <p>3）优惠券必须在有效期内使用，每张订单只能使用一张优惠
      券，并且不能与其它促销活动同时享用，仅限用于购买正价商
      品，优惠券一旦使用将无法退回；</p>
    <p>4）本细则最终解释权归绿盒子所有。</p>
    <h5>三、优惠券使用流程</h5>
    <p>1）在购物中使用优惠券的步骤；
      进入商品单品页——选择颜色和尺码——放入购物车——
      选择去结算——填写配送和支付信息——出现产品清单后，在
      相应的位置下面有"使用优惠券"一栏，您只需要在下拉菜单当
      中选择您已有的优惠券即可使用，选择后，您的订单金额会自
      动地减去所优惠的款项。</p>
  </div>
</template>
<script>
  import HeaderComponent from "../../oldComponents/common/header/app-header"
  export default{
    data(){
      return {
        title: "夺宝券说明"
      }
    },
    components:{
      HeaderComponent
    }
  }
</script>
<style lang="scss" scoped>
  body{
    background-color:#f8f8f8;
  }

  .explain_wrapper{
    margin:1.4rem;
  }
  .explain_wrapper h5{
    color: #000000;
    font-size: 1.2rem;
    line-height: 2;
    margin-top: .6rem;
    font-weight: 400;
  }
  .explain_wrapper p{
    color: #898989;
    font-size: 1.2rem;
    line-height: 1.6;
  }

</style>
