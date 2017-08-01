<template>
  <div>
    <!--顶部-->
    <header-component :title="title"></header-component>
    <!--搜索模块-->
    <search @game-center-search="search"></search>
    <!--选项卡-->
    <!--<game-tab :tab-list = "tabList" @game-rank-tab-action = "check"></game-tab>-->
    <!--热门礼包-->
    <title v-show="hotPacks.length>0"></title>
    <section class="bord">
      <div class="list" v-for="(item,index) in hotPacks" :key="index">
        <div class="list__container" v-link="{name:'TaoYouPacksDetails',params:{id:item.id}}">
          <div class="list__img">
            <img :src="item.image">
          </div>
          <div class="list__text">
            <p class="p1">{{item.gameName}}</p>
            <p class="p2">{{item.name}}</p>
            <p class="p3">{{item.typeName}}</p>
          </div>
          <div class="gift__progress">
            <progress-component :has="item.uID!=0" :progress="item.usedNumber/item.totalNumber*100"></progress-component>
            <span :class="{'gift__progress-text--new':item.uID==0,'gift__progress-text--old':item.uID!=0}" class="gift__progress-text">{{item.uID == 0&&item.taoDou !=0 ? '兑' :item.uID == 0?'领':'已领' }}</span>
          </div>
        </div>
      </div>
    </section>
    <!--新推礼包-->
    <div class="init" v-show="newPacks.length>0">
      <title v-bind:title="'新推礼包'"></title>
    </div>
    <section class="new">
      <div class="list" v-for="item in newPacks">
        <div class="list__container" v-link="{name:'TaoYouPacksDetails',params:{id:item.id}}">
          <div class="list__img">
            <img :src="item.image">
          </div>
          <div class="list__text">
            <p class="p1">{{item.gameName}}</p>
            <p class="p2">{{item.name}}</p>
            <p class="p3">{{item.typeName}}</p>
          </div>
          <div class="gift__progress">
            <progress-component :has="item.uID!=0" :progress="item.usedNumber/item.totalNumber*100"></progress-component>
            <span :class="{'gift__progress-text--new':item.uID==0,'gift__progress-text--old':item.uID!=0}" class="gift__progress-text">{{item.uID == 0&&item.taoDou !=0 ? '兑' :item.uID == 0?'领':'已领' }}</span>
          </div>
        </div>
      </div>
    </section>
    <!--全部礼包-->
    <div class="init" v-show="allPacks.length>0">
      <title v-bind:title="'全部礼包'"></title>
    </div>
    <section class="all" v-infinite-scroll="getAllPacks()" infinite-scroll-distance="10" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false">
      <div class="list" v-for="item in allPacks">
        <div class="list__container" v-link="{name:'TaoYouPacksDetails',params:{id:item.id}}">
          <div class="list__img">
            <img :src="item.image">
          </div>
          <div class="list__text">
            <p class="p1">{{item.gameName}}</p>
            <p class="p2">{{item.name}}</p>
            <p class="p3">{{item.typeName}}</p>
          </div>
          <div class="gift__progress">
            <progress-component :has="item.uID!=0" :progress="item.usedNumber/item.totalNumber*100"></progress-component>
            <span :class="{'gift__progress-text--new':item.uID==0,'gift__progress-text--old':item.uID!=0}" class="gift__progress-text">{{item.uID == 0&&item.taoDou !=0 ? '兑' :item.uID == 0?'领':'已领' }}</span>
          </div>
        </div>
      </div>
      <p v-show="loading" class="page-infinite-loading">
        <my-spinner type="fading-circle"></my-spinner>加载中...
      </p>
    </section>
    <return-btn></return-btn>
    <!-- 返回顶部 -->
    <back-top></back-top>
  </div>
</template>
<style lang="scss" scoped>
@import "../../../../assets/tao-you/common.scss";
.init {
  margin-top: .15rem;
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
      font-size: .16rem;
      color: #333333;
      padding-top: .07rem;
      line-height: .16rem;
    }
    .p2 {
      font-size: .13rem;
      color: #a5a5a5;
      padding-top: .07rem;
      line-height: .14rem;
      white-space: nowrap;
    }
    .p3 {
      line-height: .14rem;
      font-size: .13rem;
      color: #a5a5a5;
      padding-top: .05rem;
      padding-bottom: .11rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 1.91rem;
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
    }
  }
}

.bord .list:nth-last-child(1) .list__container {
  border-bottom: none;
}

.bord .list:nth-last-child(1) {
  border-bottom: 1px solid #E5E5E5;
}

