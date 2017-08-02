<template>
  <div @click.self="closeQRcode" :class="{'qrcode-mask-hide': !isShow, 'qrcode-mask-show': isShow}" class="qrcode-mask">
    <div class="qrcode-container">
      <div class="qrcode-container__title">微信登录</div>
      <div class="qrcode-container__img-container">
        <div id="JS-qrcode-img" class="qrcode-container__img"></div>
      </div>
      <div class="qrcode-container__info">请使用微信扫描二维码登录</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { rs } from './lib/generate-str';

const QRCode = window.QRCode;

export default {
  // TODO
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      qrcodeInstance: null,
      show: false,
    };
  },
  methods: {
    closeQRcode() {
      this.isShow = false;
    },
    scanWechatUrl() {
      let mID;
      let fromUrl;
      let fromHash;
      try {
        mID = this.$route.query.mID || localStorage.getItem('mID');
        fromHash = '/tao-you/wechat-login-success';
        fromUrl = encodeURIComponent(`${location.origin}/#${fromHash}?mID=${mID}&from=wechat`);
      } catch (e) {
        console.log(e);
      }
      return `${Vue.ClientUrl.wechat_login}?fromUrl=${fromUrl}&mID=${mID}&loginkey=${rs}`;
    },
    generateQRcode() {
      let qrcodeUrl;
      if (window.API_USE === 1) {
        qrcodeUrl = `http://interface.lly800.com${this.scanWechatUrl()}`;
      } else {
        qrcodeUrl = `http://pre-interface.lly800.com${this.scanWechatUrl()}`;
      }
      if (this.qrcodeInstance) {
        return;
      }
      this.qrcodeInstance = new QRCode(document.getElementById('JS-qrcode-img'), {
        text: qrcodeUrl,
        width: document.getElementById('JS-qrcode-img').offsetWidth,
        height: document.getElementById('JS-qrcode-img').offsetHeight,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H,
      });
    },
  },
  mounted() {
    this.generateQRcode();
  },
};
</script>

<style lang="scss" scoped>
.qrcode-mask-hide {
  z-index: -1;
  opacity: 0;
}

.qrcode-mask-show {
  z-index: 1;
  opacity: 1;
}

.qrcode-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.qrcode-container {
  width: 2.2rem;
}

.qrcode-container__title {
  color: #ffffff;
  font-size: .24rem;
  line-height: .24rem;
  text-align: center;
}

.qrcode-container__img-container {
  width: 2.2rem;
  height: 2.2rem;
  margin: .3rem 0;
  padding: .15rem;
  background-color: #ffffff;
  box-sizing: border-box;
}

.qrcode-container__img {
  margin: 0;
  width: 1.9rem;
  height: 1.9rem;
  display: block;
}

.qrcode-container__info {
  color: #ffffff;
  font-size: .12rem;
  line-height: .12rem;
  text-align: center;
}

.hidden {
  display: none;
}
</style>
