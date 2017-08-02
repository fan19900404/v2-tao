<template>
  <div>
    <app-header :title="title"></app-header>

    <section class="list-item">
      <div class="am-list sicon">
        <a class="am-list-item-wrapper">
          <div class="am-list-item" id="picker">
            <div class="am-list-content">头像</div>
            <div class="img-wrapper">
              <img :src="user.avatar" alt="">
            </div>
          </div>
        </a>
        <!-- 未修改 1 -->
        <a v-if="user.isCanUpdateName == 1" @click="link({name: 'UpdateNickname'})" class="am-list-item-wrapper">
          <div class="am-list-item">
            <div class="am-list-content">昵称</div>
            <div class="am-list-extra">{{ user.username }}</div>
            <div class="am-list-arrow">
              <span class="am-icon arrow horizontal"></span>
            </div>
          </div>
        </a>
        <!-- 已经修改过 0 -->
        <a v-else class="am-list-item-wrapper">
          <div class="am-list-item">
            <div class="am-list-content">昵称</div>
            <div class="am-list-extra">{{ user.username }}
              <!-- （已修改过昵称） -->
            </div>
            <!--<div class="am-list-arrow">-->
            <!--<span class="am-icon arrow horizontal"></span>-->
            <!--</div>-->
          </div>
        </a>
      </div>

    </section>

    <dialog-component :show="showDialog" :content="dlgContent" btn-text="确定">
    </dialog-component>

    <!-- 返回 -->
    <return-btn></return-btn>
  </div>
</template>

<script>
import $ from 'jquery';
import { mapActions, mapGetters } from 'vuex';
import Vue from 'vue';
import AppHeader from '../../../oldComponents/tao-you/layout/header.component';
// import { user } from '../../../vuex/getters';
// import { getUserInfo } from '../../../vuex/actions';
// import { updateUserInfoImg } from '../../../vuex/actions';
import DialogComponent from '../../../oldComponents/tao-you/dialog/one-button-simple-dialog.component';
import ReturnBtn from '../../../oldComponents/tao-you/button/return.component';

export default {
  // vuex: {
  //   getters: {
  //     user,
  //   },
  //   actions: {
  //     getUserInfo,
  //     updateUserInfoImg,
  //   },
  // },
  components: {
    AppHeader,
    DialogComponent,
    ReturnBtn,
  },
  data() {
    return {
      title: '修改信息',
      // 默认可以修改姓名
      isCanUpdateName: true,
      showDialog: false,
      dlgContent: '',
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    ...mapActions(['getUserInfo', 'updateUserInfoImg']),
    link(url) {
      this.$router.push(url);
    },
    // 用户退出
    logout() {
      const that = this;
      Vue.OneMallHttp(this).GET({}, Vue.OneMallUrl.common_user_logout)
        .then((res) => {
          if (res.code === 10000) {
            that.$router.push({
              path: '/tao-you/',
            });
          }
        });
    },
    // 获取当前用户的信息
    getCurrentUserInfo() {
      Vue.ClientHttp(this).GET({}, Vue.ClientUrl.user_info)
        .then((res) => {
          this.userInfo = res.result;
        });
    },
  },
  mounted() {
    $('body').css('background-color', '#f5f5f9');
    this.getUserInfo();
    let _this = this;
    let target;
    if (window.API_USE == 2 || window.API_USE == 0) {
      target = 'http://release-interface.lly800.com/User/Center/update_head';
    } else {
      target = 'http://p.lly800.com/User/Center/update_head';
    }
    //      var flow = new Flow({
    //        target:target,
    //        query:{},
    //        testChunks: false,
    //        // 验证携带cookie
    //        withCredentials: true,
    //        // 允许重复上传
    //        allowDuplicateUploads: true,
    //        fileParameterName: 'file'
    //      })
    //      flow.assignBrowse(document.getElementById('picker'));
    //
    //      flow.on('fileAdded', function(file, event){
    //      });
    //      flow.on('fileSuccess', function(file,message){
    //        message=JSON.parse(message)
    //        if(message.code==10000){
    //          _this.updateUserInfoImg(message.path)
    //          _this.dlgContent='修改成功'
    //        }else{
    //          _this.dlgContent=message.msg
    //        }
    //        _this.showDialog=true;
    //      });
    //      flow.on('fileError', function(file, message){
    //      });
    //      flow.on('filesSubmitted', function(array, e) {
    //        // 开始上传文件
    //        flow.upload();
    //      });
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/tao-you/common.scss';

.list-item {
  overflow-x: hidden;
  margin-top: .1rem;
}

.am-list {
  padding-bottom: .1rem;
}

.am-list-item-wrapper {
  display: block;
  background-color: $white;

  &:first-child {
    border-top: solid $primary-border 1px;

    .am-list-item.game-info {
      border-bottom: none;
    }
  }
  &:last-child {
    border-bottom: solid $primary-border 1px;

    .am-list-item {
      border-bottom: none;
    }
  }
  .am-list-item {
    border-bottom: solid $primary-border 1px;
    font-size: .16rem;

    .am-list-content {
      color: $dark;
    }
    .am-list-extra {
      font-size: $font-size-md;
    }
    .img-wrapper {
      width: .29rem;
      height: .29rem;
      img {
        border-radius: 50%;
        max-height: 100%;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
