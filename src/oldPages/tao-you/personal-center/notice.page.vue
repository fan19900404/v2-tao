<!-- author:yex -->
<template>
  <div>
    <!--公共头部组件-->
    <app-header :title="title"></app-header>
    <!--列表有数据-->
    <section v-if="visited && notices.length > 0">
      <div class="operating-region">
        <div class="operating" v-if="!!!curMode">
          <div class="operating__area" @click.stop="btnEditClick">编辑</div>
        </div>
        <div class="operating operating" v-else>
          <div class="operating__area" @click.stop="btnCancelClick">取消</div>
          <div class="operating__area" @click.stop="btnSelectAllClick">全选</div>
          <div class="operating__area" :class="{'disabled': checkedNotices.length==0}" @click.stop="btnReadClick">已读</div>
          <div class="operating__area" :class="{'disabled': checkedNotices.length==0}" @click.stop="btnDelClick">删除</div>
        </div>
      </div>
      <!-- <ul class="list"
              v-infinite-scroll="loadNotices()"
              infinite-scroll-disabled="loading"
              infinite-scroll-distance="10"
              infinite-scroll-immediate-check="false"> -->
      <ul class="list">
        <!-- <li class="item" v-for = "item in notices" @click.stop="checkDetail(item)"> -->
        <li class="item" v-for="item in notices">
          <!--<label :for="'notice_' + item.id" class="item-select" v-if="!!curMode">
                  <i class="icon" :class="{'icon-select': checkedNotices.includes(item.id), 'icon-unselect': !checkedNotices.includes(item.id)}"></i>
                  <input type="checkbox" :id="'notice_' + item.id" :value="item.id" v-model="checkedNotices">
                </label>-->
          <div class="item-main" @click="updateNoticeState(item)" v-if="!curMode">
            <div class="title-bar">
              <div class="title flex-1" :class="{'unread': item.status==0}">
                <div v-if="item.status==0" class="diandian"></div>
                <div>系统消息</div>
              </div>
              <div class="sendtime">
                {{ getFormatterDate(item.publishtime) }}
              </div>
            </div>
            <div class="content">
              {{ item.lettertitle }}
            </div>
          </div>
          <label class="edit-mode" :for="'notice_' + item.id" v-else>
            <div class="item-select">
              <i class="icon" :class="{'icon-select': checkedNotices.indexOf(item.id)!= -1, 'icon-unselect': checkedNotices.indexOf(item.id) == -1}"></i>
              <input type="checkbox" :id="'notice_' + item.id" :value="item.id" v-model="checkedNotices">
            </div>
            <div class="item-main">
              <div class="title-bar">
                <div class="title flex-1" :class="{'unread': item.status==0}">
                  <div v-if="item.status==0" class="diandian"></div>
                  <div>系统消息</div>
                </div>
                <div class="sendtime">
                  {{ getFormatterDate(item.publishtime) }}
                </div>
              </div>
              <div class="content">
                {{ item.lettertitle }}
              </div>
            </div>
          </label>
        </li>
      </ul>
      <p v-show="loading" class="page-infinite-loading">
        <spinner type="fading-circle">加载中</spinner>
      </p>
    </section>

    <!--列表无数据-->
    <section v-if="visited && notices.length == 0">
      <div class="no-data">
        <div class="img-wrapper">
          <img src="/static/images/tao-you/personal-center/no-data.png">
          <p class="no-data-desc">当前没有消息记录哦！</p>
        </div>
      </div>
    </section>

    <confirm-dialog :btn-text="dialogTitle" :content="content" :show="isShow" :left-btn-text="leftBtnText" :right-btn-text="rightBtnText" :show-close-btn="false" :danger="true" :show-title="true" @two-btns-dialog-component-left="confirmOk" @two-btns-dialog-component-right="confirmNg"></confirm-dialog>

    <return-btn></return-btn>
    <!-- 返回顶部 -->
    <back-top></back-top>
  </div>
</template>

<script>
import $ from 'jquery';
import Vue from 'vue';
import { InfiniteScroll, Spinner, Toast } from 'mint-ui';
import AppHeader from '../../../oldComponents/tao-you/layout/header.component';
import ReturnBtn from '../../../oldComponents/tao-you/button/return.component';
import ConfirmDialog from '../../../oldComponents/tao-you/dialog/two-buttons-simple-dialog.component';
// 添加回到顶部
import BackTop from '../../../oldComponents/tao-you/button/back-top.component';

Vue.component('spinner', Spinner);
Vue.use(InfiniteScroll);

