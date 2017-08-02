<template>
  <div>
    <header-component :title="title"></header-component>
    <div class="top_banner">
      <div class="top_wrapper">
        <img class="taodoulogo" src="/static/images/tao-you/welfare-shop/taobilogo2.png">
        <p class="taodoutit">我的淘豆</p>
        <p class="taodouval">{{taodou | moneyWidthComma}}</p>
        <div class="flex align-vertical right-box">
          <a class="taodou_link link1 JS-statistics-match" @click="link({name:'TaoYouPersonalCenterTaodouMatch'})">赚淘豆</a>
          <a class="taodou_link link2 JS-statistics-shop" @click="link({name:'TaoYouWelfareShopWelfare'})">福利商城</a>
        </div>
      </div>
    </div>
    <template v-if="showList">
      <div class="list-header">使用明细</div>
      <div class="detail_list" v-infinite-scroll="getTaoDouList" infinite-scroll-distance="10" :infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false">
        <div v-for="(item,index) in detailList" class="detail_item" :key="index">
          <p class="item_name">{{item.reason}}</p>
          <p class="item_date">{{item.time}}</p>
          <template v-if="item.doType!='2'">
            <p class="item_val">+{{item.amount}}</p>
          </template>
          <template v-else>
            <p class="item_val item_val_subtract">-{{item.amount}}</p>
          </template>
        </div>
      </div>
      <p v-show="loading && !listDone" class="page-infinite-loading">
        <my-spinner type="fading-circle"></my-spinner>加载中
      </p>
    </template>
    <template v-else>
      <img class="norebate_img" src="/static/images/tao-you/personal-center/norebate.png">
      <p class="norebate_p">当前没有使用记录</p>
    </template>
    <return-btn></return-btn>
    <!-- 返回顶部 -->
    <back-top></back-top>
  </div>
</template>
<script>
import { InfiniteScroll, Spinner } from 'mint-ui';
import Vue from 'vue';
import HeaderComponent from '../../../oldComponents/tao-you/layout/header.component';
import ReturnBtn from '../../../oldComponents/tao-you/button/return.component';

// 统计代码
import Statistics from '../statistics/personal-center/taodou.statistics';
// 添加回到顶部
import BackTop from '../../../oldComponents/tao-you/button/back-top.component';

Vue.component('my-spinner', Spinner);
Vue.use(InfiniteScroll);

export default {
  data() {
    return {
      showList: true,
      loading: false,
      pageIndex: 1,
      pageSize: 10,
      title: '我的淘豆',
      taodou: 0,
      detailList: [],
      allLoaded: false,
      listDone: false,
    };
  },
  components: {
    HeaderComponent,
    InfiniteScroll,
    ReturnBtn,
    BackTop,
  },
  methods: {
    link(url) {
      this.$router.push(url);
    },
    getUserInfo() {
      Vue.ClientHttp(this).GET('', Vue.ClientUrl.user_info).then((res) => {
        if (res.code !== 10000) {
          return;
        }
        this.taodou = res.result.taoDou;
      });
    },
    getTaoDouList() {
      if (this.allLoaded) {
        return;
      }
      const _this = this;
      _this.loading = true;
      Vue.ClientHttp(this).GET({
        page: _this.pageIndex,
        limit: _this.pageSize,
      }, Vue.ClientUrl.taodou_detail)
        .then((res) => {
          if (res.code !== 10000) {
            _this.showList = false;
            return;
          }
          const length = res.result.length;
          if (!res.result || res.result.length == 0) {
            if (_this.pageIndex === 1) {
              _this.showList = false;
            } else {
              _this.listDone = true;
            }
          } else {
            this.detailList = this.detailList.concat(res.result);
            _this.pageIndex++;
            _this.loading = false;
          } if (length < this.pageSize) {
            this.allLoaded = true;
          }
        });
    },
    loadMore(obj) {
      this.loading = true;
    },
  },
  mounted() {
    this.getUserInfo();
    this.getTaoDouList();

    Statistics(this);
  },
};
</script>
<style lang="scss" scoped>
@import "../../../assets/tao-you/common.scss";
.top_banner {
  height: 1.05rem;
  padding: 0 .15rem;
  background-color: $white;
}

.top_wrapper {
  margin: 0 auto;
  position: relative;
  /*min-height: 32vw;*/
}

.taodoulogo {
  width: .92rem;
  margin: .15rem 0 .15rem 0;
}

.taodoutit {
  position: absolute;
  left: 1rem;
  top: .3rem;
  font-size: $font-size-md;
  color: #333333;
}

.taodouval {
  position: absolute;
  left: 1rem;
  top: .58rem;
  font-size: $font-size-xl;
  color: #ff4a4a;
}

.middle_banner {
  background-color: #f5f5f9;
  overflow: hidden;
}

.right-box {
  flex-direction: column;
  justify-content: space-between;
  width: .72rem;
  right: 0;
  height: .6rem;
}

.taodou_link {
  display: block;
  right: 0;
  color: #fff;
  font-size: .13rem;
  text-align: center;
  border-radius: .04rem;
  width: .72rem;
  height: .25rem;
  line-height: .25rem;
  background-color: #01c1b4;
}

.list-header {
  height: .31rem;
  line-height: .31rem;
  padding: 0 .15rem;
  background-color: #f5f5f9;
  font-size: 0.12rem;
  color: #a5a5a5;
}

.detail_item {
  background-color: #FFFFFF;
  border-top: 1px solid #dfdfdf;
  position: relative;
  overflow: hidden;
}

.detail_list :first-child {
  border-top: none;
}

.item_name {
  font-size: $font-size-lg;
  margin: .14rem 0 0 4%;
  color: #000000;
  line-height: 1;
}

.item_date {
  color: $information;
  font-size: $font-size-sm;
  line-height: 1.2;
  margin: .04rem 0 .14rem 4%;
}

.item_val {
  position: absolute;
  right: 0;
  top: .2rem;
  margin-right: 4%;
  color: #ff4a4a;
}

.item_val_subtract {
  color: $dark;
}

.norebate_img {
  width: 1.3rem;
  margin: .3rem auto .16rem auto;
  display: block;
}

.norebate_p {
  color: #a5a5a5;
  font-size: $font-size-lg;
  text-align: center;
  margin-top: .08rem;
}
</style>
