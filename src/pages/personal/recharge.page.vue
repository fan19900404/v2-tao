<!-- author:yex -->
<template>
    <app-header :title="title"></app-header>
    <section class="bgc-white container text-default">
        <div class="current-coin dr-flex border-bottom">
          <div class="current-coin__text flex-1">我的淘币</div>
          <div class="current-coin__coin flex-1">{{user.taoBi}}</div>
        </div>
        <h2 class="title">请选择充值金额</h2>
        <ul class="flex list">
            <li v-for="item in price" :class="{'active': $index == index}" @click="choose($event, $index, item)">
              <input v-model="amount" :value="item" class="hidden-radio" type="radio">{{ item }}元
            </li>
            <li class="box" @click="choose($event, -1)" :class="{'active': -1 == index}">
                <input class="textbox text-center" v-model="amount_auto" type="tel" placeholder="自定义金额" maxlength="10">
            </li>
        </ul>
        <p  class="charge-info">你将获得<span class="main-color">{{amount_out}}</span>淘币 (1元=1淘币)</p>
        <div class="clearfix coupon border-top">
          <span class="fl">代金券</span>
          <span class="fr" v-show="couponList.length > 0" @click="showCouponDialog(true)">{{{currentCouponText}}}</span>
          <span class="fr" v-else>有<span class="text-red">0</span>张代金券可用</span>
        </div>
        <div class="clearfix rest border-top">
          <span class="fl">需支付</span>
          <span class="fr text-red">{{amount_out - couponPrice < 0 ? 0 : amount_out - couponPrice}}元</span>
        </div>
    </section>
    <app-payment-method choose="aliPay" :method_list="method_list" :type="selectType" :show_tip="show_tip"></app-payment-method>
    <section>
        <a @click="handle" class="btn-recharge">{{buy_btn_text}}</a>
    </section>

    <!-- common alert -->
    <common-alert :type="alertType" :show-alert="showAlert" :alert-msg="alertMsg" :alert-status="alertStatus"></common-alert>

    <!-- 代金券弹窗 -->
  <cash-coupon :show="cashCouponShow"
               :all-item="couponList"
               :title="cashTitle"
               :selected="selected"
               @cash-coupon-btn-action="selectCoupon()"
               :btn-text="cashCouponBtnText">
  </cash-coupon>
</template>

<script>
    'use strict';
    import Vue from 'vue';
    import AppHeader from '../../components/common-layout/header.component';
    import AppPaymentMethod from '../../components/feature/about-money-business/app-payment-method';
    import CommonAlert from '../../components/common-alert/common-alert.component';
    import CashCoupon from '../../components/common-alert/cash-coupon.componnet';

    import { user } from '../../vuex/getters';
    import { getUserInfo } from '../../vuex/actions';

    export default {
      vuex: {
        getters: {
          user: user
        },
        actions: {
          getUserInfo
        }
      },
      components: {
        AppHeader,
        AppPaymentMethod,
        CommonAlert,
        CashCoupon
      },
      data() {
        return {
          title: "充值",
          type: "back,explain",
//          method_list: ['aliPay'],
          method_list: ['aliPay', 'unionPay'],
          show_tip: true, //显示支付方式提示
          amount_auto: '', //自定义金额,默认为0
          amount_out: 20, //默认充值20元,
          result: true,
          amount: 0,

          // 弹出框
          alertType: 0,
          showAlert: false,
          alertMsg: '',
          alertStatus: '',
          // 默认选中支付宝
          selectType: 'aliPay',
          index: 0,
          price: ['20', '50', '100', '300', '500'], // 充值金额
          couponPrice: 0, // 已选择折扣券的总金额,
          // 代金券弹窗
          cashCouponShow: false,
          cashCouponBtnText: '确定',
          selected: 0,
          cashTitle: '可用代金券',
          couponList: [],
          // 充值类型
          cType: 5,
          tradeOrder: null,
          buy_btn_text: '确定充值'
        }
      },
      computed:{
        currentCouponText(){
          if(this.couponPrice > 0){
            return '已选择<span class="text-red">'+this.couponList[this.selected].prize+'</span>元代金券<span class="text-red">1</span>张</span>';
          }
          return '<span>有<span class="text-red">'+this.couponList.length+'</span>张代金券可用</span>';
        }
      },
      mounted() {
        $('body').css('background-color', '#f8f8f8');
        this.$watch('amount_auto', function(newValue) {
          this.amount_out = newValue;
        });

//        // 获取支付的淘币数量 如果有的话就作为支付的默认值
//        if(this.$route.query.money) {
//          this.amount_auto = this.$route.query.money;
//          this.index = -1;
//        }
//        // 充值类型的判断
//        if(this.$route.query.type) {
//          this.cType = this.$route.query.type;
//        }
//        // 充值的订单
//        if(this.$route.query.tradeOrder) {
//          this.tradeOrder = this.$route.query.tradeOrder;
//        }

        this.getUserInfo();
        this.getUserCouponList();
      },
      methods: {

        /* 获取用户可用代金券列表 */
        getUserCouponList(){
          let query = {
          };
          Vue.ClientHttp().GET(query, Vue.ClientUrl.user_coupon_list)
            .then((res) => {
              if (10000 === res.code) {
                this.couponList = res.result;
                return;
              }
            });
        },

        /* 显示隐藏代金券弹框 */
        showCouponDialog(flag){
          this.cashCouponShow = flag;
        },

        /* 用户按下代金券弹窗上的确定按钮，确定使用哪张抵扣券 */
        selectCoupon(){
          this.couponPrice = +this.couponList[this.selected].prize;
        },

        /* 选择充值金额 */
        choose(e, index, value) {
          this.index = index;
          if (index > -1) {
            this.amount_out = value;
            return;
          }
          if (this.amount_auto) {
            this.amount_out = this.amount_auto;
            return;
          }
          this.amount_out = '';
        },

        /* 用户点击确认充值 */
        handle() {
          // 更新按钮文字
          this.buy_btn_text = '获取支付链接...';
          var that = this;
          var reg = /^[1-9]\d*$/;
          this.result = reg.test(this.amount_out);
          // 优惠券的ID
          var couponid;
          var payType;

          if (!this.result) {
            this.showAlert = true;
            this.alertMsg = '消息提示';
            this.alertStatus = '请输入正确的充值金额';
          } else {

            if(this.couponPrice > 0){
              console.log(this.selected);
              // 使用ticketID 表示优惠券的ID
              couponid = this.couponList[this.selected].ticketID;
            }

            // 判断支付的类型
            if('aliPay' === this.selectType) {
              payType = 1;
            }
            else if('unionPay' === this.selectType) {
              payType = 4;
            }

            //生成订单
            var query = {
              money: this.amount_out,
              ticketID: couponid,
              type: this.cType,
              payType: payType,
              tradeOrder: this.tradeOrder
            };
            Vue.ClientHttp().GET(query, Vue.ClientUrl.charge_order)
              .then(function(res) {

                // 这里需要再处理分支(抵扣券金额 > 充值金额 场合)
                if (10000 === res.code) {
                  that.pay(res.result.order);
                } else {
                  that.showAlert = true;
                  that.alertMsg = '消息提示';
                  that.alertStatus = '生成订单失败,请重试';
                }
              });
          }
        },
        pay(orderId) {
          var that = this;
          // TODO 充值
          var query = {
            orderid: orderId
          };
          Vue.ClientHttp().GET(query, Vue.ClientUrl.get_pay_url)
            .then(function(res) {
              if (10000 == res.code) {
                that.buy_btn_text = '前去支付...';
                window.location.href = res.result.payurl;
              } else {
                that.showAlert = true;
                that.alertMsg = '消息提示';
                that.alertStatus = '获取支付链接失败,请重试';
              }
            })
        }
      }
    }
