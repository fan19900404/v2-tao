<template>
  <div class="participate-detail-container">
    <app-header :title="title"></app-header>
    <div class="header-container">
      <p class="edition dr-flex">
        <span class="version">第{{goods.whichTerm}}期</span>
        <span class="name">{{goods.goodsName | substr 10 '...'}}</span>
      </p>
      <div class="term color-898989">
        <span class="info">本期参与:</span>
        <span class="num"><span class="color-ff4a4a">{{goods.totalPerson}}</span> 人次</span>
      </div>
    </div>
    <div class="dr-record">
      <div class="item dr-flex">
        <span class="item-header color-898989 flex-2 t-a-l">参与时间</span>
        <span class="item-header color-898989 flex-1 t-a-c">参与人次</span>
        <span class="item-header color-898989 flex-1 t-a-r item-align-center">参与号码</span>
      </div>

      <div v-for="v in goods.joinRecord" class="item-list-outer-container">
        <div class="item-list dr-flex">
          <span class="item-detail color-898989 flex-2 t-a-l">{{v.date}}</span>
          <span class="item-detail color-ff4a4a flex-1 t-a-c">{{v.total}}</span>
          <span @click="showNums($index)" class="item-detail color-329dff flex-1 t-a-r item-align-center">查看</span>
        </div>
        <div v-show="showNum === $index" class="list-nums" transition="expand">
          <div class="dr-flex list-inner-nums">
            <div v-for="v in v.num" track-by="$index" class="num">{{v}}</div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <app-bottom-bar></app-bottom-bar>
</template>

<style scoped>
  .expand-transition {
    transition: all .3s ease;
    margin-top: 1rem;
    border-top: 1px solid #dfdfdf;
    border-bottom: 1px solid #dfdfdf;
    font-size: 1.2rem;
    color: #cdcdcd;
  }

  .expand-enter, .expand-leave {
    opacity: 0;
    height: 0;
    border: none;
  }
  .t-a-l {
    text-align: left;
  }
  .t-a-c {
    text-align: center;
  }
  .t-a-r {
    text-align: right;
  }
  .bb-1 {
    border-bottom: 1px solid #dfdfdf;
  }
  .header-container {
    padding: 1rem 1.6rem;
    background-color: #fff;
    font-size: 1.4rem;
  }
  .edition .version{
    margin-right: 2.5rem;
  }
  .term {
    margin-top: .5rem;
  }
  .term .info {
    margin-right: 1.5rem;
  }
  .color-898989 {
    color: #898989;
  }
  .color-ff4a4a {
    color: #ff4a4a;
  }
  .color-329dff {
    color: #329dff;
  }
  .dr-record {
    margin-top: 1rem;
    padding: 1.6rem 1.6rem 1rem 1.6rem;
    background-color: #fff;
  }
  .item-header {
    font-size: 1.4rem;
  }
  .item-detail {
    font-size: 1.2rem;
    line-height: 1.2rem;
  }
  .item-align-center {
    text-align: center;
  }
  .item-list {
    margin-top: .8rem;
  }
  .item-list-outer-container {
    padding-bottom: .5rem;
  }
  .list-nums {

  }
  .list-inner-nums {
    flex-wrap: wrap;
    padding: .5rem 0;
  }
  .list-inner-nums .num {
    display: inline-block;
    width: 25%;
    height: 2rem;
    line-height: 2rem;
  }

</style>

<script>
  import Vue from 'vue';
  import AppHeader from '../../components/common/header/app-header';
  import AppBottomBar from '../../components/common/footer/app-bottom-bar';

  export default {
  components: {
    AppHeader,
    AppBottomBar
  },
  data() {
    return {
      title: '参与详情',
      goods: {},
      showNum: -1
    }
  },
  methods: {
    showNums(n) {
      var innerN = n;
      if(innerN == this.showNum) {
        this.showNum = -1;
      }
      else {
        this.showNum = n;
      }
    }
  },
  mounted() {
    var that = this;
    var query = {
      numberID: that.$route.params.id,
      uid: that.$route.query.userid
    };
    Vue.OneMallHttp(this).GET(query, Vue.OneMallUrl.goods_join_details)
      .then(function(res) {
        if(10000 == res.code) {
          // 放在这里修改颜色比较好
          $('body').css({'background-color': '#f8f8f8'});
          that.goods = res.result;
        }
      })
  },
  destroyed() {
    $('body').css({'background-color': '#fff'});
  }
}
</script>


