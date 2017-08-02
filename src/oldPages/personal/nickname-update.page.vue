<!-- author:yex -->
<template>
  <app-header :title="title"></app-header>
      <section class="container text-default">
        <div class="text-box bgc-white margin-top text-default padding position-relative">
          <div class="w95">
            <input v-el:nickname value="{{nickName}}" class="padding-small" type="text" maxlength="16" placeholder="昵称为1-13字符，支持中英文、数字、下划线" autofocus maxlength="20">
          </div>
          <i class="icon icon-cancel align-vertical text-gray text-big" @click="cancel()"></i>
        </div>
        <div class="btn-area text-center margin-top">
          <a class="radius w85 text-big" @click.stop="submit">确定</a>
        </div>
        <div class="intro text-sub text-center margin-top">每个用户只可以修改1次</div>
      </section>
      <!-- common alert -->
      <common-alert :type="alertType" :show-alert="showAlert" :alert-msg="alertMsg" :alert-status="alertStatus"></common-alert>
  </section>
</template>

<script>
  'use strict';
  import AppHeader from '../../oldComponents/common-layout/header.component';
  import CommonAlert from '../../oldComponents/common-alert/common-alert.component';
  import { user } from '../../vuex/getters';
  import { getUserInfo, updateUserInfo } from '../../vuex/actions';

  export default {
    vuex: {
      getters: {
        user: user
      },
      actions: {
        getUserInfo, updateUserInfo
      }
    },
    components: {
      AppHeader,
      CommonAlert
    },
    data() {
      return {
        title: '修改昵称',
        bPressed: false,
        // 弹框
        alertType: 0,
        showAlert: false,
        alertMsg: '',
        alertStatus: ''
      }
    },
    computed:{
      nickName(){
        return this.user.username;
      }
    },
    mounted() {
      $('body').css('background-color', '#f8f8f8');
      this.getUserInfo();
    },
    methods: {

      /* 清空input */
      cancel(){
        this.$els.nickname.value = '';
      },

      /* 用户提交昵称 */
      submit() {
        if (this.bPressed) {
          return;
        }
        this.bPressed = true;
        let nickName = this.$els.nickname.value;

        // 4-16字符，支持中英文，数字，下划线
        let length = this.getByteLen(nickName);
        if (!/^[0-9a-zA-Z\u4e00-\u9fa5_]{0,}$/.test(nickName) || (length < 1 || length > 13)) {
          this.showAlert = true;
          this.alertMsg = '消息提示';
          this.alertStatus = '昵称为1-13字符，支持中英文、数字、下划线';
          this.bPressed = false;
          return;
        }
        Vue.ClientHttp().POST({
            'username': nickName
          }, Vue.ClientUrl.update_nickname)
          .then((res) => {
            this.showAlert = true;
            this.alertMsg = "消息提示";
            this.alertStatus = res.msg;
            if (res.code === 10000) {
              this.updateUserInfo({username: nickName, isCanUpdateName: 0});
              setTimeout(() => {
                this.$router.push("/tao-you/personal/user-info");
                return;
              }, 1000);
              return;
            }
            this.bPressed = false;
          });
      },

      /*获取输入的字符长度*/
      getByteLen(val) {
        let len = 0;
        for (let i = 0; i < val.length; i++) {
          let length = val.charCodeAt(i);
          if (length >= 0 && length <= 128) {
            len += 1;
          } else {
            len += 2;
          }
        }
        return len;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .text-box{
    border-top: solid #dfdfdf 1px;
    border-bottom: solid #dfdfdf 1px;

    input{
      border: none;
      outline: none;
      width: 100%;
    }
    i{
      height: 1.5rem;
      right: 1rem;
    }
  }

  .btn-area{
    a{
      display: block;
      margin: 0 auto;
      padding: 1.4rem;
      color: #fff;
      background-color: #ff4a4a;
    }
  }

  ::-webkit-input-placeholder {
      font-size: 1.3rem;
      color: #d7d8dc;
    }
</style>
