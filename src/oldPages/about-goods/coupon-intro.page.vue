<template>
    <app-header :title="title"></app-header>
    <div class="coupon-intro-container">
        <h3 class="title mt-2">一、如何获取优惠券</h3>
        <p class="details">
          1) 绿盒子官网会不定期举行各种赠券活动, 凡是参加活动都有可能获得一定数量的赠送优惠券.
          我们将优惠券直接赠送到您的官网账户中;
        </p>
        <p class="details">
          2) 通过参加线上的各种活动来获取绿盒子官网优惠券, 例如:网易优惠券活动、淘宝店铺相关活动;
        </p>

        <h3 class="title mt-3">二、优惠券使用规则</h3>
        <p class="details">
          1) 消费达到一定的购买金额时优惠券才能使用, 请在参与获取优惠券前仔细阅读活动的说明;
        </p>
        <p class="details">
          2) 使用优惠券支付的订单,如发生退货,退款结算按照实际结算金额退款,优惠券不予兑现;
        </p>
        <p class="details">
          3) 优惠券必须在有效期内使用,每张订单只能使用一张优惠券,并且不能与其它促销活动同时享用,
          仅限用于购买正价商品,优惠券一旦使用将无法退回;
        </p>
        <p class="details">
          4) 本细则的最终解释权归绿盒子所有。
        </p>

        <h3 class="title mt-3">三、优惠券使用流程</h3>
        <p class="details">
          1) 在购物中使用优惠券的步骤;
          <br>
          进入商品单品页--选择颜色和尺码--放入购物车--选择去结算--填写配送和支付信息--出现产品清单后,
          在相应的位置下面有"使用优惠券"一栏,您只需要在下拉菜单当中选择您已有的优惠券岂可使用,选择后,
          您的订单金额会自动地减去所优惠的款项。
        </p>
    </div>

    <app-bottom-bar></app-bottom-bar>
</template>

<style scoped>
  .mt-2 {
    margin-top: 2rem;
  }
  .mt-3 {
    margin-top: 3rem;
  }
  .coupon-intro-container {
    font-size: 1.2rem;
    padding: 0 1.6rem;
  }
  .title {
    color: #000;
    font-size: 1.2rem;
  }
  .details {
    color: #898989;
    font-size: 1.2rem;
    line-height: 2rem;
  }
</style>

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
        title: '使用说明'
      }
    },
    ready: function () {
      $("body").css("background-color","#f8f8f8");
    },
    destroyed: function() {
      $("body").css("background-color","#fff");
    }
  }
</script>
