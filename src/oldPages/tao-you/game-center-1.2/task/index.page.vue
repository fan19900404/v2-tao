<template>
  <div>
    <header-component :title="title">
    </header-component>
    <div class="tab__outer">
      <tab @game-rank-tab-action="select" :is-task="isTask" :tab-list="tabList"></tab>
    </div>
    <!--任务列表-->
    <section v-infinite-scroll="getData" infinite-scroll-distance="10" :infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false">
      <div class="task" v-for="(item,index) in dataList" :key="index">
        <div class="task__left">
          <img class="task__img" :src="item.picPath" alt="">
          <div class="task__intro">
            <div class="task__name overflow-ellipsis">{{item.title}}</div>
            <div class="task__type overflow-ellipsis-multiline">{{item.content}}</div>
            <bar-progress :used="item.count" :total="item.total" v-show="type==1 || type==3"></bar-progress>
            <div class="task__time" v-show="type==3">
              <span class="task__much">
                <i class="task__count--time"></i>
                <timer @timer-action="getNext" :endtime="parseInt(item.endTime) - parseInt(new Date().getTime()/1000)" :obj-style="{'color':'#333'}"></timer>
              </span>
            </div>
          </div>
        </div>
        <div class="task__right">
          <div class="task__info">
            <a class="task__btn task__btn--finished" v-if="item.isComplete==1" @click="go(item.url)">去完成</a>
            <a class="task__btn task__btn--get" v-if="item.isComplete==2" @click.stop="getTaskAward(item.id,index)">领取</a>
            <a class="task__btn task__btn--disabled" v-if="item.isComplete==3">已领取</a>
            <span class="task__award">{{item.reward}}</span>
          </div>
        </div>
      </div>
      <p v-show="loading" class="page-infinite-loading">
        <my-spinner type="fading-circle"></my-spinner>加载中...
      </p>
    </section>
    <return-btn></return-btn>
    <!--弹窗-->
    <dialog-component :show="showDialog" :content="showContent" :has-slot="false" left-btn-text="全部任务" right-btn-text="立即查看" @two-btns-dialog-component-left="left" @two-btns-dialog-component-right="right">
    </dialog-component>
  </div>
</template>
<style lang="scss" scoped>
@import "../../../../assets/tao-you/common";
.tab__outer {
  border-top: 1px solid #E5E5E5;
  border-bottom: 1px solid #E5E5E5;
}

.task {
  /*height: 0.765rem;*/
  background-color: #fff;
  display: flex;
  padding-left: .15rem;
  padding-right: .15rem;
  border-bottom: 1px solid #e5e5e5;
  &__left {
    display: flex;
    flex: 1;
  }
  &__right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    width: 1rem;
    font-size: .12rem;
  }
  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }
  &__img {
    display: block;
    width: .43rem;
    height: .43rem;
    margin-top: .1rem;
    border-radius: .05rem;
  }
  &__intro {
    flex: 1; // max-width: 1.5rem;
    margin-top: .1rem;
    margin-bottom: .1rem;
    padding-left: .1rem;
    padding-right: .1rem;
  }
  &__name {
    max-width: 1.5rem;
    height: .16rem;
    line-height: 1em;
    font-size: .16rem;
    color: #333;
  }
  &__type,
  &__platform {
    // max-width: 1.5rem;
    /*height: .32rem;*/
    line-height: .16rem;
    margin-top: .07rem;
    font-size: .14rem;
    color: #a5a5a5;
  }
  &__award {
    margin-top: .05rem;
    color: #a5a5a5;
    text-align: right;
    span {
      color: #ff4a4a;
    }
  }
  &__btn {
    display: inline-block;
    box-sizing: border-box;
    width: .55rem;
    height: .25rem;
    line-height: .25rem;
    color: #333;
    font-size: .13rem;
    /*px*/
    text-align: center;
    border: solid #f0f0f0 1px;
    /*no*/
    background-color: #fff;
    border-radius: .04rem;

    &--disabled,
    &--enabled {
      width: .55rem;
    }

    &--disabled {
      color: #adadad;
      background-color: #f0f0f0;
      border: none;
    }
    &--finished {
      color: #333333;
      border: solid #cccccc 1px;
    }
    &--get {
      color: #00c1b3;
      border: solid #00c1b3 1px;
    }
  }
  &__time {
    height: .15rem;
    line-height: .15rem;
    padding-top: 0.07rem;
  }
  &__much {
    font-size: .13rem;
    color: #a5a5a5;
    display: inline-flex;
    align-items: center;
    height: .18rem;
  }
  &__count--time {
    display: inline-block;
    height: .140rem;
    width: .130rem;
    color: #a5a5a5;
    margin-right: 0.03rem;
    background-image: url("/static/images/tao-you/welfare-shop/welfare-b.png");
    background-size: 100% 100%;
  }
}

