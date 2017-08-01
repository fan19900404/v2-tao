
<template>
  <div>
    <!--公共头部组件-->
    <app-header :title="title"></app-header>
    <!--游戏信息-->
    <div class="infinite">
      <ul>
        <li class="infinite--li am-wingblank wb15px ">
          <div class="infinite--li--lf" @click='link({name:"TaoYouOurGameIntro",params:{id:gameinfo.gid},query:{type:gameinfo.type}})'>
            <div class="infinite--li--lf--lf">
              <img :src="gameinfo.imgUrl">
            </div>
            <div class="infinite--li--lf--rh">
              <div class="content">
                <p class="infinite--p--top">{{gameinfo.title.slice(0,4)}}</p>
                <p v-if="now" class="infinite--p--bottom" v-cloak>
                  <app-timer @timer-action="getNext" :endtime="quickGamesStatus"></app-timer>
                </p>
                <p v-else class="infinite--p--bottom">{{totalTime}}</p>
              </div>
            </div>
          </div>
          <div class="infinite--li--rh">

            <a class="infinite--li--rh--a am-ft-sm" id="infinite--li--rh--a" @click="link({name: 'TaoYouPersonalCenterGameRule'})">规则</a>
            <a class="infinite--li--rh--top am-ft-sm" @click="pre" v-if="istop">上期排行</a>
          </div>
        </li>
        <li class="qihao">第{{gameinfo.number}}期</li>
      </ul>
    </div>
    <!--有游戏排行榜-->
    <section class="section-container" v-show="isranking" v-infinite-scroll="getUserList ()" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
      <div class="game-rank am-wingblank wb15px" v-for="(item,index) in userlist" :key="index">
        <div class="game-rank-rh am-wingblank wb15px">
          <div class="infinite" style="border:none">
            <ul>
              <li class="infinite--li">
                <div class="infinite--li--center am-ft-left">{{item.rank}}</div>
                <div class="infinite--li--lf" id="infinite--li--lf">
                  <div class="infinite--li--lf--lf" id="infinite--li--lf--lf">
                    <img :src="item.picPath">
                  </div>
                  <div class="infinite--li--lf--rh">
                    <div>
                      <p class="infinite--p--top">{{item.name}}</p>
                      <p class="infinite--p--bottom">最好成绩:{{item.score}}</p>
                    </div>
                  </div>
                </div>
                <div class="infinite--li--rh  self__a " id="infinite--li--rh">
                  <a class="infinite--li--rh--self">+{{item.prize}}淘豆</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p v-show="loading" class="page-infinite-loading margin-top">
        <mt-spinner type="fading-circle"></mt-spinner>加载中
      </p>
    </section>
    <!--没有排行榜信息-->
    <section class="container-list" v-show="!isranking">
      <div class="container-list-cen am-wingblank wb15px">
        <div class="container--cen--l">
          <img src="/static/images/tao-you/personal-center/norebate.png">
        </div>
        <p class="am-ft-center am-ft-20 am-ft-lightgray">当前暂无排行记录</p>
      </div>
    </section>

    <!-- 返回按钮 -->
    <return-btn></return-btn>
  </div>
</template>

<script>
import Vue from 'vue';
import $ from 'jquery';
import { mapActions, mapGetters } from 'vuex';
import { InfiniteScroll, Spinner } from 'mint-ui';
import AppHeader from '../../../components/tao-you/layout/header.component';
import AppTimer from '../../../components/tao-you/timer/match-timer-type.component';
// import { user } from '../../../vuex/getters';
// import { getUserInfo } from '../../../vuex/actions';
import ReturnBtn from '../../../components/tao-you/button/return.component';

Vue.component('mt-spinner', Spinner);
Vue.use(InfiniteScroll);

