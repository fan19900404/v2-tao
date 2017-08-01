<!-- author:yex -->
<template>
  <app-header :title="title"></app-header>
  <section class="container text-default">
    <!-- 头部个人信息 -->
    <section class="base-info bgc-default margin-bottom border-bottom text-white 1padding-small-left">
      <div class="user position-relative padding" v-link="'/tao-you/personal/user-info/'">
        <img class="radius-circle avatar" :src="user.avatar" alt="">
        <div class="wrpper align-vertical">
          <span class="name text-white margin-left margin-small-right">{{ user.username }}</span>
          <!--<span class="id text-gray">ID:{{ user.userId }}</span>-->
        </div>
        <i class="icon icon-edit align-vertical"></i>
      </div>
      <div class="money clearfix padding-bottom">
        <div class="w55 fl" v-link="'/tao-you/personal/taobi'">
          <div class="taobi padding wrapper position-relative border-right margin-right">
            <div class="margin-small-top">
              <span>淘币：</span><span class="num">{{ user.taoBi }}</span>
            </div>
            <a class="radius margin-top text-default" v-link="'/tao-you/personal/recharge'">充值</a>
            <i class="icon icon-right align-vertical" ></i>
          </div>
        </div>
        <div class="w45 fl" v-link="'/tao-you/personal/taodou'">
          <div class="taodou padding wrapper position-relative">
            <div class="margin-small-top">
              <span>淘豆：</span><span class="num">{{ user.taoDou }}</span>
            </div>
            <a class="radius margin-top text-default" v-link="'/tao-you/personal/taodou-dh'">兑换</a>
            <i class="icon icon-right align-vertical"></i>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="my-game-list margin-top">
        <div class="list-item flex flex-1" v-link="'/tao-you/personal/my-game/'" v-bind:class="{'border-bottom': !noData}">
          <div class="circle game2 radius-circle flex align-center-horizontal align-center-vertical">
            <i class="icon icon-game2"></i>
          </div>
          <div class="title flex-1 flex align-center-vertical">我的游戏</div>
          <div class="right flex align-center-vertical text-sub" v-bind:class="{'hidden': !noData}">暂无游戏记录&nbsp;
            <i class="icon icon-right text-gray"></i>
          </div>
        </div>
        <ul class="flex game-list" v-bind:class="{'hidden': noData}">
          <li class="flex-1" v-for="item in gameList">
            <div class="padding-small">
              <a href="{{ item.link }}">
                <img class="radius" :src="item.imgUrl" alt="">
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div class="other margin-top">
        <div v-if="user.bindPhone != ''" class="list-item flex">
          <div class="circle phone radius-circle flex align-center-horizontal align-center-vertical">
            <i class="icon icon-phone"></i>
          </div>
          <div class="flex flex-1 border-bottom" >
            <div class="title  flex align-center-vertical">绑定手机</div>
            <div class="right flex flex-1 align-center-vertical text-sub">{{ user.bindPhone }}&nbsp;
              <i class="icon icon-right text-gray"></i>
            </div>
          </div>
        </div>
        <div v-else class="list-item flex" v-link="'/tao-you/personal/bind-phone'">
          <div class="circle phone radius-circle flex align-center-horizontal align-center-vertical">
            <i class="icon icon-phone"></i>
          </div>
          <div class="flex flex-1 border-bottom" >
            <div class="title  flex align-center-vertical">绑定手机</div>
            <div class="right flex flex-1 align-center-vertical text-sub">暂未绑定手机&nbsp;
              <i class="icon icon-right text-gray"></i>
            </div>
          </div>
        </div>
        <div class="list-item flex" v-link="'/tao-you/personal/taodou-dh/'">
          <div class="circle shopping-car radius-circle flex align-center-horizontal align-center-vertical">
            <i class="icon icon-shopping-car"></i>
          </div>
          <div class="flex flex-1 border-bottom">
            <div class="title flex align-center-vertical">福利商城</div>
            <div class="right flex flex-1 align-center-vertical text-sub">
              <i class="icon icon-right text-gray"></i>
            </div>
          </div>
        </div>
        <div class="list-item flex" v-link="{name: '/tao-you/personal/service'}">
          <div class="circle service radius-circle flex align-center-horizontal align-center-vertical">
            <i class="icon icon-service"></i>
          </div>
          <div class="flex flex-1">
            <div class="title flex align-center-vertical">客服中心</div>
            <div class="right flex flex-1 align-center-vertical text-sub">
              <i class="icon icon-right text-gray"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="one-mail margin-top margin-bottom">
        <a href="http://1.lly800.com">
          <div class="list-item flex flex-1">
            <div class="circle one-buy radius-circle flex align-center-horizontal align-center-vertical">
              <i class="icon icon-one-buy"></i>
            </div>
            <div class="title flex-1 flex align-center-vertical">一元夺宝</div>
            <div class="right flex align-center-vertical text-sub">
              <i class="icon icon-right text-gray"></i>
            </div>
          </div>
        </a>
      </div>
    </section>
  </section>
  <app-footer></app-footer>
