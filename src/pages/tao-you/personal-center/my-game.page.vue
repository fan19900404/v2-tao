<!-- author:zqy -->
<template>
  <div>
    <!--公共头部组件-->
    <app-header :title="title"></app-header>
    <!--有游戏列表-->
    <section class="secb">
      <div class="infinite">
        <ul class="myul JS-statistics-list" v-show="isdata" v-infinite-scroll="loadMyGameList" :infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
          <li v-for="(item,index) in myGameList" class="infinite--li JS-statistics-item-without-open" :key="index">
            <div class="infinite--li--lf" @click="link({name:'TaoYouGameCenterGameDetails', params:{id:item.gameID}})">
              <div class="infinite--li--lf--lf">
                <img :src="item.imgUrl">
              </div>
              <div class="infinite--li--lf--rh">
                <div>
                  <p class="infinite--p--top">{{item.gameName | substr(7)}}</p>
                  <p class="infinite--p--bottom">{{item.cDate * 1000 | formatDateToTimeago}}玩过</p>
                </div>
              </div>
            </div>
            <div class="infinite--li--rh">
              <a class="infinite--li--rh--a JS-statistics-open" @click="open(item.gameID,item.gameName,item.gameUrl)">打开</a>
            </div>
          </li>
        </ul>
      </div>
      <p v-show="loading" class="page-infinite-loading">
        <mt-spinner type="fading-circle">加载中</mt-spinner>
      </p>
    </section>
    <!--无游戏列表-->
    <section v-show="!isdata" class="no--data">
      <div class="no--data--con">
        <div class="no--data--img">
          <img src="/static/images/tao-you/personal-center/nogame_03.jpg">
        </div>
        <p class="am-ft-16 am-ft-lightgray am-ft-center">你当前还没有玩游戏哦</p>
      </div>
    </section>
    <!--热门礼包-->
    <section v-show="!isdata">
      <p class="hot am-ft-16 am-wingblank wb15px">热门礼包</p>
      <div class="container-side">
        <div class="hot--container am-wingblank wb15px">
          <div class="hot--container--img" v-for="(item,index) in commendGameList" :key="index">
            <img :src="item.imgUrl" @click="link({name:'TaoYouGameCenterGameDetails', params:{id:item.gameID}})">
            <span class="hot--span am-ft-12 ">{{item.gameName | foreSubstr(4) }}</span>
          </div>
        </div>
      </div>
    </section>
    <two-button :show="isShow" :left-Btn-Text="LeftBtnText" :right-Btn-Text="RightBtnText" :content="Content" ></two-button>
    <return-btn></return-btn>
  </div>
</template>

<script>
import Vue from 'vue';
import { InfiniteScroll, Spinner } from 'mint-ui';
import $ from 'jquery';
import AppHeader from '../../../components/tao-you/layout/header.component';
import TwoButton from '../../../components/tao-you/dialog/two-buttons-simple-dialog.component';
import ReturnBtn from '../../../components/tao-you/button/return.component';

// 统计代码
import Statistics from '../statistics/personal-center/my-game.statistics';

Vue.component('mt-spinner', Spinner);
Vue.use(InfiniteScroll);

