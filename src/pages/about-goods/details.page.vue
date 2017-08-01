<style scoped>
  .title {
    font-size: 1.2rem;
    color: #3c3e45;
    line-height: 1.7rem;
    padding-top: .5rem;
    height: 1.7rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .status {
    height: .8rem;
    line-height: .8rem;
    font-size: .8rem;
    padding: .2rem;
    margin-right: .2rem;
    border: 1px solid #50aae9;
    color: #50aae9;
    -webkit-border-radius: .2rem;
    border-radius: .2rem;
  }

  .desc {
    color: #8e8e8e;
    max-height: 7.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }

  .progress {
    padding: 1rem 0;
    margin: 0 1rem;

  }

  .count {
    color: #aaa;
    padding-bottom: .8rem;
  }

  .t-bb {
    border-bottom: 1px solid #d8d8d8;
  }

  .notice {
    font-size: 1.3rem;
    color: #8e8e8e;
    line-height: 3rem;
  }

  .link {
    color: #157efb;
    font-size: 1.3rem;
  }

  .result {
    height: 2.5rem;
    line-height: 2.5rem;
    background-color: #d91d37;
  }

  /* dr */
  .dr-detail {
    border-top: 1px solid #dfdfdf;
    padding: 1rem 1.5rem;
    background-color: #fff;
  }

  .dr-detail .dr-title {
    height: 2rem;
    align-items: center;
  }

  .dr-red {
    border: 1px solid #ff4a4a;
    color: #ff4a4a;
  }

  .dr-blue {
    border: 1px solid #329dff;
    color: #329dff;
  }

  .dr-gray {
    color: #898989;
  }

  .dr-detail .dr-title .dr-label {
    font-size: 1rem;
    text-align: center;
    border-radius: .3rem;
    padding: .1rem .2rem;
  }

  .dr-title .dr-name {
    width: 70%;
    font-size: 1.6rem;
    text-indent: .7rem;
  }

  .dr-intro {
    margin-top: .6rem;
    font-size: 1.2rem;
    line-height: 1.6rem;
    font-weight: 500;
  }

  .dr-edition {
    margin-top: .5rem;
    font-size: 1rem;
    font-weight: 200;
  }

  .dr-progress {
    margin: .8rem auto;
  }

  .dr-try {
    background-color: #fff;
    border-top: 1px solid #dfdfdf;
    border-bottom: 1px solid #dfdfdf;
    font-size: 1.4rem;
    height: 4.2rem;
    line-height: 4.2rem;
    text-align: center;
  }

  .dr-tried {
    border-top: 1px solid #dfdfdf;
    padding: 1rem 1.6rem;
    background-color: #fff;
    font-size: 1.2rem;
    flex-direction: column;
  }

  .dr-tried .intro-container {
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .your-buy .intro,
  .intro-container .intro {
    width: 6rem;
  }

  .intro-container span {
    width: 5rem;
    margin-top: .3rem;
  }

  .intro-container .num:not(:first-child) {
    margin-right: .8rem;
  }

  .luck-container {
    background-color: #fff;
  }

  .luck-container .luck-title {
    height: 5rem;
    background-color: #fcf2f2;
    font-size: 1.6rem;
    align-items: center;
  }

  .luck-title .info {
    margin-left: 1.6rem;
  }

  .luck-title .compute-btn {
    margin-right: 1.6rem;
    border-radius: .5rem;
    text-align: center;
    padding: .2rem 1.2rem;
    color: #ff5555;
    border: 1px solid #ff5555;
  }

  .w-c-ff5555 {
    color: #ff5555;
  }

  .luck-content-container {
    padding: 1.6rem;
  }

  .luck-content {
    width: 100%;
    align-items: center;
    font-size: 1.2rem;
    color: #898989;
  }

  .luck-img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }

  .luck-img-right {
    margin-left: 2rem;
    flex-direction: column;
  }

  .luck-detail {
    align-items: center;
  }

  .luck-logo {
    width: 4.4rem;
    height: 4.4rem;
    border-radius: 50%;
  }

  .p-detail {
    line-height: 1.6rem;
  }
  .stress {
    font-size: 1.8rem;
  }
  /* 轮播图 */
  .carousel__wrapper {
    display: block;
    width: 100%;
    max-height: 17.4rem;
  }
  .carousel__item,
  .carousel__link,
  .carousel__img {
    display: block;
  }
  .carousel__img {
    width: 100%;
    display: block;
    max-height: 17.4rem;
  }
  .sub-area{
    width: 4.2rem;
    height: 4.2rem;
    position: absolute;
    /*top: -2.1rem;*/
    /*left: -2.1rem;*/
    top: 1rem;
    left: 1rem;
    background-image: url('/static/images/new-subarea-icon.png');
    background-size: 100% 100%;
    background-position: center;
  }
  .area-10{
    width: 4.2rem;
    height: 4.2rem;
    position: absolute;
    top: 1rem;
    left: 1rem;
    background-image: url('/static/images/index/10.png');
    background-size: 100% 100%;
    background-position: center;
  }
</style>

<template>
  <!---->
  <!---->
  <app-header :title="title"></app-header>
  <!--<app-detail-slider :is-ten="isTen" :is-subarea="false" :img-list="goods.introImg"></app-detail-slider>-->

  <!-- 使用mint-ui轮播组件 -->
  <swipe
    :auto="4000"
    :show-indicators="true"
    :style="swipeStyle"
    class="carousel__wrapper">
    <swipe-item
      v-for="v in goods.introImg"
      class="carousel__item">
      <a class="carousel__link" :href="v.linkUrl">
        <i :class="{
            'sub-area':isSubarea,
            'normal': !isSubarea,
            'area-10':isTen
          }"></i>
        <img @load="hackImage" :src="v.imgUrl" class="carousel__img">
      </a>
    </swipe-item>
  </swipe>
  <!-- 使用mint-ui轮播组件 -->

  <section v-show="pageShow" class="dr-detail">
    <div class="dr-title dr-flex">
      <span v-show="1 === +goods.goodsStatus" class="dr-label dr-red">销售中</span>
      <span v-show="2 === +goods.goodsStatus" class="dr-label dr-red">待揭晓</span>
      <span v-show="3 <= +goods.goodsStatus" class="dr-label dr-blue">已揭晓</span>
      <h3 class="dr-name flex-1 overflow-ellipsis">{{ goods.goodsName }}</h3>
    </div>
    <p class="dr-intro dr-gray">
      {{goods.goodsIntro}}
    </p>
    <p class="dr-edition dr-gray">期号: {{goods.termNo}}</p>
    <p class="dr-progress">
      <goods-progress :all="+goods.totalNum" :last="(+goods.totalNum) - (+goods.leftNum)"></goods-progress>
    </p>
    <p v-show="!(+goods.totalNum) - (+goods.leftNum)" class="flex">
      <span class="flex-1 ">总需人次：{{goods.totalNum}}</span>
      <span>剩余：<em class="last w-c-ff5555">{{goods.leftNum}}</em></span>
    </p>
  </section>

  <!-- 中奖号码 -->
  <div v-show="2 <= +goods.goodsStatus" class="luck-container">
    <div class="luck-title dr-flex">
      <div class="info flex-1">
        <span v-show="2 === +goods.goodsStatus">待揭晓倒计时:</span>
        <span v-show="3 <= +goods.goodsStatus">幸运号码:</span>
        <span v-show="2 === +goods.goodsStatus" class="w-c-ff5555 stress">{{time.h1}}{{time.h2}}:{{time.m1}}{{time.m2}}:{{time.s1}}{{time.s2}}</span>
        <span v-show="3 <= +goods.goodsStatus" class="w-c-ff5555">{{goods.luckNum}}</span>
      </div>
      <span v-link="{name:'reckon', params:{goodsNumId:$route.params.id}}" class="compute-btn">
        计算详情
      </span>
    </div>
    <div v-show="3 <= +goods.goodsStatus" class="luck-content-container">
      <div class="luck-content dr-flex">
        <img class="luck-img" :src="goods.luckPerson.headPic">
        <div class="luck-img-right flex-1 dr-flex">
          <div class="luck-detail dr-flex">
            <div class="inner-detail flex-1">
              <p class="p-detail">获得者: <span class="color-blue" v-link="'/hiscenter/' + goods.luckPerson.luckUserId">{{goods.luckPerson.name}}</span></p>
              <p class="p-detail">用户ID: {{goods.luckPerson.luckUserId}}(唯一不变的标识)</p>
              <!-- <p class="p-detail">揭晓时间: {{goods.luckPerson.luckTime | formatDate 'YYYY-MM-DD hh:mm:ss'}}</p> -->
              <p class="p-detail">揭晓时间: {{goods.showLuckTime2}}
            </div>
            <img class="luck-logo" src="/static/images/goods-detail-lucky-logo.png">
          </div>
          <div class="luck-count dr-flex">
            <div class="luck-num flex-1">
              本期参与:<span class="how-many w-c-ff5555">{{goods.luckPerson.totalPerson}}</span>人次
            </div>
            <div v-link="{name:'participate-detail', params: {id: $route.params.id}, query: {userid: goods.luckPerson.luckUserId}}" class="detail-link color-blue">
              参与详情
            </div>
            <!--<a href="#/dr-participate-detail/{{$route.params.id}}?userid={{goods.luckPerson.luckUserId}}" class="detail-link color-blue">-->
            <!--参与详情-->
            <!--</a>-->
          </div>
        </div>
      </div>
    </div>
  </div>
  <p v-show="0 === +goods.myStatus" class="dr-try dr-gray">
    您还没有参加哦，赶快试试吧，万一中了呢？
  </p>
  <div v-show="1 === +goods.myStatus" class="dr-tried dr-gray dr-flex">
    <p class="dr-flex your-buy">
      <span class="intro">您参与了: </span>
      <span >
        <span class="w-c-ff5555">{{goods.myDetail.times}}</span>人次
      </span>
    </p>
    <p class="dr-flex intro-container">
      <span class="intro">参与号码: </span>
      <span v-for="v in goods.myDetail.nums" class="num">{{v}}</span>
      <span v-link="{name:'participate-detail', params: {id: $route.params.id}}" v-show="showMoreNum"
            class="num color-blue">更多</span>
    </p>
  </div>


  <details-guidebox :term-id="goods.goodsID"></details-guidebox>
  <details-record :date="goods.testbeginTime"></details-record>

  <!-- 普通弹窗 -->
  <common-alert @common-alert-action="commonAlertAction"
                @cancel-alert="cancelAlert"
                :show-alert="showAlert" :type="type"
                :alert-msg="alertMsg"
                :replace-btn-text="replaceBtnText"
                :alert-status="alertStatus"></common-alert>
  <!-- 暂时不用 -->
  <!--<app-detail-buy @detail-direct="direct"-->
  <!--@detail-buy-action="buy"-->
  <!--:done="goods.isExpire"-->
  <!--v-if="!isTen && showBuyPopup"-->
  <!--:is-ten="isTen"-->
  <!--:max-num="+goods.leftNum">-->
  <!--</app-detail-buy>-->
  <!-- 10 -->
  <!--<app-detail-ten-buy @detail-direct="direct"-->
  <!--@detail-buy-action="buy"-->
  <!--:done="goods.isExpire"-->
  <!--v-if="isTen && showBuyPopup"-->
  <!--:is-ten="isTen"-->
  <!--:max-num="+goods.leftNum">-->
  <!--</app-detail-ten-buy>-->
  <!-- 10 -->
  <!-- 夺宝券弹窗 -->
  <can-use-coupon @coupon-close="handleCouponClose"
                  :coupon-list="couponList"
                  :ticket-id:="ticketId"
                  :show="couponShow"></can-use-coupon>

  <common-alert
    @cancel-alert="cancelAlert"
    @common-alert-action="commonAlertAction"
    :alert-msg="alertMsg"
    :alert-status="alertStatus"
    :type="commonAlertType"
    :replace-btn-text="replaceBtnText"
    :show-alert="commonAlertShow"></common-alert>

  <app-home-buy v-on:buy-action="queryCoupon"
                :can-buy-num="canBuyNum"
                :url="goods.goodsImg"
                v-if="!isTen"
                :show="showBuyPopup"
                :alert-type="alertType">
  </app-home-buy>

  <!-- 10元夺宝弹窗 -->
  <app-home-ten-buy v-on:buy-action="queryCoupon"
                    :can-buy-num="canBuyNum"
                    :url="goods.goodsImg"
                    v-if="isTen"
                    :show="showBuyPopup"
                    :alert-type="alertType">
  </app-home-ten-buy>
  <!-- 10元夺宝弹窗 -->

  <detail-buy-trigger v-show="!goods.isExpire" :show-buy-popup="showBuyPopup"></detail-buy-trigger>
  <detail-buy-expire-trigger v-show="goods.isExpire" @detail-buy-expire-trigger="direct"></detail-buy-expire-trigger>

  <!-- 返回按钮 -->
  <go-back></go-back>

  <app-bottom-bar></app-bottom-bar>
