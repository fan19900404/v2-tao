<template>
  <div>
    <!--顶部-->
    <div class="header">
      <header-component :title="title"></header-component>
    </div>
    <!--游戏粗略信息-->
    <div class="list">
      <div class="list__img">
        <div class="list__img--container">
          <img :src="pd.picture">
        </div>
      </div>
      <div class="list__name">
        <span class="list__count--name">
          <i class="list__count--bg">限时</i>{{pd.name}}
        </span>
        <span class="list__much">剩余 {{parseInt(pd.totalNumber)-parseInt(pd.usedNumber)}}</span>
      </div>
      <div class="list__desc" v-cloak>
        <span class="list__count">
          <i class="list__count--img"></i>{{count}} 淘豆</span>
        <span class="list__time">
          <i class="list__count--time"></i>
          <timer @timer-action="getNext" :endtime="time"></timer>
        </span>
      </div>
      <div class="share__self">
        <share-component  :bind-style="{'color':'#fff'}"></share-component>
      </div>
    </div>
    <!--使用方法-->
    <div class="method">
      <div class="method__time">
        <p class="method__title">礼包内容</p>
        <p class="method__date" v-html="pd.content"></p>
      </div>
      <div class="method__time">
        <p class="method__title">使用方法</p>
        <p class="method__date" v-html="pd.remark"></p>
      </div>
    </div>
    <!--按钮及分享-->
    <div class="button" v-show="showButton">
      <!--<div class="button__share">-->
      <!--<span>-->
      <!--<share-component :config="config" :bind-style="{}"></share-component>-->
      <!--</span>-->
      <!--<div class="button__text" v-touch:tap="showShare">分享</div>-->
      <!--</div>-->
      <div class="button__key">
        <app-button :btn-text="btnMsg" @button-component="button" :btn-theme="btnTheme"></app-button>
      </div>
    </div>
    <!--两个按钮的弹窗-->
    <two-button-dialog :show-title="showTitle" :content="content" :show="isShow" :has-slot="hasSlot" :left-btn-text="leftBtnText" :right-btn-text="rightBtnText" :show-close-btn="showCloseBtn" @two-btns-dialog-component-left="left" @two-btns-dialog-component-right="right" :btn-text="btnText">
      <div slot="addInner" v-if="hasSlot">
        <p class="p1">兑换此礼品需要消耗
          <span>{{count}}</span>淘豆</p>
        <p class="p2">是否兑换？</p>
        <p class="p3" @click="link({name:'TaoYouTaoDouExplain'})">什么是淘豆？</p>
      </div>
    </two-button-dialog>
    <!--返回-->
    <return-btn></return-btn>
    <!--toast-->
    <toast :is-show="showToast" :toast-text="toastText"></toast>
  </div>
</template>
<style lang="scss" scoped>
@import "../../../assets/tao-you/common.scss";
[v-cloak] {
  display: none;
}

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

.header {
  border-bottom: 1px solid #E5E5E5;
}

