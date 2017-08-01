<!-- author: dreamapple -->
<style scoped>
  .content {
    padding: 1.6rem;
  }

  .paragraph {
    margin-bottom: 1.6rem;
  }

  .paragraph > h4 {
    font-size: 1.2rem;
    line-height: 2rem;
    color: #000;
    font-weight: normal;
  }

  .paragraph > p {
    font-size: 1.2rem;
    line-height: 2rem;
    margin-bottom: 1rem;
    color: #898989;
  }

  table {
    color: #898989;
  }
</style>

<template>
  <app-header :title="'使用说明'"></app-header>
  <section class="content">
    <div class="paragraph">
      <p>您收到卡密信息后请不要透露给第三方，请尽快充值成手机话费。
        您可以通过如下方式使用话费充值卡：
        收到卡密后直接进行充值操作如果遇到问题，请不要着急，请根据充值失败提示再操作，或者拨打相关运营商的服务电话进行询问；卡密发出后，卡密使用时间在发送时间之后一概不会退款。</p>
      <p>1. 中国移动充值卡充值话费方法：
        充值话费请拨打10086或者13800138000根据语音提示选择充值卡充值。如果本机欠费，请选择其它移动（必须和你欠费的手机归属地一致）手机充值。
      </p>
      <p>2. 中国联通话费充值卡充值话费方法：
        充值话费请拨打10011根据语音提示选择充值卡充值。如果本机欠费，请选择其它联通（必须和你欠费的手机归属地一致）手机充值。</p>
      <p>3. 中国电信话费充值卡充值话费方法：
        使用本机拨打11888输入18位密码充值，如果手机已欠费停机无法拨通11888时请用同省其他手机、座机为其代充。卡号只做备查使用，充值不需要输入卡号。</p>
      <p>4. 通过支付宝客户端充值到支付宝方法：
        收到卡密后，打开支付宝客户端，使用您的支付宝账户登陆。进入“我的”页面，选择余额，点击“充值”，选择“使用话费卡充值”，进入话费卡转让页面，选择好充值卡面值和输入卡号卡密之后，点击确定即可完成充值。</p>
  </section>

  <app-bottom-bar></app-bottom-bar>
</template>

<script>
  'use strict';
  import Vue from 'vue';
  import AppHeader from '../../components/common/header/app-header';
  import AppBottomBar from '../../components/common/footer/app-bottom-bar';

  export default {
    components: {
      AppHeader,
      AppBottomBar
    }
  }
</script>

