<!-- author:yex -->
<template>
  <app-header :title="title"></app-header>
  <section class="margin-top text-default">
    <div class="text-box bgc-white padding-left padding-small-right position-relative border-top-bottom">
      <div class="w95">
        <input v-model="phone" type="text" placeholder="请输入手机号" autofocus>
      </div>
    </div>
    <div class="text-box bgc-white padding-left padding-right position-relative border-bottom">
      <div class="w95">
        <input v-model="validateCode" type="text" maxlength="10" placeholder="请输入短信验证码" autofocus>
      </div>
      <div @click="getValidateCode" class="radius-rounded align-vertical border text-center send">{{ timer.text }}</div>
    </div>
    <div class="btn-area text-center text-white text-big margin-big-top">
      <a class="radius w85" @click.stop="doSubmit">确定</a>
    </div>
  </section>
  <!-- common alert -->
  <common-alert :type="alertType" :show-alert="showAlert" :alert-msg="alertMsg" :alert-status="alertStatus"></common-alert>
</template>

<script>
  'use strict';
  import AppHeader from '../../components/common-layout/header.component';
  import CommonAlert from '../../components/common-alert/common-alert.component';
  import { updateUserInfo } from '../../vuex/actions';

  export default {
    vuex: {
      actions: {
        updateUserInfo
      }
    },
    components: {
      AppHeader,
      CommonAlert
    },
    data() {
      return {
        title: '绑定手机',
        bPressed: false,
        timer: {
          flag: false,
          cycle: 15,
          num: 0,
          initText: '获取验证码',
          text: '获取验证码',
          msg: {
            info: '验证码已发送至您的手机',
            null: '请输入您的手机号码',
            error: '请输入正确的手机号码',
            multiple: '请在{{num}}秒后重新获取'
          }
        },
        phone: '',
        validateCode: '',
        // 弹框
        alertType: 0,
        showAlert: false,
        alertMsg: '',
        alertStatus: ''
      }
    },
    mounted() {
      $('body').css('background-color', '#f8f8f8');
    },
    methods: {
      getValidateCode() {
        if (!this.validate()) {
          return;
        }
        this.cutDown();

        Vue.ClientHttp().GET({
            phone : this.phone, type: 'bind'
          }, Vue.ClientUrl.send_validate_code)
          .then((res) => {
            if (res.code !== 10000) {
              this.showAlert = true;
              this.alertMsg = "消息提示";
              this.alertStatus = this.timer.msg.info;
              return;
            }
          });
      },
      validate(flag) {
        if (this.phone === '') {
          this.showAlert = true;
          this.alertMsg = "消息提示";
          this.alertStatus = this.timer.msg.null;
          return false;
        }
        if (!/^1\d{10}$/.test(this.phone)) {
          this.showAlert = true;
          this.alertMsg = "消息提示";
          this.alertStatus = this.timer.msg.error;
          return false;
        }
        if(flag){
          return true;
        }
        if (this.timer.flag) {
          this.showAlert = true;
          this.alertMsg = "消息提示";
          this.alertStatus = this.timer.msg.multiple.replace('{{num}}', this.timer.num);
          return false;
        }
        return true;
      },
      cutDown(){
        let timer = this.timer;
        timer.flag = true;
        timer.text = `${timer.cycle}后重新获取`;
        timer.num = parseInt(timer.text);
        let handle = setInterval(function() {
          if (!isNaN(timer.num)) {
            timer.num -= 1;
            timer.text = `${timer.num}后重新获取`;
          }
          if (timer.num === 0) {
            timer.flag = false;
            timer.text = timer.initText;
            clearInterval(handle);
          }
        }, 1000);
      },
      doSubmit() {
        if (this.bPressed) return;
        this.bPressed = true;

        if(!this.validate(true)){
          this.bPressed = false;
          return;
        }
        if(!this.validateCode){
          this.showAlert = true;
          this.alertMsg = "消息提示";
          this.alertStatus = '请输入验证码';
          this.bPressed = false;
          return;
        }
        Vue.ClientHttp().POST({
            'phone': this.phone,
            'code': this.validateCode
          }, Vue.ClientUrl.bind_phone)
          .then((res) => {

            if (res.code === 10000) {
              this.showAlert = true;
              this.alertMsg = "消息提示";
              this.alertStatus = res.msg || '绑定成功';
              this.updateUserInfo({bindPhone: this.phone});
              console.log(this.phone);
              setTimeout(()=>{ this.$router.push("/tao-you/personal/");}, 1500)
              return;
            }
            this.bPressed = false;
          });
      }
    }
  }
</script>

<style lang="scss" scoped>
.text-box{

    input{
      border: none;
      outline: none;
      width: 100%;
      height: 1.5rem;
      padding: 1.2rem 1rem;;
    }
    .send{
      min-width: 6rem;
      height: 2rem;
      line-height: 2rem;
      right: 1rem;
      padding: 0.25rem 0.75rem;
      border-color: #ff4a4a;
      color: #ff4a4a;
    }
  }

  .btn-area{
    a{
      display: block;
      margin: 0 auto;
      padding: 1.35rem;
      background-color: #ff4a4a;
    }
  }

  ::-webkit-input-placeholder {
      font-size: 1.3rem;
      color: #d7d8dc;
    }
</style>