.list {
  background-color: #FFFFFF;
  position: relative;
  &__img {
    z-index: 0;
    background-color: #F6F6F6;
    .list__img--container {
      height: 1.56rem;
      width: 2.58rem;
      margin: 0 auto;
      padding: 0.085rem 0;
      z-index: 9999;
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
  &__name {
    /*height: .16rem;*/
    /*line-height: .16rem;*/
    font-size: .16rem;
    color: #333;
    padding: 0 0.15rem 0 0.15rem;
  }
  &__count {
    font-size: .13rem;
    color: #ff4a4a;
  }
  &__much {
    font-size: .13rem;
    color: #a5a5a5;
    float: right;
    padding-top: .05rem;
  }
  &__desc {
    height: .15rem;
    /*line-height: .15rem;*/
    margin: 0 .15rem;
    padding-bottom: 0.128rem;
  }
  &__time {
    display: inline-flex;
    align-items: center;
    height: .18rem;
    float: right;
    font-size: .13rem;
    padding-top: .02rem;
  }
  &__count--img {
    padding-right: 0.04rem;
    margin-right: 0.05rem;
    display: inline-block;
    height: .10rem;
    width: .10rem;
    color: #a5a5a5;
    background-image: url("/static/images/tao-you/welfare-shop/welfare-t.png");
    background-size: 100% 100%;
  }
  &__count--time {
    display: inline-block;
    height: .140rem;
    width: .130rem;
    margin-right: 0.03rem;
    color: #a5a5a5;
    background-image: url("/static/images/tao-you/welfare-shop/welfare-b.png");
    background-size: 100% 100%;
  }
  &__count--bg {
    display: inline-block;
    height: .17rem;
    width: 0.31rem;
    background: #00C1B3;
    border-radius: 0.02rem;
    font-size: .12rem;
    line-height: .17rem;
    text-align: center;
    color: #FFFFFF;
    margin-right: 0.03rem;
  }
  .list__count--name {
    display: inline-flex;
    align-items: center;
    height: .25rem;
  }
  .share__self {
    position: absolute;
    top: .15rem;
    right: .15rem;
    width: .44rem;
    height: .44rem;
    border-radius: 50%;
    background: rgba(0, 0, 0, .3);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.method {
  padding: 0 .15rem;
  background: white;
  margin-top: .07rem;
  /*border-bottom: 1px solid #E5E5E5;*/
  /*border-top: 1px solid #E5E5E5;*/
  margin-bottom: .70rem;
  &__time {
    border-bottom: 1px solid #E5E5E5;
  }
  &__title {
    height: .15rem;
    font-size: .15rem;
    color: #333333;
    padding: .15rem 0;
  }
  &__date {
    font-size: .13rem;
    color: #333333;
    padding-bottom: .10rem;
    line-height: .22rem;
  }
}

.method .method__time:nth-last-child(1) {
  border-bottom: none;
}

.button {
  background: #ffffff;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  border-top: 1px solid #E5E5E5;
  z-index: 99;
  max-width: 640px;
  &__key {
    flex: 1;
    margin-right: .15rem;
    margin-left: .15rem;
    padding: .10rem 0;
  }
  /*&__share {*/
  /*text-align: center;*/
  /*width: .61rem;*/
  /*padding-top: .1rem;*/
  /*}*/
  /*&__text {*/
  /*font-size: .12rem;*/
  /*color: #666666;*/
  /*}*/
}

.icon-what {
  line-height: .15rem;
}
</style>
<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import HeaderComponent from '../../../components/tao-you/layout/header.component';
import AppButton from '../../../components/tao-you/button/button.component';
import ShareComponent from '../../../components/tao-you/share/share.component';
import TwoButtonDialog from '../../../components/tao-you/dialog/two-buttons-link-dialog.component';
import ReturnBtn from '../../../components/tao-you/button/return.component';
// import { getUserInfo } from '../../../vuex/actions.js';
// import { user } from '../../../vuex/getters';
// 引入toast
import Toast from '../../../components/tao-you/toast/toast.component';
// 倒计时
import Timer from '../../../components/tao-you/timer/date-timer.component';

export default {
  data() {
    return {
      title: '商品详情',
      btnMsg: '',
      // 礼包信息
      pd: [],
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
      // 如果领取过，不能点击
      btnTheme: 0,
      // 默认底部button不显示
      showButton: false,
      // 是否为实物,默认不是
      genre: 1,
      // 预设的倒计时
      time: 0,
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    ...mapActions(['getUserInfo']),
    link(url) {
      this.$router.push(url);
    },
    // 获取礼包信息
    getPacks() {
      const query = {
        id: this.$route.params.id,
        nologin: 1,
      };
      Vue.ClientHttp().GET(query, Vue.ClientUrl.welfare_time_detail)
        .then((res) => {
          if (res.code === 10000) {
            if (!res.result || !res.result[0]) {
              return;
            }
            this.btnTheme = res.result[0].uID > 0 ? 2 : 0;
            this.pd = res.result[0];
            this.time = parseInt(res.result.endTime) - parseInt(new Date().getTime() / 1000);
            this.genre = this.pd.genre;
            this.count = parseInt(this.pd.taoDou) > 0 ? parseInt(this.pd.taoDou) : 0;
            this.btnMsg = this.pd.uID > 0 ? this.count > 0 ? '已兑换' : '已领取' : this.count > 0 ? `${this.count}淘豆兑换` : '领取';
            this.showButton = true;
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
                title: this.pd.gameName, // 分享标题
                link: share_link, // 分享链接
                desc: this.pd.name,
                imgUrl: this.pd.image, // 分享图标
              };
              // 分享到朋友圈
              wx.onMenuShareTimeline(shareInfo);
              // 分享给朋友
              wx.onMenuShareAppMessage(shareInfo);

              const otherShareInfo = {
                title: this.pd.gameName, // 分享标题
                link: window.location.href, // 分享链接
                desc: this.pd.name,
                imgUrl: this.pd.image, // 分享图标
              };

              wx.onMenuShareQQ(otherShareInfo);
              wx.onMenuShareWeibo(otherShareInfo);
              wx.onMenuShareQZone(otherShareInfo);
            });
          }
        });
    },

    button() {
      if (this.count) {
        // 需要淘豆兑换
        this.leftBtnText = '取消';
        this.rightBtnText = '兑换';
        this.showCloseBtn = false;
        this.isShow = true;
      } else {
        // 不需要淘豆兑换的
        this.exchange();
      }
    },
    // 左边按钮方法
    left() {
      if (this.cancel) {
        this.isShow = false;
      } else {
        // 看看其它礼品
        this.$router.push({
          name: 'TaoYouWelfareShopWelfare',
        });
      }
    },
    // 右边按钮方法
    right() {
      this.isShow = false;
      if (this.cancel) {
        if (this.count > parseInt(this.user.taoDou)) {
          this.hasSlot = false;
          this.showTitle = true;
          this.btnText = '兑换失败';
          this.content = '很遗憾，你的淘豆不足够兑换该礼品';
          this.leftBtnText = '兑换其他商品';
          this.rightBtnText = '赚淘豆';
          this.isShow = true;
          this.cancel = false;
        } else {
          // 淘豆足够，进入接口兑流程
          this.exchange();
        }
      } else {
        this.$router.push({
          name: 'TaoYouPersonalCenterTaodouMatch',
        });
      }
    },
    showShare(e) {
      this.$root.$emit('share', 1);
    },
    // 兑换方法
    exchange() {
      const query = {
        id: this.$route.params.id,
      };
      Vue.ClientHttp().GET(query, Vue.ClientUrl.packs_exchange)
        .then((res) => {
          if (res.code == 10000) {
            this.btnMsg = this.count > 0 ? '已兑换' : '已领取';
            this.btnTheme = 2;
            if (this.genre == 1) {
              this.$router.push({
                name: 'TaoYouPacksResult',
                params: { id: this.$route.params.id },
              });
            } else {
              this.toastText = res.msg;
              this.showToast = true;
            }
          } else {
            this.toastText = res.msg || '兑换失败';
            this.showToast = true;
          }
        });
    },
    // 倒计时结束后
    getNext() {
      //
    },
  },
  components: {
    HeaderComponent,
    AppButton,
    ShareComponent,
    TwoButtonDialog,
    ReturnBtn,
    Toast,
    Timer,
  },
  mounted() {
    this.getUserInfo();
  },
  mounted() {
    this.getPacks();
  },
};
</script>
