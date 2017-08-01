<template>
  <div>
    <header-component :title="title"></header-component>
    <div class="navbar">
      <a class="tab-item" @click="getInitData(0)" :class="{'is-selected': 0 === tabIndex}">我的优惠券({{ couponTotalCount }})</a>
      <a class="tab-item" @click="getInitData(1)" :class="{'is-selected': 1 === tabIndex}">我的礼包({{ giftTotalCount }})</a>
      <a class="tab-item" @click="getInitData(2)" :class="{'is-selected': 2 === tabIndex}">平台礼包码({{ platformGiftTotalCount }})</a>
    </div>
    <div class="tab-containers">
      <div v-show="0 === tabIndex" class="tab-container">
        <a @click="link({name:'TaoYouWelfareShopWelfareExplain'})" class="use_explain JS-statistics-intro">使用说明</a>
        <template v-if="coupon.inited && coupon.list.length>0">
          <ul v-infinite-scroll="getCouponList" infinite-scroll-distance="10" :infinite-scroll-disabled="coupon.loading" infinite-scroll-immediate-check="false">
            <template v-for="(ticket,index) in coupon.list">
              <li v-if="ticket.status==0" class="ticket_unused ticket" :key="index">
                <p class="ticket_value">{{ticket.prize}}</p>
                <p class="ticket_title">{{ticket.name}}</p>
                <p class="ticket_reqire">{{ticket.remark}}</p>
                <p class="ticket_date">有效期至{{ticket.endTime}}</p>
                <p class="ticket_remark">可使用</p>
                <img class="ticket_bg" src="/static/images/tao-you/personal-center/unuse-bg.png">
              </li>
              <li v-if="ticket.status==1" class="ticket_used ticket" :key="index">
                <p class="ticket_value">{{ticket.prize}}</p>
                <p class="ticket_title">{{ticket.name}}</p>
                <p class="ticket_reqire">{{ticket.remark}}</p>
                <p class="ticket_date">有效期至{{ticket.endTime}}</p>
                <p class="ticket_remark">已使用</p>
                <img class="ticket_bg" src="/static/images/tao-you/personal-center/use-bg.png">
              </li>
              <li v-if="ticket.status==2" class="ticket_used ticket" :key="index">
                <p class="ticket_value">{{ticket.prize}}</p>
                <p class="ticket_title">{{ticket.name}}</p>
                <p class="ticket_reqire">{{ticket.remark}}</p>
                <p class="ticket_date">有效期至{{ticket.endTime}}</p>
                <p class="ticket_remark">已过期</p>
                <img class="ticket_bg" src="/static/images/tao-you/personal-center/used-bg.png">
              </li>
            </template>
          </ul>
          <p v-show="coupon.loading && !coupon.allLoaded" class="page-infinite-loading">
            <my-spinner type="fading-circle"></my-spinner>加载中
          </p>
        </template>
        <template v-if="coupon.inited && coupon.list.length==0">
          <div class="list-no-data">
            <no-record-component text="您当前还没有抵扣券哦"></no-record-component>
          </div>
        </template>
      </div>
      <div v-show="1 === tabIndex" class="tab-container">
        <template v-if="gift.inited && gift.list.length>0">
          <ul class="gift-list" v-infinite-scroll="getMyGiftList" :infinite-scroll-disabled="gift.loading || gift.allLoaded" infinite-scroll-immediate-check="false">
            <li class="gift" v-for="(item,index) in gift.list" @click="link({name: 'TaoYouPacksDetails', params: {id: item.id}})" :key="index">
              <div class="gift__left">
                <img class="gift__img" :src="item.image" alt="">
                <div class="gift__intro">
                  <div class="gift__name overflow-ellipsis">{{ item.gameName }}</div>
                  <div class="gift__type overflow-ellipsis">{{ item.name }}</div>
                  <div class="gift__platform overflow-ellipsis">兑换码:{{ item.no }}</div>
                </div>
              </div>
              <div class="gift__right">
                <a class="gift__btn" @click.stop="displayCode(item.no)">查看</a>
              </div>
            </li>
          </ul>
          <p v-show="gift.loading && !gift.allLoaded" class="page-infinite-loading">
            <my-spinner type="fading-circle"></my-spinner>加载中
          </p>
        </template>
        <template v-if="gift.inited && gift.list.length==0">
          <div class="list-no-data">
            <no-record-component text="您当前还没有礼包哦"></no-record-component>
          </div>
        </template>
      </div>
      <div v-show="2 === tabIndex" class="tab-container">
        <template v-if="platformGift.inited && platformGift.list.length>0">
          <ul class="gift-list gift-list--platform" v-infinite-scroll="getPlatformGiftList" :infinite-scroll-disabled="platformGift.loading || platformGift.allLoaded" infinite-scroll-immediate-check="false">
            <li class="gift" v-for="(item,index) in platformGift.list" :key="index">
              <div class="gift__left">
                <div class="gift__intro">
                  <div class="gift__name overflow-ellipsis">{{ item.title }}</div>
                  <div class="gift__platform overflow-ellipsis">兑换码:{{ item.code }}</div>
                  <div class="gift__type gift__type--multiline overflow-ellipsis-multiline">{{ item.desc }}</div>
                </div>
              </div>
              <div class="gift__right">
                <a class="gift__btn gift__btn--disabled" v-if="item.status==3">已使用</a>
                <a class="gift__btn" @click.stop="usePlatformGiftCode(item)" v-else>使用</a>
              </div>
            </li>
          </ul>
          <p v-show="platformGift.loading && !platformGift.allLoaded" class="page-infinite-loading">
            <my-spinner type="fading-circle"></my-spinner>加载中
          </p>
        </template>
        <template v-if="platformGift.inited && platformGift.list.length==0">
          <div class="list-no-data">
            <no-record-component text="暂无可用的平台礼包码"></no-record-component>
          </div>
        </template>
      </div>
    </div>
    <dialog-component :show="showDialog" :has-slot="true" left-btn-text="关闭" :show-right-btn="false" :show-close-btn="false" @two-btns-dialog-component-left="close">
      <div class="dialog-content" slot>
        <p class="desc">长按复制使用</p>
        <p class="code">{{ code }}</p>
      </div>
    </dialog-component>

    <return-btn></return-btn>
    <!-- 返回顶部 -->
    <back-top></back-top>
  </div>
