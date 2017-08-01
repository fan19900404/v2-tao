<!-- author: dreamapple -->
<template>
  <app-header :title="'兑换记录'"></app-header>

  <!-- 没有记录 -->
  <div v-show="0 === records.length" class="no-dbq-box">
    <img class="no-img" src="/static/images/no_dbq_bg.png">
    <p class="tips">没有可使用的夺宝券</p>
    <a class="ljdh" v-link="'/welfare/integral-exchange'">立即兑换</a>
  </div>

  <div v-show="records.length" v-for="v in records" class="record dr-flex">
    <div class="record-inner record-info flex-1">
      <div class="record-num">兑换{{v.num}}个淘币</div>
      <div class="record-date">{{v.date | formatDate 'YYYY-MM-DD hh:mm:ss'}}</div>
    </div>
    <div class="record-inner record-cost">-{{v.costScore}}积分</div>
  </div>

  <!-- 加载更多的 -->
  <p v-show="isLoading && records.length" class="loading"></p>
  <p v-show="isLoading && records.length" class="msg">正在加载中...</p>
  <p v-show="isAllData && records.length" class="no-more msg">没有更新的数据了</p>

  <!-- 底部菜单兰 -->
  <app-bottom-bar></app-bottom-bar>
</template>

<script>
  'use strict';
  import Vue from 'vue';
  import AppHeader from '../../components/common/header/app-header';
  import AppBottomBar from '../../components/common/footer/app-bottom-bar';
  // component
  export default {
    components: {
      AppHeader,
      AppBottomBar
    },
    data(){
      return {
        records: [],
        // about pagination
        page: 1,
        isLoading: false,
        isAllData: false
      }
    },
    mounted(){
      $("body").css({"background-color":"#f8f8f8"});
      mallUtils.funs.scroll(this.touchLoading);
      this.fetchRecords({
        page: this.page
      });
    },
    destroyed() {
      $("body").css({"background-color":"#fff"});
      mallUtils.funs.unscroll(this.touchLoading);
    },
    methods: {
      touchLoading(){
        //滚动加载 滚到底部加载数据
        var scrollTop = document.body.scrollTop,
          bodyHeight = document.body.offsetHeight,
          screenHeight = mallUtils.screen.height,
          triggerDistance = 60,
          triggerStatus = (bodyHeight - (scrollTop + screenHeight)) < (triggerDistance - 12) ? true : false;
        if(triggerStatus && !this.isLoading) {
          this.fetchMoreData();
        }
      },
      fetchMoreData(e) {
        if(this.isLoading || this.isAllData) {
          console.log('不能够加载更多的数据了...', this.isLoading, this.isAllData);
          // TODO
        }
        else {
          this.isLoading = true;
          this.page++;
          var query = {
            page: this.page
          };
          this.fetchRecords(query);
        }
      },
      fetchRecords(query){
        var that = this;
        Vue.OneMallHttp(this).GET(query, Vue.OneMallUrl.integral_exchange_record)
          .then(function(res) {
            if(10000 == res.code) {
              that.isLoading = false;
              var temp = res.result;
              if(1 === res.isLastPage) {
                that.records = that.records.concat(temp);
                that.isAllData = true;
              }
              else {
                that.records = that.records.concat(temp);
                that.isAllData = false;
              }
            }
          });
      }
    }
  }

</script>

<style scoped>
  .loading {
    background-image: url('/static/images/loading.gif');
    height: 3rem;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #fff;
  }
  .msg {
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    background-color: #fff;
    color: #898989;
  }
  .record {
    box-sizing: border-box;
    height: 6.1rem;
    background-color: #fff;
    padding: 1.4rem 1.6rem;
    border-bottom: 1px solid #dfdfdf;
  }
  .record .record-inner {
    height: 3.2rem;
  }
  .record-cost {
    line-height: 3.2rem;
    font-size: 1.4rem;
    color: #ff4a4a;
  }
  .record-num {
    line-height: 1.8rem;
    font-size: 1.4rem;
    font-weight: 400;
  }
  .record-date {
    line-height: 1.4rem;
    color: #898989;
    font-size: 1.2rem;
  }
  /*没有夺宝券时的情况*/
  .no-dbq-box {
    padding: 11.4rem 0 0 0;
  }

  .no-dbq-box .no-img {
    display: block;
    width: 18.6rem;
    height: 11rem;
    margin: 0 auto;
  }

  .no-dbq-box .tips {
    font-size: 1.4rem;
    color: #cdcdcd;
    line-height: 4rem;
    text-align: center;
    margin: 0 0 4rem 0;
  }

  .no-dbq-box .ljdh {
    display: block;
    width: 18rem;
    height: 4.5rem;
    line-height: 4.5rem;
    text-align: center;
    color: #fff;
    font-size: 1.4rem;
    border-radius: .5rem;
    background-color: #ff4a4a;
    margin: 0 auto;
  }
</style>
