<style scoped>
  /* 选项卡 */
  .tab {
    height: 3rem;
    line-height: 3rem;
  }

  .tab > a {
    font-size: 1.4rem;
    color: #3c3e45;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
  }

  .tab > a.active {
    color: #e71f3b;
  }

  .tab > a.active:before {
    content: "";
    font-size: 0;
    height: 2px;
    background-color: #e71f3b;
    display: inline-block;
    width: 5.833rem;
    position: absolute;
    bottom: -1px;
  }

  /* 选项卡 结束*/
  /* 商品列表 */
  .list {
    flex-wrap: wrap;
  }

  .list > li {
    float: left;
    width: 50%;
    /*padding: 0 1rem;*/
    padding: 0;
    position: relative;
  }

  .list .link {
    display: block;
    height: 100%;
  }

  .list .flag-subarea {
    width: 2.3rem;
    height: 2.3rem;
    position: absolute;
    top: .25rem;
    left: .25rem;
    background-image: url(/oldStatic/images/new-subarea-icon.png);
    background-size: cover;
  }

  /* 10.8 update */
  .list .flag-10 {
    width: 2.3rem;
    height: 2.3rem;
    position: absolute;
    top: .25rem;
    left: .25rem;
    background-image: url(/oldStatic/images/index/10.png);
    background-size: cover;
  }

  .list .br {
    border-right: 1px solid #ececeb;
  }

  .list .bb {
    border-bottom: 1px solid #ececeb;
  }

  .list .imgbox {
    padding-top: 1rem;
    padding-bottom: .8rem;
    margin: 0 auto;
    height: 10.9rem;
    width: 10.9rem;
    overflow: hidden;
  }

  .list img {
    width: 100%;
    height: 100%;
  }

  .list .name {
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    padding: 0 .5rem;
    color: #000;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.2rem;
  }

  .list .info {
    color: #aaa;
    padding: 0 1rem;
  }

  .list .count {
    text-align: left;
    padding: .35rem 0 .85rem;
  }

  .list .all:before {
    content: attr(data-all);
    display: block;
  }

  .list .last {
    text-align: right;
  }

  .list .last:before {
    content: attr(data-last);
    color: #d91d37;
    display: block;
  }

  .list .btn-join {
    width: 3.2rem;
    height: 1.75rem;
    line-height: 1.75rem;
    font-size: 1rem;

    color: #d91d37;
    border: 1px solid #d91d37;
    background-color: #fff;
    border-radius: 3px;
  }

  .item-footer {
    flex-direction: column;
    width: 83.33%;
    margin: 0 auto;
  }

  .item-info {
    height: 2.8rem;
    margin-bottom: 1.8rem;
    justify-content: flex-start;
  }

  .item-info-action {
    width: 5.69rem;
    justify-content: flex-end;
    align-items: center;
  }

  .item-info-action .btn-action {
    display: block;
    width: 5.69rem;
    height: 2.5rem;
    border-radius: .3rem;
    text-align: center;
    line-height: 2.5rem;
    color: #ff6709;
    border: 1px solid #ff6709;
    font-size: 1.2rem;
  }

  .main-color {
    color: #ff6709;
  }

  .normal-color {
    color: #898989;
  }

  .fix-gap-item-footer {
    height: 1rem;
  }

  .item-info-number {
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    font-size: 1rem;
  }

  .item-info-number .num {
    white-space: nowrap;
  }

  .selection-container {
    justify-content: center;
  }

  .select-section {
    text-align: center;
    height: 3rem;
    box-sizing: border-box;
    background-color: #fff;
  }

  /* 商品列表 结束*/
  /* 下拉刷新 */
  .collection-wrapper {
    /*overflow-y: scroll;*/
    /*height: 32rem;*/
  }

  .mint-loadmore-top span {
    display: inline-block;
    transition: .2s linear;
  }

  .rotate {
    transform: rotate(180deg);
  }

  .header-active {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    background-color: #fff;
  }

  .loading {
    background-image: url('/oldStatic/images/loading.gif');
    height: 3rem;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #fff;
  }
  .msg {
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    background-color: #fff;
    color: #898989;
  }
  /* 备案号 */
  .review-home {
    background-color: #fff;
    font-size: 1rem;
    width: 100%;
    color: #898989;
    padding: .6rem auto;
    height: 2.2rem;
    line-height: 2.2rem;
    text-align: center;
  }