</template>
<script>
import Vue from 'vue';
import { InfiniteScroll, Spinner, Toast } from 'mint-ui';
import HeaderComponent from '../../../components/tao-you/layout/header.component';
import ReturnBtn from '../../../components/tao-you/button/return.component';
import LoadList from '../../../components/tao-you/loadlist/LoadList';
import NoRecordComponent from '../../../components/tao-you/no-record/no-record.component';
import DialogComponent from '../../../components/tao-you/dialog/two-buttons-simple-dialog.component';

// 统计代码
import Statistics from '../statistics/personal-center/rebate.statistics';
// 添加回到顶部
import BackTop from '../../../components/tao-you/button/back-top.component';

Vue.component('my-spinner', Spinner);
Vue.use(InfiniteScroll);

export default {
  data() {
    return {
      title: '',
      coupon: {},
      couponTotalCount: 0,
      gift: {},
      giftTotalCount: 0,
      platformGift: {},
      platformGiftTotalCount: 0,
      tabIndex: 0,
      // 礼包码弹窗
      showDialog: false,
      code: '',
    };
  },
  components: {
    HeaderComponent,
    InfiniteScroll,
    ReturnBtn,
    DialogComponent,
    NoRecordComponent,
    BackTop,
  },
  methods: {
    link(url) {
      this.$router.push(url);
    },
    getInitData(index) {
      this.tabIndex = index;
    },
    getCouponList(force) {
      if (this.tabIndex != 0 && !force) {
        return;
      }
      this.coupon.getList(this, (res) => {
        this.couponTotalCount = res.count;
      });
    },
    getMyGiftList(force) {
      if (this.tabIndex != 1 && !force) {
        return;
      }
      this.gift.getList(this, (res) => {
        this.giftTotalCount = res.count;
      });
    },
    getPlatformGiftList(force) {
      if (this.tabIndex != 2 && !force) {
        return;
      }
      this.platformGift.getList(this, (res) => {
        this.platformGiftTotalCount = res.count;
      });
    },
    close() {
      this.showDialog = false;
    },
    displayCode(no) {
      this.code = no;
      this.showDialog = true;
      return false;
    },
    usePlatformGiftCode(item) {
      Vue.ClientHttp(this).GET({
        code: item.code,
      }, Vue.ClientUrl.exchange_platform_gift)
        .then((res) => {
          if (res.code === 10000) {
            Toast(res.msg || '使用成功！');
            item.isUsed = 1;
          }
        });
    },
  },
  mounted() {
    this.coupon = new LoadList(Vue.ClientUrl.my_rebate_ticket_list, {});
    this.gift = new LoadList(Vue.ClientUrl.my_gift_list, {});
    this.platformGift = new LoadList(Vue.ClientUrl.my_platform_list, {});

    this.getCouponList(1);
    this.getMyGiftList(1);
    this.getPlatformGiftList(1);
    Statistics(this);
  },
};
</script>
<style lang="scss" scoped>
@import "../../../assets/tao-you/common.scss";
.navbar {
  background-color: #fff;
  display: flex;
  text-align: center;
  &--fixed {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
  }
  &--normal {
    position: static;
  }
}

.navbar .tab-item.is-selected {
  border-bottom: 2px solid #00c1b3;
  color: #00c1b3;
}

.navbar .tab-item {
  display: block;
  height: 0.435rem;
  line-height: 0.435rem;
  flex: 1;
  font-size: 0.14rem;
  color: #666;
}

.navbar .tab-item:last-child {
  border-right: 0;
}

