<template>
  <div class="mark" v-if="isShow">
    <div class="container">
      <div class="close" @click="close"></div>
      <div class="title">
        <h3>欢迎加入淘游平台</h3>
        <span>恭喜您获得游戏代金券</span>
      </div>
      <div class="info">
        代金券已发送至您的账户，赶快进入游戏吧~
      </div>
      <div class="content">
        <div class="wrapper">
          <div class="desc">{{userMoney}}元
            <br>游戏大礼包</div>
        </div>
      </div>
      <a class="btnStart" @click.stop="goH">点击查看</a>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      userMoney: undefined,
    };
  },
  computed: {
    ...mapState(['UserInfo', 'RegDialog']),
    isShow() {
      return this.$store.state.RegDialog.bShow;
    },
  },
  methods: {
    close() {
      this.$emit('closeRegCompleted');
    },
    goH() {
      this.$emit('closeRegCompleted');
      this.$router.push({ name: 'TaoYouPersonalCenterRebate' });
    },
    showDialog() {
      // 获取当前的用户信息
      const query = {
        nologin: 1,
      };
      const url = Vue.ClientUrl.personal_userinfo;
      Vue.ClientHttp().GET(query, url)
        .then((res) => {
          if (res.code === 10000) {
            this.updateDialogState({ bShow: true });
            this.userMoney = res.result.alterMoney;
          } else {
            // TODO
          }
        });
    },
  },
  mounted() {
    // 注册完成,弹出礼包弹窗
    this.$on('regCompleted', function () {
      this.showDialog();
    });
    this.$on('closeRegCompleted', function () {
      this.updateDialogState({ bShow: false });
    });
  },
};
</script>
<style lang="scss" scoped>
.mark {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .7);
  max-width: 640px;
}

.container {
  position: relative;
  display: flex;
  justify-content: center;
  width: 2.9rem;
  height: 3.73rem;
  background: url('/oldStatic/images/tao-you/user-action/reg/bg2.png') no-repeat;
  background-size: contain;
  margin-left: .15rem;
  margin-right: .15rem;
  text-align: left;
  animation: animations .3s linear forwards;

  .close {
    position: absolute;
    top: .29rem;
    left: 2.685rem;
    width: .26rem;
    height: .26rem;
    background: url('/oldStatic/images/tao-you/user-action/reg/close.png') no-repeat;
    background-size: cover;
  }

  .title,
  .info,
  .content,
  .btnStart {
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }

  .title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    position: absolute;
    top: .86rem;
    width: 2rem;
    height: .4rem;

    h3 {
      height: .2rem;
      line-height: .2rem;
      margin-bottom: .08rem;
      color: #fe4b38;
      font-size: .22rem;
      font-weight: normal;
    }
    span {
      font-size: .12rem;
      color: #ff8072;
    }
  }

  .info {
    position: absolute;
    top: 1.51rem;
    font-size: .08rem;
    color: #bb622d;
    text-align: center;
  }

  .content {
    position: absolute;
    top: 1.935rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 1px 1px #ff7154;

    width: 1.8rem;
    height: 1.1rem;
    background-color: #e22c21;
    border-radius: .04rem;

    .desc {
      color: #fff600;
      font-size: .24rem;
      text-align: center;
    }

    .go {
      display: block;
      font-size: .1rem;
      color: #fffed9;
      text-align: center;
    }
  }

  .btnStart {
    position: absolute;
    top: 3.235rem;
    display: block;
    width: 1.8rem;
    height: .35rem;
    line-height: 0.35rem;
    font-size: .17rem;
    color: #fa2c17;
    background-color: #fff600;
    text-align: center;
    border-radius: .045rem;
    box-shadow: 0 1px 1px #ea140f;
  }
}

@keyframes animations {
  0% {
    transform: translate(175px);
    opacity: 0;
  }
  50% {
    transform: translate(87.5px);
    opacity: 0.5;
  }
  100% {
    transform: translate(0);
    opacity: 1;
  }
}
</style>
