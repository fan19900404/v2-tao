<template>
  <section id="app">
    <router-view></router-view>
    <reward @reward-close="close" @reward-action="action" :obj="rewardData" :show="rewardShow"></reward>
    <reg-complete-dialog></reg-complete-dialog>
    <!--任务完成的弹窗-->
    <two-dialog :show-close-btn="false" :show="finish.isComplete" :show-title="showTitle" :content="finish.content" :btn-text="btnText" :left-btn-text="'关闭'" :right-btn-text="'查看更多任务'" @two-btns-dialog-component-left="left" @two-btns-dialog-component-right="right"></two-dialog>
    <!--开启限时任务的弹窗-->
     <one-button-dialog :is-close="true" :show="showOneDialog" :btn-text="'去看看'" :title="'恭喜你，开启了限时优惠商城，有很多稀有的礼物等着你，快去看看吧'" :is-content="false" :has-action="true" @one-btn-dialog-component="oneBtnDialog"></one-button-dialog>
  </section>
</template>

<script>
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import Reward from './oldComponents/feature/about-home/reward.component';
import RegCompleteDialog from './oldComponents/tao-you/reg/regcomplete.component';
import TwoDialog from './oldComponents/tao-you/dialog/two-buttons-link-dialog.component';
// 一个按钮的弹窗
import OneButtonDialog from './oldComponents/tao-you/dialog/one-button-link-dialog.component';
import '../static/css/common.css';
import '../static/icons/style.css';

import flexbox from './util/flexbox';
// 定义页面rem的font-size
flexbox(2);
window.onresize = flexbox;

export default {
  name: 'app',
  components: {
    Reward,
    RegCompleteDialog,
    TwoDialog,
    OneButtonDialog,
  },
  computed: {
    ...mapState(['finish']),
  },
  mounted() {
    // 实时监测当前用户是否获取了礼物
    this.$watch('$root.$route.path', function (newValue) {
      if (newValue.indexOf('/tao-you') !== -1) {
        this.getNoticesCount();
        this.updaTaskState();
      }
    }, { immediate: true });

    // 微信分享
    this.getWeChatConfig();
    // // 是否对该用户开启提示弹窗
    this.showTimeGift();
  },
  data() {
    return {
      rewardShow: false,
      rewardData: {
        number: '',
        name: '',
      },
      // 是否显示任务弹窗
      isShow: false,
      showTitle: true,
      btnText: '任务完成',
      content: '',
      showOneDialog: false,
    };
  },
  methods: {
    ...mapActions(['updateUserInfo', 'updaTaskState']),
    // 微信分享
    getWeChatConfig() {
      const query = {
        url: window.location.href,
      };
      const reqUrl = Vue.ClientUrl.wechat_config;
      Vue.ClientHttp().GET(query, reqUrl)
        .then((res) => {
          if (res.code === 10000) {
            // 配置微信
            const conf = {
              debug: false,
              jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'hideMenuItems',
                'showMenuItems',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'chooseWXPay',
              ],
              appId: res.result.appId,
              nonceStr: res.result.nonceStr,
              timestamp: res.result.timestamp,
              signature: res.result.signature,
            };

            wx.config(conf);
            // 分享部分
          } else {
            // TODO
          }
        });
    },
    close() {
      // TODO
    },
    action() {
      this.$router.push({
        name: 'personal',
      });
    },
    // 获取当前用户是否可以获取奖品的状态
    getRewardStatus() {
      // TODO
      const query = {
        nologin: 1,
      };
      Vue.OneMallHttp().GET(query, Vue.OneMallUrl.common_user_luck_info)
        .then((res) => {
          if (res.code === 10000) {
            this.rewardShow = true;
            this.rewardData = res.result;
          }
        });
    },
    getNoticesCount() {
      Vue.OneMallHttp().POST({
        platForm: 1,
        nologin: 1,
      }, Vue.OneMallUrl.user_info)
        .then((res) => {
          if (res.code === 10000) {
            try {
              // 登陆成功
              localStorage.setItem('login', 1);
              // 获取 userId
              localStorage.setItem('uID', res.result.userId);

              this.updateUserInfo({
                newNoticeFlag: !!res.result.msg.platForm_1,
              });
            } catch (ex) {
              // TODO
            }
          } else {
            // 未登录
            localStorage.setItem('login', 0);
            // 重新设置 userId
            localStorage.setItem('uID', '');
          }
        });
    },
    // 弹窗左按钮方法
    left() {
      this.updaTaskState();
    },
    // 弹窗右按钮方法
    right() {
      this.updaTaskState();
      this.$router.push({ name: 'TaoYouTasks' });
    },
    // 限时任务开启提示的弹窗
    oneBtnDialog() {
      this.showOneDialog = false;
      this.$router.push({
        name: 'TaoYouWelfareShopWelfare',
      });
    },
    // 是否开启限时优惠列表
    showTimeGift() {
      Vue.ClientHttp().GET({}, Vue.ClientUrl.show_time_welfare)
        .then((res) => {
          if (res.code == 10000) {
            if (res.ischeck == 1) {
              this.showOneDialog = true;
            }
          }
        });
    },
  },
};
</script>

<style scoped>
.pt-62 {
  /* 状态栏高度 */
  padding-top: 6.2rem;
}

#app {}
</style>
