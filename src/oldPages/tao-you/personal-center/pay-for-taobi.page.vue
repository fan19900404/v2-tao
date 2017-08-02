<template>
  <div>
    <!-- 头部 -->
    <app-header :title="'充值'"></app-header>

    <!-- 支付的剩余时间 -->
    <app-notice :content="leftTimeString"></app-notice>

    <!-- 充值金额 -->
    <div class="am-list">
      <div class="am-list-body">
        <div class="am-list-item">
          <div class="recharge-title am-list-content">选择充值金额(元)</div>
        </div>
      </div>
    </div>
    <!--选择充值金额-->
    <div class="outer">
      <div class="pay am-wingblank wb15px">
        <div class="pay-inner am-wingblank wb15px">
          <ul class="list-ul">
            <li @click="selectMoney(index)" :class="{active: index === userSelectIndex}" class="list-li user-select" v-for="(item,index) in moneylist" :key="index">{{item}}元</li>
            <li @click="clearSelectMoney" :class="{active: userInputMoney}" class="list-li list-list user-input-select">
              <input  @keyup="digitalInput" v-model="userInputMoney" class="user-input" type="text" placeholder="自定义金额">
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 订单号 -->
    <div class="am-list info">
      <div class="am-list-body">
        <div class="am-list-item oneline">
          <div class="am-list-content need-pay-money">需支付</div>
          <div class="am-list-extr am-ft-red need-pay-money">{{needPayMoney}}元</div>
        </div>
      </div>
    </div>

    <!-- 支付方式 -->
    <div class="pay-method">
      <div :class="{'pay-method--has-list': true}" class="pay-method__title">
        <span class="pay-method__title-text">选择支付方式</span>
      </div>
      <template v-for="(v,i) in payMethodConf">
        <label v-if="v.show" class="pay-method__list-label" :for="`pay-radio-${i}`" :key="i">
          <div class="pay-method__list">
            <span :class="v.icon" class="pay-method__list-icon"></span>
            <span class="pay-method__list-text">{{v.info}}</span>
            <span v-if="'taoBi' === v.name" class="pay-method__coin-text">{{orderInfo.gameInitMoney | moneyWidthComma}}淘币</span>
            <span :class="{'list-check--normal': selectedPayMethod !== v.payType, 'icon-pay-success': selectedPayMethod === v.payType}" class="pay-method__list-check">
              <input :value="v.payType" v-model="selectedPayMethod" name="select-coupon" :id="`pay-radio-${i}`" class="pay-method__list-radio" type="radio">
            </span>
          </div>
        </label>
      </template>
    </div>

    <!-- 服务条款 -->
    <div class="service-check">
      <service-check :status="serviceStatus"></service-check>
    </div>

    <!-- 支付按钮 -->
    <div class="pay-btn">
      <app-button @button-component="startPay" :btn-theme="btnTheme" :btn-text="btnText"></app-button>
    </div>

    <!-- 底部菜单 -->
    <!--<app-footer :menu-id="-1"></app-footer>-->

    <!-- 弹窗 -->
    <one-simple-button :show="showAlert" :content="alertMsg" :btn-text="'确定'" :has-slot="false">
    </one-simple-button>

    <!-- 添加底部的组件 -->
    <div class="GAME-DETAIL-footer-container">
      <footer-component :copy-right="false" :only-login="true" :menu-id="1"></footer-component>
    </div>

    <wechat-pay-dailog :is-show="showWechatPayDailog" :price="needPayMoney" :qrcode="qrcode"></wechat-pay-dailog>

    <!-- 返回的按钮 -->
    <return-btn :back-link="backLink"></return-btn>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../assets/tao-you/common.scss';

.need-pay-money {
  font-size: $font-size-md !important;
}

.recharge-title {
  font-size: $font-size-lg;
  color: #010101;
}

