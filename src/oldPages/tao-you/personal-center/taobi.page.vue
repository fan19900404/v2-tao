<!-- author:zqy -->
<template>
  <div>
    <!--公共头部组件-->
    <app-header :title="title"></app-header>
    <!-- 我的淘币顶部 -->
    <div class="top_banner">
      <div class="top_wrapper">
        <img class="taodoulogo" src="/oldStatic/images/tao-you/welfare-shop/taobilogo2.png">
        <p class="taodoutit">我的淘币</p>
        <p class="taodouval">{{user.taoBi | moneyWidthComma}}</p>
        <a class="recharge align-vertical JS-statistics-charge" @click="link({name: 'TaoYouPersonalCenterPayForTaoBi'})">充值</a>
      </div>
    </div>
    <div class="list-header">淘币明细</div>
    <!-- 列表有数据 -->
    <section v-show="isdata" class="detail_list" v-infinite-scroll="loadDetailList()" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
      <div v-for="(item,index) in uselist" class="detail_item" :key="index">
        <p class="item_name">{{item.reason}}</p>
        <p class="item_date">{{item.time}}</p>
        <template v-if="item.doType!='2'">
          <p class="item_val">+{{item.amount}}</p>
        </template>
        <template v-else>
          <p class="item_val item_val_subtract">-{{item.amount}}</p>
        </template>
      </div>
      <!--<div class="container-border" v-for = "item in uselist" >-->
      <!--<div class="container-list-data  am-wingblank wb15px">-->
      <!--<div class="container-list-data-lf">-->
      <!--<p class="container-list-data-lf-top">{{item.reason}}</p>-->
      <!--<p class="container-list-data-lf-bottom am-ft-lightgray">{{item.time}}&nbsp;&nbsp;{{item.typeDesc}}</p>-->
      <!--</div>-->
      <!--<div class="container-list-data-rh">-->
      <!--<p v-if="item.doType!='2'" class = "first"} >+{{item.amount}}</p>-->
      <!--<p v-else>-{{item.amount}}</p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <p v-show="loading" class="page-infinite-loading margin-top">
        <mt-spinner type="fading-circle"></mt-spinner>加载中
      </p>
    </section>
    <!-- 列表无数据 -->
    <section class="container-list" v-show="!isdata">
      <div class="container-list-cen am-wingblank wb15px">
        <div class=" am-ft-14 am-ft-lightgray">暂无我的淘币使用明细！</div>
      </div>
    </section>
    <footer-component :menu-id="3"></footer-component>
    <return-btn :back-link="backLink"></return-btn>
    <!-- 返回顶部 -->
    <back-top></back-top>
  </div>
</template>
<script>
import { InfiniteScroll, Spinner } from 'mint-ui';
import $ from 'jquery';
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import AppHeader from '../../../oldComponents/tao-you/layout/header.component';
import CommonAlert from '../../../oldComponents/tao-you/dialog/one-button-simple-dialog.component';
import ReturnBtn from '../../../oldComponents/tao-you/button/return.component';
// import { user } from '../../../vuex/getters';
// import { getUserInfo } from '../../../vuex/actions';
import FooterComponent from '../../../oldComponents/tao-you/layout/footer.component';

// 统计代码
import Statistics from '../statistics/personal-center/taobi.statistics';
// 添加回到顶部
import BackTop from '../../../oldComponents/tao-you/button/back-top.component';

