<template>
  <div>
    <app-header :title="title"></app-header>

    <!-- 是否之前绑定过手机 -->
    <section v-if="user.bindPhone" class="container-origin">
      <div class="am-list form">
        <div class="am-list-body">
          <div class="am-list-item am-input-autoclear">
            <div class="am-list-label">手机号</div>
            <div class="am-list-control">
              <!-- {{user.bindPhone}} -->
              <input v-model="oldPhone" type="text" :value="user.bindPhone" placeholder="输入手机号" maxlength="11" readonly="readonly">
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="container">
      <div class="am-list form">
        <div class="am-list-body">
          <div class="am-list-item am-input-autoclear">
            <div class="am-list-label">手机号</div>
            <div class="am-list-control">
              <input v-model="phone" type="text" placeholder="输入手机号" maxlength="11" autofocus>
            </div>
            <div v-show="phone !=''" class="am-list-clear" @click="clear">
              <i class="icon icon-cancel"></i>
            </div>
          </div>
          <div class="am-list-item am-input-autoclear">
            <div class="am-list-label">验证码</div>
            <div class="am-list-control">
              <input v-model="validateCode" type="text" placeholder="短信验证码" maxlength="10">
            </div>
            <div class="am-list-clear">
              <i class="am-icon-clear am-icon"></i>
            </div>
            <div class="am-list-button">
              <button @click="getValidateCode" type="button">{{ timer.text }}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="button-area">
        <app-button :btn-theme="btnTheme" btn-text="确定" @button-component="doSubmit"></app-button>
      </div>
    </section>

    <one-simple-button :show="showMsg" :content="msgContent" btn-text="确定">
    </one-simple-button>

    <return-btn></return-btn>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import $ from 'jquery';
import AppHeader from '../../../oldComponents/tao-you/layout/header.component';
import AppButton from '../../../oldComponents/tao-you/button/button.component';
import OneSimpleButton from '../../../oldComponents/tao-you/dialog/one-button-simple-dialog.component';
import ReturnBtn from '../../../oldComponents/tao-you/button/return.component';
// import { updateUserInfo, getUserInfo } from '../../../vuex/actions';
// import { user } from '../../../vuex/getters';

export default {
  components: {
    ReturnBtn,
    AppHeader,
    AppButton,
    OneSimpleButton,
  },
  data() {
    return {
      title: '绑定手机',
      bPressed: false,
      timer: {
        flag: false,
        cycle: 60,
        num: 0,
        initText: '重发验证码',
        text: '发送验证码',
        msg: {
          info: '验证码已发送至您的手机',
          nullMsg: '请输入您的手机号码',
          error: '请输入正确的手机号码',
          multiple: '{{num}}秒后重发',
          unChange: '新手机号不可与原手机号相同',
        },
      },
      phone: '',
      oldPhone: '',
      validateCode: '',
      // 弹框
      showMsg: false,
      msgContent: '',
    };
  },
  watch: {
    $route() {
      this.title = (this.user.bindPhone === '') ? '绑定手机' : '修改绑定手机';
    },
  },
  computed: {
    ...mapGetters(['user']),
    // 手机格式是否正确
    btnTheme() {
      return /^1\d{10}$/.test(this.phone) ? 0 : 2;
    },
  },
  mounted() {
    this.getUserInfo();
    $('body').css('background-color', '#f5f5f9');
  },
  methods: {
    ...mapActions(['updateUserInfo', 'getUserInfo']),
    clear() {
      this.phone = '';
    },
    getValidateCode() {
      if (!this.validate()) {
        return;
      }
      this.cutDown();

      Vue.ClientHttp(this).GET({
        phone: this.phone, type: 'bind',
      }, Vue.ClientUrl.send_validate_code)
        .then((res) => {
          if (res.code !== 10000) {
            //              this.msgContent = this.timer.msg.info;
            this.msgContent = res.msg;
            this.showMsg = true;
          }
        });
    },
    validate(flag) {
      if (this.phone === '') {
        this.msgContent = this.timer.msg.nullMsg;
        this.showMsg = true;
        return false;
      }
      if (!/^1\d{10}$/.test(this.phone)) {
        this.msgContent = this.timer.msg.error;
        this.showMsg = true;
        return false;
      }
      if (this.phone == this.oldPhone) {
        this.msgContent = this.timer.msg.unChange;
        this.showMsg = true;
        return false;
      }
      if (flag) {
        return true;
      }
      if (this.timer.flag) {
        this.msgContent = this.timer.msg.multiple.replace('{{num}}', this.timer.num);
        this.showMsg = true;
        return false;
      }
      return true;
    },
    cutDown() {
      const timer = this.timer;
      timer.flag = true;
      timer.text = `${timer.cycle}秒后重发`;
      timer.num = parseInt(timer.text);
      const handle = setInterval(() => {
        if (!isNaN(timer.num)) {
          timer.num -= 1;
          timer.text = `${timer.num}秒后重发`;
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

      if (!this.validate(true)) {
        this.bPressed = false;
        return;
      }
      if (!this.validateCode) {
        this.msgContent = '请输入验证码';
        this.showMsg = true;
        this.bPressed = false;
        return;
      }
      Vue.ClientHttp(this).POST({
        phone: this.phone,
        code: this.validateCode,
      }, Vue.ClientUrl.bind_phone)
        .then((res) => {
          if (res.code === 10000) {
            this.msgContent = res.msg || '恭喜您绑定成功！';
            this.showMsg = true;
            setTimeout(() => {
              this.updateUserInfo({
                bindPhone: this.phone,
              });
              this.$router.push({
                name: 'TaoYouPersonalCenter',
              });
            }, 1500);
          } else {
            this.msgContent = res.msg;
            this.showMsg = true;
            this.bPressed = false;
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/tao-you/common.scss';

.container-origin {
  padding-top: .05rem;
}

.container {
  padding-top: 0;
}

.am-list-body {
  border-top: solid $primary-border 1px;
  background-color: #ffffff;
}

.am-list-item.am-input-autoclear {
  border-bottom: solid $primary-border 1px;
}

.icon {
  font-size: .16rem;
  color: #ccc;
}

.am-list:not([am-version]).form .am-list-button button {
  color: #329dff;
}

.button-area {
  margin-top: .19rem;
  padding-left: .15rem;
  padding-right: .15rem;
}
</style>
