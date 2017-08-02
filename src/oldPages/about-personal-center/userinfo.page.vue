<style scoped>
  .info-line-box {
    padding-left: 1.6rem;
    border-top: 1px solid #dfdfdf;
    border-bottom: 1px solid #dfdfdf;
    background-color: #fff;
  }

  .info-line-box.first {
    margin: 1.2rem 0;
  }

  .info-line-box .info-list > li {
    line-height: 5rem;
    border-top: 1px solid #dfdfdf;
    padding-right: 1.6rem;
  }

  .info-line-box .info-list > li:first-child {
    border-top: 0;
  }

  .info-line-box .info-list .avatar {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }

  .info-line-box .info-list .t {
    font-size: 1.3rem;
    color: #000;
  }

  .info-line-box .info-list .c {
    font-size: 1.3rem;
    color: #898989;
  }

  .info-line-box .info-list .c .one-mall-iconfont {
    vertical-align: middle;
  }

  .v-hidden{
    visibility: hidden;
  }
  .but {
    width:90%;
    height:4rem;
    background:#ff4a4a;
    text-align:center;
    line-height:4rem;
    color:#fff;
    border:none;
    margin-left:5%;
    margin-top:1.5rem;
    border-radius:.8rem;
    font-size:1.8rem;
  }
</style>

<template>
   <app-header :title="'信息修改'" :type="type" :prev="'/personal'"></app-header>
  <section class="info-line-box first">
    <ul class="info-list">
      <li class="flex-ld">
        <span class="t">头像</span>
        <img class="avatar" :src="userInfo.avatar"></img>
      </li>
      <li class="flex-ld">
        <span class="t">ID</span>
        <span class="c">{{userInfo.userId}}<i class="one-mall-iconfont icon-guide v-hidden"></i></span>
      </li>
      <li class="flex-ld" v-if="userInfo.isCanUpdateName=='1'" v-link="'/personal/updatename'">
        <span class="t">昵称</span>
        <span class="c">{{userInfo.username}}<i class="one-mall-iconfont icon-guide"></i></span>
      </li>
      <li class="flex-ld" v-else>
        <span class="t">昵称</span>
        <span class="c">{{userInfo.username}}<i class="one-mall-iconfont icon-guide v-hidden"></i></span>
      </li>
    </ul>
  </section>
  <section class="info-line-box">
    <ul class="info-list">
      <li class="flex-ld" v-link="'/personal/address'">
        <span class="t">收货地址管理</span>
        <span class="c"><i class="one-mall-iconfont icon-guide"></i></span>
      </li>

      <li class="flex-ld" v-if="userInfo.bindPhone=='未绑定手机'" v-link="'/personal/bindphone'">
        <span class="t">绑定手机号</span>
        <span class="c">{{userInfo.bindPhone}}<i class="one-mall-iconfont icon-guide"></i></span>
      </li>
      <li class="flex-ld" v-else>
        <span class="t">绑定手机号</span>
        <span class="c">{{userInfo.bindPhone}}<i class="one-mall-iconfont icon-guide v-hidden"></i></span>
      </li>
      <!--<li class="flex-ld" v-else v-link="'../../xieyi'">-->
        <!--<span class="t">服务协议</span>-->
        <!--<span class="c"><i class="one-mall-iconfont icon-guide"></i></span>-->
      <!--</li>-->
      <!--<li class="flex-ld" v-link="'../../help'">-->
        <!--<span class="t">帮助中心</span>-->
        <!--<span class="c"><i class="one-mall-iconfont icon-guide"></i></span>-->
      <!--</li>-->
      <!--<li class="flex-ld" @click="logout">-->
        <!--<span class="t">退出登录</span>-->
        <!--<span class="c"><i class="one-mall-iconfont icon-guide"></i></span>-->
      <!--</li>-->
    </ul>
  </section>
  <button v-if="flag && userInfo.bindPhone" class="but"  @click="logout">退出</button>
  <!-- 底部菜单兰 -->
  <app-bottom-bar></app-bottom-bar>
</template>

<script>
  import Vue from 'vue';
  import AppHeader from '../../oldComponents/common/header/app-header';
  import AppBottomBar from '../../oldComponents/common/footer/app-bottom-bar';
  import { updateUserInfo } from '../../vuex/actions';
  export default {
    vuex: {
      actions: {
        updateUserInfo
      }
    },
    components: {
      AppHeader,
      AppBottomBar
    },
    data(){
      return {
        userInfo: {},
        isbind: 1,
        flag: false
      }
    },
    mounted() {
      $("body").css("background-color", "#f8f8f8");
      this.loadData();
    },
    methods: {
      loadData() {
        var _this = this;
        /*var url = "/api/personal/get_userinfo";*/
        Vue.OneMallHttp(this).GET({}, Vue.OneMallUrl.personal_userinfo).then(function (data) {
          if (data.result.bindPhone == "0") {
            data.result.bindPhone = "未绑定手机";
            _this.isbind = 0;
          }
          _this.userInfo = data.result;
          _this.flag = true;
        })
      },
 // 用户退出
      logout() {
        // 删除mID
        localStorage.removeItem('mID');
        localStorage.removeItem('Q_next_url');
        localStorage.removeItem('Q_from_url');
        localStorage.removeItem('httpStatus');
        localStorage.removeItem('login');
        var that = this;
        Vue.OneMallHttp(this).GET({}, Vue.OneMallUrl.common_user_logout)
          .then(function (res) {
            if (10000 === res.code) {
              that.updateUserInfo({
                'userId': '',
                'username': '',
                'avatar': '',
                'bindPhone': '',
                'taoBi': 0,
                'taoDou': 0,
                'isCanUpdateName': 0,
                'isShowSoreExchange': 0
              });
              that.$router.go({
                path: '/'
              })
            }
            else {
              // TODO
            }
          })
      }
    },
    destroyed(){
//      $("body").css({"background-color": "#fff"});
    }
  }
</script>