export default {
  data() {
    return {
      title: '我的游戏',
      // 是否显示弹窗
      isShow: false,
      LeftBtnText: '稍后再做',
      RightBtnText: '打开游戏',
      // 进入的游戏
      nowlink: '',
      // 弹窗内容
      Content: '你要打开当前游戏吗',
      // 热门礼包数据
      commendGameList: [],
      // 是否有数据
      isdata: true,
      loading: false, // 加载中
      allLoaded: false, // 已全部加载
      pageIndex: 1, // 当前第几页
      pageSize: 8, // 一页数据条数
      myGameList: [], // 我的游戏列表
    };
  },
  components: {
    AppHeader,
    InfiniteScroll,
    Spinner,
    TwoButton,
    ReturnBtn,
  },
  methods: {
    link(url) {
      this.$router.push(url);
    },
    /* 加载我的游戏列表 */
    loadMyGameList() {
      if (this.allLoaded) {
        return;
      }
      this.loading = true;
      Vue.ClientHttp(this).GET({
        page: this.pageIndex,
        limit: this.pageSize,
      }, Vue.ClientUrl.my_game_list)
        .then((res) => {
          this.loading = false;
          if (res.code === 10000) {
            this.myGameList = this.myGameList.concat(res.result);
            const length = res.result.length;
            if (length > 0) {
              this.pageIndex++;
            }
            if (length < this.pageSize) {
              this.allLoaded = true;
            }

            // 用户未玩过任何游戏场合、呈现推荐游戏列表给用户
            if (this.pageIndex === 1 && length < this.pageSize) {
              this.isdata = false;
            }
          }
        });
    },
    // 获取礼包数据列表
    loadCommendGameList() {
      Vue.ClientHttp(this).GET({
        type: 4,
        page: 1,
        limit: 4,
      }, Vue.ClientUrl.game_center_list)
        .then((res) => {
          if (res.code === 10000) {
            this.commendGameList = res.result.slice(0, 4);
            console.log(this.commendGameList);
          }
        });
    },
    open(id, name, Url) {
      // 是否显示弹窗
      // this.isShow = true;
      this.$router.push({
        name: 'TaoYouPlayMyGame',
        params: {
          id,
        },
        query: {
          gameUrl: Url,
          gameName: name,
        },
      });
    },

  },
  mounted() {
    $('body').css('background-color', '#f9f9f9');
    // 加载礼包数据列表
    this.loadCommendGameList();
    // 加载我的游戏列表
    this.loadMyGameList();

    Statistics(this);
  },
};
</script>

<style lang="scss" scoped>
/* 引入公共的样式 */

@import '../../../assets/tao-you/common.scss';
.no--data {
  width: 100%;
  height: 2.8rem;
  background-color: #f9f9f9;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  .no--data--con {
    .no--data--img {
      width: 1.8rem;
      height: 1.4rem;
      margin-bottom: .10rem;
    }
  }
}

.hot {
  font-weight: 600;
  margin-bottom: .1rem;
  color: #333;
}

.container-side {
  width: 100%;
  border-top: 1px solid $stress-border;
}

.hot--container {
  display: flex;
  justify-content: space-between;
  margin: .1rem .15rem;
}

.hot--container--img {
  width: .6rem;
}

.hot--span {
  display: inline-block;
  width: 100%;
  text-align: center;
  overflow: hidden;
  color: #666;
}








/**有游戏列表**/

.infinite {
  width: 100%;
  border-bottom: 1px solid $stress-border;
}

.infinite--li {
  height: .70rem;
  display: flex;
  align-items: center;
  padding-left: .15rem;
  padding-right: .15rem;
  &:not(:last-child) {
    border-bottom: 1px solid $stress-border;
  }
  .infinite--li--lf {
    width: 70%;
    height: .5rem;
    .infinite--li--lf--lf {
      width: .43rem;
      height: 100%;
      float: left;
      img {
        width: .43rem;
        height: .43rem;
        border-radius: .04rem;
        margin-top: 0.035rem;
      }
    }
    .infinite--li--lf--rh {
      width: 60%;
      height: 100%;
      display: inline-flex;
      align-items: center;
      float: left;
      margin-left: .15rem;
      .infinite--p--top {
        color: #333;
        font-size: $font-size-lg;
        letter-spacing: .002rem;
      }
      .infinite--p--bottom {
        color: #a5a5a5;
        font-size: $font-size-xs;
      }
    }
  }
  .infinite--li--rh {
    width: 30%;
    height: .5rem;
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
    .infinite--li--rh--a {
      padding: .02rem .09rem;
      color: #333;
      font-size: 0.13rem;
      text-align: center;
      border: solid #ccc 1px;
      border-radius: .04rem;
    }
  }
}

.myul {
  background-color: $white;
}

.secb {
  border-top: 1px solid $primary-border;
}
</style>
