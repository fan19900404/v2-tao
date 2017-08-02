<template>
  <div>
    <header-component :title="title"></header-component>
    <!--<div class="top_banner_replace"></div>-->
    <div class="top_banner" v-if="loggedIn">
      <div>
        <span class="taodouname">我的淘豆:</span>
        <span class="taodouval">{{user.taoDou | moneyWidthComma}}</span>
      </div>
      <i class="icon icon-what" @click="link({name: 'TaoYouTaoDouExplain'})"></i>
    </div>
    <div class="container" v-if="timerGift.length > 0">
      <div class="header">
        <span>限时优惠</span>
      </div>
      <ul class="present-list clearfix">
        <li class="item fl" v-for="(item,index) in timerGift" @click="link({name: 'TaoYouWelfareShopWelfareTimeDetails', params:{id: item.gid}})" :key="index">
          <div class="item__wrapper">
            <div class="item__img">
              <img :src="item.photograph">
            </div>
            <div class="item__name overflow-ellipsis">
              <i class="item__count--bg">限时</i>
              {{item.name}}
            </div>
            <div class="item__time">
              <span class="item__much">
                <i class="item__count--time"></i>
                <timer @timer-action="getNext" :endtime="parseInt(item.endTime) - parseInt(new Date().getTime()/1000)" :obj-style="{'color':'#333'}"></timer>
              </span>
            </div>
            <div class="item__exchange">
              <div class="item__exchange-price">
                <em>{{item.taoDou}}淘豆</em>
              </div>
              <div class="item__exchange-btn" v-if="item.uID==0 && item.taoDou==0" @click.stop="button(item)">领取</div>
              <div class="item__exchange-btn" v-if="item.uID==0 && item.taoDou>0" @click.stop="button(item)">兑换</div>
              <div class="item__exchange-btn item__exchange-btn--disabled" v-if="item.uID>0">已领</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="present" v-if="hotGift.inited && hotGift.list.length > 0">
      <div class="header">
        <span>物品兑换</span>
      </div>
      <ul class="present-list clearfix">
        <li class="item fl" v-for="(item,index) in hotGift.list.slice(0,4)" @click="link({name: 'TaoYouWelfareShopWelfareDetails', params:{id: item.id}})" :key="index">
          <div class="item__wrapper">
            <img class="item__img" :src="item.photograph">
            <div class="item__name overflow-ellipsis">{{item.name}}</div>
            <div class="item__exchange">
              <div class="item__exchange-price">
                <em>{{item.taoDou}}淘豆</em>
              </div>
              <div class="item__exchange-btn" v-if="item.uID==0 && item.taoDou==0" @click.stop="button(item)">领取</div>
              <div class="item__exchange-btn" v-if="item.uID==0 && item.taoDou>0" @click.stop="button(item)">兑换</div>
              <div class="item__exchange-btn item__exchange-btn--disabled" v-if="item.uID>0">已领</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="header" @click="link({name:'TaoYouWelfareShopWelfareExplain'})">
      <span>优惠券</span>
      <a class="use_explain JS-statistics-intro">
        <span class="icon icon-usage"></span>
        <span class="text">使用说明</span>
      </a>
    </div>
    <template v-if="ticket.inited && ticket.list.length>0">
      <ul class="JS-statistics-list" v-infinite-scroll="getTicketList()" infinite-scroll-distance="10" :infinite-scroll-disabled="ticket.loading || ticket.allLoaded" infinite-scroll-immediate-check="false">
        <li v-for="(ticket,index) in ticket.list" class="ticket" :key="index">
          <div class="ticket__left overflow-ellipsis">
            <p class="ticket__title overflow-ellipsis">{{ticket.name}}</p>
            <p class="ticket__reqire">满
              <span>{{ticket.remark}}</span>元可使用</p>
            <p class="ticket__date">有效期至
              <span>{{ticket.endTime | formatDate('YYYY-MM-DD HH:MM')}}</span>
            </p>
            <p class="ticket__remark">
              <!--需要-->
              <span>{{ticket.prize | moneyWidthComma}}淘豆</span>
            </p>
          </div>
          <div class="ticket__right">
            <div class="info">
              <a class="ticket__exchange JS-statistics-exchange" @click.stop="startExchange(ticket.last,ticket.prize,ticket.id,index)">兑换</a>
              <p class="ticket__remark2">剩余{{ticket.last}}张</p>
            </div>
          </div>
        </li>
      </ul>
      <p v-show="ticket.loading && !ticket.allLoaded" class="page-infinite-loading">
        <my-spinner type="fading-circle"></my-spinner>加载中
      </p>
    </template>
    <template v-if="ticket.inited && ticket.list.length==0">
      <no-record-component text="没有可兑换抵用券"></no-record-component>
    </template>
    <dialog-component :show="showDialog" content="兑换成功" left-btn-text="立即查看" right-btn-text="继续兑换" @two-btns-dialog-component-left="left" @two-btns-dialog-component-right="right"></dialog-component>
    <dialog-component :show="showDialogTaodou" :has-slot="true" left-btn-text="赚淘豆" right-btn-text="继续兑换" @two-btns-dialog-component-left="leftEvent" @two-btns-dialog-component-right="rightEvent">
      <div class="dialog-content" slot>
        <div class="result">兑换失败</div>
        <div class="reason">{{reason}}</div>
      </div>
    </dialog-component>
    <!--两个按钮的弹窗-->
    <two-button-dialog :show-title="showTitle" :content="content" :show="isShow" :has-slot="hasSlot" :left-btn-text="leftBtnText" :right-btn-text="rightBtnText" :show-close-btn="showCloseBtn" @two-btns-dialog-component-left="closeDialog" @two-btns-dialog-component-right="confirmOk" :btn-text="btnText">
      <div slot="addInner" v-if="hasSlot">
        <p class="p1">兑换此礼包需要消耗
          <span>{{count}}</span>淘豆</p>
        <p class="p2">是否兑换？</p>
        <p class="p3" @click="link({name:'TaoYouTaoDouExplain'})">什么是淘豆？</p>
      </div>
    </two-button-dialog>
    <toast :is-show="showToast" :toast-text="toastText"></toast>
    <return-btn></return-btn>
    <!-- 返回顶部 -->
    <back-top></back-top>
  </div>
