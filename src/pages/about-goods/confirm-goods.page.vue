<template>
  <div>
    <app-header :title="title" :action="'confirmGoods'"></app-header>
    <!--<app-header :title="title"></app-header>-->
    <div class="confirm-goods-container">
      <div class="cgc-title">
        <div class="goods-info dr-flex">
          <div class="img-wrap">
            <img class="img" src="{{pd.image}}">
          </div>
          <div class="user-wrap flex-1 dr-flex">
            <div class="msg-container">
              <div class="top-msg">{{pd.title | substr 12 '...'}}</div>
              <div class="bottom-msg">
                我已参与:
                <span class="c-red">{{pd.joinNum}}</span>人次
              </div>
            </div>
          </div>
        </div>
        <div class="goods-status">
          商品状态:
          <span v-if="(+pd.isShow)" class="c-red">已经晒单</span>
          <!-- 虚拟物品 -->
          <span v-show="pd.virtual && ( 0 === +pd.deliver) && !(+pd.isShow)" class="c-red">正在处理中</span>
          <span v-show="pd.virtual && ( 1 === +pd.deliver) && !(+pd.isShow)" class="c-red">卡密已派发</span>
          <!-- 现实物品 -->
          <span v-show="!pd.virtual && ( 0 === +pd.deliver) && !(+pd.isShow)" class="c-red">正在处理中</span>
          <span v-show="!pd.virtual && ( 1 === +pd.deliver) && !(+pd.isShow)" class="c-red">已发货</span>
        </div>
      </div>

      <div class="goods-track">
        <div class="gt-title">
          商品追踪
        </div>
        <div class="track-area dr-flex">
          <div class="left-timeline"></div>
          <div class="right-content flex-1">

            <!-- 共用获得物品 -->
            <div class="period dr-flex">
              <div class="p-congratulation flex-1">恭喜您，获得该商品</div>
              <div class="p-date">{{pd.date}}</div>

              <!-- timeline-->
              <div v-if="pd.virtual" class="hack-timeline-container bg-c-main">
                <div class="timeline-self timeline-self-active timeline-self-last-active"></div>
              </div>
              <div v-if="!pd.virtual" class="hack-timeline-container" :class="{
                    'bg-c-normal': (3 === +pd.status) && !pd.isShow,
                    'bg-c-main': (4 === +pd.status) || pd.isShow
                  }">
                <div class="timeline-self timeline-self-active" :class="{
                      'timeline-self-last-normal':(3 === +pd.status) && !pd.isShow,
                      'timeline-self-last-active':(4 === +pd.status) || pd.isShow
                     }"></div>
              </div>

            </div>

            <!-- 实物订单号 -->
            <div v-if="!pd.virtual" v-show="4 === +pd.status" class="period">
              <p class="common-title">物流订单</p>
              <p class="p-detail mt-1">订单号: {{pd.transportNumber}}</p>
              <p class="p-detail mt-1">请在中奖3个工作日内
                <a v-link="'/personal/service'">联系客服</a>确认收货地址。</p>

              <!--timeline-->
              <div class="hack-timeline-container" :class="{
                    'bg-c-normal': (3 === +pd.status) || !pd.isShow,
                    'bg-c-main': (4 === +pd.status) && pd.isShow
                  }">
                <div class="timeline-self" :class="{
                      'timeline-self-last-normal':(3 === +pd.status) || !pd.isShow,
                      'timeline-self-last-active':(4 === +pd.status) && pd.isShow
                     }"></div>
              </div>
            </div>

            <!-- 虚拟物品使用卡密 -->
            <div v-if="pd.virtual" class="period">
              <p class="common-title">已选择使用方式</p>
              <p class="p-detail mt-1">已选择: 使用卡密</p>

              <!-- timeline-->
              <div v-if="pd.virtual" class="hack-timeline-container" :class="{
                    'bg-c-normal': (3 === +pd.status) && !pd.isShow,
                    'bg-c-main': (4 === +pd.status) || pd.isShow
                  }">
                <div class="timeline-self" :class="{
                      'timeline-self-last-normal':(3 === +pd.status) && !pd.isShow,
                      'timeline-self-last-active':(4 === +pd.status) || pd.isShow
                     }"></div>
              </div>
            </div>

            <!-- 虚拟物品卡号密码 -->
            <div v-if="pd.virtual" v-show="4 === +pd.status" class="period">
              <div class="dr-flex">
                <div class="p-congratulation flex-1 c-red">卡已派发</div>
                <div class="p-date">{{pd.lastDate}}</div>
              </div>
              <div class="dr-flex mt-1 f-12">
                <div class="p-normal flex-1">您获得了一张话费充值卡(长按内容复制)</div>
                <div v-link="{name: 'intro-virtual-card'}" class="color-blue">使用说明</div>
              </div>
              <div class="card-detail mt-06">
                <div class="cd-num cd-item dr-flex">
                  <div class="info">卡号:</div>
                  <div class="dt flex-1 dt-copy">
                    <span class="c-red">{{pd.cardNumber}}</span>
                    <!--<input class="c-red-copy c-red-cardNumber" v-model="pd.cardNumber" />-->
                  </div>
                  <div id="card-no" data-clipboard-text="{{pd.cardNumber}}" class="copy-btn color-blue">
                    复制
                    <span class="icon copy-guide icon-guide color-blue"></span>
                  </div>
                </div>
                <div class="cd-pwd cd-item dr-flex">
                  <div class="info">密码:</div>
                  <div class="dt flex-1">
                    <span class="c-red dt-copy">{{showPwd}}
                      <!--<input class="c-red-copy c-red-cardSecret" v-model="pd.cardSecret" />-->
                    </span>
                    <span @click="hidePwd" class="toggle-pwd" :class="{
            'tp-show': !togglePwdStatus,
            'tp-hide': togglePwdStatus
          }"></span>
                  </div>

                  <div id="card-pwd" data-clipboard-text="{{pd.cardSecret}}" class="copy-btn color-blue">
                    复制
                    <span class="icon copy-guide icon-guide color-blue"></span>
                  </div>
                </div>
                <div class="cd-to cd-item dr-flex">
                  <div class="info">充值到:</div>
                  <div class="dt flex-1">
                    <span @click="showUseInfo" class="c-red cd-phone-cost">话费</span>
                  </div>
                </div>
              </div>

              <!-- timeline-->
              <div class="hack-timeline-container" :class="{
                    'bg-c-normal': (3 === +pd.status) || !pd.isShow,
                    'bg-c-main': (4 === +pd.status) && pd.isShow
                  }">
                <div class="timeline-self" :class="{
                      'timeline-self-last-normal':(3 === +pd.status) || !pd.isShow,
                      'timeline-self-last-active':(4 === +pd.status) && pd.isShow
                     }"></div>
              </div>
            </div>

            <!-- 共用晒单 -->
            <div class="period dr-flex p-share-container">
              <div class="dr-flex flex-1 share-msg">
                <p class="common-title">晒单</p>
                <p class="p-detail mt-1">晒单时请勿泄漏隐私信息</p>
              </div>
              <div v-if="isShow !== 1" v-link="{
                name: 'share-order',
                params: {
                  id: $route.params.id
                },
                query: {
                  isShow: pd.isShowNotice
                }
              }" class="share-btn">晒单</div>

              <div v-if="1 === isShow" class="share-btn-off">晒单</div>

            </div>
          </div>
        </div>
      </div>
      <common-alert :show-alert="showAlert" :type="type"></common-alert>

      <!-- 底部的去下一期 -->
      <next-term :is-subarea="pd.goodsType" :id="pd.nextID"></next-term>

      <!-- 返回按钮 -->
      <go-back></go-back>

      <app-bottom-bar></app-bottom-bar>
    </div>
