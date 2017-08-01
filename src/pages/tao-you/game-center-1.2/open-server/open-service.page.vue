<template>
  <div>
    <header-component :title="title"></header-component>
    <!--通用头-->
    <div class="title" v-show="todayData.length>0">
      <span class="title__left">今日开服</span>
      <span class="title__right">今日共
        <i>{{num}}</i>开服</span>
    </div>
    <!--图片/文字/按钮居中-->
    <section class="outer">
      <div class="list" v-for="(item,index) in todayData" :key="index">
        <div class="list__container">
          <div class="list__img">
            <img :src="item.gameIcon">
          </div>
          <div class="list__text" @click="link({name:'TaoYouGameCenterGameDetails',params:{id:item.gameID}})">
            <p class="p1">{{item.name}}</p>
            <p class="p2" v-show="item.field==1">{{item.category}} | {{item.serviceName}}</p>
            <p class="p2" v-show="item.field==2">{{item.category}} | {{item.fileSize}}</p>
            <p class="p3">{{item.openTime | formatDate ('YYYY-MM-DD HH:mm:ss')}}</p>
          </div>
          <div class="list__button">
            <a @click.stop="beginPlay(item)">进入</a>
          </div>
        </div>
      </div>
    </section>
    <div class="init" v-show="featureData.length>0"></div>
    <!--即将开服-->
    <!--通用头-->
    <div class="title" v-show="featureData.length>0">
      <span class="title__left">即将开服</span>
      <span class="title__right">即将有
        <i>{{featureNum}}</i>开服</span>
    </div>
    <!--图片/文字/按钮居中-->
    <section class="outer">
      <div class="list" v-for="(v,index) in featureData" :key="index">
        <div class="list__container">
          <div class="list__img">
            <img :src="v.gameIcon">
          </div>
          <div class="list__text">
            <p class="p1">{{v.name}}</p>
            <p class="p2" v-show="v.field==1">{{v.category}} | {{v.serviceName}}</p>
            <p class="p2" v-show="v.field==2">{{v.category}} | {{v.fileSize}}</p>
            <p class="p3">{{v.openTime | formatDate ('YYYY-MM-DD HH:mm:ss')}}</p>
          </div>
          <div class="list__button">
            <a :class="{ 'active': '1===1'}">进入</a>
          </div>
        </div>
      </div>
    </section>
    <div class="init"></div>
    <!--已经开服-->
    <!--通用头-->
    <div class="title" v-show="hadData.length">
      <span class="title__left">已经开服</span>
      <span class="title__right">已经有
        <i>{{hadNum}}</i>开服</span>
    </div>
    <!--图片/文字/按钮居中-->
    <section class="border" v-infinite-scroll="getHadData()" infinite-scroll-distance="10" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false">
      <div class="list" v-for="(item,index) in hadData" :key="index">
        <div class="list__container">
          <div class="list__img">
            <img :src="item.gameIcon">
          </div>
          <div class="list__text" @click="link({name:'TaoYouGameCenterGameDetails',params:{id:item.gameID}})">
            <p class="p1">{{item.name}}</p>
            <p class="p2" v-show="item.field==1">{{item.category}} | {{item.serviceName}}</p>
            <p class="p2" v-show="item.field==2">{{item.category}} | {{item.fileSize}}</p>
            <p class="p3">{{item.openTime | formatDate ('YYYY-MM-DD HH:mm:ss')}}</p>
          </div>
          <div class="list__button" @click="link({name:'TaoYouGameCenterGameDetails',params:{id:item.gameID}})">
            <a @click.stop="beginPlay(item)">进入</a>
          </div>
        </div>
      </div>
      <p v-show="loading" class="page-infinite-loading">
        <my-spinner type="fading-circle"></my-spinner>加载中...
      </p>
    </section>
    <return-btn></return-btn>
  </div>
</template>
<style lang="scss" scoped>
@import "../../../../assets/tao-you/common";



/*通用头*/

.title {
  height: .42rem;
  line-height: .42rem;
  padding: 0 .15rem;
  /*border-top: 1px solid #E5E5E5;*/
  border-bottom: 1px solid #E5E5E5;
  background: white;
  &__left {
    font-size: .16rem;
    color: #333333;
    float: left;
  }
  &__right {
    font-size: .13rem;
    color: #333333;
    float: right;
    i {
      color: #ff4a4a;
    }
  }
}



/*图片/文字/按钮居中*/

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
      padding-bottom: .11rem;
    }
  }
  &__button {
    display: flex;
    align-items: center;
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
      margin-right: .15rem;
    }
    .active {
      background: #f0f0f0;
      border: none;
      color: #adadad;
    }
  }
}

.border {
  border: none;
}

.border .list:nth-last-child(2) .list__container {
  border-bottom: none;
}

.outer .list:nth-last-child(1) .list__container {
  border-bottom: none;
}

.page-infinite-loading {
  font-size: .14rem;
  color: #a5a5a5;
}

.init {
  height: .15rem;
  background: #f5f5f5;
  /*border-top: 1px solid #E5E5E5;*/
}
</style>
<script>
import Vue from 'vue';
import { InfiniteScroll, Spinner } from 'mint-ui';
import HeaderComponent from '../../../../components/tao-you/layout/header.component';
import ReturnBtn from '../../../../components/tao-you/button/return.component';
import { startGame } from '../../../../components/tao-you/tools/tools';

Vue.component('my-spinner', Spinner);
Vue.use(InfiniteScroll);
export default {
  data() {
    return {
      title: '开服',
      // 今日共开服数量
      num: 100,
      // 即将开服数量
      featureNum: 100,
      // 已经开服数量
      hadNum: 123,
      todayData: [],
      featureData: [],
      hadData: [],
      loading: false,
      pageIndex: 1,
      pageSize: 10,
      allLoaded: false,
    };
  },
  computed: {

  },
  methods: {
    link(url) {
      this.$router.push(url);
    },
    // 获取今日开服列表
    getTodayData() {
      const query = {
        type: 2,
      };
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.open_server_list)
        .then((res) => {
          if (res.code === 10000) {
            this.todayData = res.result;
            this.num = res.result.length;
          } else {
            console.log('error');
          }
        });
    },
    // 获取即将开服列表
    getFeatureData() {
      const query = {
        type: 3,
      };
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.open_server_list)
        .then((res) => {
          if (res.code === 10000) {
            this.featureData = res.result;
            this.featureNum = res.result.length;
          } else {
            console.log('error');
          }
        });
    },
    // 已经开服，可能会无限加载
    getHadData() {
      if (this.allLoaded) {
        return;
      }
      this.loading = true;
      const query = {
        type: 1,
        page: this.pageIndex,
        limit: this.pageSize,
      };
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.open_server_list)
        .then((res) => {
          this.loading = false;
          if (res.code === 10000) {
            this.hadData = this.hadData.concat(res.result);
            this.hadNum = this.hadData.length;
            if (this.hadData.length === 0) {
              // 无数据
              return;
            }
            const length = res.result.length;
            if (length > 0) {
              this.pageIndex += 1;
            } else {
              this.allLoaded = true;
            }
          }
        });
    },

    /* 开始游戏 */
    beginPlay(game) {
      startGame(this, {
        gameID: game.gameID,
        gameUrl: game.gameUrl,
        gameName: game.name,
        direction: game.direction,
        type: game.field,
      });
    },
  },
  components: {
    HeaderComponent,
    InfiniteScroll,
    ReturnBtn,
  },
  mounted() {
    this.getTodayData();
    this.getFeatureData();
    this.getHadData();
  },
};
</script>