export default {
  data() {
    return {
      title: '排行榜',
      // 是否显示上一期按钮
      istop: true,
      // 是否有游戏排行榜
      isranking: true,
      // 游戏信息
      gameinfo: [],
      // 游戏用户排行榜列表
      userlist: [],
      // 是否点击上一期
      prelist: 0,
      // 上一期id
      pre_pid: null,
      // 是否第一次进
      first: 0,
      totalTime: '',
      now: true,
      // 滚动加载更多，未用到
      loading: false, // 加载中
      allLoaded: false, // 已全部加载
      pageIndex: 1, // 当前第几页
      pageSize: 10, // 一页数据条数
      quickGamesStatus: 0,
    };
  },
  computed: {
    ...mapGetters(['user']),
    leftTimeString() {

    },
  },
  components: {
    AppHeader,
    InfiniteScroll,
    Spinner,
    AppTimer,
    ReturnBtn,
  },
  methods: {
    ...mapActions(['getUserInfo']),
    link(url) {
      this.$router.push(url);
    },
    getNext() {
      this.now = false;
      this.totalTime = '已结束';
    },
    // 加载用户排行
    getUserList() {
      if (this.allLoaded) {
        return;
      }
      this.loading = true;
      let query = {};
      if (this.prelist != 0) {
        this.now = false;
        this.totalTime = '已结束';
        this.istop = false;
        this.isranking = true;
        query = {
          pid: this.pre_pid,
          p: this.pageIndex,
          limit: this.pageSize,
        };
      } else {
        query = {
          pid: this.$route.params.id,
          p: this.pageIndex,
          limit: this.pageSize,
        };
      }
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.user_info_list)
        .then((res) => {
          this.loading = false;
          if (res.code === 10000) {
            this.quickGamesStatus = res.result.periods.lastTime;
            this.gameinfo = res.result.periods;
            if (this.first === 1) {
              this.pre_pid = res.result.periods.pre_pid;
              this.first++;
            }
            this.userlist = this.userlist.concat(res.result.ranklist);
            if (this.userlist.length === 0) {
              this.isranking = false;
              return;
            }
            const length = res.result.ranklist.length;
            if (length > 0) {
              this.pageIndex++;
            }
          }
        });
    },
    pre() {
      this.prelist = 1;
      this.userlist = [];
      this.pageIndex = 1;
      this.getUserList();
    },
  },
  mounted() {
    $('body').css('background-color', '#ffffff');
    this.getUserInfo();
    this.getUserList();
    this.first++;
  },
};
</script>

<style lang="scss" scoped>
/* 引入公共的样式 */

@import '../../../assets/tao-you/common.scss';
.infinite {
  width: 100%;
  border-bottom: 1px solid $stress-border;
  border-top: 1px solid $stress-border;
  background-color: #FFF;
  overflow-x: hidden;
}

.infinite--li {
  height: .65rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .infinite--li--lf {
    width: 50%;
    .infinite--li--lf--lf {
      float: left;
      width: .6rem;
      height: 100%;
      img {
        width: .43rem;
        height: .43rem;
        border-radius: .05rem;
      }
    }
    .infinite--li--lf--rh {
      float: left;
      height: 100%;
      display: inline-flex;
      align-items: center;
      .infinite--p--top {
        color: #333;
        letter-spacing: .002rem;
      }
      .infinite--p--bottom {
        color: #a5a5a5;
      }
    }
  }
  .infinite--li--rh {
    /*width:50%;*/
    /*height:.5rem;*/
    .infinite--li--rh--a,
    .infinite--li--rh--top {
      display: block;
      width: .5rem;
      height: .26rem;
      line-height: .26rem;
      text-align: center;
      color: $dark;
      border: 1px solid $stress-border;
      border-radius: .05rem;
      float: right;
      margin-top: .11rem;
    }
    .infinite--li--rh--top {
      width: .7rem;
    }
    .infinite--li--rh--a {
      float: right!important;
      margin-left: .12rem;
    }
  }
}

.container--cen--l {
  display: flex;
  justify-content: center;
  margin: 1.2rem 0 .3rem 0;
  img {
    width: 60%;
    height: 1.7rem;
  }
}

.game-rank {
  border-bottom: 1px solid $stress-border;
  margin-right: 0;
  .game-rank-rh {
    background-color: #00aaee;
    margin-left: 0;
  }
}

.self__a {
  display: inline-flex;
  justify-content: flex-end!important;
}

.section-container {
  background-color: #fff;
}

#infinite--li--lf {
  flex: 1;
  height: .5rem;
  margin-left: .1rem;
}

#infinite--li--rh {
  width: .8rem;
  height: .5rem;
}

.infinite--li--rh--self {
  color: #000000;
  font-size: .14rem;
  line-height: .5rem;
}

.infinite--li--center {
  /*width: .18rem;*/
  color: #a5a5a5;
}

#infinite--li--lf--lf {
  width: .5rem;
  height: .5rem;
  img {
    border-radius: 50%;
  }
}

.content {
  p {
    width: .80rem;
  }
}

[v-cloak] {
  display: none;
}

.qihao {
  padding-left: .75rem;
  color: #a5a5a5;
  position: relative;
  top: -.11rem;
}

.last {
  border-bottom: none;
}

.game-rank:nth-last-child(2) {
  border-bottom: none;
}
</style>
