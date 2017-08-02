<template>
  <div>
    <app-header :title="title"></app-header>
    <section class="container">
      <div class="am-list form">
        <div class="am-list-body">
          <div class="am-list-item am-input-autoclear">
            <div class="am-list-label">昵称</div>
            <div class="am-list-control">
              <input ref="nickname" :value="nickName" type="text"  placeholder="请输入您的昵称" autofocus maxlength="13">
            </div>
            <div class="am-list-clear" @click="cancel">
              <i class="icon icon-cancel"></i>
            </div>
          </div>
          <div class="tips">注意：每个用户可以修改1次</div>
        </div>
      </div>
      <div class="button-area">
        <app-button btn-text="确定" @button-component="submit"></app-button>
      </div>
    </section>

    <one-simple-button :show="showMsg" :content="msgContent" btn-text="确定"></one-simple-button>

    <return-btn></return-btn>
  </div>
</template>

<script>
import $ from 'jquery';
import { mapGetters, mapActions } from 'vuex';
import Vue from 'vue';
import AppHeader from '../../../oldComponents/tao-you/layout/header.component';
import CommonAlert from '../../../oldComponents/common-alert/common-alert.component';
import AppButton from '../../../oldComponents/tao-you/button/button.component';
import OneSimpleButton from '../../../oldComponents/tao-you/dialog/one-button-simple-dialog.component';
import ReturnBtn from '../../../oldComponents/tao-you/button/return.component';

export default {
  components: {
    ReturnBtn,
    AppHeader,
    CommonAlert,
    AppButton,
    OneSimpleButton,
  },
  data() {
    return {
      title: '修改昵称',
      bPressed: false,
      // 弹框
      showMsg: false,
      msgContent: '',
    };
  },
  computed: {
    ...mapGetters(['user']),
    nickName() {
      return this.user.username;
    },
  },
  mounted() {
    $('body').css('background-color', '#f5f5f9');
    this.getUserInfo();
  },
  methods: {
    ...mapActions(['getUserInfo', 'updateUserInfo']),
    /* 清空input */
    cancel() {
      this.$refs.nickname.value = '';
    },

    /* 用户提交昵称 */
    submit() {
      if (this.bPressed) {
        return;
      }
      this.bPressed = true;
      const nickName = this.$refs.nickname.value;

      // 1-16字符，支持中英文，数字，下划线
      const length = this.getByteLen(nickName);
      if (!/^[0-9a-zA-Z\u4e00-\u9fa5_]{0,}$/.test(nickName) || (length < 1 || length > 13)) {
        this.msgContent = '昵称为1-13字符，支持中英文、数字、下划线';
        this.showMsg = true;
        this.bPressed = false;
        return;
      }
      Vue.ClientHttp(this).POST({
        username: nickName,
      }, Vue.ClientUrl.update_nickname)
        .then((res) => {
          this.bPressed = false;
          if (res.code !== 10000) {
            this.msgContent = res.msg || '昵称修改失败';
            this.showMsg = true;
            return;
          }
          this.updateUserInfo({
            username: nickName,
            isCanUpdateName: 0,
          });
          this.msgContent = res.msg || '昵称修改成功';
          this.showMsg = true;
          setTimeout(() => {
            this.$router.push({ name: 'TaoYouPersonalCenter' });
          }, 1000);
        });
    },

    /*获取输入的字符长度 */
    getByteLen(val) {
      let len = 0;
      for (let i = 0; i < val.length; i++) {
        const length = val.charCodeAt(i);
        if (length >= 0 && length <= 128) {
          len += 1;
        } else {
          len += 2;
        }
      }
      return len;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/tao-you/common.scss';

.container {
  padding-top: .105rem;
}

.am-list-body {
  border-top: solid $primary-border 1px;
}

.am-list-item.am-input-autoclear {
  border-bottom: solid $primary-border 1px;
  background-color: #fff !important;
}

.icon {
  font-size: .16rem;
  color: #ccc;
}

.tips {
  padding: .1rem .15rem 0;
  font-size: $font-size-xs;
  color: $primary;
}

.button-area {
  margin-top: .09rem;
  padding-left: .15rem;
  padding-right: .15rem;
}
</style>
