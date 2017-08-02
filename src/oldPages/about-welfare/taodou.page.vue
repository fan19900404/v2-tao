<style scoped>
  body {
    background-color: #dfdfdf;
  }
  .flex-col-middle {
    display: box;
    display:-webkit-box;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: center;
  }

  .count-box {
    height: 6rem;
    padding: 0 1.6rem;
    background-color: #ff4a4a;
    color: #fff;
    font-size: 1.8rem;
  }

  .count-box .count {
    color: #ffff00;
    font-style: normal;
  }

  .count-box .dhdbq-btn {
    display: block;
    width: 8.4rem;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    font-size: 1.2rem;
    color: #ff4a4a;
    background-color: #ffff00;
    border-radius: .5rem;
  }

  .one-mall-iconfont {
    vertical-align: text-bottom;
    margin: 0 .2rem 0 0;
  }

  .sy-tips {
    line-height: 4.0rem;
    text-align: right;
    font-size: 1.2rem;
    color: #bbbbbb;
  }

  .dbq-box {
    padding: 0 1.1rem;
  }

  .dbq-list > li {
    height: 12rem;
    padding: 0 1.5rem;
    margin: 0 0 1.6rem 0;
    color: #898989;
  }

  .dbq-list > li .top {
    height: 5.6rem;
    border-bottom: 1px solid #ececec;
    font-size: 1.8rem;
  }

  .dbq-list > li .top .money .count {
    font-size: 3.1rem;
    font-weight: bold;
  }

  .dbq-list > li .bottom {
    height: 6.3rem;
  }

  .dbq-list > li .bottom > span {
    font-size: 1.2rem;
    color: #898989;
    line-height: 2rem;
  }

  /*未使用的夺宝券样式*/
  .dbq-list > li.unused {
    background: url(/oldStatic/images/quan_bg.png) no-repeat top center;
    background-size: 100% 100%;
  }

  .dbq-list > li.unused .top .t {
    color: #000;
  }

  .dbq-list > li.unused .top .money {
    color: #ff4a4a;
  }

  /*过期的夺宝券样式*/
  .dbq-list > li.overdue {
    background: url(/oldStatic/images/quan_overdue_bg.png) no-repeat top center;
    background-size: 100% 100%;
  }

  /*已使用的夺宝券样式*/
  .dbq-list > li.used {
    background: url(/oldStatic/images/quan_used_bg.png) no-repeat top center;
    background-size: 100% 100%;
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

<template>
  <app-header :title="'我的淘豆'" :prev="'/personal'"></app-header>
  <section class="count-box flex-ld">
    <span>我的淘豆<em class="count">{{taodou}}</em></span>
    <a class="dhdbq-btn" v-link="'/welfare/taodou-dh'">兑换夺宝券</a>
  </section>
  <div class="no-dbq-box" v-if="dbqList.length==0">
    <img class="no-img" src="/oldStatic/images/no_dbq_bg.png">
    <p class="tips">没有可使用的夺宝券</p>
    <a class="ljdh" v-link="'/welfare/taodou-dh'">立即兑换</a>
  </div>
  <section class="dbq-box" v-else>
    <p class="sy-tips" v-link="'/welfare/taodou-explain'"><i class="one-mall-iconfont icon-info_outline"></i>使用说明</p>
    <ul class="dbq-list">
      <li :class="{'unused':item.status==0,'used':item.status==1,'overdue':item.status==3}" v-for="item in dbqList">
        <div class="top flex-ld">
          <span class="t">{{item.name}}</span>
          <span class="money">￥<em class="count">{{item.prize}}</em></span>
        </div>
        <div class="bottom flex-col-middle">
          <span>{{item.remark}}</span>
          <span>有效期：{{item.startTime}}至{{item.endTime}}</span>
        </div>
      </li>
    </ul>
  </section>

  <!-- 底部菜单兰 -->
  <app-bottom-bar></app-bottom-bar>
</template>

<script>
  import Vue from 'vue';
  import AppHeader from '../../oldComponents/common/header/app-header';
  import AppBottomBar from '../../oldComponents/common/footer/app-bottom-bar';
  export default {
    components: {
      AppHeader,
      AppBottomBar
    },
    data() {
      return {
        taodou:0,
        page:1,
        loadAll:false,
        dbqList:[]
      }
    },
    mounted() {
      $("body").css("background-color","#f8f8f8");

      //绑定滚动
      mallUtils.funs.scroll(this.bindScrollEvent);
      this.getTaoDou();
      this.getDbqList();
    },
    methods:{
      getTaoDou() {
        var _this = this;
        Vue.OneMallHttp(this).GET({},Vue.OneMallUrl.personal_user_money_index).then(function(data){
          if(data.code == 10000){
            _this.taodou = data.info.taoDou;
          }
        })
      },
      getDbqList() {
        var _this = this;
        mallUtils.funs.unscroll(_this.bindScrollEvent);
        if(!_this.loadAll){
          Vue.OneMallHttp(this).GET({page:_this.page},Vue.OneMallUrl.personal_userticket_ticketlist).then(function(data){
            if(data.code == 10000){
              if(_this.page == 1){
                _this.dbqList = data.list;
              }else{
                _this.dbqList = _this.dbqList.concat(data.list);
              }
              _this.loadAll = (data.isLast == 1);
              _this.page ++;
              mallUtils.funs.scroll(_this.bindScrollEvent);
            }
          })
        }
      },
      bindScrollEvent() {
        if(mallUtils.screen.height + document.body.scrollTop + 50 >= document.body.offsetHeight){
            this.getDbqList();
          }
      }
    },
    destroyed(){
        $("body").css({"background-color":"#fff"});
        mallUtils.funs.unscroll(this.bindScrollEvent);
      }
  }
</script>
