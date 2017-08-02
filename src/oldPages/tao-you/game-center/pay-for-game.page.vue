<template>
  <div>
    <!-- 头部 -->
    <app-header :title="'游戏充值'"></app-header>

    <!-- 支付的剩余时间 -->
    <app-notice :content="leftTimeString"></app-notice>

    <!-- 支付的某款游戏 -->
    <div class="game am-flexbox">
      <img class="game-icon" :src="orderInfo.gameIcon" alt="">
      <div class="game-intro am-flexbox-item am-flexbox">
        <div class="game-name overflow-ellipsis">{{orderInfo.gameName}}</div>
        <div class="game-type overflow-ellipsis">{{orderInfo.description}}</div>
        <div class="game-cost">金额:
          <span class="cost-money">{{orderInfo.gameInitMoney}}元</span>
        </div>
      </div>
    </div>

    <!-- 游戏抵扣券 -->
    <div class="game-coupon">
      <div @click="toggleCouponList" :class="{'game-coupon--has-list': showCouponList}" class="game-coupon__title">
        <span class="game-coupon__title-text">游戏抵扣券</span>
        <div class="game-coupon__title-number">{{couponInfoText}}</div>
        <span :class="{'icon-arrow-right': !showCouponList, 'icon-arrow-down': showCouponList}" class="game-coupon__title-icon"></span>
      </div>
      <label v-show="showCouponList" class="game-coupon__list-label" v-for="(v,index) in couponList" :for="`radio-${index}`" :key="index">
        <div class="game-coupon__list">
          <span class="game-coupon__list-text">{{v.ticketName}}</span>
          <span :class="{'list-check--normal': selectedCoupon !== index, 'icon-pay-success': selectedCoupon === index}" class="game-coupon__list-check">
            <input :value="index" v-model="selectedCoupon" name="select-coupon" :id="`radio-${index}`" class="game-coupon__list-radio" type="radio">
          </span>
        </div>
      </label>
    </div>

    <!-- 订单号 -->
    <div class="order-id">订单号：{{$route.query.orderID}}</div>

    <!-- 支付方式 -->
    <div class="pay-method">
      <div :class="{'pay-method--has-list': true}" class="pay-method__title">
        <span class="pay-method__title-text">选择支付方式</span>
      </div>
      <label v-show="v.show" class="pay-method__list-label" v-for="(v,index) in payMethodConf" :for="`pay-radio-${index}`" :key="index">
        <div class="pay-method__list">
          <span :class="v.icon" class="pay-method__list-icon"></span>
          <span class="pay-method__list-text">{{v.info}}</span>
          <span v-if="'taoBi' === v.name" class="pay-method__coin-text">{{orderInfo.gameInitMoney | moneyWidthComma}}淘币</span>
          <span :class="{'list-check--normal': selectedPayMethod !== v.payType, 'icon-pay-success': selectedPayMethod === v.payType}" class="pay-method__list-check">
            <input :value="v.payType" v-model="selectedPayMethod" name="select-coupon" :id="`pay-radio-${index}`" class="pay-method__list-radio" type="radio">
          </span>
        </div>
      </label>
    </div>

    <!-- 服务条款 -->
    <div class="service-check">
      <service-check :status="checkStatus"></service-check>
    </div>

    <!-- 支付按钮 -->
    <div class="pay-btn">
      <app-button :btn-theme="btnTheme" :btn-text="btnText" @button-component="checkService"></app-button>
    </div>

    <!-- 一个按钮弹窗 -->
    <one-simple-button :show="oneBtnAlertStatus" :content="oneBtnAlertContent" :btn-text="'确定'" @one-btn-dialog-component="closeOneBtnAlert" :has-slot="false">
    </one-simple-button>

    <!-- 底部菜单 -->
    <!--<app-footer :menu-id="-1"></app-footer>-->
  </div>
</template>