</style>

<template>
  <section class="g-goods mt-10 bg-fff">
    <!-- 填充 -->
    <p v-show="!showHeader" class="flex tab bt bb"></p>
    <!-- 填充 -->
    <p id="J-goods-container" :class="{ 'header-active': !showHeader }" class="flex tab bt bb">
      <a @click="cleanSelectTab('all')" class="flex-1" :class="{'active':(tab === 'all')}">全部商品</a>
      <a @click="dirtySelectTab(selected)" class="selection-container dr-flex flex-1" :class="{'active':(tab != 'all')}">
        一元夺宝
        <!--<select v-on:change="selectTab(selected)" class="select-section" v-model="selected">-->
        <!--<option value="one">一元夺宝</option>-->
        <!--<option value="ten">十元夺宝</option>-->
        <!--</select>-->
      </a>
    </p>

    <ul v-show="config.type === 'all'" class="flex list center clearfix">
      <li  class="listitem c-bbox bb"
          v-for="(index, good) in goods" id="{{good.id}}">
        <div :class="{'br':(index %2 === 0)}">

          <i v-if="good.isSubarea === 1" class="flag-subarea"></i>
          <i v-if="good.isTen === 1" class="flag-10"></i>
          <p class="imgbox">
            <a v-if="!good.isSubarea" class="link" v-link="{
						  name: 'goods-detail',
						  params: {
						    id: good.id
						  }
						}">
              <img :src="good.imgUrl" alt="{{good.name}}">
            </a>
            <a v-if="good.isSubarea" class="link" v-link="{
						  name: 'subarea-detail',
						  params: {
						    id: good.id
						  }
						}">
              <img :src="good.imgUrl" alt="{{good.name}}">
            </a>
          </p>
          <span class="name c-bbox">{{good.goodsName}}</span>
          <div class="fix-gap-item-footer"></div>
          <div class="dr-flex item-footer">
            <!--<goods-progress v-show="+good.leftNum" :all="+good.totalNum" :last="(+good.totalNum)-(good.leftNum)"></goods-progress>-->
            <goods-progress :all="+good.totalNum" :last="(+good.totalNum)-(good.leftNum)"></goods-progress>
            <div class="fix-gap-item-footer"></div>
            <div class="dr-flex item-info">
              <div v-show="+good.leftNum" class="item-info-number dr-flex flex-1 normal-color">
                <span class="num">总需{{good.totalNum}}人次</span>
                <span class="num">剩余<span class="main-color">{{good.leftNum}}</span>人次</span>
              </div>
              <div class="item-info-action dr-flex">
                    <span class="btn-action" @click="showBuyAlert({
                            isSubarea: good.isSubarea,
                            imgUrl:good.imgUrl,
                            isExpire: good.isExpire,
                            goodsNum: good.id,
                            goodsName: good.goodsName,
                            isTen: good.isTen
                            })">立即夺宝</span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <ul  v-show="config.type === 'one'" class="flex list center clearfix">
      <li class="c-bbox bb" v-for="(index, good) in oneGoods">
        <div :class="{'br':(index %2 === 0)}">
          <i v-if="good.isSubarea === 1" class="flag-subarea"></i>
          <p class="imgbox">
            <a v-if="!good.isSubarea" class="link" v-link="{
						                                                    name: 'goods-detail',
                                                                params: {
                                                                  id: good.id
                                                                }
                                                              }">
              <img :src="good.imgUrl" alt="{{good.name}}">
            </a>
            <a v-if="good.isSubarea" class="link" v-link="{
                                                                name: 'subarea-detail',
                                                                params: {
                                                                  id: good.id
                                                                }
                                                              }">
              <img :src="good.imgUrl" alt="{{good.name}}">
            </a>
          </p>
          <span class="name c-bbox">{{good.goodsName}}</span>
          <div class="fix-gap-item-footer"></div>
          <div class="dr-flex item-footer">
            <!--<goods-progress v-show="+good.leftNum" :all="+good.totalNum" :last="(+good.totalNum)-(good.leftNum)"></goods-progress>-->
            <goods-progress :all="+good.totalNum" :last="(+good.totalNum)-(good.leftNum)"></goods-progress>
            <div class="fix-gap-item-footer"></div>
            <div class="dr-flex item-info">
              <div v-show="+good.leftNum" class="item-info-number dr-flex flex-1 normal-color">
                <span class="num">总需{{good.totalNum}}人次</span>
                <span class="num">剩余<span class="main-color">{{good.leftNum}}</span>人次</span>
              </div>
              <div class="item-info-action dr-flex">
                            <span class="btn-action" @click="showBuyAlert({
                            isSubarea: good.isSubarea,
                            imgUrl:good.imgUrl,
                            isExpire:good.isExpire,
                            goodsNum: good.id,
                            goodsName: good.goodsName,
                            isTen: good.isTen
                            })">立即夺宝</span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <ul  v-show="config.type === 'ten'" class="flex list center clearfix">
      <li class="c-bbox bb " v-for="(index, good) in tenGoods" >
        <div :class="{'br':(index %2 === 0)}">
          <!-- 10.8 update -->
          <!--<i v-if="good.isSubarea === 1" class="flag-subarea"></i>-->
          <i class="flag-10"></i>
          <p class="imgbox">
            <a v-if="!good.isSubarea" class="link" v-link="{
                                                                name: 'goods-detail',
                                                                params: {
                                                                  id: good.id
                                                                }
                                                              }">
              <img :src="good.imgUrl" alt="{{good.name}}">
            </a>
            <a v-if="good.isSubarea" class="link" v-link="{
                                                                name: 'subarea-detail',
                                                                params: {
                                                                  id: good.id
                                                                }
                                                              }">
              <img :src="good.imgUrl" alt="{{good.name}}">
            </a>
          </p>
          <span class="name c-bbox">{{good.goodsName}}</span>
          <div class="fix-gap-item-footer"></div>
          <div class="dr-flex item-footer">
            <!--<goods-progress v-show="+good.leftNum" :all="+good.totalNum" :last="(+good.totalNum)-(good.leftNum)"></goods-progress>-->
            <goods-progress :all="+good.totalNum" :last="(+good.totalNum)-(good.leftNum)"></goods-progress>
            <div class="fix-gap-item-footer"></div>
            <div class="dr-flex item-info">
              <div v-show="+good.leftNum" class="item-info-number dr-flex flex-1 normal-color">
                <span class="num">总需{{good.totalNum}}人次</span>
                <span class="num">剩余<span class="main-color">{{good.leftNum}}</span>人次</span>
              </div>
              <div class="item-info-action dr-flex">
                            <span class="btn-action" @click="showBuyAlert({
                            isSubarea: good.isSubarea,
                            imgUrl:good.imgUrl,
                            isExpire:good.isExpire,
                            goodsNum: good.id,
                            goodsName: good.goodsName,
                            isTen: good.isTen
                            })">立即夺宝</span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!--<p>{{isLoading}}</p>-->

    <!-- loading more data info -->
    <p v-show="isLoading" class="loading"></p>
    <p v-show="isLoading" class="loading-more-msg msg">正在加载中...</p>
    <p v-show="isAllData" class="no-more msg">没有更新的数据了</p>
    <!-- loading more data info -->

    <!-- 备案号 -->
    <div class="review-home">
      浙ICP备 16002519号-1
    </div>
    <!-- 备案号 -->


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
                  :url="url"
                  v-if="!showTenGoodsAlert"
                  :show="show"
                  :alert-type="alertType">
    </app-home-buy>

    <!-- 10元夺宝弹窗 -->
    <app-home-ten-buy v-on:buy-action="queryCoupon"
                      :can-buy-num="canBuyNum"
                      :url="url"
                      v-if="showTenGoodsAlert"
                      :show="show"
                      :alert-type="alertType">
    </app-home-ten-buy>
    <!-- 10元夺宝弹窗 -->

    <home-subarea-buy v-on:home-subarea-buy-action="queryCoupon"
                      :subarea="alertSubarea"
                      :each-subarea-num="alertEachSubareaNum"
                      :url="url" :show="show"
                      :alert-type="alertType">
    </home-subarea-buy>

    <!-- 夺宝券 -->
    <can-use-coupon @coupon-close="handleCouponClose"
                    :coupon-list="couponList"
                    :ticket-id:="ticketId"
                    :show="couponShow"></can-use-coupon>
  </section>