</template>

<style scoped>
.confirm-goods-container {
  user-select: text!important;
}

.bg-c-main {
  background-color: #ff4a4a;
}

.bg-c-normal {
  background-color: #898989;
}

.hack-timeline-container {
  position: absolute;
  left: -1.6rem;
  top: 3rem;
  width: 1px;
  height: 100%;
}

.timeline-self {
  position: relative;
  height: 100%;
  width: 100%;
}

.timeline-self-active::before {
  z-index: 60;
  position: absolute;
  content: ' ';
  display: block;
  width: .7rem;
  height: .7rem;
  border-radius: 50%;
  top: -.35rem;
  left: -.35rem;
  background-color: #ff4a4a;
}

.timeline-self-last-active::after {
  z-index: 60;
  position: absolute;
  content: ' ';
  display: block;
  width: .7rem;
  height: .7rem;
  border-radius: 50%;
  left: -.35rem;
  bottom: -.35rem;
  background-color: #ff4a4a;
}

.timeline-self-last-normal::after {
  z-index: 60;
  position: absolute;
  content: ' ';
  display: block;
  width: .7rem;
  height: .7rem;
  border-radius: 50%;
  left: -.35rem;
  bottom: -.35rem;
  background-color: #898989;
}

.f-12 {
  font-size: 1.2rem;
}