<style lang="scss" scoped>
@import '../../../assets/tao-you/common.scss';

.pay-btn {
  margin: .2rem .15rem 0 .15rem;
  padding-bottom: .3rem;
}

.game-coupon {
  margin-top: .15rem;
  border-top: 1px solid $primary-border;
  border-bottom: 1px solid $primary-border;
  background-color: $white;
  &__title {
    padding: 0 .15rem;
    height: .43rem;
    line-height: .43rem;
    display: flex;
    font-size: $font-size-md;
    align-items: center;
  }
  &__title-text {
    color: $dark;
    height: $font-size-md;
    line-height: $font-size-md;
  }
  &__title-number {
    color: $information;
    text-align: right;
    flex: 1;
    margin-right: .1rem;
    height: $font-size-md;
    line-height: $font-size-md;
  }
  &__title-icon {
    color: $information;
    align-items: center;
    display: flex;
    height: $font-size-md;
    line-height: $font-size-md;
  }
  &--has-list {
    border-bottom: 1px solid $primary-border;
  }
  &__list {
    height: .43rem;
    display: flex;
    justify-content: space-between;
    font-size: $font-size-md;
    color: $dark;
    align-items: center;
    margin-right: .15rem;
  }
  &__list-text {
    flex: 1;
  }
  &__list-check {
    box-sizing: border-box;
    width: .15rem;
    height: .15rem;
    border-radius: 100%;
    position: relative;
  }
  .list-check--normal {
    border-radius: 100%;
    border: 1px solid $information;
  }
  .icon-pay-success {
    position: relative;
    width: .15rem;
    height: .15rem;
    border-radius: 100%;
  }
  .icon-pay-success::before {
    position: absolute;
    width: .15rem;
    height: .15rem;
    color: $primary;
    font-size: .15rem;
  }
  &__list-radio {
    position: absolute;
    opacity: 0;
  }
  &__list-label {
    display: block;
    height: .43rem;
    margin-left: .15rem;
  }
  &__list-label:not(:last-child) {
    border-bottom: 1px solid $primary-border;
  }
}

.pay-method {
  margin-top: .15rem;
  border-top: 1px solid $primary-border;
  border-bottom: 1px solid $primary-border;
  background-color: $white;
  &__title {
    padding: 0 .15rem;
    height: .43rem;
    line-height: .43rem;
    display: flex;
    font-size: $font-size-md;
    align-items: center;
  }
  &__title-text {
    color: $dark;
    height: $font-size-md;
    line-height: $font-size-md;
  }
  &__title-number {
    color: $information;
    text-align: right;
    flex: 1;
    margin-right: .1rem;
    height: $font-size-md;
    line-height: $font-size-md;
  }
  &__title-icon {
    color: $information;
    align-items: center;
    display: flex;
    height: $font-size-md;
    line-height: $font-size-md;
  }
  &--has-list {
    border-bottom: 1px solid $primary-border;
  }
  &__list {
    height: .43rem;
    display: flex;
    justify-content: space-between;
    font-size: $font-size-md;
    color: $dark;
    align-items: center;
    margin-right: .15rem;
  }
  &__list-icon {
    margin-right: .1rem;
    font-size: .18rem;
  }
  .icon-by-alipay {
    color: #00aeff;
  }
  .icon-by-wechat {
    color: #18cf72;
  }
  .icon-by-coin {
    color: #ffa83b;
  }
  .icon-e-bank {
    color: #ff4a4a;
  }
  &__coin-text {
    color: #ff4a4a;
    text-align: center;
    margin-right: .1rem;
  }
  &__list-text {
    flex: 1;
  }
  &__list-check {
    box-sizing: border-box;
    width: .15rem;
    height: .15rem;
    border-radius: 100%;
    position: relative;
  }
  .list-check--normal {
    border-radius: 100%;
    border: 1px solid $information;
  }
  .icon-pay-success {
    position: relative;
    width: .15rem;
    height: .15rem;
    border-radius: 100%;
  }
  .icon-pay-success::before {
    position: absolute;
    width: .15rem;
    height: .15rem;
    color: $primary;
    font-size: .15rem;
  }
  &__list-radio {
    position: absolute;
    opacity: 0;
  }
  &__list-label {
    display: block;
    height: .43rem;
    margin-left: .15rem;
  }
  &__list-label:not(:last-child) {
    border-bottom: 1px solid $primary-border;
  }
}