</script>

<style lang="scss" scoped>
    .container{
      .current-coin {
        height: 4.7rem;
        background-color: #fff;
        padding: 0 1.6rem;
        font-size: 1.4rem;

        .current-coin__coin, .current-coin__text {
          height: 4.7rem;
          line-height: 4.7rem;
        }

        .current-coin__coin {
          color: #ff4a4a;
          text-align: right;
        }
      }

      .title {
        font-size: 1.4rem;
        color: #000;
        height: 4rem;
        line-height: 4rem;
        font-weight: 500;
        text-align: left;
        padding-left: 1.6rem;
        background: #f8f8f8;
        border-bottom: 1px solid #dfdfdf;
      }

      /* 选择充值 金额列表 */
      @at-root {
        .list {
          padding: 1.25rem 0 0 0;
          justify-content: space-around;
          flex-wrap: wrap;
          background: #fff;

          > li {
            width: 25%;
            height: 3.4rem;
            font-size: 1.4rem;
            line-height: 3.4rem;
            display: block;
            border: 1px solid #dfdfdf;
            border-radius: .3rem;
            text-align: center;
            background-color: #fff;
            margin-bottom: 1.25rem;
            color: #898989;
            position: relative;

            .hidden-radio {
              position: absolute;
              border: none;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              background-color: transparent;
              opacity: 0;
            }

            .textbox {
              width: 100%;
              height: 100%;
              display: block;
              font-size: 1.4rem;
              outline: none;
              border: 0;
              -webkit-appearance: none;
              -webkit-user-select: auto;
              text-align: center;
            }

            ::-webkit-input-placeholder {
                font-size: 1.2rem;
                text-align: center;
            }
          }

          > li.active {
            color: #ff4a4a;
            border: 1px solid #ff4a4a;
          }
        }
      }

      .charge-info {
        margin-left: 1.6rem;
        padding-bottom: 1.25rem;

        .main-color {
          color: #ff4a4a;
        }
      }

      .coupon, .rest{
        margin: 0 1rem;
        padding: 1.25rem;;
      }

      .text-red{
        color: #ff4a4a;
      }
    }

    .btn-recharge {
        background-color: #ff4a4a;
        border-radius: .5rem;
        color: #fff;
        height: 4.4rem;
        line-height: 4.4rem;
        font-size: 1.8rem;
        text-align: center;
        display: block;
        margin: 3.2rem 1.6rem;
    }
</style>