</template>
<script>
import Vue from 'vue';
import { InfiniteScroll, Spinner } from 'mint-ui';
import { mapGetters, mapActions } from 'vuex';
import HeaderComponent from '../../../oldComponents/tao-you/layout/header.component';
import DialogComponent from '../../../oldComponents/tao-you/dialog/two-buttons-simple-dialog.component';
import DialogComponentSurplus from '../../../oldComponents/tao-you/dialog/one-button-simple-dialog.component';
import ProgressComponent from '../../../oldComponents/tao-you/svg-progress/svg-progress.component';
import LoadList from '../../../oldComponents/tao-you/loadlist/LoadList';
import NoRecordComponent from '../../../oldComponents/tao-you/no-record/no-record.component';
// import { user } from '../../../vuex/getters';
// import { getUserInfo, updateUserInfo } from '../../../vuex/actions';

import ReturnBtn from '../../../oldComponents/tao-you/button/return.component';
import TwoButtonDialog from '../../../oldComponents/tao-you/dialog/two-buttons-link-dialog.component';
import Toast from '../../../oldComponents/tao-you/toast/toast.component';

// 统计代码
import Statistics from '../statistics/personal-center/welfare.statistics';
// 添加回到顶部
import BackTop from '../../../oldComponents/tao-you/button/back-top.component';
// 倒计时
import Timer from '../../../oldComponents/tao-you/timer/date-timer.component';

Vue.component('my-spinner', Spinner);
Vue.use(InfiniteScroll);

