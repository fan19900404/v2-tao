<template>
  <div class="GAME-PAGE-CONTAINER">
    <div class="Game-Container">
      <iframe :style="iframeStyle" name="gameContainer" style="width: 100%; height: 100%" @load="updateIframe($event)" v-if="showGameIframe" id="MY_IFRAME_GAME" class="MY_IFRAME_GAME" :src="iframeUrl" frameborder="0"></iframe>
    </div>
    <!-- 支付类别选择弹窗 v-show="showPayMask"-->
    <div v-show="showPayMask" class="Pay-Mask">
      <div class="Pay-Method-Container">
        <!-- 支付的头部 -->
        <div class="Pay-Header">
          支付
          <div class="close-section">
            <span @click="closeMask" class="close"></span>
          </div>
        </div>
        <!-- 商品详情 -->
        <div class="goods-details">
          <p class="goods-list">
            <span class="left-label">游戏名称</span>
            <span class="right-content">{{gamePayInfo.gameName | substr2(8 ,'...')}}</span>
          </p>
          <p class="goods-list">
            <span class="left-label">商品名称</span>
            <span class="right-content">{{gamePayInfo.goodsName | substr2 (8, '...')}}</span>
          </p>
          <p class="goods-list">
            <span class="left-label">支付金额</span>
            <span class="right-content pay-money-from-inner">{{gamePayInfo.payMoney}}元</span>
          </p>
        </div>

        <!-- 支付的一些提醒 -->
        <app-notice :content="leftTimeString"></app-notice>

        <!-- 游戏抵扣券 -->
        <div v-show="showCouponSection" class="game-coupon">
          <div @click.stop.prevent.capture="toggleCouponList" :class="{'game-coupon--has-list': showCouponList}" class="game-coupon__title">
            <span class="game-coupon__title-text">游戏抵扣券</span>
            <div class="game-coupon__title-number" v-html="couponInfoText"></div>
            <span :class="{'icon-arrow-right': !showCouponList, 'icon-arrow-down': showCouponList}" class="game-coupon__title-icon"></span>
          </div>
          <label @click="toggleCoupon(index)" v-show="showCouponList" class="game-coupon__list-label" v-for="(v,index) in couponList" :for="`radio-${index}`" :key="index">
            <div class="game-coupon__list">
              <span class="game-coupon__list-text">{{v.name}}</span>
              <span :class="{'list-check--normal': selectedCoupon !== index, 'icon-pay-success': selectedCoupon === index}" class="game-coupon__list-check">
                <input :true-value="index" :false-value="checkCancelValue" v-model="selectedCoupon" name="select-coupon" :id="`radio-${index}`" class="game-coupon__list-radio" type="checkbox">
              </span>
            </div>
          </label>
        </div>

        <!-- 支付方式 -->
        <div class="pay-method">
          <div :class="{'pay-method--has-list': true}" class="pay-method__title">
            <span class="pay-method__title-text">选择支付方式</span>
            <!--<div class="pay-method__title-text-right">需支付<span>{{gamePayInfo.payMoney}}</span>元</div>-->
            <div class="pay-method__title-text-right">需支付
              <span>{{needPayRealMoney}}</span>元</div>
          </div>
          <template v-for="(v,index) in payMethodConf">
            <label v-if="v.show" class="pay-method__list-label" :for="`pay-radio-${index}`" :key="index">
              <div class="pay-method__list">
                <span :class="v.icon" class="pay-method__list-icon"></span>
                <span class="pay-method__list-text">{{v.info}}</span>
                <span v-if="'taoBi' === v.name" class="pay-method__coin-text">{{needPayRealMoney}}淘币</span>
                <span :class="{'list-check--normal': selectedPayMethod !== v.payType, 'icon-pay-success': selectedPayMethod === v.payType}" class="pay-method__list-check">
                  <input :value="v.payType" v-model="selectedPayMethod" name="select-coupon" :id="`pay-radio-${index}`" class="pay-method__list-radio" type="radio">
                </span>
              </div>
            </label>
          </template>
        </div>

        <!-- 支付按钮 -->
        <div class="pay-btn">
          <!-- 按钮部分 -->
          <button type="button" :disabled="canPay" @click.stop.prevent.capture="choosePayMethod" class="am-button ty-btn">
            {{btnText}}
          </button>
        </div>
      </div>
    </div>

    <!-- 弹窗 -->
    <app-alert :show="oneBtnAlertStatus" :content="oneBtnAlertContent" :btn-text="'确定'" @one-btn-dialog-component="closeOneBtnAlert" :has-slot="false">
    </app-alert>

    <!-- 加载中 -->
    <div v-show="showLoading" :style="loadingStyle" class="loading-container">
      <div class="loading-inner">
        <img class="loading-gif" src="/static/images/loading.gif" alt="">
        <p class="loading-text">请稍等,正在加载中...</p>
      </div>
    </div>

    <!-- 支付的iframe弹窗 -->
    <iframe @load="iframeLoaded" v-show="showPayIframe" style="height: 100%; width: 100%;" :style="payIframeStyle" :src="payIframeUrl" id="PAY_IFRAME" class="PAY_IFRAME" frameborder="0"></iframe>

    <!-- 网银支付的弹窗 -->
    <!-- 取消网银支付的头部 -->
    <div v-show="showUnionHeader" @click.stop.prevent.capture="closeUnion" class="union-header">取消支付</div>
    <div class="union-container" :style="unionIframeStyle" v-show="showUnionHeader">
      <!-- 网银支付的iframe -->
      <iframe @load="iframeLoaded(1)" v-if="showUnionPay" :style="unionIframeStyle" scrolling="yes" style="height: 100%; width: 100%;" :src="unionIframeUrl" id="UNION_IFRAME" class="UNION_IFRAME" frameborder="0"></iframe>
    </div>

    <return-btn v-show="!showPayIframe"></return-btn>

    <wechat-pay-dailog :is-show="showWechatPayDailog" :price="price" :qrcode="qrcode"></wechat-pay-dailog>

    <!-- 添加底部的组件 用于登录注册 -->
    <div class="GAME-DETAIL-footer-container">
      <footer-component :only-login="true" :menu-id="1"></footer-component>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'mint-ui';
