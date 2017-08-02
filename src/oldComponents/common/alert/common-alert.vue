<template>
  <!-- type:1 晒单发布成功 -->
  <!-- type:2 晒单须知-->
  <!-- mask 遮罩层 -->
  <div v-if="showAlert" class="mask dr-flex">

    <!-- type:0-->
    <div v-if="0 === type" class="alert-container flex-1 type-0">
      <div class="alert-header">
        <div class="header-content">
          <div class="close-container">
            <span @click="closeAlert" class="close"></span>
          </div>
        </div>
      </div>
      <div class="alert-content">
        <!--<div class="alert-msg">{{alertMsg}}</div>-->
        <!--<p class="alert-status">{{alertStatus}}</p>-->
        <p class="alert-single-status">{{alertStatus}}</p>
        <!-- action btn 确认按钮 -->
        <div v-if="!replaceBtnText" @click="closeAlertAndDo" class="alert-btn">朕知道了</div>
        <div v-if="replaceBtnText" @click="closeAlertAndDo" class="alert-btn">{{replaceBtnText}}</div>
      </div>
    </div>

    <!-- type:1-->
    <div v-if="1 === type" class="alert-container flex-1">
      <div class="alert-header">
        <div class="header-content">
          <div class="close-container">
            <span @click="closeAlert" class="close"></span>
          </div>
        </div>
      </div>
      <div class="alert-content">
        <div class="alert-msg">恭喜您提交成功!</div>
        <p class="alert-status">正在审核中</p>
        <!-- action btn 确认按钮 -->
        <div class="alert-btn">朕知道了</div>
      </div>
    </div>

    <!-- type:2 -->
    <div v-if="2 === type" class="alert-container flex-1">
      <div class="alert-header">
        <div class="header-content">
          晒单须知
          <div class="close-container">
            <span @click="closeAlert" class="close"></span>
          </div>
        </div>
      </div>
      <div class="alert-content type-2">
        <p class="content-top">晒出您收到的商品图片甚至您的靓照，说出您的夺宝心得，欢畅淋漓地表达出您的喜悦吧！</p>
        <div class="content-middle">
          <p class="mid-p"></p>
          <p class="mid-p"></p>
        </div>
        <p class="content-bottom">在您成功晒单后，您的晒单会出现在“晒单”页的"晒单分享"区，相信这里若有您的出境会更添一份夺目光彩哦~</p>
        <p class="confirm">
          <input v-on:change="neverShow" id="click-area" class="click-area" type="checkbox" v-model="status">
          <span class="choose" :class="{'normal': !status, 'active': status}">
          </span>
          <lable for="click-area">&nbsp;以后不再提示</lable>
        </p>
        <!-- action btn 确认按钮 -->
        <div class="alert-btn" @click="closeAlertAndDo">朕知道了</div>
      </div>
    </div>

    <!-- type:3-->
    <div v-if="3 === type" class="alert-container flex-1">
      <div class="alert-header">
        <div class="header-content">
          充值话费
          <div class="close-container">
            <span @click="closeAlert" class="close"></span>
          </div>
        </div>
      </div>
      <div class="alert-content">
        <!-- 移动 -->
        <div class="phone-info-item">
          <div class="vendor dr-flex">
            <div class="vendor-wrap bg-c-yidong dr-flex">
              <img class="img yidong" src="/static/images/yidong.png">
            </div>
            <p class="which-vendor flex-1 c-yidong">移动充值卡</p>
          </div>
          <p class="vendor-attention">
            拨打<span class="c-yidong">10086</span>或者<span class="c-yidong">13800138000</span>根据语音提示选择充值卡充值。
          </p>
        </div>
        <!-- 联通 -->
        <div class="phone-info-item">
          <div class="vendor dr-flex">
            <div class="vendor-wrap bg-c-liantong dr-flex">
              <img class="img liantong" src="/static/images/liantong.png">
            </div>
            <p class="which-vendor flex-1 c-liantong">联通充值卡</p>
          </div>
          <p class="vendor-attention">
            拨打<span class="c-liantong">10011</span>根据语音提示选择充值卡充值。
          </p>
        </div>
        <!-- 电信 -->
        <div class="phone-info-item">
          <div class="vendor dr-flex">
            <div class="vendor-wrap bg-c-dianxin dr-flex">
              <img class="img dianxin" src="/static/images/dianxin.png">
            </div>
            <p class="which-vendor flex-1 c-dianxin">电信充值卡</p>
          </div>
          <p class="vendor-attention">
            拨打<span class="c-dianxin">11888</span>输入18位密码充值,卡号只做备查使用,充值不需要输入卡号。
          </p>
        </div>
        <!-- 支付宝 -->
        <div class="phone-info-item">
          <div class="vendor dr-flex">
            <div class="vendor-wrap bg-c-zfb dr-flex">
              <img class="img dianxin" src="/static/images/index/zhifubao.png">
            </div>
            <p class="which-vendor flex-1 c-zfb">充值到支付宝</p>
          </div>
          <p class="vendor-attention">
            <!--拨打<span class="c-dianxin">11888</span>输入18位密码充值,卡号只做备查使用,充值不需要输入卡号。-->
            在支付宝客户端“我的”页面，选择余额点击“充值”，选择“使用话费卡充值”，选择充值卡面值，输入卡号卡密后即可完成充值。
          </p>
        </div>
        <!-- action btn 确认按钮 -->
        <div @click="closeAlert" class="alert-btn">朕知道了</div>
      </div>
    </div>

  </div>