.tab-containers {
  margin-top: .15rem;
}

.exchange_link {
  float: right;
  margin: .14rem .16rem;
  background-color: $primary;
  color: #FFFFFF;
  font-size: $font-size-md;
  height: .25rem;
  line-height: .25rem;
  display: block;
  width: .84rem;
  text-align: center;
  border-radius: .04rem;
  font-size: $font-size-sm;
}

.use_explain {
  margin: .14rem;
  font-size: $font-size-sm;
  color: #cccccc;
  text-align: right;
  display: block;
  position: relative;
}

.use_explain:before {
  position: absolute;
  font-family: icons !important;
  content: '\1f33e';
  right: .6rem;
}

.norebate_img {
  width: 1.3rem;
  margin: .94rem auto .16rem auto;
  display: block;
}

.norebate_p {
  color: #a5a5a5;
  font-size: $font-size-lg;
  text-align: center;
  margin-top: .08rem;
}

.exchange_a {
  color: $white;
  font-size: .2rem;
  background-color: $primary;
  display: block;
  width: 2.9rem;
  height: .43rem;
  line-height: .43rem;
  margin: .36rem auto;
  text-align: center;
  border-radius: .05rem;
}

.ticket {
  height: 1.22rem;
  margin: 0 .15rem 0.14rem .15rem;
  position: relative;
  background-size: 100% 100%;
  overflow: hidden;
}

.ticket_used {
  background-image: url('/static/images/tao-you/personal-center/ticket-used.png');
}

.ticket_unused {
  background-image: url('/static/images/tao-you/personal-center/ticket-unuse.png');
}

.ticket_value {
  font-size: .24rem;
  position: absolute;
  right: .18rem;
  top: .06rem;
}

.ticket_unused .ticket_value {
  color: #f4333c;
}

.ticket_used .ticket_value {
  color: #cccccc;
}

.ticket_unused .ticket_value:before {
  content: "\A5";
  font-size: .16rem;
  margin-right: .04rem;
}

.ticket_used .ticket_value:before {
  color: #cccccc;
  content: "\A5";
  font-size: .07rem;
  margin-right: .04rem;
}

.ticket_title {
  margin: .18rem 0 .06rem .23rem;
  font-size: $font-size-lg;
  line-height: 1.2;
  width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ticket_unused .ticket_title {
  color: #000000;
}

.ticket_used .ticket_title {
  color: #a5a5a5;
}

.ticket_reqire {
  color: #a5a5a5;
  margin-left: .23rem;
  line-height: 1.6;
  font-size: .12rem;
}

.ticket_date {
  color: #a5a5a5;
  line-height: 1.6;
  margin-left: .23rem;
  font-size: .12rem;
}

.ticket_remark {
  color: #a5a5a5;
  margin: .15rem 0 0 .23rem;
  font-size: .12rem;
}

.ticket_bg {
  position: absolute;
  width: .75rem;
}

.ticket_unused .ticket_bg {
  top: .32rem;
  right: .05rem;
}

.ticket_used .ticket_bg {
  top: .26rem;
  right: .2rem;
}







/* 我的礼包、平台礼包 */

.gift {
  min-height: 0.765rem;
  background-color: #fff;
  display: flex;
  padding-left: .15rem;
  padding-right: .15rem;
  &:not(:last-child) {
    border-bottom: 1px solid #e5e5e5;
    /* no */
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
    line-height: .16rem;
    font-size: .16rem;
    /* px*/
    color: #333;
  }
  &__type,
  &__platform {
    width: 2.02rem; // overflow: hidden;
    // text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: .07rem;
    height: .14rem;
    line-height: .14rem;
    font-size: .14rem;
    /* px */
    color: #a5a5a5;

    &--multiline {
      white-space: initial;
      height: auto;
      max-height: .28rem;
      margin-bottom: .1rem;
    }
  }
  &__btn {
    display: inline-block;
    box-sizing: border-box;
    width: .46rem;
    height: .25rem;
    line-height: .25rem;
    color: #333;
    font-size: .13rem;
    /*px*/
    text-align: center;
    border: solid #f0f0f0 1px;
    /*no*/
    background-color: #fff;
    border-radius: .04rem;

    &--disabled {
      width: .57rem;
      color: #adadad;
      background-color: #f0f0f0;
    }
  }
}

.gift-list--platform {
  .gift__intro {
    padding-left: 0;
  }
}

.list-no-data {
  padding-top: .735rem;
}






/* 礼包吗弹框 */

.dialog-content {
  color: #333;
  text-align: center;
  word-break: break-all;

  p {
    line-height: .25rem;
  }
  .desc {
    font-size: .16rem;
    height: .16rem;
    line-height: 1em;
    margin-bottom: .09rem;
  }
  .code {
    user-select: all;
    font-size: .13rem;
    max-height: .26rem;
    line-height: 1em;
    padding: .05rem .03rem;
    background-color: #f0f0f0;
  }
}
</style>