</template>

<script>
  'use strict';
  import Vue from 'vue';
  import AppHeader from '../../components/common/header/app-header';
  import AppBottomBar from '../../components/common/footer/app-bottom-bar';
  import AppDetailSlider from '../../components/feature/about-goods/app-detail-slider';
  import GoodsProgress from '../../components/common/progress/goods-progress';
  import DetailsGuidebox from '../../components/feature/about-goods/details-guidebox';
  import DetailsRecord from '../../components/feature/about-goods/details-joinrecord';
  import AppDetailBuy from '../../components/feature/about-goods/app-detail-buy';
  import CommonAlert from '../../components/common/alert/common-alert';
  import CanUseCoupon from '../../components/feature/about-goods/can-use-coupon';
  import AppDetailTenBuy from '../../components/feature/about-goods/app-detail-ten-buy';
  import DetailBuyTrigger from '../../components/feature/about-goods/detail-buy-trigger';
  import DetailBuyExpireTrigger from '../../components/feature/about-goods/detail-buy-expire-trigger';
  import AppHomeTenBuy from '../../components/feature/about-goods/app-home-ten-buy';
  import AppHomeBuy from '../../components/feature/about-goods/app-home-buy';
  import {showReview} from '../../vuex/actions';
  import GoBack from '../../components/feature/common/goback.component';

  // 使用新的轮播组件
  import { Swipe, SwipeItem } from 'mint-ui';

  export default {
    components: {
      AppHeader,
      AppBottomBar,
      AppDetailSlider,
      GoodsProgress,
      DetailsGuidebox,
      DetailsRecord,
      AppDetailBuy,
      CommonAlert,
      CanUseCoupon,
      AppDetailTenBuy,
      DetailBuyTrigger,
      AppHomeTenBuy,
      AppHomeBuy,
      DetailBuyExpireTrigger,
      Swipe,
      SwipeItem,
      GoBack
    },
    data(){
      return {
        title: "商品详情",
        all: 500,
        last: 100,
        done: false,

        // goods
        goods: {},
        showMoreNum: false,
        nowNumberId: null,

        // alert
        type: 0,
        showAlert: false,
        alertMsg: '',
        alertStatus: '',
        // 购买返回状态
        resCode: 0,
        replaceBtnText: null,

        // new alert
        alertType: 1,
        show: false,
        commonAlertType: 0,
        commonAlertShow: false,

        // timer
        timer: null,
        totalTime: 60*60*24,
        time: {
          h1: 0,
          h2: 0,
          m1: 0,
          m2: 0,
          s1: 0,
          s2: 0
        },
        // 关于夺宝券
        couponShow: false,
        couponID: null,
        couponList: [],
        curNum: 0,
        ticketId: null,
        // 实际要付的钱
        realMoney: 0,
        // 判断是否是10元夺宝
        isTen: 0,
        // 判断物品种类
        goodsType: '0',
        // buy trigger
        showBuyPopup: false,
        // 商品剩余的购买量
        canBuyNum: 0,
        // 是否显示页面
        pageShow: false,
        // 是否是活动的商品
        isActivity: false,
        // 顶部的图片详情
        picHeight: null
      }
    },
    computed: {
      swipeStyle() {
        let height;
        if(this.picHeight) {
          height = this.picHeight + 'px';
        }
        else {
          height = null;
        }
        return {
          height: height
        }
      }
    },
    mounted() {
      // TODO
      this.$root.$broadcast('hide-copyright');
    },
    route: {
      data() {
        this.$broadcast('route-change');
        this.indexPD();
        this.showBuyPopup = false;
      }
    },
    methods: {
      // 处理图片自适应问题
      hackImage(e) {
        var deviceWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var naturalHeight;
        var naturalWidth;
        if(document.querySelector('.carousel__img')) {
          naturalHeight =  document.querySelector('.carousel__img').naturalHeight;
          naturalWidth =  document.querySelector('.carousel__img').naturalWidth;
          this.picHeight = deviceWidth * (naturalHeight / naturalWidth);
        }
      },
      // 查看可否使用夺宝券
      queryCoupon(v) {
        // 判断用户是否有夺宝券
        var that = this;
        that.buyInfo = v;
        // 判断用户的输入是否合法
        var test = that.testInput(v.count);
        var isSubareaZero = v.count > 0 ? false : true;
        if(!test || isSubareaZero) {
          // 弹窗说明输入不合法
          that.commonAlertShow = true;
          that.show = false;
          that.alertMsg = '消息提示';
          if(!test){
            that.alertStatus = '请输入正确的购买数量';
          }
          if(isSubareaZero) {
            that.alertStatus = '请选择购买的分区';
          }
        }
        else {
          that.curNum = v.count;
          var couponQuery = {
            numberID: that.$route.params.id,
            num: that.curNum
          };
          // 活动商品不参与夺宝券
          // 1 == +this.$route.query.isActivity
          if(that.isActivity) {
            that.handleCouponClose({
              ticketId: null,
              canUse: 0,
              ticketInfo:{
                name: null
              }
            });
          }
          else {
            Vue.OneMallHttp(this).GET(couponQuery, Vue.OneMallUrl.can_use_ticket)
              .then(function(res) {
                if(10000 === res.code) {
                  // 判断是否有夺宝券
                  if(res.list.length > 0) {
                    that.couponList = res.list;
                    that.couponShow = true;
                    that.realMoney = res.totMoney;
                  }
                  else {
                    // 直接生成订单
                    that.handleCouponClose({
                      ticketId: null,
                      canUse: 0,
                      ticketInfo:{
                        name: null
                      }
                    });
                  }
                }
              });
          }
        }
      },
      // 检测输入的数量是否合法
      testInput(v) {
        var reg;
        if(this.isTen) {
          reg = /^[1-9]\d*0$/;
        }
        else {
          reg = /^[1-9]\d*$/;
        }
        return reg.test(v) ? true : false;
      },
      handleCouponClose(v) {
        // TODO 直接支付不需要跳转到支付页面
        this.generateOrder(v);
      },
      generateOrder(v) {
        // console.log(v);
        var that = this;
        var params = {
          numberID: that.$route.params.id,
          buyNum: that.curNum,
          ticketId: v.ticketId
        };
//        if(1 == +this.$route.query.isActivity) {
//          params.ticketId = null;
//        }
        Vue.OneMallHttp(this).GET(params, Vue.OneMallUrl.create_goods_buy)
          .then(function (res) {
            if (10000 == res.code) {
              // TODO 跳转到商品确认页面
              if(0 === res.result.needPay) {
                that.$router.go({
                  name: 'confirm-my-order',
                  params: {
                    number: res.result.number,
                    tradeId: res.result.trade_order,
                    isSubarea: 0
                  }
                });
              }
              // TODO 淘币不足,进行充值
              else {
                that.$router.go({
                  name: 'pay-for-goods',
                  params: {
                    number: res.result.number,
                    tradeNo: res.result.trade_order,
                    taoBi: res.result.needPay
                  }
                });
              }
            }
            else {
              that.showAlert = true;
              that.alertMsg = '商品购买失败';
              that.alertStatus = res.msg;
            }
          });
      },
      direct() {
        // 跳转到新的一期
        this.$router.push({
          name: 'goods-detail',
          params: {
            id: this.nowNumberID
          },
          query: {
            isTen: this.isTen
          }
        });
      },
      commonAlertAction() {
        // TODO 是否给用户提示需要充值
        if(10099 == this.resCode) {
          this.$router.push({
            path: '/personal/recharge'
          });
        }
        // 清除修改
        this.resCode = 0;
        this.replaceBtnText = null;
      },
      cancelAlert() {
        this.resCode = 0;
        this.replaceBtnText = null;
      },
      buy(v) {
        // TODO
        // 判断用户是否有夺宝券
        var that = this;
        that.curNum = v.count;

        // 判断用户的输入是否合法
        var test = that.testInput(v.count);
        if(!test) {
          // 弹窗说明失败原因
          that.showAlert = true;
          that.alertMsg = '消息提示';
          that.alertStatus = '请输入正确的购买数量';
        }
        else {
          var couponQuery = {
            numberID: that.$route.params.id,
            num: that.curNum
          };
          Vue.OneMallHttp(this).GET(couponQuery, Vue.OneMallUrl.can_use_ticket)
            .then(function(res) {
              if(10000 === res.code) {
                // 判断是否有夺宝券
                if(res.list.length > 0) {
                  that.couponList = res.list;
                  that.couponShow = true;
                  that.realMoney = res.totMoney;
                  // TODO 处理用户支付 在夺宝券那里进行操作
                }
                else {
                  // TODO 不需要生成订单 直接进行支付
                  that.generateOrder({
                    ticketId: null,
                    canUse: 0,
                    ticketInfo:{
                      name: null
                    }
                  });
                }
              }
            });
        }
      },
      indexPD() {
        var that = this;
        var params = {
          numberID: this.$route.params.id
        };
        Vue.OneMallHttp(this).GET(params, Vue.OneMallUrl.goods_detail)
          .then(function (res) {

            if (10000 === res.code) {
              // 是否是活动的页面
              if(1 === +res.result.activity) {
                that.isActivity = true;
              }
              else {
                that.isActivity = false;
              }
              // 展示页面
              that.pageShow = true;
              // 获取数据
              that.goods = res.result;
              that.nowNumberID = that.goods.nowNumberID;
              that.totalTime = that.goods.openTime;
              // 10元夺宝
              that.goodsType = that.goods.type;
              // 商品剩余的购买数量
              that.canBuyNum = +(that.goods.leftNum);
              if(2 == +that.goodsType) {
                that.isTen = 0
              }
              else if(3 == +that.goodsType) {
                that.isTen = 1;
              }
              else {
                that.isTen = 0;
              }

              // 需不需要倒计时的判断
              if(2 === +that.goods.goodsStatus) {
                if(!that.timer) {
                  that.createTimer();
                }
              }

              var temp = res.result;
              if (temp.hasOwnProperty('myDetail')) {
                if (temp.myDetail.hasOwnProperty('nums')) {
                  if (temp.myDetail.nums.length > 6) {
                    that.showMoreNum = true;
                    that.goods.myDetail.nums = that.goods.myDetail.nums.slice(0, 6);
                  }
                  else {
                    that.showMoreNum = false;
                  }
                }
              }
            }
            // 处理异常的请求
            else {
              //  TODO
            }
          })
      },
      createTimer() {
        // console.log(this.totalTime, 666);
        var that = this;
        that.timer = setInterval(function() {
          if(that.totalTime > 0) {
            that.totalTime--;
            that.time.h1 = +parseInt(that.totalTime / 36000);
            that.time.h2 = +parseInt(that.totalTime / 3600 % 10);
            that.time.m1 = +parseInt(that.totalTime % 3600 / 600);
            that.time.m2 = +parseInt(that.totalTime % 3600 / 60 % 10);
            that.time.s1 = +parseInt(that.totalTime % 60 / 10);
            that.time.s2 = +parseInt(that.totalTime % 60 % 10);
          }
          else {
//            that.$nextTick(function () {
//              that.indexPD();
//            });
//            that.indexPD();
            that.goods.goodsStatus = 3;
            clearInterval(that.timer);
          }
        }, 1000);
      }
    },
    vuex: {
      actions: {
        showReview
      }
    },
    mounted() {
      // 获取是否显示ICP备案
      this.showReview(false);
      $('body').css({'background-color': '#f8f8f8'});
    },
    destroyed() {
//      $('body').css({'background-color': '#fff'});
    }
  }
</script>