.user-input-select {
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-select {
  color: $words;
  font-size: $font-size-md;
}

.user-input {
  font-size: $font-size-md;
  color: $words;
}

.user-input::-webkit-input-placeholder {
  font-size: $font-size-md;
  color: #cccccc;
}

.active {
  color: $primary;
  border: 1px solid $primary;
  input {
    color: $primary;
  }
}

.pay-btn {
  margin: .2rem .15rem 0 .15rem;
  padding-bottom: .3rem;
}

.game-coupon {
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
    width: 100%;
    height: 100%;
    right: 9999px;
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
    color: #ff8309;
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
    overflow: hidden;
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
  box-sizing: border-box;
  height: .77rem;
  background-color: $white;
  margin-top: .15rem;
  border-top: 1px solid $primary-border;
  border-bottom: 1px solid $primary-border;
  padding: .1rem .15rem;
  display: flex;
}

.game-icon {
  width: .43rem;
  height: .43rem;
  border-radius: .05rem;
  margin-right: .1rem;
}

.game-intro {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.game-name {
  height: .15rem;
  line-height: .15rem;
  font-size: $font-size-lg;
  color: $dark;
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

.am-list-item {
  border-top: 1px solid $primary-border;
}

.am-list {
  padding: .1rem 0 0;
  border-bottom: 1px solid $primary-border;
}

.outer {
  background-color: $white;
  border-bottom: 1px solid $primary-border;
}

.pay {
  margin-right: 0;
  /*border-bottom: 1px solid $primary-border;*/
  .pay-inner {
    height: 100%;
    margin-left: 0;
  }
}

.list-ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  flex-flow: wrap;
}

.list-ul li:nth-child(1),
.list-ul li:nth-child(2),
.list-ul li:nth-child(3) {
  margin-bottom: 0;
}

.list-li {
  width: .9rem;
  height: .4rem;
  border: 1px solid $primary-border;
  line-height: .4rem;
  text-align: center;
  border-radius: .06rem;
  float: left;
  margin: .15rem 0;
  input {
    border: none!important;
    width: .9rem;
    /*height: .4rem;*/
    /*border:  1px solid $primary-border;*/
    /*line-height: .4rem;*/
    text-align: center;
    border-radius: .06rem;
  }
}

.list-list {
  background-image: none!important;
}

.active {
  color: $primary;
  border: 1px solid $primary;
  background-image: url(/static/images/tao-you/personal-center/checked.png);
  background-size: 100% 100%;
}

.myinput::-webkit-input-placeholder {
  font-size: .14rem;
}









/*
  充值新样式  暂未使用  将来某个版本可能会是用
  */

.price_msg {
  margin: 0;
  display: block;
  color: #FFFFFF;
  background: #ff4a4a;
  font-size: 8px;
  line-height: 2;
  width: 110px;
  text-indent: 6px;
  -webkit-text-size-adjust: none;
  background: linear-gradient(-45deg, transparent 16px, #ff4a4a 0);
}

.am-list-body {
  background-color: #ffffff;
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
import FooterComponent from '../../../oldComponents/tao-you/layout/footer.component.vue';
import ReturnBtn from '../../../oldComponents/tao-you/button/return.component.vue';
import { payType } from '../../../config/payment';
import WechatPayDailog from '../../../oldComponents/tao-you/payment/wechat/wechat-pay.component';

export default {
  components: {
    AppHeader,
    AppFooter,
    AppNotice,
    ServiceCheck,
    AppButton,
    OneSimpleButton,
    FooterComponent,
    ReturnBtn,
    WechatPayDailog,
  },
  data() {
    return {
      // 支付的时间计算
      totalTime: 0,
      time: {
        m1: 1,
        m2: 0,
        s1: 0,
        s2: 0,
      },
      // 充值金额列表
      moneylist: [20, 50, 100, 300, 500],
      // 充值的金额
      money: null,
      // 选择的优惠券
      selectedCoupon: null,
      // 选择的支付方式
      selectedPayMethod: null,
      // 支付的配置
      payMethodConf: [
        { name: 'aliPay', info: '支付宝支付', icon: 'icon-by-alipay', color: '#00aeff', payType: payType.aliPay, show: true },
        { name: 'eBank', info: '网银支付', icon: 'icon-e-bank', color: '#ff4a4a', payType: payType.eBank, show: true },
        { name: 'weChat', info: '微信支付', icon: 'icon-by-wechat', color: '#18cf72', payType: payType.weChat, show: false }, // 微信支付（微信环境）
        { name: 'weChatWithQRCode', info: '微信支付', icon: 'icon-by-wechat', color: '#18cf72', payType: payType.weChatWithQRCode, show: false }, // 微信支付（弹出二维码 非微信环境）
        { name: 'haifuWeChat', info: '微信支付', icon: 'icon-by-wechat', color: '#18cf72', payType: payType.haifuWeChat, show: false }, // 微信支付（非pc 非微信环境）
      ],
      // 优惠券列表
      couponList: [],
      // 是否显示优惠券列表
      showCouponList: false,
      // 按钮的文字
      btnText: '提交订单',
      // 用户的选择充值的index
      userSelectIndex: null,
      // 用户的输入金额
      userInputMoney: null,
      // 弹窗
      showAlert: false,
      alertMsg: null,
      // 是否同意服务条款
      serviceStatus: true,
      // 返回链接
      backLink: {
        name: 'TaoYouPersonalCenter',
      },

      // 微信支付相关
      isWeixin: window.mallUtils.device.isWeixin,
      showWechatPayDailog: false, // 是否显示微信支付弹出(非微信环境)
      qrcode: '',  // 支付二维码
      payTimer: null,
    };
  },
  computed: {
    // 需要支付的金额
    needPayMoney() {
      let benefitMoney;
      if (this.selectedCoupon !== null) {
        benefitMoney = +this.couponList[this.selectedCoupon].prize;
      } else {
        benefitMoney = 0;
      }
      return (this.finalMoney > benefitMoney) ? (this.finalMoney - benefitMoney) : this.finalMoney;
    },
    // 最终支付的金额
    finalMoney() {
      return this.userInputMoney ? this.userInputMoney : this.moneylist[this.userSelectIndex];
    },
    couponInfoText() {
      let couponNum = this.couponList.length;
      if (couponNum > 0) {
        if (this.selectedCoupon !== null) {
          return `您使用了${this.couponList[this.selectedCoupon].name}`;
        }

        return `您有<span style="color:#ff4a4a">${couponNum}</span>张游戏抵扣券可用`;

      }
      else {
        return '暂无可用抵扣券';
      }
    },
    // 是否可以支付
    btnTheme() {
      return (this.selectedPayMethod && this.finalMoney) ? 0 : 2;
    },
    leftTimeString() {
      return '人民币￥1=1淘币, 充值的款项无法退回';
    },
  },
  methods: {
    // 支付方式的配置
    pageShowConf() {
      const query = {};
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.charge_pay_type)
        .then((res) => {
          if (res.code === 10000) {
            this.payMethodConf[0].show = Boolean(res.result.payinfo.alipay);
            this.payMethodConf[1].show = Boolean(res.result.payinfo.bank);
            this.payMethodConf[2].show = Boolean(res.result.payinfo.wechat && this.isWeixin);
            this.payMethodConf[3].show = Boolean(res.result.payinfo.wechat && !this.isWeixin && !this.mobileCheck());
            this.payMethodConf[4].show = Boolean(res.result.payinfo.wechat && !this.isWeixin && this.mobileCheck());
          } else {
            // TODO
          }
        });
    },
    // 检测是否是手机浏览器
    mobileCheck() {
      let check = false;
      (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; }(navigator.userAgent || navigator.vendor || window.opera));
      return check;
    },
    closeCouponList() {
      this.showCouponList = false;
    },
    // 获取用户的优惠券列表
    /* 获取用户可用代金券列表 */
    getUserCouponList() {
      const query = {};
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.can_use_ticket)
        .then((res) => {
          if (res.code === 10000) {
            this.couponList = res.result || [];
          }
        });
    },
    // 开始支付
    startPay() {
      if (this.serviceStatus) {
        this.generateOrderID();
      } else {
        this.showAlert = true;
        this.alertMsg = '请先同意服务条款';
      }
    },
    // 生成订单
    generateOrderID() {
      this.btnText = '生成订单中...';
      // payType:1支付宝 4网银 5淘币
      // 商品类别type:1一元购充值淘币 2期号 3礼包 4游戏道具购买 5淘游充值淘币
      const query = {
        money: this.finalMoney,
        ticketID: this.selectedCoupon !== null ? this.couponList[this.selectedCoupon].id : null,
        type: 5,
        payType: this.selectedPayMethod,
        t: new Date().getTime(),
      };
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.charge_order)
        .then((res) => {
          if (res.code === 10000) {
            this.pay(res.result.order);
          } else {
            this.showAlert = true;
            this.alertMsg = res.msg;
          }
        });
    },
    // 前往支付
    pay(orderId) {
      this.btnText = '支付进行中...';
      let query = {
        orderid: orderId,
        show_url: `${window.location.origin}/#/tao-you/personal-center/pay-for-taobi`,
        return_url: `${window.location.origin}/#/tao-you/pay/return/${orderId}`,
      };
      const return_url = `${window.location.origin}/#/tao-you/pay/return/${orderId}`;
      if (window.API_USE === 1) {
        query.return_url = `http://interface.lly800.com/Order/Index/tourl?url=${return_url}`;
      } else {
        query.return_url = `http://pre-interface.lly800.com/Order/Index/tourl?url=${return_url}`;
      }
      // 微信支付的特殊处理
      if (payType.weChat === this.selectedPayMethod || payType.haifuWeChat === this.selectedPayMethod) {
        let backUrl = '';
        let return_url = '';
        if (window.API_USE === 1) {
          backUrl = 'http://1.lly800.com/#/tao-you/personal-center/pay-for-taobi';
          return_url = `http://interface.lly800.com/Game/Api/front_url/type/2/orderID/${orderId}`;
        } else {
          backUrl = 'http://pre.lly800.com/#/tao-you/personal-center/pay-for-taobi';
          return_url = `http://pre-interface.lly800.com/Game/Api/front_url/type/2/orderID/${orderId}`;
        }
        query = {
          orderid: orderId,
          goBackAction: encodeURIComponent(`window.location.href = '${backUrl}'`),
          return_url,
        };
      }
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.get_pay_url)
        .then((res) => {
          this.btnText = '提交订单';
          if (res.code == 10000) {
            if (this.selectedPayMethod === payType.weChatWithQRCode) {
              this.qrcode = res.result.payurl;
              this.showWechatPayDailog = true;
              if (this.payTimer) {
                return;
              }
              this.payTimer = setInterval(() => {
                this.getOrderStatus(orderId);
              }, 3000);
              return;
            }
            window.location.href = res.result.payurl;
          } else {
            this.showAlert = true;
            this.alertMsg = res.msg;
          }
        });
    },
    // 只允许输入数字
    digitalInput(e) {
      this.userInputMoney = e.target.value.replace(/\D/g, '').replace(/^0/, '');
    },
    // 清楚选择的充值
    clearSelectMoney() {
      this.userSelectIndex = null;
      this.userInputMoney = null;
    },
    // 选择支付money的数量
    selectMoney(index) {
      this.userSelectIndex = index;
      this.userInputMoney = null;
    },
    // 计算剩余时间
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
    getOrderStatus(orderID) {
      const url = Vue.ClientUrl.get_order_status;
      Vue.ClientHttp().GET({ nologin: 1, orderID }, url)
        .then((res) => {
          if (res.code === 10000) {
            if (res.result.status == '1') {
              this.showWechatPayDailog = false;
              this.clearPayTimer();

              this.showAlert = true;
              this.alertMsg = '支付成功';
            }
          }
        });
    },
    clearPayTimer() {
      clearInterval(this.payTimer);
      this.payTimer = null;
    },
  },
  mounted() {
    // 获取支付方式
    this.pageShowConf();
    // 设置默认背景色
    $('body').css('backgroundColor', '#f5f5f9');
    // 获取优惠券列表
    this.getUserCouponList();
    this.showCouponList = false;
    //      this.selectedCoupon = 0;
    this.selectedPayMethod = 1;
    this.userSelectIndex = 0;

    this.$on('pay-cancel', () => {
      this.clearPayTimer();
    });
  },
  destroyed() {
    this.clearPayTimer();
  },
};
</script>