</template>

<style scoped>
  .bg-c-zfb {
    background-color: #00aeEE;
  }
  .c-zfb {
    color: #00aeEE;
  }
  .close-container {
    position: absolute;
    width: 2rem;
    height: 2rem;
    top: 1rem;
    right: -1rem;
  }
  .close {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .close::before,
  .close::after {
    content: '';
    position: absolute;
    height: 2px;
    width: 1.6rem;
    top: 0.6rem;
    left: -1rem;
    background: #dfdfdf;
  }
  .close::after {
    transform: rotate(-45deg);
  }
  .close::before {
    transform: rotate(45deg);
  }
.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  justify-items: center;
  align-items: center;
}
  .alert-container {
    background-color: #fff;
    margin: auto 3.9rem;
    max-width: 28rem;
    border-radius: .5rem;
  }
  .alert-header {
    height: 4rem;
    text-align: center;
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 4rem;
    border-bottom: 1px solid #dfdfdf;
  }
  .header-content {
    margin:0 1.6rem;
    height: 100%;
    position: relative;
  }
  .alert-content {
    box-sizing: border-box;
    padding: 2rem 1.6rem 3rem;
  }
  .alert-msg {
    font-size: 1.6rem;
    font-weight: 600;
    height: 3.4rem;
    line-height: 3.4rem;
    text-align: center;
  }
  .alert-status {
    font-size: 1.2rem;
    color: #cdcdcd;
    margin-bottom: 3rem;
    text-align: center;
  }
  .alert-single-status {
    font-size: 1.6rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 2rem;
  }
  .alert-btn {
    text-align: center;
    height: 4.5rem;
    color: #fff;
    font-size: 1.4rem;
    background-color: #ff4a4a;
    border-radius: .5rem;
    line-height: 4.5rem;
  }
  /* type 2*/
  .type-2 {
    font-size: 1.2rem;
  }
  .content-top {
    margin-bottom: 1rem;
    line-height: 1.5rem;
  }
  .content-bottom {
    margin-top: 1rem;
    margin-bottom: 1rem;
    line-height: 1.5rem;
  }
  .content-middle .mid-p {
    line-height: 1.5rem;
  }
  .confirm {
    position: relative;
    color: #898989;
    margin-bottom: 1.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
  }
  .choose {
    vertical-align: middle;
    position: relative;
    display: inline-block;
    width: 1rem;
    height: 1rem;
  }
  .normal {
    border: 1px solid #dfdfdf;
  }
  .active {
    border: 1px solid #ff4a4a;
    background-image: url('/static/images/check-correct.png');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
  }
  .click-area {
    position: absolute;
    height: 1.5rem;
    width: 1.5rem;
    border: none;
    top: 0;
    left: 0;
    background-color: transparent;
    opacity: 0;
  }
  /* type 3*/
  .phone-info-item {
    margin-bottom: 1rem;
  }
  .c-yidong {
    color: #329dff;
  }
  .bg-c-yidong {
    background-color: #329dff;
  }
  .c-liantong {
    color: #ff4a4a;
  }
  .bg-c-liantong {
    background-color: #ff4a4a;
  }
  .c-dianxin {
    color: #3358ff
  }
  .bg-c-dianxin {
    background-color: #3358ff;
  }
  .vendor {
    align-items: center;
  }
  .vendor-wrap {
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 50%;
    margin-right: .6rem;
    align-items: center;
    justify-content: center;
  }
  .vendor-wrap .img {
    display: block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
  .which-vendor {
    font-size: 1.5rem;
    font-weight: 600;
  }
  .vendor-attention {
    margin-top: .5rem;
    line-height: 1.5rem;
    font-size: 1.2rem;
    color: #898989;
  }

</style>

<script>
  export default {
      props: [
        'headerText',
        'type',
        'showAlert',
        'alertMsg',
        'alertStatus',
        'replaceBtnText'
      ],
      data() {
        return {
          status: false,
          innerReplaceBtnText: null
        }
      },
      methods: {
        closeAlert() {
          this.showAlert = false;
          this.$dispatch('cancel-alert');
        },
        closeAlertAndDo() {
          this.showAlert = false;
          this.$dispatch('common-alert-action');
        },
        neverShow() {
          this.$dispatch('never-show', this.status);
        }
      },
      mounted() {
//        this.$watch('replaceBtnText', function(newValue) {
//          this.innerReplaceBtnText = newValue;
//        })
      }
  }
</script>