.page-infinite-loading {
  font-size: .14rem;
  color: #a5a5a5;
}
</style>
<script>
import { mapActions } from 'vuex';
import { InfiniteScroll, Spinner } from 'mint-ui';
import Vue from 'vue';
import DialogComponent from '../../../../oldComponents/tao-you/dialog/two-buttons-simple-dialog.component';
import BarProgress from '../../../../oldComponents/tao-you/bar-progress/basic-bar-progress.component';
import HeaderComponent from '../../../../oldComponents/tao-you/layout/header.component';
import ReturnBtn from '../../../../oldComponents/tao-you/button/return.component';
import Tab from './component/game-rank-tab.component';
// import { updaTaskState} from '../../../../vuex/actions';
// 倒计时
import Timer from '../../../../oldComponents/tao-you/timer/date-timer.component';

Vue.component('my-spinner', Spinner);
export default {
  data() {
    return {
      title: '任务',
      dataList: [],
      loading: false,
      pageIndex: 1,
      pageSize: 10,
      allLoaded: false,
      // 当前选中的是哪一种任务0：每日，1：成就，2：游戏，3：限时(可能不开启)
      type: 0,
      // 弹框
      showDialog: false,
      dialogTitle: '',
      dialogContent: '',
      showContent: '888888',
      task1: null,
      task2: null,
      task3: null,
      task4: null,
      // 标识列表
      isTask: [],
      // 任务栏任务
      tabList: ['每日任务', '成就任务', '游戏任务'],
    };
  },
  computed: {
    ...mapActions(['updaTaskState']),
  },
  methods: {
    // 获取任务列表，考虑无限加载
    getData() {
      if (this.allLoaded) {
        return;
      }
      this.loading = true;
      let url = Vue.ClientUrl.task_list;
      const query = {
        page: this.pageIndex,
        limit: this.pageSize,
      };
      if (this.type === 0) {
        // 每日参数
        query.type = 2;
        query.isLimit = 2;
      }
      if (this.type === 1) {
        // 成就参数
        query.type = 3;
        query.isLimit = 2;
      }
      if (this.type === 2) {
        // 游戏参数
        url = Vue.ClientUrl.game_task;
      }
      if (this.type === 3) {
        // 限时参数
        query.isLimit = 1;
      }
      Vue.ClientHttp(this).GET(query, url)
        .then((res) => {
          this.loading = false;
          if (res.code === 10000) {
            this.dataList = this.dataList.concat(res.result);
            if (this.dataList.length === 0) {
              //无数据
              return;
            }
            let length = res.result.length;
            if (length > 0) {
              this.pageIndex++;
            } else {
              this.allLoaded = true;
            }

          }
        });
    },
    // 当前选中的哪一个
    select(index) {
      console.log(index);
      this.dataList = [];
      this.loading = false;
      this.pageIndex = 1;
      this.pageSize = 10;
      this.allLoaded = false;
      this.type = index;
      this.getData();
    },
    go(url) {
      if (url) {
        location.href = url;
      }
      this.updaTaskState();
    },
    getTaskAward(tid, index) {
      if (!mallUtils.checkLoggedIn(this)) {
        return;
      }
      let data = {};
      if (this.type === 0) {
        data = {
          id: tid,
          type: 1,
        };
      }
      if (this.type === 1) {
        data = {
          id: tid,
          type: 2,
        };
      }
      if (this.type === 2) {
        data = {
          id: tid,
          type: 3,
        };
      }
      if (this.type === 3) {
        data = {
          id: tid,
          type: 4,
        };
      }
      Vue.ClientHttp(this).POST(data, Vue.ClientUrl.get_task_award)
        .then((res) => {
          if (res.code === 10000) {
            this.showContent = res.msg;
            this.showDialog = true;
            this.dataList[index].isComplete = 3;
            this.getIsTask();
          }
        });
    },
    left() {
      this.showDialog = false;
      this.$router.push({ name: 'TaoYouTasks' });
    },
    right() {
      this.showDialog = false;
      this.$router.push({ name: 'TaoYouPersonalCenterNotice' });
    },
    // 获取是否有可领取任务提示
    getIsTask() {
      Vue.ClientHttp(this).GET({}, Vue.ClientUrl.task_have)
        .then((res) => {
          console.log(res.result);
          let arr = res.result;
          this.task1 = arr.indexOf(1) != -1 ? 1 : 0;
          this.task2 = arr.indexOf(2) != -1 ? 1 : 0;
          this.task3 = arr.indexOf(3) != -1 ? 1 : 0;
          this.task4 = arr.indexOf(4) != -1 ? 1 : 0;
          this.isTask = [this.task1, this.task2, this.task3, this.task4];
        });
    },
    // 控制是否显示限时任务
    isTimeTask() {
      Vue.ClientHttp(this).GET({}, Vue.ClientUrl.time_task)
        .then((res) => {
          if (res.code == 10000) {
            if (res.result == 1) {
              this.tabList.push('限时任务');
            } else {

            }
          }
        });
    },
  },
  components: {
    HeaderComponent,
    Tab,
    InfiniteScroll,
    ReturnBtn,
    DialogComponent,
    BarProgress,
    Timer,
  },
  mounted() {
    this.getData();
    this.isTimeTask();
    // this.getIsTask();
  },
};
</script>
