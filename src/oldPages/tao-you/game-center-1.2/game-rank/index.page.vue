<template>
  <div>
    <!--顶部-->
    <div class="header">
      <header-component :title="title"></header-component>
    </div>
    <!--选项卡-->
    <game-tab :tab-list="tabList" @game-rank-tab-action="check" :type="type"></game-tab>
    <div class="container">
      <div class="container__slide">
        <div class="container__img" @click="open(allGameData[1].field,allGameData[1].id,allGameData[1].gameUrl,allGameData[1].name,allGameData[1].direction)">
          <img src="/oldStatic/images/tao-you/home/h5.png" id="bg" v-show="1==allGameData[1].field ">
          <img :src="allGameData[1].gameIcon">
        </div>
        <div class="container__rank">2</div>
        <div class="container__name overflow-ellipsis">{{allGameData[1].name}}</div>
        <!--如果后期需要，要增加container的高度-->
        <!--<div class="container__count">下降1名</div>-->
      </div>
      <div class="container__slide">
        <div class="container__img" style="margin: .28rem 0 .11rem 0;" @click="open(allGameData[0].field,allGameData[0].id,allGameData[0].gameUrl,allGameData[0].name,allGameData[0].direction)">
          <img src="/oldStatic/images/tao-you/home/h5.png" id="bg" v-show="1==allGameData[0].field ">
          <img :src="allGameData[0].gameIcon">
        </div>
        <div class="container__rank" style="width:.28rem;height:.17rem;padding-top: .06rem;">1</div>
        <div class="container__name overflow-ellipsis">{{allGameData[0].name}}</div>
        <!--<div class="container__count">上升1名</div>-->
      </div>
      <div class="container__slide">
        <div class="container__img" @click="open(allGameData[2].field,allGameData[2].id,allGameData[2].gameUrl,allGameData[2].name,allGameData[2].direction)">
          <img src="/oldStatic/images/tao-you/home/h5.png" id="bg" v-show="1==allGameData[2].field">
          <img :src="allGameData[2].gameIcon">
        </div>
        <div class="container__rank">3</div>
        <div class="container__name overflow-ellipsis">{{allGameData[2].name}}</div>
        <!--<div class="container__count">排名不变</div>-->
      </div>
    </div>
    <!--无限加载列表-->
    <div class="allGame" v-infinite-scroll="getRankData" infinite-scroll-distance="10" :infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false">
      <div class="list" v-for="(item,index) in allGameData.slice(3)" :key="index">
        <div class="list__container">
          <div class="list__rank">
            <span>{{index + 4}}</span>
          </div>
          <div class="list__img">
            <img :src="item.gameIcon">
          </div>
          <div class="list__text" @click="link({name:'TaoYouGameCenterGameDetails',params:{id:item.id}})">
            <p class="p1">{{item.name}}</p>
            <p class="p2" v-show="item.field ==1">{{item.category}}</p>
            <p class="p2" v-show="item.field ==2">{{item.category}} | {{item.fileSize}}</p>
            <p class="p3">{{item.abstract}}</p>
          </div>
          <div class="list__button" @click="open(item.field,item.id,item.gameUrl,item.name,item.direction)">
            <a>进入</a>
            <div class="list__num">
              <span>{{item.viewNumber}}</span>人在玩</div>
          </div>
        </div>
      </div>
      <p v-show="loading" class="page-infinite-loading">
        <my-spinner type="fading-circle"></my-spinner>加载中...
      </p>
    </div>
    <return-btn></return-btn>
    <!-- 返回顶部 -->
    <back-top></back-top>
  </div>
</template>
<style lang="scss" scoped>
@import "../../../../assets/tao-you/common.scss";
.header {
  border-bottom: 1px solid #E5E5E5;
}

.container {
  height: 1.51rem;
  background: white url("/oldStatic/images/game-center/rank-bg_02.png") no-repeat;
  background-size: 100% .83rem;
  display: flex;
  border-bottom: 1px solid #E5E5E5;
  &__slide {
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }
  &__img {
    width: .55rem;
    height: .55rem;
    margin: .38rem 0 .05rem 0;
    border-radius: .1rem;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      border-radius: .1rem;
    }
  }
  &__rank {
    width: .22rem;
    height: .15rem;
    background: white url("/oldStatic/images/game-center/demo_04.png") no-repeat;
    background-size: 100% 100%;
    text-align: center;
    padding-top: .04rem;
    color: #ffffff;
    font-size: .11rem;
  }
  &__name {
    height: .14rem;
    width: 1rem;
    text-align: center;
    font-size: .14rem;
    color: #333333;
    padding: .06rem 0 .05rem 0;
  }
  &__count {
    height: .12rem;
    font-size: .12rem;
    color: #ff4a4a;
  }
}