export default {
  data() {
    return {
      title: '淘豆商城',
      ticket: {},
      hotGift: {},
      timerGift: [],
      tapAction: true,
      showDialog: false,
      showDialogSurplus: false,
      showDialogTaodou: false,
      reason: '',
      // taodou:0,
      currentItem: null,
      // 需要多少淘豆兌換,后端传入
      count: null,
      // 是否显示弹窗
      isShow: false,
      // 弹窗内容
      content: '很遗憾，你的淘豆不足够兑换',
      // 是否显示其他内容
      hasSlot: true,
      // 弹窗左边按钮文字
      leftBtnText: '',
      // 弹窗右边按钮文字
      rightBtnText: '',
      // 是否显示关闭icon
      showCloseBtn: true,
      btnText: '兑换失败',
      // 弹窗动作类型
      cancel: true,
      // 是否显示弹窗头部
      showTitle: false,
      // 兑换结果
      toastText: '',
      // 是否显示toast
      showToast: false,
      currentGift: {},
    };
  },
  computed: {
    ...mapGetters(['user']),
    loggedIn() {
      return mallUtils.checkLoggedIn();
    },
  },
  components: {
    ReturnBtn,
    HeaderComponent,
    DialogComponent,
    DialogComponentSurplus,
    InfiniteScroll,
    ProgressComponent,
    NoRecordComponent,
    BackTop,
    TwoButtonDialog,
    Toast,
    Timer,
  },
  methods: {
    ...mapActions(['getUserInfo', 'updateUserInfo']),
    link(url) {
      this.$router.push(url);
    },
    button(item) {
      this.count = parseInt(item.taoDou) > 0 ? parseInt(item.taoDou) : 0;
      this.currentGift = item;
      if (!this.count) {
        this.exchange(item);
        return;
      }
      if (this.count > parseInt(this.user.taoDou)) {
        this.hasSlot = false;
        this.showTitle = true;
        this.btnText = '兑换失败';
        this.content = '很遗憾，你的淘豆不足够兑换该礼品';
        this.leftBtnText = '兑换其他商品';
        this.rightBtnText = '赚淘豆';
        this.isShow = true;
        this.cancel = false;
        return;
      }
      this.leftBtnText = '取消';
      this.rightBtnText = '兑换';
      this.isShow = true;
      this.cancel = true;
    },
    // 取消
    closeDialog() {
      this.isShow = false;
    },
    // 用户确认
    confirmOk() {
      this.isShow = false;
      if (this.cancel) {
        this.exchange(this.currentGift);
      } else {
        this.$router.push({
          name: 'TaoYouPersonalCenterTaodouMatch',
        });
      }
    },
    // 兑换方法
    exchange(item) {
      const query = {
        id: item.id,
      };
      Vue.ClientHttp().GET(query, Vue.ClientUrl.packs_exchange)
        .then((res) => {
          if (res.code == 10000) {
            if (item.genre == 1) {
              this.$router.push({
                name: 'TaoYouPacksResult',
                params: { id: this.$route.params.id },
              });
            } else {
              this.toastText = res.msg;
              this.showToast = true;
            }
            item.uID = 1;
            this.updateUserInfo({ taoDou: this.user.taoDou - parseInt(item.taoDou) });
          } else {
            this.toastText = res.msg || '兑换失败';
            this.showToast = true;
          }
        });
    },
    // 获取热门礼包列表
    getGifts() {
      this.hotGift.getList();
    },
    getProgress(used, total) {
      const left = used;
      const progress = parseInt((left / total) * 100);
      return progress;
    },
    // 礼品兑换
    exchangeGift(item) {

    },
    startExchange(surplus, needTaodou, tid, index) {
      if (!mallUtils.checkLoggedIn(this)) {
        return;
      }
      if (!this.tapAction)
        return;
      this.tapAction = false;
      if (surplus == "0") {
        this.showDialogTaodou = true;
        this.reason = '抵扣券库存不足!';
        this.tapAction = true;
      } else if (parseInt(needTaodou) > this.user.taoDou) {
        this.showDialogTaodou = true;
        this.reason = '淘豆数量不足!';
        this.tapAction = true;
      } else {
        var _this = this;
        _this.currentItem = {
          index: index,
          taodou: needTaodou
        }
        Vue.ClientHttp(this).GET({ tID: tid, platForm: 1 }, Vue.ClientUrl.do_exchange).then(res => {
          if (10000 !== res.code) {
            return;
          }
          _this.ticket.list[_this.currentItem.index].last--
          // _this.taodou-=parseInt(_this.currentItem.taodou)
          this.updateUserInfo({ taoDou: parseInt(this.user.taoDou) - parseInt(_this.currentItem.taodou) });
          this.showDialog = true;
          this.tapAction = true;
        }, err => {
          this.tapAction = true;
        })
      }
    },
    getTicketList() {
      this.ticket.getList();
    },
    right() {
      this.showDialog = false;
    },
    left() {
      this.$router.push({ name: 'TaoYouPersonalCenterRebate' });
    },
    leftEvent() {
      this.$router.push({ name: 'TaoYouPersonalCenterTaodouMatch' });
    },
    rightEvent() {
      this.showDialogTaodou = false;
    },
    removeHtmlTag(str) {
      return str.replace(/<[^>]+>/g, '');
    },
    // 倒计时结束后执行
    getNext() {
      //
    },
    // 获取限时商品列表
    getTimeGift() {
      Vue.ClientHttp().GET({}, Vue.ClientUrl.welfare_time_list)
        .then((res) => {
          if (res.code == 10000) {
            this.timerGift = res.result;
          }
        });
    },
    // 是否开启限时优惠列表
    showTimeGift() {
      Vue.ClientHttp().GET({}, Vue.ClientUrl.show_time_welfare)
        .then((res) => {
          if (res.code == 10000) {
            if (res.status == 1) {
              this.getTimeGift();
            }
          }
        });
    },
  },
  mounted() {
    this.ticket = new LoadList(Vue.ClientUrl.exchangebleList, {
      platForm: 1, // 淘助手
      nologin: 1,
    });
    this.hotGift = new LoadList(Vue.ClientUrl.welfare_list, {
      hot: 1,
      nologin: 1,
      genre: 2,
    });

    this.getUserInfo();
    this.getTicketList();
    this.getGifts();
    this.showTimeGift();
    $('body').css({ 'background-color': '#f5f5f9' });

    Statistics(this);
  },
};
</script>
<style lang="scss" scoped>
@import "../../../assets/tao-you/common.scss";
.p1 {
  height: .16rem;
  font-size: .16rem;
  color: #333333;
  text-align: center;
  span {
    color: #ff4a4a;
  }
}