</template>

<script>
  'use strict';
  import AppHeader from '../../components/common-layout/header.component';
  import AppFooter from '../../components/common-layout/footer.component';
  import { user } from '../../vuex/getters';
  import { getUserInfo } from '../../vuex/actions';

  export default {
    vuex: {
      getters: {
        user: user
      },
      actions: {
        getUserInfo
      }
    },
    components: {
      AppHeader,
      AppFooter
    },
    data() {
      return {
        title: '我的淘游',
        noData: false, // 没有游戏数据
        gameList: []
      }
    },
    mounted() {
      $('body').css('background-color', '#f8f8f8');
      this.getUserInfo();
      this.loadMyGameList();
    },
    methods:{

      /* 获取我的游戏列表(top5) */
      loadMyGameList(){
        if(this.allLoaded){
          return;
        }
        this.loading = true;
        Vue.ClientHttp().GET({page: 1, limit: 5}, Vue.ClientUrl.my_game_list)
          .then((res) => {
            this.loading = false;
            if(res.code === 10000){
              this.gameList = this.gameList.concat(res.result.slice(0,5));
              if(res.result.length === 0){
                this.noData = true;
              }
              return;
            }
            console.log('获取游戏数据失败');
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .fix-one-yuan {
    color: #000;
  }
  .base-info{
    box-shadow: 0.2rem 0.2rem 0.2rem #dac7c7;
    .user{
      padding-left: 1.5rem;
      .avatar{
          width: 4rem;
          height: 4rem;
      }
      .wrpper{
        height: 2rem;
        line-height: 2rem;
        left: 5.5rem;

        .id{
          vertical-align: sub;
          font-size: small;
        }
      }
      i{
        font-size: 1.85rem;
        height: 1.5rem;
        right: 1rem;
      }
    }
    .money{
      background-color: #ff3d3d;

      .wrapper{
        .num{
          color: #ffff00;
        }
        a{
          display: inline-block;
          padding: 0.7rem 1.875rem;
          color: #ff4a4a;
          background-color: #ffff00;
        }
        i{
          height: 2rem;
          right: 1rem;
        }
      }
      .taobi{
        padding-left: 1.5rem;
        border-color: #ff6d6d;
      }
      .taodou{
        i{
          right: 1rem;
        }
      }
    }
  }

  .flex {
    display: flex;
    align-items: inherit;
  }
  .my-game-list, .other, .one-mail{
    border-top: solid 1px #dfdfdf;
    border-bottom: solid 1px #dfdfdf;
    background-color: #fff;
  }
  .game-list{
    padding: 0.5rem 0.5rem 0.25rem 1rem;
  }
  .align-center-horizontal{
    justify-content: center;
  }
  .align-center-vertical{
    align-items: center;
  }
  .my-game-list{
    .list-item{
      padding: 0 0 1rem 0;
      margin: 1rem 0 0 1.5rem;
    }
  }
  .list-item{
    padding: 1rem 0 1rem 1.5rem;
    &:not(:first-child){
      padding-top: 0;
    }
    > div:not(:last-child){
      margin-right: 1rem;
    }
    .circle{
      width: 3rem;
      height: 3rem;

      &.game2 {
          background-color: #fd991c
      }
      &.phone {
          background-color: #ff6c0c
      }
      &.shopping-car {
          background-color: #76c94d
      }
      &.service {
          background-color: #88bbfc
      }
      &.one-buy {
          background-color: #ff6868
      }
      i{
        font-size: 1.75rem;
      }
    }
    .title{
      width: 8rem;
      color: #333;
    }
    .right{
      margin-right: 1rem;
    }
  }
  .other{
    .list-item{
      .right{
        justify-content: flex-end;
      }
    }
  }
</style>