/*图片/文字/按钮与文字居中*/

.list {
  background: white;
  &__container {
    display: flex;
    margin-left: .15rem;
    border-bottom: 1px solid #E5E5E5;
  }
  &__img {
    width: .43rem;
    height: .43rem;
    padding-top: 0.07rem;
    padding-right: 0.10rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: 0.06rem;
    }
  }
  &__text {
    flex: 1;
    line-height: 1em;
    padding-top: .05rem;
    .p1 {
      height: .16rem;
      font-size: .16rem;
      color: #333333;
      padding-top: .07rem;
    }
    .p2 {
      height: .14rem;
      font-size: .13rem;
      color: #a5a5a5;
      padding-top: .07rem;
    }
    .p3 {
      height: .14rem;
      font-size: .13rem;
      color: #a5a5a5;
      padding-top: .05rem;
      overflow: hidden;
    }
  }
  &__button {
    /*display: flex;*/
    /*align-items: center;*/
    margin-right: .15rem;
    a {
      display: inline-block;
      width: .46rem;
      height: .25rem;
      box-sizing: border-box;
      line-height: .25rem;
      text-align: center;
      border: 1px solid #cccccc;
      border-radius: 0.04rem;
      font-size: .13rem;
      color: #333333;
      float: right;
      margin-top: .17rem;
      margin-bottom: 0.05rem;
    }
  }
  &__num {
    font-size: .12rem;
    color: #666666;
    padding-bottom: .11rem;
    span {
      color: #ff4a4a;
    }
  }
  &__rank {
    padding-right: .1rem;
    span {
      display: inline-block;
      width: .22rem;
      height: .22rem;
      line-height: .22rem;
      text-align: center;
      border-radius: 50%;
      background: #f0f0f0;
      font-size: .11rem;
      color: #898989;
      margin-top: .18rem;
    }
  }
}

.allGame .list:nth-last-child(2) .list__container {
  border-bottom: none;
}

.page-infinite-loading {
  font-size: .14rem;
  color: #a5a5a5;
}


/**H5游戏添加图标**/

#bg {
  position: absolute;
  width: .27rem;
  height: .27rem;
  top: 0;
  left: 0;
  border-radius: 0;
}
</style>
<script>
import { InfiniteScroll, Spinner } from 'mint-ui';
import Vue from 'vue';
import HeaderComponent from '../../../../oldComponents/tao-you/layout/header.component';
import ReturnBtn from '../../../../oldComponents/tao-you/button/return.component';
import GameTab from './component/game-rank-tab.component';

// 添加回到顶部
import BackTop from '../../../../oldComponents/tao-you/button/back-top.component';
import { startGame } from '../../../../oldComponents/tao-you/tools/tools';

Vue.component('my-spinner', Spinner);
export default {
  data() {
    return {
      type: 0,
      title: '排行榜',
      loading: false,
      pageIndex: 1,
      pageSize: 10,
      allLoaded: false,
      allGameData: [],
    };
  },
  computed: {

  },
  methods: {
    link(url) {
      this.$router.push(url);
    },
    // 获取排行榜列表
    getRankData() {
      if (this.allLoaded) {
        return;
      }
      this.loading = true;
      let query = {};
      let type = this.type;
      if (type === 0) {
        query = {
          type: 'rankHot',
          page: this.pageIndex,
          limit: this.pageSize,
        };
      }
      if (type === 1) {
        query = {
          type: 'rankCharge',
          page: this.pageIndex,
          limit: this.pageSize,
        };
      }
      if (type === 2) {
        query = {
          type: 'rankNew',
          page: this.pageIndex,
          limit: this.pageSize,
        };
      }
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.human_game_list)
        .then((res) => {
          this.loading = false;
          if (res.code === 10000) {
            this.allGameData = this.allGameData.concat(res.result);
            if (this.allGameData.length === 0) {
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
    check(type) {
      // type当前选中 0：人气/1: 付费 / 2.新游
      this.type = type;
      this.loading = false;
      this.pageIndex = 1;
      this.pageSize = 10;
      this.allLoaded = false;
      this.allGameData = [];
      this.getRankData();
    },
    // 开始游戏
    open(type, gameID, gameUrl, gameName, direction) {
      startGame(this, {
        gameID,
        gameUrl,
        gameName,
        direction,
        type,
      });
    },
  },
  components: {
    HeaderComponent,
    GameTab,
    InfiniteScroll,
    ReturnBtn,
    BackTop,
  },
  mounted() {
    this.getRankData(this.type);
  },
};
</script>
