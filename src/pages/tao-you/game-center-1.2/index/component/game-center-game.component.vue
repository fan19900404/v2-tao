<template>
  <div>
    <div class="tit">
      <img src="/static/images/game-center/game_03.png">
    </div>
    <div class="recommendation">
      <div class="recommendation__slide" v-for="v in firstGameData.slice(0,3)">
        <div class="recommendation__img" @click="open(v.field,v.id,v.gameUrl,v.name,v.direction)">
          <img src="/static/images/tao-you/home/h5.png" id="bg" v-show="v.field ==1">
          <img :src="v.gameIcon">
        </div>
        <div class="recommendation__name">{{v.name}}</div>
        <div class="recommendation__num">
          <span>{{v.viewNumber}}</span>人在玩</div>
        <div class="recommendation__count">{{v.abstract.slice(0,8)}}</div>
      </div>
    </div>
    <!--图片/文字/按钮与文字居中-->
    <div class="bor">
      <div class="list" v-for="(v,index) in firstGameData.slice(3)" :key="index">
        <div class="list__container">
          <div class="list__img">
            <img :src="v.gameIcon">
          </div>
          <div class="list__text" @click="link({name:'TaoYouGameCenterGameDetails',params:{id:v.id}})">
            <p class="p1">{{v.name}}</p>
            <p class="p2" v-show="v.field ==1">{{v.category}}</p>
            <p class="p2" v-show="v.field ==2">{{v.category}} | {{v.fileSize}}</p>
            <p class="p3">{{v.abstract}}</p>
          </div>
          <div class="list__button" @click="open(v.field,v.id,v.gameUrl,v.name,v.direction)">
            <a>进入</a>
            <div class="list__num">
              <span>{{v.viewNumber || 0}}</span>人在玩</div>
          </div>
        </div>
      </div>
    </div>
    <!--最新游戏-->
    <div class="title">
      <span class="title__left">最新游戏</span>
    </div>
    <div class="newGame" :v-infinite-scroll="getNewGameData" infinite-scroll-distance="10" :infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false">
      <div class="list" v-for="(item,index) in newGameData" :key="index">
        <div class="list__container">
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
              <span>{{item.viewNumber || 0}}</span>人在玩</div>
          </div>
        </div>
      </div>
      <p v-show="loading" class="page-infinite-loading">
        <my-spinner type="fading-circle"></my-spinner>加载中...
      </p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { InfiniteScroll, Spinner } from 'mint-ui';
import { startGame } from '../../../../../components/tao-you/tools/tools';

Vue.component('my-spinner', Spinner);
Vue.use(InfiniteScroll);
export default {
  components: {
    InfiniteScroll,
  },
  data() {
    return {
      loading: false,
      pageIndex: 1,
      pageSize: 10,
      allLoaded: false,
      // 全部最新游戏
      newGameData: [],
      // 首发推荐
      firstGameData: [],
    };
  },
  methods: {
    link(url) {
      this.$router.push(url);
    },
    // 获取全部最新游戏
    getNewGameData() {
      if (this.allLoaded) {
        return;
      }
      this.loading = true;
      const query = {
        page: this.pageIndex,
        limit: this.pageSize,
        nologin: 1,
      };
      Vue.ClientHttp().GET(query, Vue.ClientUrl.new_game_list)
        .then((res) => {
          this.loading = false;
          if (res.code === 10000) {
            this.newGameData = this.newGameData.concat(res.result);
            if (this.newGameData.length === 0) {
              // 无数据
              return;
            }
            const length = res.result.length;
            if (length > 0) {
              this.pageIndex++;
            } else {
              this.allLoaded = true;
            }
          }
        });
    },
    // 获取首发推荐
    getCommonList() {
      const query = {
        page: 1,
        limit: 8,
        nologin: 1,
      };
      Vue.ClientHttp().GET(query, Vue.ClientUrl.first_game_list)
        .then((res) => {
          if (res.code === 10000) {
            this.firstGameData = res.result;
            console.log(this.firstGameData);
          } else {
            console.log('error');
          }
        });
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
  mounted() {
    this.getCommonList();
    this.getNewGameData();
    console.log(this.allLoaded);
  },
};
</script>

<style lang="scss" scoped>
.tit {
  height: .33rem;
  background: #ffffff;
  margin-top: .15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #E5E5E5;
  img {
    width: 1.39rem;
    height: .145rem;
  }
}

.recommendation {
  display: flex;
  background: #ffffff;
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
    padding: .16rem 0 .09rem 0;
    img {
      width: 100%;
      height: 100%;
      border-radius: .1rem;
    }
  }
  &__name {
    height: .14rem;
    font-size: .14rem;
    color: #333333;
    padding-bottom: .05rem;
    overflow: auto;
  }
  &__num {
    height: .12rem;
    font-size: .12rem;
    color: #a5a5a5;
    padding-bottom: .04rem;
    span {
      color: #ff4a4a;
    }
  }
  &__count {
    height: .12rem;
    font-size: .12rem;
    color: #a5a5a5;
    padding-bottom: .12rem;
  }
}

.recommendation .recommendation__slide:nth-child(2) {
  border-left: 1px solid #E5E5E5;
  border-right: 1px solid #E5E5E5;
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
      height: .13rem;
      font-size: .13rem;
      color: #a5a5a5;
      padding-top: .07rem;
    }
    .p3 {
      height: .14rem;
      font-size: .13rem;
      color: #a5a5a5;
      padding-top: .05rem; // padding-bottom: .11rem;
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
}

.bor .list:nth-last-child(1) .list__container {
  border-bottom: none;
}





/*通用头*/

.title {
  height: .42rem;
  line-height: .42rem;
  padding: 0 .15rem;
  border-bottom: 1px solid #E5E5E5;
  background: white;
  margin-top: .15rem;
  &__left {
    font-size: .16rem;
    color: #333333;
    float: left;
  }
}

.newGame .list:nth-last-child(2) .list__container {
  border-bottom: none;
}

.newGame {
  margin-bottom: .20rem;
}

.newGame .list:nth-last-child(1) {
  border-bottom: 1px solid #E5E5E5;
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
  border-radius: 0;
}
</style>