.service-check {
  margin-top: .1rem;
}

.game {
  box-sizing: border-box; // height: .77rem;
  background-color: $white;
  margin-top: .15rem;
  border-top: 1px solid $primary-border;
  border-bottom: 1px solid $primary-border;
  padding: .1rem .15rem; // display: flex;
  align-items: flex-start;
}

.game-icon {
  width: .43rem;
  height: .43rem;
  border-radius: .05rem;
  margin-right: .1rem;
}

.game-intro {
  // display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.game-name {
  width: 100%;
  height: .15rem;
  line-height: .15rem;
  margin-bottom: .07rem;
  font-size: $font-size-lg;
  color: $dark;
}

.game-type {
  width: 100%;
  margin-bottom: .07rem;
}

.game-type,
.game-cost {
  font-size: $font-size-md;
  color: $information;
  height: .14rem;
  line-height: .14rem;
}

.cost-money {
  color: $primary;
}

.order-id {
  margin: .15rem 0;
  background-color: $white;
  padding: 0 .15rem;
  height: .43rem;
  line-height: .43rem;
  color: $dark;
  border-top: 1px solid $primary-border;
  border-bottom: 1px solid $primary-border;
  font-size: $font-size-md;
}
</style>

<script>
import Vue from 'vue';
import $ from 'jquery';
import AppHeader from '../../../oldComponents/tao-you/layout/header.component';
import AppFooter from '../../../oldComponents/tao-you/layout/footer.component';
import AppNotice from '../../../oldComponents/tao-you/notice/notice.component';
import ServiceCheck from '../../../oldComponents/tao-you/notice/service-check.component';
import AppButton from '../../../oldComponents/tao-you/button/button.component';
import OneSimpleButton from '../../../oldComponents/tao-you/dialog/one-button-simple-dialog.component';
import TwoSimpleButton from '../../../oldComponents/tao-you/dialog/two-buttons-simple-dialog.component';