</template>

<script>
  'use strict';
  // import 'mint-loadmore/lib/style.css';
  import Vue from 'vue';
  import GoodsProgress from '../../common/progress/goods-progress';
  import AppHomeBuy from '../about-goods/app-home-buy';
  import AppDetailBuy from '../about-goods/app-detail-buy';
  import HomeSubareaBuy from '../about-goods/home-subarea-buy';
  import CommonAlert from '../../common/alert/common-alert';
  import CanUseCoupon from '../about-goods/can-use-coupon';
  // 10元夺宝弹窗
  import AppHomeTenBuy from '../about-goods/app-home-ten-buy.vue';
  export default {
    props: [
      'showHeader'
    ],
    components: {
      GoodsProgress,
      AppHomeBuy,
      HomeSubareaBuy,
      CommonAlert,
      CanUseCoupon,
      AppHomeTenBuy
    },
    data(){
      return {
        isDirty: false,
        goods: [],
        oneGoods: [],
        tenGoods: [],
        config: {
          allCurPage: 1,
          oneCurPage: 1,
          tenCurPage: 1,
          // 检查列表是否已经初始化过（若是则只是简单的显示，不再重复获取数据）
          allInitDataLoaded: false,
          oneInitDataLoaded: false,
          tenInitDataLoaded: false,
          type: 'all',
          pageSize: 10
        },
        allLoaded: false,
        flagCollection: [],


        tab: "all",
        // 关于弹窗
        show: false,
        alertType: 1,
        done: true,
        commonAlertType: 0,
        commonAlertShow: false,
        alertMsg: '当前商品已过期',
        alertStatus: '是否参与最新期次',
        alertSubarea: [],
        alertEachSubareaNum: 10,
        replaceBtnText: null,
        resCode: 0,// 返回状态

        // 下拉框选择
        url: '',
        selected: 'one',
        isTenGoods: false, // 是否是十元夺宝的
        showTenGoodsAlert: false, // 是否显示10元夺宝弹窗

        // 关于加载更多
        isLoading: false,
        isAllData: false,

        // 当前选择的商品
        curGoods: {},
        // 是否可以去新的一期
        canDirect: false,
        // 关于夺宝券
        couponShow: false,
        couponID: null,
        couponList: [],
        curNum: 0,
        ticketId: null,
        // 购买的信息
        buyInfo: {},
        buyGoodsMsg: {},
        // 实际要付的钱
        realMoney: 0,
        reduceMoney: 0,
        // 每一个商品剩下的购买量
        canBuyNum: 0,
        isTen: false

      }
    },
    computed: {
      query: function (){
        return {
          type: this.config.type,
          page: this.config[this.config.type+'CurPage']
        }
      }
    },
    mounted(){
      var that = this;
      this.getHomeGoods(this.query);
      mallUtils.funs.scroll(this.touchLoading);
    },
    destroyed() {
      mallUtils.funs.unscroll(this.touchLoading);
    },
    methods: {
      commonAlertAction() {
        if(this.canDirect) {
          if(!this.curGoods.isSubarea) {
            this.$router.push({
              name: 'goods-detail',
              params: {
                id: this.curGoods.goodsNum
              }
            });
          }
          else {
            this.$router.push({
              name: 'subarea-detail',
              params: {
                id: this.curGoods.goodsNum
              }
            });
          }
          this.canDirect = false;
        }

        // 根据购买情况分别跳转不同的页面
        console.log(this.resCode, this.curGoods);
        if((10004 == this.resCode) && (0 == this.curGoods.isSubarea)) {
          this.$router.push({
            name: 'goods-detail',
            params: {
              id: this.curGoods.goodsNum
            }
          });
        }
        if((10004 == this.resCode) && (1 == this.curGoods.isSubarea)) {
          this.$router.push({
            name: 'subarea-detail',
            params: {
              id: this.curGoods.goodsNum
            }
          });
        }
        if(10099 == this.resCode) {
          this.$router.push({
            path: '/personal/recharge'
          });
        }

        // 清楚btnText
        this.replaceBtnText = null;
        this.resCode = 0;
      },
      cancelAlert() {
        this.resCode = 0;
        this.replaceBtnText = null;
      },
      // 普通商品的购买
      handleNormalBuyAction(v) {
        var that = this;
        //  console.log(v, 33);
        var params = {
          numberID: v.numberId,
          buyNum: v.count,
          ticketId: v.ticketId
        };
        Vue.OneMallHttp().GET(params, Vue.OneMallUrl.create_goods_buy)
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
              that.commonAlertShow = true;
              that.alertMsg = '商品购买失败';
              that.alertStatus = res.msg;
            }
          });
      },
      handleSubareaBuyAction(v) {
        var that = this;
        var params = {
          numberID: that.curGoods.goodsNum,
          area: v.area,
          ticketId: v.ticketId
        };
        Vue.OneMallHttp().GET(params, Vue.OneMallUrl.create_goods_buy)
          .then(function (res) {
            if (10000 == res.code) {
              // TODO 跳转到商品确认页面
              if(0 === res.result.needPay) {
                that.$router.go({
                  name: 'confirm-my-order',
                  params: {
                    number: res.result.number,
                    tradeId: res.result.trade_order,
                    isSubarea: 1
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
              that.commonAlertShow = true;
              that.alertMsg = '商品购买失败';
              that.alertStatus = res.msg;
            }
          });
      },
      touchLoading(){
        //滚动加载 滚到底部加载数据
        var scrollTop = document.body.scrollTop,
          bodyHeight = document.body.offsetHeight,
          screenHeight = mallUtils.screen.height,
          triggerDistance = 60,
          triggerStatus = (bodyHeight - (scrollTop + screenHeight)) < (triggerDistance - 12) ? true : false;
        if(triggerStatus && !this.isLoading) {
          this.fetchMoreData();
        }
      },
      fetchMoreData(e) {
        if(this.isLoading || this.isAllData) {
          console.log('不能够加载更多的数据了...');
        }
        else {
          this.isLoading = true;
          this.config[this.config.type+'CurPage']++;
          this.getHomeGoods(this.query);
        }
      },
      showBuyAlert(config) {
        var that = this;
        // 10元夺宝
        // console.log(config, 33);
//            if(this.isTenGoods || (1 == +config.isTen)) {
//              this.showTenGoodsAlert = true;
//            }
        if(1 == +config.isTen) {
          this.isTen = true;
          this.showTenGoodsAlert = true;
        }
        else {
          this.isTen = false;
          this.showTenGoodsAlert = false;
        }
        that.curGoods = config;
        if(config.isExpire) {
          this.canDirect = true;
          this.commonAlertShow = true;
          this.show = false;
        }
        else {
          if(!config.isSubarea) {
            this.alertType = 1;
          }
          else {
            this.alertType = 2;
          }
          // 开始弹窗 查询当前物品的状态
          var params = {
            ID: config.goodsNum
          };
          Vue.OneMallHttp().GET(params, Vue.OneMallUrl.home_goods_status)
            .then(function(res) {
              if(10000 == res.code) {
                that.alertSubarea = res.result.subarea;
                that.alertEachSubareaNum = (+res.result.eachSubareaNum);
                that.commonAlertShow = false;
                that.show = true;
                // 商品剩余的购买量
                that.canBuyNum = +res.result.left;
              }
            });
        }
        this.url = config.imgUrl;
        // console.log(config, this.show, this.showTenGoodsAlert, '------>');
      },
      dirtySelectTab(type) {
        this.tab = 'one';
        if(!this.isDirty){
          this.isDirty = true;
          this.config.type = type;
          if(this.config[this.config.type+'InitDataLoaded']){
            return;
          }
          this.getHomeGoods(this.query);
        }
      },
      cleanSelectTab(type) {
        this.isDirty = false;
        this.tab = type;
        this.config.type = type;
        if(this.config[this.config.type+'InitDataLoaded']){
          return;
        }
        this.getHomeGoods(this.query);
      },
      selectTab(type){
        this.tab = type;
        this.config.type = type;
        if(this.config[this.config.type+'InitDataLoaded']){
          return;
        }
        this.getHomeGoods(this.query);
      },
      getHomeGoods(query){
//            console.log('fectch');
        // 10元夺宝的特殊处理
        if('ten' === query.type) {
          this.isTenGoods = true;
        }
        else {
          this.isTenGoods = false;
        }
        var that = this;
        that.isLoading = true;
        Vue.OneMallHttp().GET(query, Vue.OneMallUrl.home_goods_list)
          .then(function (res) {
//                        console.log('fectch1');
//                        console.log(res.code === 10000, res.code, res);
            if (10000 === res.code) {
              that.config[that.config.type+'InitDataLoaded'] = true;
              that.isLoading = false;
              console.log(that.isLoading, 'loading');
              if(0 === res.result.length) {
                that.isAllData = true;
              }
              else {
                if ('all' === that.config.type) {
                  that.goods = that.goods.concat(res.result);
                }
                else if ('one' === that.config.type) {
                  that.oneGoods = that.oneGoods.concat(res.result);
                }
                else if ('ten' === that.config.type) {
                  that.tenGoods = that.tenGoods.concat(res.result);
                }
                that.isAllData = false;
              }
            }
            // 处理异常的请求
            else {
              //  TODO
            }
          })
      },
      // 确认是否含有夺宝券
      queryCoupon(v) {
        // 判断用户是否有夺宝券
        var that = this;
        that.buyInfo = v;
        // 判断用户的输入是否合法
        console.log(v.count);
        var test = that.testInput(+(v.count));
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
            numberID: that.curGoods.goodsNum,
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
      },
      handleCouponClose(v) {
        console.log(v);
        this.buyGoodsMsg = v; // 选取优惠券
        // this.reduceMoney = v.reduceMoney;
        // this.realMoney = this.realMoney - this.reduceMoney;
        // 判断商品种类
        if(this.curGoods.isSubarea) {
          this.handleSubareaBuyAction({
            numberId: this.curGoods.goodsNum,
            ticketId: v.ticketId,
            area: this.buyInfo.str
          });
        }
        else {
          this.handleNormalBuyAction({
            numberId: this.curGoods.goodsNum,
            count: this.buyInfo.count,
            ticketId: v.ticketId
          });
        }
        // 将夺宝券清零
        this.ticketId = null;
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
      }
    }
  }
</script>
