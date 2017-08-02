<template>
  <div class="history-reward">
    <app-header :title="title"></app-header>
    <!--<app-subarea-buy></app-subarea-buy>-->
    <div class="history-header">
      <div class="select-edition dr-flex">
        <span class="tag">[分区]{{reward.info.goodsName | substr 6 '...'}}</span>
        <span class="which-edition flex-1">第<span class="color-ff6709">{{reward.info.whichTerm}}</span>期</span>
        <div class="choose dr-flex">
          <select v-on:change="getSpecialTermData" class="type" v-model="type">
            <option value="10" selected>近10期</option>
            <option value="30" >近30期</option>
            <option value="50" >近50期</option>
          </select>
        </div>
      </div>
    </div>
    <div class="number-section">
      <div class="num-title dr-flex">
        <span class="num-first">区间</span>
        <span v-for="n in +reward.info.subarea" class="num flex-1">{{n+1}}</span>
      </div>
      <div v-for="(key, value) in terms" class="num-list  dr-flex" :class="{'color-f8f8f8': $index % 2}">
        <span class="num-first">{{key | foreSubstr 4 '**'}}</span>
        <span v-for="n in +reward.info.subarea" class="num-c flex-1 dr-flex">
          <span v-show="value == n+1" class="inner-number">{{n+1}}</span>
          <span v-show="value != n+1">{{n+1}}</span>
        </span>
      </div>
    </div>
    <p class="result-title">
      遗漏、连出等数据，以最近100期的开奖结果计算
    </p>
    <div class="result">
        <div class="result-list dr-flex">
          <span class="result-l-first">出现次数</span>
          <span v-for="n of reward.summery.occur" track-by="$index" class="flex-1 inner-num">{{n}}</span>
        </div>
      <div class="result-list dr-flex">
          <span class="result-l-first">当前遗漏</span>
          <span v-for="n of reward.summery.lost" track-by="$index" class="flex-1 inner-num">{{n}}</span>
      </div>
      <div class="result-list dr-flex">
          <span class="result-l-first">最大连出</span>
          <span v-for="n of reward.summery.bit" track-by="$index" class="flex-1 inner-num">{{n}}</span>
      </div>
    </div>
  </div>

  <app-bottom-bar></app-bottom-bar>
</template>

<style scoped>
  .color-ff6709 {
    color: #ff6709;
  }
  .color-f8f8f8 {
    background-color: #f8f8f8;
  }
.number-section {
  box-sizing: border-box;
  text-align: center;
}
  .num-title {
    box-sizing: border-box;
    height: 3.2rem;
    line-height: 3.2rem;
    background-color: #dcdddd;
  }
  .num-list {
    color: #898989;
    box-sizing: border-box;
    height: 3rem;
    line-height: 3rem;
  }
  .num-list:last-child {
    border-bottom: 1px solid #dfdfdf;
  }
  .num-first {
    width: 4.4rem;
  }
  .num-list span:not(:last-child) {
    border-right: 1px solid #dfdfdf;
  }
  .num-c {
    align-items: center;
    justify-content: center;
  }
  .inner-number {
    background-color: #ff6709;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    color: #fff;
    line-height: 1.6rem;
  }
  .result-title {
    height: 4.2rem;
    text-align: center;
    color: #898989;
    line-height: 4.2rem;
    font-size: 1.4rem;
  }
  .result {
    border-top: 1px solid #dfdfdf;
    box-sizing: border-box;
    background-color: #f8f8f8;
    color: #898989;
  }
  .result-list {
    height: 4.6rem;
    text-align: center;
  }
  .result-list span:not(:last-child) {
    border-bottom: 1px solid #dfdfdf;
    border-right: 1px solid #dfdfdf;
  }
  .result-list span:last-child {
    border-bottom: 1px solid #dfdfdf;
  }
  .result-l-first {
    width: 4.4rem;
  }
  .result-l-first, .inner-num {
    height: 4.6rem;
    line-height: 4.6rem;
  }
  .history-header {
    height: 4.6rem;
    font-size: 1.4rem;
  }
  .select-edition {
    margin: 0 1.6rem;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  .select-edition .tag {
    font-weight: 600;
  }
  .select-edition .which-edition {
    margin-left: 1rem;
  }
  .select-edition .choose {
    align-items: center;
  }
  .select-edition .type {
    background-color: #fff;
  }
</style>

<script>
  import Vue from 'vue';
  import AppSubareaBuy from '../../oldComponents/feature/about-home/app-subarea-buy'
  import AppHeader from '../../oldComponents/common/header/app-header';
  import AppBottomBar from '../../oldComponents/common/footer/app-bottom-bar';

  export default {
    components: {
      AppHeader,
      AppSubareaBuy,
      AppBottomBar
    },
    data() {
      return {
        title: '查看历史开奖',
        type: 10,
        reward:{},
        terms:{}
      }
    },
    mounted() {
      console.log(this.$route.params.id, 999);
      var that = this;
      Vue.OneMallHttp(this).GET({
        goodsID: that.$route.params.id
      }, Vue.OneMallUrl.goods_history_reward)
        .then(function(res) {
          if (10000 === res.code) {
            var temp = res.result;
            that.reward = temp;
          }
          // 处理异常的请求
          else {
            //  TODO
          }
        });
      this.getSpecialTermData();

    },
    methods: {
      getSpecialTermData() {
        var that = this;
        Vue.OneMallHttp(this).GET({
            goodsID: that.$route.params.id,
            howManyTerm: that.type
          }, Vue.OneMallUrl.goods_history_reward_data)
          .then(function(res) {
            if (10000 === res.code) {
              var temp = res.result;
              that.terms = temp;
            }
            // 处理异常的请求
            else {
              //  TODO
            }
          });
      }
    }
  }
</script>