.p-normal {
  color: #898989;
}

.mt-1 {
  margin-top: 1rem;
}

.mt-06 {
  margin-top: .6rem;
}

.color-blue {
  color: #329dff;
}

.c-red {
  color: #ff4a4a;
}

.cgc-title {
  padding-left: 1.6rem;
  background-color: #fff;
}

.goods-status {
  height: 4.3rem;
  line-height: 4.3rem;
  font-size: 1.2rem;
  color: #898989;
}

.goods-info {
  padding: 1rem 0;
  border-bottom: 1px solid #dfdfdf;
}

.img-wrap {
  height: 6.8rem;
  width: 6.8rem;
  background-color: #f8f8f8;
  padding: 1rem;
  margin-right: 1.8rem;
}

.img-wrap .img {
  display: inline-block;
  width: 100%;
  height: 100%;
}

.user-wrap {
  justify-content: center;
  flex-direction: column;
}

.msg-container {
  height: 3.5rem;
}

.top-msg {
  font-size: 1.4rem;
  color: #111;
}

.bottom-msg {
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #898989;
}

.gt-title {
  padding-left: 1.6rem;
  background-color: #f8f8f8;
  height: 5rem;
  font-size: 1.6rem;
  color: #010101;
  line-height: 5rem;
  border-bottom: 1px solid #dfdfdf;
}

.track-area {
  background-color: #fff;
}

.left-timeline {
  width: 3.8rem;
}

.period {
  position: relative;
  margin-right: 1.6rem;
  padding: 2.3rem 0 2.3rem 0;
  font-size: 1.4rem;
  box-sizing: border-box;
}

.period:not(:last-child) {
  border-bottom: 1px solid #dfdfdf;
}

.p-detail {
  font-size: 1.2rem;
  color: #898989;
}

.p-date {
  font-size: 1.2rem;
  color: #898989;
}

.card-detail {
  background-color: #f8f8f8;
  padding-left: 1rem;
}

.cd-item {
  height: 4.2rem;
  line-height: 4.2rem;
  font-size: 1.2rem;
  color: #898989;
}

.cd-item:not(:last-child) {
  border-bottom: 1px solid #dfdfdf;
}

.cd-item .info {
  margin-right: .6rem;
}

.toggle-pwd {
  z-index: 1;
  margin-left: .5rem;
  display: inline-block;
  vertical-align: middle;
  width: 1.5rem;
  height: 1rem;
  background-position: center;
  background-size: 100% 100%;
}

.tp-hide {
  background-image: url('/static/images/pwd-hide.png');
}

.tp-show {
  background-image: url('/static/images/pwd-show.png');
}