export default {
  data() {
    return {
      title: '我的消息',
      // 是否有数据
      visited: false,
      loading: false, // 加载中
      allLoaded: false, // 已全部加载
      pageIndex: 1, // 当前第几页
      pageSize: 8, // 一页数据条数
      notices: [], // 我的游戏列表
      curMode: 0,
      curOperating: 0,
      // 询问框
      isShow: false,
      dialogTitle: '',
      content: '',
      leftBtnText: '',
      rightBtnText: '',
      checkedNotices: [],
    };
  },
  components: {
    AppHeader,
    InfiniteScroll,
    ReturnBtn,
    BackTop,
    ConfirmDialog,
  },
  methods: {
    btnReadClick() {
      if (this.checkedNotices.length == 0) {
        Toast('请先选择要操作的消息');
        return;
      }
      this.checkedNotices = this.checkedNotices.filter((item) => {
        for (let i = 0, j = this.notices.length; i < j; i++) {
          if (item == this.notices[i].id && this.notices[i].status == 0) {
            return true;
          }
        }
        return false;
      }, this);
      this.curOperating = 0;
      this.confirmOk();
    },
    btnDelClick() {
      if (this.checkedNotices.length == 0) {
        Toast('请先选择要操作的消息');
        return;
      }
      this.dialogTitle = '确定删除';
      this.content = '即将删除消息，删除后无法找回';
      this.leftBtnText = '删除';
      this.rightBtnText = '取消';
      this.curOperating = 1;
      this.isShow = true;
    },
    btnEditClick() {
      this.curMode = 1;
    },
    btnCancelClick() {
      this.curMode = 0;
      this.checkedNotices = [];
    },
    btnSelectAllClick() {
      if (this.checkedNotices.length == this.notices.length) {
        this.checkedNotices = [];
        return;
      }
      this.checkedNotices = [];
      for (let i = 0, j = this.notices.length; i < j; i++) {
        this.checkedNotices.push(this.notices[i].id);
      }
    },
    confirmOk() {
      this.isShow = false;
      (this.curOperating) ? this.doDel() : this.doRead();
    },
    confirmNg() {
      this.isShow = false;
    },
    doRead() {
      Vue.ClientHttp(this).POST({
        platForm: 1,
        ids: this.checkedNotices.join(','),
      }, Vue.ClientUrl.read_by_ids)
        .then((res) => {
          if (res.code === 10000) {
            Toast(res.msg || '操作成功');
            this.notices.forEach((item) => {
              if (this.checkedNotices.indexOf(item.id) != -1) {
                item.status = 1;
              }
            }, this);
            this.checkedNotices = [];
          }
        });
    },
    doDel() {
      Vue.ClientHttp(this).POST({
        platForm: 1,
        ids: this.checkedNotices.join(','),
      }, Vue.ClientUrl.del_by_ids)
        .then((res) => {
          if (res.code === 10000) {
            Toast(res.msg || '操作成功');
            this.notices = this.notices.filter((item) => {
              for (let i = 0, j = this.checkedNotices.length; i < j; i++) {
                if (item.id == this.checkedNotices[i]) {
                  return false;
                }
              }
              return true;
            }, this);
            this.checkedNotices = [];
          }
        });
    },

    /* 加载我的消息列表 */
    loadNotices() {
      if (this.loading || this.allLoaded) {
        return;
      }
      this.loading = true;
      Vue.ClientHttp(this).POST({
        // page: this.pageIndex,
        // limit: this.pageSize,
        platForm: 1,
      }, Vue.ClientUrl.my_notice_list)
        .then((res) => {
          this.loading = false;
          if (res.code === 10000) {
            // this.notices = this.notices.concat(res.list);
            this.notices = res.result;
            this.visited = true;
            // let length = res.list.length;
            // if (length > 0) {
            //   this.pageIndex++;
            // }
            // if (length < this.pageSize) {
            //   this.allLoaded = true;
            // }
          }
        });
    },
    updateNoticeState(item) {
      if (!item.status) {
        Vue.ClientHttp(this).GET({
          id: item.id,
        }, Vue.ClientUrl.notice_detail);
      }
      if (/^http(s*)/.test(item.url)) {
        location.href = item.url;
        return;
      }
      if (item.url) {
        this.$router.push(item.url);
        return;
      }
      this.$router.push({ name: 'TaoYouPersonalCenterNoticeDetail', params: { id: item.id } });
    },
    getFormatterDate(date) {
      return mallUtils.date.format(date * 1000, 'yyyy-MM-dd hh:mm');
    },
  },
  mounted() {
    $('body').css('background-color', '#f9f9f9');

    // 加载消息列表
    this.loadNotices();
  },
};
</script>

<style lang="scss" scoped>
.operating-region {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  width: 100%;
  max-width: 640px;
  border-top: solid #e5e5e5 1px;
}

.operating {
  display: flex;
  align-items: center;
  height: 0.43rem;
  line-height: 0.43rem;
  margin: 0;
  font-size: .13rem;
  color: #666;
  background-color: #fff;

  &__area:not(:last-child) {
    border-right: solid #e8e8e8 2px;
  }

  &__area {
    flex: 1;
    height: 0.2rem;
    line-height: 0.2rem;
    text-align: center;
    color: #00c1b3;
  }

  &__area.disabled {
    color: #a5a5a5;
  }
}

.list {
  padding-left: .15rem;
  padding-right: .15rem;
  margin-bottom: .43rem;
  background-color: #fff;
  border-bottom: solid #dfdfdf 1px;
}

.item {
  display: flex;

  padding-top: .13rem;
  padding-bottom: .13rem;
  color: #898989;

  .edit-mode {
    display: flex;
    width: 100%;
  }

  .item-select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: .18rem;
    padding-right: .035rem;

    .icon-select {
      color: #00c1b3;
    }
    .icon-unselect {
      color: #a9a9a9;
    }

    i {
      width: .18rem;
      height: .18rem;
      font-size: .18rem;
    }

    input {
      position: absolute;
      left: -9999px;
    }
  }


  .item-main {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex: 1;
  }

  .title-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .02rem;
    font-size: .14rem;
    .title {
      padding-left: .18rem;
    }

    .title.unread {
      display: flex;
      align-items: center;
      padding-left: 0;
      color: #000;
    }
  }

  .sendtime {
    width: 1.2rem;
    text-align: right;
  }

  .content {
    line-height: 1.35;
    font-size: .12rem;

    padding-left: .18rem;
  }

  &:not(:last-child) {
    border-bottom: solid #dfdfdf 1px;
  }
}

.diandian {
  width: .08rem;
  height: .08rem;
  margin-right: .1rem;
  background-color: red;
  border-radius: 50%;
}

.no-data {
  position: relative;
  .img-wrapper {
    font-size: .12rem;
    color: #898989;
  }
  .no-data-desc {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 13px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
}
</style>