Vue.component('mt-spinner', Spinner);
Vue.use(InfiniteScroll);
export default {
  // vuex: {
  //   getters: {
  //     user,
  //   },
  //   actions: {
  //     getUserInfo,
  //   },
  // },
  components: {
    AppHeader,
    CommonAlert,
    InfiniteScroll,
    Spinner,
    ReturnBtn,
    FooterComponent,
    BackTop,
  },
  data() {
    return {
      title: '我的淘币',
      loading: false, // 加载中
      allLoaded: false, // 已全部加载
      pageIndex: 1, // 当前第几页
      pageSize: 10, // 一页数据条数
      // 是否有列表
      isdata: true,
      // 使用信息列表
      uselist: [],
      // 返回的路由
      backLink: {
        name: 'TaoYouPersonalCenter',
      },
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    ...mapActions(['getUserInfo']),
    link(url) { this.$router.push(url); },
    /* 获取我的消费明细列表 */
    loadDetailList() {
      if (this.allLoaded) {
        return;
      }
      this.loading = true;
      Vue.ClientHttp(this).GET({
        page: this.pageIndex,
        limit: this.pageSize,
      }, Vue.ClientUrl.taobi_daily_detail)
        .then((res) => {
          this.loading = false;
          if (res.code === 10000) {
            this.uselist = this.uselist.concat(res.result);
            const length = res.result.length;
            if (length > 0) {
              this.pageIndex++;
            }
            if (length < this.pageSize) {
              this.allLoaded = true;
            }
            if (this.pageIndex === 1 && length < this.pageSize) {
              this.isdata = false;
            }
          }
        });
    },
  },
  mounted() {
    $('body').css('background-color', '#fff');
    this.getUserInfo();
    this.loadDetailList();

    Statistics(this);
  },
};
</script>
<style lang="scss" scoped>
@import "../../../assets/tao-you/common.scss";
.deteil_tit {
  clear: both;
  color: $information;
  font-size: $font-size-xs;
  margin-left: 4%;
  margin-bottom: .05rem;
  display: block;
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

.list-header {
  height: .31rem;
  line-height: .31rem;
  padding: 0 .15rem;
  background-color: #f5f5f9;
  font-size: 0.12rem;
  color: #a5a5a5;
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

.top_banner {
  height: 1.05rem;
  padding: 0 .15rem;
  background-color: #FFFFFF;
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
  font-size: .14rem;
  color: #333333;
}

.taodouval {
  position: absolute;
  left: 1rem;
  top: .58rem;
  font-size: .2rem;
  color: #ff4a4a;
}








/* 我的淘币 */

.container {
  width: 100%;
  height: 1.1rem;
  /*background-color: #ff4a4a;*/
  .container--cen {
    height: 100%;
    .container--cen--l {
      float: left;
      width: 40%;
      height: 100%;
      img {
        width: 1rem;
        height: .85rem;
        margin-top: .15rem;
        margin-left: .20rem;
      }
    }
    .container--cen--r {
      float: left;
      float: left;
      width: 60%;
      height: 100%;
    }
  }
}

.my-taobi {
  font-size: .14rem;
  color: #000;
  margin-top: .40rem;
  margin-bottom: .10rem;
  padding-left: .20rem;
}

.my-count {
  font-size: .16rem;
  color: #ff4a4a;
  padding-left: .20rem;
}

.nav {
  height: 1.26rem;
  background-color: #f5f5f9;
  .nav--bot {
    height: 100%;
  }
}

.recharge {
  display: block;
  right: 0;
  color: #fff;
  font-size: .13rem;
  text-align: center;
  border-radius: .04rem;
  width: .45rem;
  height: .25rem;
  line-height: .25rem;
  background-color: #01c1b4;
}

.nac--bot--top {
  display: inline-block;
  height: .45rem;
  line-height: .45rem;
  font-size: 0.12rem;
  color: #a5a5a5;
}








/* 有淘币明细 */

.container-list {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .container-list-cen {
    // width:100%;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}








/**淘币明细**/

.container-border {
  border-bottom: .1px solid #dfdfdf;
  .container-list-data {
    height: .6rem;
    .container-list-data-lf {
      width: 60%;
      height: 100%;
      float: left;
      .container-list-data-lf-top {
        font-size: .16rem;
        color: #000000;
        margin-top: .10rem;
      }
      .container-list-data-lf-bottom {
        color: #a5a5a5;
        font-size: 0.13rem;
        line-height: 1.2;
      }
    }
    .container-list-data-rh {
      width: 40%;
      height: 100%;
      float: left;
      display: inline-flex;
      justify-content: flex-end;
      align-items: center;
      p {
        color: #ff4a4a;
      }
    }
  }
}

.first {
  color: red;
}

.textbox {
  width: 100%;
  height: 100%;
  display: block;
  font-size: 1.4rem;
  outline: none;
  border: 0;
  -webkit-appearance: none;
  -webkit-user-select: auto;
  text-align: center;
}
</style>