.p2 {
  height: .16rem;
  font-size: .16rem;
  color: #333333;
  text-align: center;
  padding-top: .05rem;
  padding-bottom: .10rem;
}

.p3 {
  height: .13rem;
  font-size: .13rem;
  color: #a5a5a5;
  text-align: center;
}

.top_banner_replace {
  height: .44rem;
  margin-bottom: .15rem;
}

.top_banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 .15rem;
  overflow: hidden;
  background-color: $white;
  height: .44rem;
  line-height: .44rem;
  /*position: fixed;*/
  width: 100%;
  max-width: 640px;
  box-sizing: border-box;
  z-index: 100;
  /*top: 0;*/
  border-bottom: 1px solid #e5e5e5;
  i {
    font-size: .2rem;
    color: #ccc;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: .42rem;
  line-height: .42rem;
  padding: 0 .15rem;
  border-bottom: 1px solid $primary-border;
  font-size: .16rem;
  color: #333;
  background-color: #fff;
  .icon-usage {
    font-size: .16rem;
    color: #ccc;
    margin-right: .05rem;
  }
  .text {
    font-size: .13rem;
    color: #ccc;
  }
}

.taodouname {
  color: #333333;
  float: left;
  font-size: $font-size-lg;
}

.taodouval {
  font-size: $font-size-lg;
  float: left;
  color: #ff4a4a;
}

.gift-container {
  margin-bottom: .15rem;
}

.present {
  margin-top: .15rem;
  margin-bottom: .15rem;
  background-color: #fff;
  .item {
    &__wrapper {
      padding: .06rem .15rem .12rem .15rem;
      border-bottom: solid #e5e5e5 1px;
      box-sizing: border-box;
    }
    width: 50%;
    &:nth-last-child(1),
    &:nth-last-child(2) {
      .item__wrapper {
        /*border-bottom: solid #e5e5e5 1px;*/
      }
    }
    &:nth-child(2n+1) {
      .item__wrapper {
        padding-right: .15rem;
        border-right: solid #e5e5e5 1px;
        /*border-bottom: solid #e5e5e5 1px;*/
      }
    }
    &:nth-child(2n) {
      .item__wrapper {
        padding-left: .15rem;
      }
    } // width: 50%;
    &__img-wrapper {
      img {
        width: 100%;
        height: auto;
      }
    }
    &__name,
    &__exchange {
      margin-top: .12rem;
    }
    &__name {
      font-size: .14rem;
      height: .14rem;
      line-height: 1em;
      color: #333;
    }
    &__exchange {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #a5a5a5;
    }
    &__exchange-price em {
      font-size: .13rem;
      height: .13rem;
      line-height: 1em;
      color: #ff4a4a;
    }
    &__exchange-btn {
      display: inline-block;
      width: .37rem;
      height: .21rem;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      line-height: .21rem;
      text-align: center;
      border: 1px solid #cccccc;
      border-radius: 0.04rem;
      font-size: .12rem;
      color: #333;
      &--disabled {
        color: #adadad;
        background-color: #f0f0f0;
        border: none;
      }
    }
  }
}