.cd-phone-cost {
  border: 1px solid #ff4a4a;
  border-radius: .3rem;
  padding: .2rem .3rem;
}

.share-msg {
  flex-direction: column;
}

.share-btn {
  width: 7rem;
  height: 3.5rem;
  line-height: 3.5rem;
  text-align: center;
  border-radius: .5rem;
  background-color: #ff4a4a;
  color: #fff;
  font-size: 1.6rem;
}

.share-btn-off {
  width: 7rem;
  height: 3.5rem;
  line-height: 3.5rem;
  text-align: center;
  border-radius: .5rem;
  background-color: #dfdfdf;
  color: #fff;
  font-size: 1.6rem;
}

.p-share-container {
  align-items: center;
}

.copy-btn {
  margin-right: .4rem;
  position: relative;
  display: none;
}

.copy-guide {
  width: .6rem;
  margin-left: -.6rem;
}

.dt-copy {
  position: relative;
}

.c-red-copy {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  /*line-height: 4.2rem;*/
  opacity: 0;
}
</style>

<script>
import Vue from 'vue';
import Clipboard from 'clipboard';
import AppHeader from '../../components/common/header/app-header';
import AppBottomBar from '../../components/common/footer/app-bottom-bar';
import CommonAlert from '../../components/common/alert/common-alert';
import NextTerm from '../../components/feature/about-goods/next-term';
import GoBack from '../../components/feature/common/goback.component';
export default {
  components: {
    AppHeader,
    CommonAlert,
    NextTerm,
    AppBottomBar,
    GoBack
  },
  data() {
    return {
      title: '商品确认',
      type: 3,
      showAlert: false,
      togglePwdStatus: false,
      // 页面数据
      pd: {},
      showPwd: null,
      // 是否关闭晒单的提示
      isShow: null,
      // 复制卡号密码
      copyCardNum: null,
      copyCardPwd: null
    }
  },
  computed: {
    dPwd() {
      return this.pd.cardSecret;
    }
  },
  methods: {
    showUseInfo() {
      this.showAlert = true;
    },
    hidePwd() {
      this.showPwd = this.togglePwdStatus ? this.dPwd : this.dPwd.replace(/\w/g, '*');
      //        console.log(this.showPwd);
      this.togglePwdStatus = !this.togglePwdStatus;
    }
  },
  mounted() {
    var that = this;
    var query = {
      id: this.$route.params.id
    };
    Vue.OneMallHttp(this).GET(query, Vue.OneMallUrl.confirm_show)
      .then(function (res) {
        if (10000 == res.code) {
          that.pd = res.result;
          that.showPwd = that.pd.cardSecret;
          //            console.log(that.pd.cardSecret);
          that.isShow = that.pd.isShow;
          // 复制的卡号密码
          that.copyCardNum = that.pd.cardNumber;
          that.copyCardPwd = that.pd.cardSecret;
        }
      })
  },
  ready: function () {
    $("body").css("background-color", "#f8f8f8");
    // 手动复制内容
    this.$watch('pd.cardNumber', function (newValue, oldValue) {
      if (oldValue) {
        document.querySelector('.c-red-cardNumber').value = this.copyCardNum;
      }
    });
    this.$watch('pd.cardSecret', function (newValue, oldValue) {
      if (oldValue) {
        document.querySelector('.c-red-cardSecret').value = this.copyCardPwd;
      }
    });

    // 复制内容
    var clipboard = new Clipboard('.copy-btn');
    clipboard.on('success', function (e) {
      var content;
      if (e.trigger.id == 'card-pwd') {
        content = '密码已复制';
      }
      else if (e.trigger.id == 'card-no') {
        content = '卡号已复制';
      }
      layer.open({
        content: content,
        skin: 'msg',
        shade: false,
        time: 2
      });
    });

    clipboard.on('error', function (e) {
      // TODO
    });
  },
  destroyed: function () {
    $("body").css("background-color", "#fff");
  }
}
</script>
