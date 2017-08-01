<style scoped>
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

    .list {
        padding: 1.25rem 0 0 0;
        justify-content: space-around;
        flex-wrap: wrap;
        background: #fff;
    }

    .list > li {
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
    }

    .list > li.active, .list > li:active {
        color: #ff4a4a;
        border: 1px solid #ff4a4a;
    }

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

    ::-webkit-input-placeholder {
        font-size: 1.2rem;
        text-align: center;
    }

    .textbox {
        width: 100%;
        height: 100%;
        display: block;
        font-size: 1.4rem;
        outline: none;
        border: 0;
        text-indent: .5rem;
        -webkit-appearance: none;
        -webkit-user-select: auto;
        text-align: center;
    }

    /* 支付方式 */

    .s-icon {
        width: 2.4rem;
        height: 2.4rem;
        margin-right: 1rem;
        background-size: cover;

    }

    .s-icon-pay {
        background-image: url(/static/images/i-pay.png);
    }

    .s-icon-bank {
        background-image: url(/static/images/i-bank.png);
    }

    .type {
        padding: 0 1rem;
        border-bottom: 1px solid #d8d8d8;
        border-top: 1px solid #d8d8d8;
    }

    .type > li {
        height: 3.6rem;
        line-height: 3.6rem;

        border-bottom: 1px solid #d8d8d8;
    }

    .type > li:last-child {
        border: none;
    }

    .radio {
        width: 1.5rem;
        height: 1.5rem;
        line-height: 1.5rem;
        text-align: center;
        border-radius: 100%;
        border: 1px solid #d8d8d8;;
    }

    /*.active {*/
    /*background: #40bb0a;*/
    /*border-color: #40bb0a;*/
    /*}*/
    /*.active:before{*/
    /*content: "\e5ca";*/
    /*}*/

    .confirm {
        padding: 1rem;
    }

    .confirm .link {
        color: #aaa;
        font-size: 1.2rem;
        text-indent: .3rem;
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
    .current-coin {
      height: 4.7rem;
      background-color: #fff;
      margin: 0 1.6rem;
      font-size: 1.4rem;
    }
    .current-coin__text,
    .current-coin__coin {
      height: 4.7rem;
      line-height: 4.7rem;
    }
    .current-coin__coin {
      color: #ff4a4a;
      text-align: right;
    }
    .charge-info {
      margin-left: 1.6rem;
      padding-bottom: 1.25rem;
    }
    .main-color {
      color: #ff4a4a;
    }

</style>

<template>
    <app-header :title="title" :type="type"></app-header>

    <section>
        <div class="current-coin dr-flex">
          <div class="current-coin__text flex-1">我的淘币</div>
          <div class="current-coin__coin flex-1">{{coin}}</div>
        </div>
        <h2 class="title">请选择充值金额</h2>
        <ul class="flex list">
            <li @click="choose($event,20)" class="active">
                <input v-model="amount" value="20" class="hidden-radio" type="radio">
                20元
            </li>
            <li @click="choose($event,50)">
                <input v-model="amount" value="50" class="hidden-radio" type="radio">
                50元
            </li>
            <li @click="choose($event,100)">
                <input v-model="amount" value="100" class="hidden-radio" type="radio">
                100元
            </li>
            <li @click="choose($event,300)">
                <input v-model="amount" value="300" class="hidden-radio" type="radio">
                300元
            </li>
            <li @click="choose($event,500)">
                <input v-model="amount" value="500" class="hidden-radio" type="radio">
                500元
            </li>
          <!-- @click="choose($event,'amount_auto')" -->
            <li class="box" @click="choose($event,0)">
                <input class="textbox" v-model="amount_auto" type="tel" placeholder="自定义金额">
            </li>
        </ul>
        <p  class="charge-info">你将获得<span class="main-color">{{amount_out}}</span>淘币 (1元=1淘币)</p>
    </section>
    <!--<div>{{amount}} {{amount_auto}}</div>-->
    <app-payment-method choose="aliPay" :method_list="method_list"
                        :type="selectType"
                        show_tip="show_tip"></app-payment-method>

    <section>
        <a @click="handle" class="btn-recharge">{{pay_btn_text}}</a>
    </section>

    <!-- common alert -->
    <common-alert :type="alertType" :show-alert="showAlert" :alert-msg="alertMsg" :alert-status="alertStatus"></common-alert>

    <app-bottom-bar></app-bottom-bar>
</template>

<script>
    'use strict';
    import Vue from 'vue';
    import AppHeader from '../../components/common/header/app-header';
    import AppPaymentMethod from '../../components/feature/about-money-business/app-payment-method';
    import CommonAlert from '../../components/common/alert/common-alert';
    import AppBottomBar from '../../components/common/footer/app-bottom-bar';
    import { updateTaobi } from '../../vuex/actions'

    export default {
        components: {
            AppHeader,
            AppPaymentMethod,
            CommonAlert,
            AppBottomBar
        },
        data(){
            return {
                title: "充值",
                type: "back,explain",
                method_list: ['aliPay', 'unionPay', 'wechatPay'],
//                method_list: ['aliPay'],
                show_tip: true, //显示支付方式提示
                amount_auto: undefined,//自定义金额,默认为0
                amount_out: 20, //默认充值20元,
                result: true,

                // 弹出框
                alertType: 0,
                showAlert: false,
                alertMsg: '',
                alertStatus: '',
                // 默认选中支付宝
                selectType: 'aliPay',
                // 当前的淘币
                coin: 0,
                // 支付按钮文字
                pay_btn_text: '确定充值'
            }
        },
        vuex: {
            getters: {
                taobi: ({personal}) => personal.taobi
            },
            actions: {
                updateTaobi
            }
        },
        mounted(){
            $('body').css('background-color', '#ffffff');
            var that = this;
            //todo 显示结果弹窗
            if (this.$route.query.success === 'true') {
                console.log('充值成功');
            }
//            this.updateTaobi(6);
            this.$watch('amount_auto', function(newValue) {
              this.amount_out = newValue;
            })

            // 获取当前用户的淘币
            Vue.OneMallHttp(this).GET({}, Vue.OneMallUrl.get_user_info)
              .then(function(res) {
                if(10000 == res.code) {
                  that.coin = res.result.taoBi;
                }
                else {
                  // TODO
                }
              })
        },
        methods: {
            choose(e, amount) {
                var $li = $(e.target).parents('li');
                $li.parent('ul').find('li').removeClass('active');
                $li.addClass('active');
                this.amount_out = amount;
            },
            handle() {
              var that = this;
              var reg = /^[1-9]\d*$/;
              this.result = reg.test(this.amount_out);
              console.log(this.result, this.amount_out);
              if(!this.result) {
                this.showAlert = true;
                this.alertMsg = "消息提示";
                this.alertStatus = "请输入正确的充值金额";
              }
              else {
                this.pay_btn_text = '获取支付地址...';
                var chargeType = 1;
                // 判断支付方式
                if('aliPay' === this.selectType) {
                  chargeType = 1;
                }
                else if('unionPay' === this.selectType) {
                  chargeType = 4;
                }
                else if('wechatPay' === this.selectType) {
                  chargeType = 2;
                }
                else {
                  // TODO
                }
                // 生成订单
                var query = {
                  money: this.amount_out,
                  type: 1,
                  payType: chargeType
                };
                Vue.OneMallHttp(this).GET(query,Vue.OneMallUrl.charge_order)
                  .then(function(res) {
                    if(10000 == res.code) {
                        that.pay(res.result.order);
                    }
                    else {
                      that.showAlert = true;
                      that.alertMsg = "消息提示";
                      that.alertStatus = "生成订单失败,请重试";
                    }
                  })
              }
            },
          pay(orderId) {
//            console.log(orderId, 33);
            var _that = this;
            // TODO 充值
            var query = {
              orderid: orderId
            };
            Vue.OneMallHttp(this).GET(query, Vue.OneMallUrl.get_pay_url)
              .then(function(res) {
                if(10000 == res.code) {
                  _that.pay_btn_text = '前去支付中...';
                  window.location.href = res.result.payurl;
                }
                else {
                  that.showAlert = true;
                  that.alertMsg = "消息提示";
                  that.alertStatus = "获取支付链接失败,请重试";
                }
              })
          }
        }
    }
</script>