export default {
  components: {
    AppHeader,
    AppFooter,
    AppNotice,
    ServiceCheck,
    AppButton,
    OneSimpleButton,
    TwoSimpleButton,
  },
  data() {
    return {
      // 支付的时间计算
      totalTime: 0,
      time: {
        m1: 0,
        m2: 0,
        s1: 0,
        s2: 0,
      },
      // 选择的优惠券
      selectedCoupon: null,
      // 选择的支付方式
      selectedPayMethod: null,
      // 支付的配置 payType:1支付宝 4网银 5淘币
      payMethodConf: [
        { name: 'aliPay', info: '支付宝支付', icon: 'icon-by-alipay', color: '#00aeff', payType: 1, show: true },
        { name: 'weChat', info: '微信支付', icon: 'icon-by-wechat', color: '#18cf72', payType: null, show: false },
        { name: 'eBank', info: '网银支付', icon: 'icon-e-bank', color: '#ff4a4a', payType: 4, show: true },
        { name: 'taoBi', info: '淘币支付', icon: 'icon-by-coin', color: '#ffa83b', payType: 5, show: true },
      ],
      // 游戏的信息
      orderInfo: {},
      // 优惠券列表
      couponList: [],
      // 是否显示优惠券列表
      showCouponList: false,
      // 按钮的文字
      btnText: '提交订单',
      // 是否同意服务条款
      checkStatus: true,
      // 是否显示一个按钮弹窗
      oneBtnAlertStatus: false,
      // 弹窗内容
      oneBtnAlertContent: null,
      // 是否显示2个按钮弹窗
      twoBtnAlertStatus: false,
      // 弹窗内容
      twoBtnAlertContent: null,
    };
  },
  computed: {
    leftTimeString() {
      return `支付剩余时间：${this.time.m1}${this.time.m2}:${this.time.s1}${this.time.s2}`;
    },
    couponInfoText() {
      const couponNum = this.couponList.length;
      if (couponNum > 0) {
        return `您有${couponNum}张游戏抵扣券可用`;
      }

      return '暂无可用抵扣券';
    },
    // 是否可以支付
    btnTheme() {
      return this.selectedPayMethod ? 0 : 2;
    },
  },
  methods: {
    computeLeftTime(limitTime) {
      this.totalTime = limitTime;
      this.timer = setInterval(() => {
        if (this.totalTime > 0) {
          this.totalTime--;
          this.time.m1 = +parseInt(this.totalTime / 600);
          this.time.m2 = +parseInt(this.totalTime / 60 % 10);
          this.time.s1 = +parseInt(this.totalTime % 60 / 10);
          this.time.s2 = +parseInt(this.totalTime % 60 % 10);
        } else {
          clearInterval(this.timer);
        }
      }, 1000);
    },
    toggleCouponList() {
      if (this.couponList.length > 0) {
        this.showCouponList = !this.showCouponList;
      } else {
        this.showCouponList = false;
      }
    },
    // 获取订单的信息
    getOrderInfo() {
      const query = {
        orderID: this.$route.query.orderID,
      };
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.tao_game_order_info)
        .then((res) => {
          if (res.code === 10000) {
            this.orderInfo = res.result;
            this.couponList = res.result.ticketList || [];
            this.totalTime = res.result.limitTime;
            this.computeLeftTime(this.totalTime);
          } else {
            // 接口出错
            this.showAlert = true;
            this.alertStatus = res.msg;
          }
        });
    },
    // 进行支付检查,是否同意服务条款
    checkService() {
      if (this.checkStatus) {
        // 进行支付
        if (this.selectedPayMethod === 5) {
          this.taoBiPay();
        } else {
          this.onlinePay();
        }
      } else {
        // 弹框
        this.showOneBtnAlert('请先同意服务条框');
      }
    },
    // 显示弹窗的内容(1)
    showOneBtnAlert(content) {
      this.oneBtnAlertStatus = true;
      this.oneBtnAlertContent = content;
    },
    // 进行线上支付
    onlinePay() {
      const query = {
        orderid: this.$route.query.orderID,
        ticketID: (this.selectedCoupon !== null) ? this.couponList[this.selectedCoupon].ticketID : this.selectedCoupon,
        type: 4,
        payType: this.selectedPayMethod, // 淘游助手支付的标识,
        usetb: 0,
      };
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.tao_game_pay_url)
        .then((res) => {
          if (res.code == 10000) {
            this.btnText = '前去支付...';
            window.location.href = res.result.payurl;
          } else {
            // 处理失败情况
            this.showOneBtnAlert(res.msg);
          }
        });
    },
    // 淘币支付
    taoBiPay() {
      const query = {
        type: 4,
        payType: 5,
        orderID: this.$route.query.orderID,
        ticketID: (this.selectedCoupon !== null) ? this.couponList[this.selectedCoupon].ticketID : this.selectedCoupon,
        usetb: 1,
      };
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.taobipay_method)
        .then((res) => {
          if (res.code == 10000) {
            // 支付成功
            window.location.href = res.url;
            //                window.location.href = "/#/pay/return/" + that.$route.params.tradeNo;
          } else {
            this.showOneBtnAlert(res.msg);
          }
        });
    },


  },
  mounted() {
    // 设置默认背景色
    $('body').css('backgroundColor', '#f5f5f9');
    this.getOrderInfo();
  },
};
</script>