.new .list:nth-last-child(1) .list__container {
  border-bottom: none;
}

.new .list:nth-last-child(1) {
  border-bottom: 1px solid #E5E5E5;
}

.all .list:nth-last-child(2) .list__container {
  border-bottom: none;
}

.all .list:nth-last-child(1) {
  border-bottom: 1px solid #E5E5E5;
}

.page-infinite-loading {
  font-size: .14rem;
  color: #a5a5a5;
}

.gift__progress {
  position: relative;
  width: .39rem;
  height: .39rem;
  margin-top: .15rem;
  margin-right: .15rem;
}

.gift__progress-text {
  position: absolute;
  font-size: .11rem;
  color: #00aaee;
  width: .24rem;
  height: .12rem;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  line-height: .12rem;
}

.gift__progress-text--new {
  color: #00C1B3;
}

.gift__progress-text--old {
  color: #a5a5a5;
}
</style>
<script>
import HeaderComponent from "../../../../components/tao-you/layout/header.component.vue";
import GameTab from './component/game-rank-tab.component.vue';
import Search from './component/game-center-search.component.vue';
import Title from './component/title.component.vue';
import ProgressComponent from "../../../../components/tao-you/svg-progress/svg-progress.component.vue";
import ReturnBtn from '../../../../components/tao-you/button/return.component.vue';
import { InfiniteScroll, Spinner } from 'mint-ui';
// 添加回到顶部
import BackTop from '../../../../components/tao-you/button/back-top.component';
Vue.component('my-spinner', Spinner);
export default {
  data() {
    return {
      //type当前选中 9：H5礼包/3: 手游礼包
      index: 0,
      title: '礼包',
      hotPacks: [],
      newPacks: [],
      allPacks: [],
      loading: false,
      pageIndex: 1,
      pageSize: 10,
      allLoaded: false
    }
  },
  computed: {

  },
  methods: {
    //获取热门礼包
    getHotPacks() {
      let query = {
        hot: 1
      };
      /*if(this.index==0){
       query = {
        hot:1,
        type:9
        };
      };
      if(this.index==1){
       //手游礼包
       query = {
        hot:1,
        type:3
        };
      };*/
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.packs_list)
        .then((res) => {
          if (res.code === 10000) {
            this.hotPacks = res.result;
          } else {
            console.log('error');
          }
        });
    },
    //获取新推礼包
    getNewPacks() {
      let query = {
        new: 1
      };
      /*if(this.index==0){
       query = {
        new:1,
        type:9
        };
      };
      if(this.index==1){
       //手游礼包
       query = {
        new:1,
        type:3
        };
      };*/
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.packs_list)
        .then((res) => {
          if (res.code === 10000) {
            this.newPacks = res.result;
          } else {
            console.log('error');
          }
        });
    },
    //获取全部礼包,需要无限加载
    getAllPacks() {
      if (this.allLoaded) {
        return;
      }
      this.loading = true;
      let query = {
        page: this.pageIndex,
        limit: this.pageSize
      };
      /*if(this.index==0){
       query = {
         page:  this.pageIndex,
         limit: this.pageSize,
         type:9
        };
      };
      if(this.index==1){
       query = {
        //手游礼包
         page:  this.pageIndex,
         limit: this.pageSize,
         type:3
        };
      };*/
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.packs_list)
        .then((res) => {
          this.loading = false;
          if (res.code === 10000) {
            this.allPacks = this.allPacks.concat(res.result);
            if (this.allPacks.length === 0) {
              //无数据
              return;
            }
            let length = res.result.length;
            if (length > 0) {
              this.pageIndex++;
            } else {
              this.allLoaded = true;
            }
            return;
          }
        });
    },
    //当前选中的是哪一种礼包
    check(index) {
      //index当前选中 0：H5礼包/1: 手游礼包,在切换的时候重新初始化
      this.index = index;
      this.hotPacks = [];
      this.newPacks = [];
      this.allPacks = [];
      this.loading = false;
      this.pageIndex = 1;
      this.pageSize = 10;
      this.allLoaded = false;
      this.getHotPacks();
      this.getNewPacks();
      this.getAllPacks();
    },
    //搜索按钮方法
    search() {
      this.$router.push({
        name: 'TaoYouSearch',
        query: { type: 0 }
      });
    }
  },
  components: {
    HeaderComponent,
    GameTab,
    Search,
    Title,
    InfiniteScroll,
    ProgressComponent,
    ReturnBtn,
    BackTop
  },
  mounted() {
    this.getHotPacks();
    this.getNewPacks();
    this.getAllPacks();
  }
}
</script>