.container {
  margin-top: .15rem;
  margin-bottom: .15rem;
  background-color: #fff;
  .item {
    width: 50%;
    &__wrapper {
      padding: .10rem .15rem .12rem .15rem;
      border-bottom: solid #e5e5e5 1px;
      box-sizing: border-box;
    }
    &:nth-last-child(1),
    &:nth-last-child(2) {
      .item__wrapper {
        /*border-bottom: solid #e5e5e5 1px;*/
      }
    }
    &:nth-child(2n+1) {
      .item__wrapper {
        padding-right: .15rem;
        border-right: solid #e5e5e5 1px;
        /*border-bottom: solid #e5e5e5 1px;*/
      }
    }
    &:nth-child(2n) {
      .item__wrapper {
        padding-left: .15rem;
      }
    } // width: 50%;
    &__img-wrapper {}
    &__img {
      width: 0.8234666666666665rem;
      height: auto;
      margin: 0 auto;
      img {
        display: block;
        height: 100%;
        width: 100%;
      }
    }
    &__name,
    &__exchange {
      margin-top: .10rem;
    }
    &__name {
      font-size: .14rem;
      height: .21rem;
      line-height: .21rem;
      color: #333;
      display: inline-flex;
      align-items: center;
      width: 96%;
    }
    &__exchange {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #a5a5a5;
    }
    &__exchange-price em {
      font-size: .13rem;
      height: .13rem;
      line-height: 1em;
      color: #ff4a4a;
    }
    &__exchange-btn {
      display: inline-block;
      width: .37rem;
      height: .21rem;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      line-height: .21rem;
      text-align: center;
      border: 1px solid #cccccc;
      border-radius: 0.04rem;
      font-size: .12rem;
      color: #333;
      &--disabled {
        color: #adadad;
        background-color: #f0f0f0;
        border: none;
      }
    }
    &__count--bg {
      display: inline-block;
      height: .16rem;
      width: .30rem;
      background: #00C1B3;
      border-radius: 0.02rem;
      font-size: .11rem;
      color: #FFFFFF;
      line-height: .16rem;
      text-align: center;
      margin-right: 0.03rem;
    }
    &__much {
      font-size: .13rem;
      color: #a5a5a5;
      display: inline-flex;
      align-items: center;
      height: .17rem;
    }
    &__count--time {
      display: inline-block;
      height: .140rem;
      width: .130rem;
      color: #a5a5a5;
      margin-right: 0.03rem;
      background-image: url("/static/images/tao-you/welfare-shop/welfare-b.png");
      background-size: 100% 100%;
    }
    &__time {
      height: .17rem;
      line-height: .17rem;
      padding-top: .08533333333333333rem;
    }
  }
}

.gift {
  height: 0.735rem;
  background-color: #fff;
  display: flex;
  padding-left: .15rem;
  padding-right: .15rem;
  &:not(:last-child) {
    border-bottom: 1px solid #e5e5e5;
  }
  &__left {
    display: flex;
    flex: 1;
  }
  &__right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: .6rem;
  }
  &__progress {
    position: relative;
    width: .39rem;
    height: .39rem;
  }
  &__progress-text {
    position: absolute;
    font-size: .11rem;
    color: #00c1b3;
    width: .24rem;
    height: .13rem;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    line-height: .13rem;
    &--disabled {
      color: #ccc;
    }
  }
  &__img {
    display: block;
    width: .43rem;
    height: .43rem;
    margin-top: .1rem;
    border-radius: .05rem;
  }
  &__intro {
    flex: 1;
    width: 1.72rem;
    margin-top: .1rem;
    padding-left: .1rem;
    padding-right: .19rem;
  }
  &__name {
    width: 1.72rem;
    height: .16rem;
    line-height: 1em;
    font-size: .16rem;
    /* px*/
    color: #333;
  }
  &__type,
  &__platform {
    width: 1.72rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: .05rem;
    height: .14rem;
    line-height: .14rem;
    font-size: .14rem;
    /* px */
    color: #a5a5a5;
  }
}

.ticket {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid $primary-border;
  padding: .1rem .15rem;
  box-sizing: border-box;
  height: 0.945rem;
  &__left {
    flex: 1;
  }
  &__right {
    width: .75rem;
    display: flex;
    justify-content: flex-end;
  }
  &__title {
    font-size: .16rem;
    color: #000;
  }
  &__reqire,
  &__date,
  &__remark {
    font-size: .13rem;
    color: #a5a5a5;
  }
  &__remark span {
    color: #ff4a4a;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    height: .48rem;
  }
  &__exchange {
    display: block;
    font-size: $font-size-sm;
    color: #333;
    border: 1px solid #cccccc;
    width: .43rem;
    height: .24rem;
    border-radius: .04rem;
    text-align: center;
    line-height: .24rem;
    z-index: 2;
  }
  &__remark2 {
    font-size: .12rem;
    color: #a5a5a5;
  }
}

.dialog-content {
  color: #333;
  font-size: .14rem;
  text-align: center;
  .result {
    height: .16rem;
    font-size: .16rem;
    line-height: 1em;
    margin-bottom: .07rem;
    padding-left: .25rem;
    padding-right: .25rem;
  }
  .reason {
    height: .14rem;
    font-size: .14rem;
    line-height: 1em;
  }
}

.gift__progress-text--new {
  color: #00C1B3;
}

.gift__progress-text--old {
  color: #a5a5a5;
}
</style>