import $ from 'jquery';

import AppButton from '../../../oldComponents/tao-you/button/button.component';
import AppNotice from '../../../oldComponents/tao-you/notice/notice.component';
import AppAlert from '../../../oldComponents/tao-you/dialog/one-button-simple-dialog.component';
import AppToast from '../../../oldComponents/tao-you/toast/toast.component';
import ReturnBtn from '../../../oldComponents/tao-you/button/return.component';
import FooterComponent from '../../../oldComponents/tao-you/layout/footer.component';
import { payType } from '../../../config/payment';
import WechatPayDailog from '../../../oldComponents/tao-you/payment/wechat/wechat-pay.component';


export default {
  components: {
    ReturnBtn,
    AppButton,
    AppNotice,
    AppAlert,
    AppToast,
    WechatPayDailog,
    FooterComponent,
  },
  data() {
    return {
      //        iframeUrl: 'http://api.49you.com/api/gameshf/checkLogin/platformid/9/ptgid/235/pf/9g?token=TMGGoSOXPG65iHUt7fWOiQaRYYSfau&r=0.7876879129149721',
      iframeUrl: '/#/tao-you/outer-game-demo',
      showGameIframe: true,
      screenWidth: undefined,
      screenHeight: undefined,
      // 是否显示支付的种类选择弹窗
      showPayMask: false,
      // 关于支付的iframe
      payIframeUrl: null,
      showPayIframe: false,
      // 关于支付
      // 选择的支付方式
      selectedPayMethod: null,
      // 支付的配置 注意位置不要乱修改，与下文有pageShowConf函数有关系
      payMethodConf: [
        { name: 'aliPay', info: '支付宝支付', icon: 'icon-by-alipay', color: '#00aeff', payType: payType.aliPay, show: true },
        { name: 'eBank', info: '网银支付', icon: 'icon-e-bank', color: '#ff4a4a', payType: payType.eBank, show: true },
        { name: 'taoBi', info: '淘币支付', icon: 'icon-by-coin', color: '#ffa83b', payType: payType.taoBi, show: true },
        { name: 'weChat', info: '微信支付', icon: 'icon-by-wechat', color: '#18cf72', payType: payType.weChat, show: false }, // 微信支付（微信环境）
        { name: 'weChatWithQRCode', info: '微信支付', icon: 'icon-by-wechat', color: '#18cf72', payType: payType.weChatWithQRCode, show: false }, // 微信支付（弹出二维码 非微信环境）
        { name: 'haifuWeChat', info: '微信支付', icon: 'icon-by-wechat', color: '#18cf72', payType: payType.haifuWeChat, show: false }, // 微信支付（非pc 非微信环境）
      ],
      // 按钮的文字
      btnText: '开始支付',
      // 支付的信息
      gamePayInfo: {},
      // 选择的优惠券
      selectedCoupon: null,
      // 优惠券列表
      couponList: [],
      // 是否显示优惠券列表
      showCouponList: false,
      // 是否显示一个按钮弹窗
      oneBtnAlertStatus: false,
      // 弹窗内容
      oneBtnAlertContent: null,
      // 是否显示银联支付弹窗
      showUnionPay: false,
      // 银联支付的iframe
      unionIframeUrl: null,
      // 优惠券的id
      //        ticketID: null,
      // 是否显示加载
      showLoading: false,
      // 银联的头部
      showUnionHeader: false,
      // 没有选中的值
      checkCancelValue: null,
      // 设置一个定时器
      gameTimer: null,
      // 支付的信息
      payOrderInfo: {},
      // 是否显示优惠券部分
      showCouponSection: true,

      // 微信支付相关
      isWeixin: window.mallUtils.device.isWeixin,
      showWechatPayDailog: false, // 是否显示微信支付弹出(非微信环境)
      qrcode: '',  // 支付二维码
      payTimer: null,
      price: null,
      alipayIsInstalled: true,
      handle: undefined,
      taobi: 0,
      pd: {},
      tysdk: this.$route.query.tysdk,
    };
  },
  computed: {
    // 实际需要支付的金钱
    needPayRealMoney() {
      if (this.selectedCoupon !== null) {
        const price = this.gamePayInfo.payMoney - (+this.couponList[this.selectedCoupon].prize);
        return price < 0 ? 0 : price;
      }

      return this.gamePayInfo.payMoney;
    },
    iframeStyle() {
      return {
        width: `${this.screenWidth}px`,
        height: `${this.screenHeight}px`,
        maxWidth: '640px',
      };
    },
    unionIframeStyle() {
      return {
        width: `${this.screenWidth}px`,
        height: `${this.screenHeight}px`,
        maxWidth: '640px',
      };
    },
    payIframeStyle() {
      return {
        width: `${this.screenWidth}px`,
        height: `${this.screenHeight}px`,
        maxWidth: '640px',
      };
    },
    loadingStyle() {
      return {
        width: `${this.screenWidth}px`,
        height: `${this.screenHeight}px`,
        maxWidth: '640px',
      };
    },
    leftTimeString() {
      return '人民币￥1=1淘币, 充值的款项无法退回';
    },
    // 是否能够支付
    canPay() {
      return this.selectedPayMethod === null;
    },
    // 优惠券的说明
    couponInfoText() {
      const couponNum = this.couponList.length;
      if ((this.selectedCoupon === null) || (this.checkCancelValue == this.selectedCoupon)) {
        if (couponNum > 0) {
          return `您有<span class="color-red">${couponNum}</span>张抵扣券可用`;
        }

        return '暂无可用抵扣券';
      }

      return `您使用${this.couponList[this.selectedCoupon].name}`;
    },
    // 支付宝相关路径的配置
    alipayConfig() {
      // 线上的地址
      const conf = {};
      if (window.API_USE === 1) {
        // 支付完成
        conf.return_url = 'http://1.lly800.com/static/oldPages/alipay-complete.html';
        // 支付取消
        conf.show_url = 'http://1.lly800.com/static/oldPages/alipay-cancel.html';
      } else if (window.API_USE === 2) { // 测试的地址
        // 支付完成
        conf.return_url = 'http://release-1.lly800.com/static/oldPages/alipay-complete.html';
        // 支付取消
        conf.show_url = 'http://release-1.lly800.com/static/oldPages/alipay-cancel.html';
      } else if (window.API_USE === 4) {
        conf.return_url = 'http://pre.lly800.com/static/oldPages/alipay-complete.html';
        // 支付取消
        conf.show_url = 'http://pre.lly800.com/static/oldPages/alipay-cancel.html';
      } else {
        // 支付完成
        conf.return_url = 'http://1.lly800.com/static/oldPages/alipay-complete.html';
        // 支付取消
        conf.show_url = 'http://1.lly800.com/static/oldPages/alipay-cancel.html';
      }

      // 安卓uc下面，支付完成后，会将我们游戏的ucl篡改掉，导致页面停留在了alipay-complete.html页面，
      // 这里暂时返回游戏的登陆页面
      if (mallUtils.device.isUCBrowser && mallUtils.device.isAndroid) {
        return {
          return_url: `${localStorage.runningURl}/Game/Index/to_game?gid=${this.$route.params.id}`,
          show_url: `${location.host}/static/oldPages/alipay-cancel.html`,
        };
      }
      return conf;
    },
    // 选择的优惠券
    ticketID() {
      return (this.selectedCoupon !== null) ? this.couponList[this.selectedCoupon].ticketID : null;
    },
  },
  methods: {
    // 判断是否需要使用优惠券，以及使用哪几种支付方式
    pageShowConf() {
      const query = {
        id: this.$route.params.id,
      };
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.game_detail)
        .then((res) => {
          if (res.code === 10000) {
            this.payMethodConf[0].show = Boolean(res.result.payinfo.alipay);
            this.payMethodConf[1].show = Boolean(res.result.payinfo.bank);
            this.payMethodConf[2].show = Boolean(res.result.payinfo.taobi);
            this.payMethodConf[3].show = Boolean(res.result.payinfo.wechat && this.isWeixin);
            this.payMethodConf[4].show = Boolean(res.result.payinfo.wechat && !this.isWeixin && !this.mobileCheck());
            this.payMethodConf[5].show = Boolean(res.result.payinfo.wechat && !this.isWeixin && this.mobileCheck());

            // 是否隐藏优惠券
            this.showCouponSection = Boolean(res.result.payinfo.isTicket);
          }
        });
    },
    // 检测是否是手机浏览器
    mobileCheck() {
      let check = false;
      (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; }(navigator.userAgent || navigator.vendor || window.opera));
      return check;
    },
    // 将iframe中的页面返回到上一页
    iframeGoBack() {
      const reg = /^https*:\/\//;
      let count = 0;
      let url = String(this.$route.query.gameUrl);
      if (url.indexOf('http') === 0) {
        while (!reg.test(url)) {
          url = window.decodeURIComponent(url);
          if (count > 3) {
            break;
          }
          count++;
        }
      }
      url += '&nologin=1';
      const win = document.getElementById('MY_IFRAME_GAME').contentWindow;
      console.warn('play-game.page: iframeGoBack game:recharge@goback');
      win.postMessage(
        {
          action: 'game:recharge@goback',
          gameUrl: url,
        },
        '*',
      );
    },
    confirmNeedPay(res) {
      try {
        if (res.result.ispay === 1) {
          // 是否显示一个按钮弹窗
          this.oneBtnAlertStatus = true;
          // 弹窗内容
          this.oneBtnAlertContent = res.result.msg;

          return false;
        }
        return true;
      } catch (e) { console.log(e); }
    },
    updateIframe(e) {
      try {
        $('#MY_IFRAME_GAME').width(document.documentElement.clientWidth);
        $('#MY_IFRAME_GAME').height(document.documentElement.clientHeight);
      } catch (e) {
        console.log(e);
      }
    },
    // 优惠券选择或者取消
    toggleCoupon(index) {
      // TODO
    },
    // 关闭支付宝iframe
    iframeLoaded(flag) {
      console.warn('play-game.page iframeLoaded');
      console.warn(flag);
      this.showLoading = false;

      if (!flag) {
        this.alipayIsInstalled = false;
      }
      if (flag === 1) {
        this.showUnionHeader = true;
      }
    },
    // 关闭银联支付
    closeUnion() {
      this.showUnionPay = false;
      this.showUnionHeader = false;
    },
    // 弹框的操作
    closeOneBtnAlert() {
      // TODO
    },
    // 获取当前用户优惠券的列表
    getUserCouponList() {
      const query = {
        money: this.gamePayInfo.payMoney,
        gameID: this.$route.params.id,
        uID: localStorage.getItem('uID'),
      };
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.iframe_game_ticket)
        .then((res) => {
          if (res.code === 10000) {
            this.couponList = res.list;
          } else {
            // TODO
          }
        });
    },
    // 展示隐藏优惠券
    toggleCouponList() {
      if (this.couponList.length > 0) {
        this.showCouponList = !this.showCouponList;
      } else {
        this.showCouponList = false;
      }
    },
    // 通知游戏方用户支付完成
    notifyIframe() {
      const win = document.getElementById('MY_IFRAME_GAME').contentWindow;
      console.warn('play-game.page: notifyIframe game:recharge@result');
      win.postMessage(
        {
          action: 'game:recharge@result',
          payResult: {

          },
        },
        '*',
      );
    },
    // 关闭支付弹窗
    closeMask() {
      this.showPayMask = false;
      this.iframeGoBack();
    },
    // 处理与iframe的交互
    handleMsgFormIframe(e) {
      // 根据消息的种类来决定不同的行为
      if (e.data.hasOwnProperty('action')) {
        switch (e.data.action) {
          // 弹出支付弹窗
          case 'game:recharge@popup':
            console.warn('play-game.page: game:recharge@popup');
            this.gamePayInfo = e.data.gamePayInfo;
            // 游戏方提供的参数
            this.payOrderInfo.paymoney = this.gamePayInfo.payMoney;
            this.payOrderInfo.gameID = this.$route.params.id;
            this.payOrderInfo.goods_id = this.gamePayInfo.goodsID;
            this.payOrderInfo.goods_name = this.gamePayInfo.goodsName;
            this.payOrderInfo.out_orderid = this.gamePayInfo.orderID;
            this.payOrderInfo.time = this.gamePayInfo.timestamp;
            this.payOrderInfo.sign = this.gamePayInfo.sign;
            this.payOrderInfo.param = this.gamePayInfo.param;
            this.payOrderInfo.ext = JSON.stringify(this.gamePayInfo.ext || {});
            this.getUserCouponList();

            // 根据后台返回,来选择使用使用外部的sdk来支付
            // 若无则弹框选择支付方式（我们自己的支付）
            if (this.tysdk) {
              this.sdkBridge(this.tysdk);
              return;
            }
            this.showPayMask = true;
            break;
          // 需要关闭支付窗口 支付成功
          case 'game:recharge@success':
            console.warn('play-game.page: game:recharge@success');
            this.showPayMask = false;
            this.showPayIframe = false;
            this.showUnionPay = false;
            // 支付成功关闭银联支付头部
            this.showUnionHeader = false;
            // 通知游戏方用户支付完成
            this.notifyIframe();
            break;
          // // 需要关闭支付窗口 支付失败
          case 'game:recharge@cancel':
            console.warn('play-game.page: game:recharge@cancel');
            this.showPayMask = false;
            this.showPayIframe = false;
            this.showUnionPay = false;
            // 支付成功关闭银联支付头部
            this.showUnionHeader = false;
            break;
          // 白鹭引擎返回
          case 'game:recharge@goback':
            // 支付取消或者完成iframe中的页面返回
            console.warn('play-game.page: game:recharge@goback');
            this.iframeGoBack();
            break;
          default:
            console.warn(`play-game.page: default ${e.data.action}`);
            break;
        }
      }
      return false;
    },

    // 用户点击"开始支付"按钮
    choosePayMethod(e) {
      // 解决事件冲突
      if (e.x === 0 && e.y === 0) {
        return false;
      }
      let callback = () => { };
      const paySetting = this.paySetting(this.selectedPayMethod);
      console.log('new:');
      console.log(paySetting);
      switch (this.selectedPayMethod) {
        case 1: // 支付宝支付
          callback = this.aliPay;
          break;
        case 4: // 网银支付
          callback = this.unionPay;
          break;
        case 5: // 淘币支付
          if (this.taobi < +this.needPayRealMoney) {
            this.showPayMask = false;
            this.oneBtnAlertContent = '淘币不足';
            this.oneBtnAlertStatus = true;
            return;
          }
          callback = this.taoBiPay;
          break;
        case 6: // 微信支付
        case 7: // 微信支付
        case 8: // 微信支付
          callback = this.wechatPay;
          break;
        default:
          break;
      }

      // 显示Loading，开始创建订单
      this.showLoading = true;
      this.doPay(paySetting, callback);
    },

    // 支付相关设定
    paySetting(type) {
      let paySetting = {};
      switch (type) {

        // 支付宝支付
        case 1:
          paySetting = {
            type: 4, // 游戏道具
            payType: 1, // 支付宝支付,
            usetb: 0, // 是否使用淘币
            ticketID: this.ticketID,
            uID: localStorage.getItem('uID'),
            return_url: `${location.origin}/static/oldPages/alipay-complete.html`, // 支付完成
            show_url: `${location.origin}/static/oldPages/alipay-cancel.html`, // 支付取消
          };
          // 安卓uc下面，支付完成后，会将我们游戏的ucl篡改掉，导致页面停留在了alipay-complete.html页面，
          // 这里暂时返回游戏的登陆页面
          if (mallUtils.device.isUCBrowser && mallUtils.device.isAndroid) {
            paySetting.return_url = `${localStorage.runningURl}/Game/Index/to_game?gid=${this.$route.params.id}`;
          }
          break;

        // 微信支付
        case 6:
        case 7:
        case 8:
          paySetting = {
            type: 4, // 游戏道具
            payType: this.selectedPayMethod, // 微信支付,
            usetb: 0, // 是否使用淘币
            ticketID: this.ticketID,
            goBackAction: encodeURIComponent(`window.location.href = '${localStorage.runningURl}/Game/Api/front_url/type/3` + '\''),
            uID: localStorage.getItem('uID'),
            return_url: `${localStorage.runningURl}/Game/Api/front_url/type/1/gameID/${this.$route.params.id}/and/1/redirect/1/from/wechatpay/nologin/1`,
            show_url: `${location.origin}/static/oldPages/alipay-cancel.html`, // 支付取消
          };
          break;

        // 网银支付
        case 4:
          paySetting = {
            type: 4, // 游戏道具
            payType: 4, // 支付宝支付,
            usetb: 0, // 是否使用淘币
            ticketID: this.ticketID,
            uID: localStorage.getItem('uID'),
            return_url: `${localStorage.runningURl}/Game/Index/nginx_pay_fonturl`, // 支付完成
            show_url: `${localStorage.runningURl}/Game/Index/nginx_pay_fonturl`, // 支付取消
          };
          break;

        // 淘币支付
        case 5:
          paySetting = {
            type: 4, // 游戏道具
            payType: 5, // 淘币支付,
            usetb: 1, // 是否使用淘币,
            ticketID: this.ticketID,
            uID: localStorage.getItem('uID'),
          };
          break;
        default:
          break;
      }
      return Object.assign({}, paySetting, this.payOrderInfo);
    },

    // 支付处理
    doPay(query, callback) {
      Vue.ClientHttp(this).POST(query, Vue.ClientUrl.alipay_iframe_url)
        .then((res) => {
          if (typeof callback === 'function') {
            if (res.code !== 10000) {
              this.showLoading = false;
              Toast(res.msg || '支付失败');
              setTimeout(() => {
                this.closeCurPage();
              }, 2000);
              return;
            }
            if (!this.confirmNeedPay(res)) {
              this.showLoading = false;
              console.warn('play-game.page: 不需要支付');
              // this.notifyThird();
              this.oneBtnAlertStatus = true;
              this.oneBtnAlertContent = res.result.msg || '支付成功';
              return;
            }
            callback.apply(this, [res]);
          }
        });
    },

    // 网银支付
    unionPay(res) {
      this.showPayMask = false;
      this.unionIframeUrl = res.result.payurl;
      this.showUnionPay = true;
    },

    // 淘币支付
    taoBiPay(res) {
      this.showLoading = false;
      this.oneBtnAlertContent = res.result.msg;
      this.oneBtnAlertStatus = true;
      this.notifyIframe();
    },

    // 支付宝支付
    aliPay(res) {
      console.warn('play-game.page: aliPay callback');
      console.warn(`play-game.page: payurl:${res.result.payurl}`);
      this.payIframeUrl = res.result.payurl;
      this.showPayMask = false;

      // 本来是应该在iframe加载完成后隐藏的，不过安卓下uc会检查本机是否有装支付宝app，
      // 有的话不会去加载iframe，
      // 直接隐藏iframe，否则，会出现空的iframe遮在游戏上面，导致点不了
      if (mallUtils.device.isUCBrowser && mallUtils.device.isAndroid) {
        console.log('play--game.page: hide loading');
        setTimeout(() => {
          this.showLoading = false;
        }, 2000);
        this.handle = this.$watch('alipayIsInstalled', (value) => {
          if (!value) {
            this.showPayIframe = true;
            if (this.handle) {
              this.handle();
            }
          }
        });
      } else {
        this.showPayIframe = true;
      }
    },

    // 微信支付
    wechatPay(res) {
      console.warn('play-game.page: wechatPay callback');
      if (this.selectedPayMethod === payType.weChatWithQRCode) {
        this.showPayMask = false;
        const orderId = res.result.order;
        this.showLoading = false;
        this.price = Number(this.needPayRealMoney);
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
      this.showLoading = false;
      if (this.selectedPayMethod === payType.haifuWeChat) {
        this.showPayMask = false;
      }
      location.href = res.result.payurl;
    },

    //
    sdkBridge(type) {
      switch (type) {
        case 'soeasy':
          this.soeasy();
          break;
        default:
          break;
      }
    },

    // 易接sdk 支付
    soeasy() {
      const query = Object.assign({}, this.payOrderInfo);
      const that = this;
      Vue.ClientHttp(this).POST(query, Vue.ClientUrl.create_order)
        .then((res) => {
          if (res.code === 10000) {
            const payinfojson = Object.assign({}, res.result);
            ZmSdk.getInstance().pay(payinfojson, (data) => {
              if (data.retcode == 0) {

              } else if (data.retcode == 2) {
                console.log(that.pd.alias == 'egret');
                if (that.pd.alias == 'egret') {
                  that.iframeGoBack();
                }
              }
            });
          }
        });
    },

    // 保持与后台的联系
    connectWithBackend() {
      this.gameTimer = setInterval(() => {
        const query = {
          uID: localStorage.getItem('uID'),
        };
        Vue.ClientHttp().GET(query, Vue.ClientUrl.get_user_info);
      }, 1000 * 60 * 60);
    },
    getOrderStatus(orderID) {
      const url = Vue.ClientUrl.get_order_status;
      Vue.ClientHttp().GET({ nologin: 1, orderID }, url)
        .then((res) => {
          if (res.code === 10000) {
            if (res.result.status == '1') {
              this.showWechatPayDailog = false;
              this.clearPayTimer();

              // this.showAlert = true;
              // this.alertMsg = '支付成功';
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
    // 页面展示相关信息的配置
    this.pageShowConf();
    // 获取屏幕的宽高
    this.screenWidth = document.documentElement.clientWidth || window.innerWidth;
    this.screenHeight = document.documentElement.clientHeight || window.innerHeight;

    //      this.getUserCouponList();
    const reg = /^https*:\/\//;
    let count = 0;
    let url = String(this.$route.query.gameUrl);
    if (url.indexOf('http') === 0) {
      while (!reg.test(url)) {
        url = window.decodeURIComponent(url);
        if (count > 3) {
          break;
        }
        count++;
      }
    }
    url += '&nologin=1';
    this.iframeUrl = url;
    //      this.iframeUrl = 'http://192.168.11.170:3000/#/tao-you/outer-game-demo';
    //      this.iframeUrl = 'http://d.dev.d.hgame.com/hdpt/tuomei/appid/100285/gameid/100005?uid=156&gameID=100043&isadult=-1&time=1484029947&sign=048a5c32c79ecbdb1f503a6fad96766a	';
    this.selectedPayMethod = 1;
    // 标签名字
    document.title = this.$route.query.gameName;
    // 未登录 进入游戏详情页
    // 处理用户的再次登陆的问题
    const query = {
      uID: localStorage.getItem('uID'),
    };
    Vue.ClientHttp(this).GET(query, Vue.ClientUrl.get_user_info)
      .then((res) => {
        this.taobi = +res.result.taoBi;
        //          if(20000 == res.code) {
        //          this.showGameIframe = false;
        //          this.$router.push({
        //            name: 'GameIntro',
        //            params: {
        //              id: this.$route.params.id
        //            }
        //          })
        //        }
      });

    // 微信分享
    const gameQuery = {
      id: this.$route.params.id,
      uID: localStorage.getItem('uID'),
    };
    Vue.ClientHttp(this).GET(gameQuery, Vue.ClientUrl.game_detail)
      .then((res) => {
        if (res.code === 10000) {
          const pd = res.result;
          this.pd = pd;
          console.log(this.pd);
          wx.ready(() => {
            // 分享的文案
            const mID = this.$route.query.mID || window.mID || 8;
            let apiType;
            if (window.API_USE === 1) {
              apiType = 'http://interface.lly800.com';
            } else {
              apiType = 'http://pre-interface.lly800.com';
            }
            const share_link = `${apiType}/Api/Weixin/index?gid=${this.$route.params.id}&mID=${mID}`;
            const shareInfo = {
              title: pd.gameName, // 分享标题
              link: share_link, // 分享链接
              desc: pd.abstract,
              imgUrl: pd.gameIcon, // 分享图标
            };
            // 分享到朋友圈
            wx.onMenuShareTimeline(shareInfo);
            // 分享给朋友
            wx.onMenuShareAppMessage(shareInfo);

            const otherShareInfo = {
              title: this.pd.gameName, // 分享标题
              link: window.location.href, // 分享链接
              desc: this.pd.abstract,
              imgUrl: this.pd.gameIcon, // 分享图标
            };

            wx.onMenuShareQQ(otherShareInfo);
            wx.onMenuShareWeibo(otherShareInfo);
            wx.onMenuShareQZone(otherShareInfo);
          });
        }
      });
  },
  mounted() {
    // 处理适配
    // 如果是横屏游戏做一下兼容处理
    try {
      if ((+this.$route.query.d === 2) && !this.mobileCheck()) {
        $('#MY_IFRAME_GAME').css({ maxHeight: 360 });
      }
    } catch (e) {
      console.log(e);
    }
    // 处理与iframe之间的消息往来
    if (window.addEventListener) {
      console.warn('play-game.page:handleMsgFormIframe-1');
      window.addEventListener('message', this.handleMsgFormIframe, false);
    } else {
      console.warn('play-game.page:handleMsgFormIframe-2');
      window.attachEvent('onmessage', this.handleMsgFormIframe);
    }
    //
    setTimeout(() => {
      this.notifyIframe();
    }, 3000);
    // 与后端持续的交互
    this.connectWithBackend();

    const _this = this;
    // 屏幕旋转
    window.onresize = function () {
      _this.screenWidth = document.documentElement.clientWidth || window.innerWidth;
      _this.screenHeight = document.documentElement.clientHeight || window.innerHeight;
    };

    this.$on('pay-cancel', () => {
      this.clearPayTimer();
    });
  },
  destroyed() {
    clearInterval(this.gameTimer);
    this.clearPayTimer();
    if (window.addEventListener) {
      window.removeEventListener('message', this.handleMsgFormIframe, false);
    } else {
      window.detachEvent('onmessage', this.handleMsgFormIframe);
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/tao-you/common.scss';

.GAME-PAGE-CONTAINER {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.Game-Container {
  width: 100%;
  height: 100%;
  position: relative;
}

.MY_IFRAME_GAME {
  display: block;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.Pay-Mask {
  z-index: 100;
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 640px;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, .5);
}

.Pay-Method-Container {
  margin: 0 .15rem;
  flex: 1;
  background-color: #f8f8f8;
  border-radius: .05rem;
  max-height: 100%;
  overflow: auto;
}

.loading-container {
  position: fixed;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}

.loading-inner {
  color: #fff;
  display: flex;
  align-items: center;
}

.loading-gif {
  width: .2rem;
  height: .2rem;
}

.loading-text {
  text-indent: .1rem;
}

.union-container {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1000;
  -webkit-overflow-scrolling: touch !important;
  overflow-y: scroll;
  background-color: #ffffff;
}

.union-header {
  text-align: center;
  background-color: #000;
  color: #fff;
  line-height: 35px;
  height: 35px;
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 640px;
  z-index: 2000;
}

.UNION_IFRAME {
  margin-top: 35px;
  width: 100%;
  min-height: 100%;
  -webkit-overflow-scrolling: touch !important;
  overflow: scroll;
}

.PAY_IFRAME {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 66;
}

.need-pay-money {
  font-size: $font-size-md !important;
}

.pay-method {
  margin-top: .1rem;
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
    flex: 1;
    color: $dark;
    height: $font-size-md;
    line-height: $font-size-md;
  }
  &__title-text-right {
    flex: 1;
    color: $dark;
    height: $font-size-md;
    line-height: $font-size-md;
    text-align: right;
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
    width: 100%;
    height: 100%;
    right: 9999px;
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

.pay-btn {
  padding: .1rem .15rem;
  background-color: #f8f8f8;
  box-sizing: border-box;
  border-bottom-left-radius: .05rem;
  border-bottom-right-radius: .05rem;
}

.Pay-Header {
  position: relative;
  font-size: .18rem;
  height: .43rem;
  line-height: .43rem;
  text-align: center;
  .close-section {
    width: .15rem;
    height: .43rem;
    position: absolute;
    top: 0;
    right: .15rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .close {
      width: .15rem;
      height: .15rem;
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAANlBMVEVMaXGIiIiJiYmJiYn///+IiIiIiIiRkZGJiYmJiYmIiIiZmZmIiIiIiIiLi4uJiYmIiIiIiIif033nAAAAEXRSTlMA3vWjAZv1FdRBcAq0vhZmK7msGmgAAABkSURBVHgB7dE3AsMgFATRJSsi/fsf1nHb6Vya9pFH9zkEYz12nbEM0B6bxvJy0FZlJ7Wj2lHtqHZUO6od1Y5qR7VbwVNGfXmKKKhac/h+0Kj4/lTwB33/fXVgwbnEpX17KfilJ66vCbNL31qqAAAAAElFTkSuQmCC") 50% no-repeat;
    }
  }
}

.goods-details {
  background-color: #fff;
  margin-bottom: .1rem;
  text-align: center;
  font-size: .16rem;
  padding: .05rem 0;
}

.goods-list {
  height: .25rem;
  line-height: .25rem;
  display: flex;

  .left-label {
    flex: 1;
    color: #666;
    text-align: right;
    padding-right: .05rem;
  }
  .right-content {
    flex: 1;
    color: #333;
    text-align: left;
    padding-left: .05rem;
  }
}

.primary {
  border: 0;
  color: $white;
  background-color: $primary;
}

.ty-btn {
  font-size: $font-size-xl;
  background-color: #00c1b3;
}

.game-coupon {
  margin-top: .1rem;
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
    .red {
      color: #ff4a4a;
    }
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

.pay-money-from-inner {
  color: #ff4a4a !important;
}
</style>
