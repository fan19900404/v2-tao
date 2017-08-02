<template>
  <section>
    <!--主题-->
    <div class="title">
      <span class="title__left" v-if = "dataListLogin.length>0">我的游戏</span>
      <span class="title__left" v-else>大家都在玩</span>
    </div>
    <!--未登录显示-->
    <div class="list" v-show = "isLogin">
      <div class="list__container">
        <div v-for="item in dataList.slice(0,3)" class="list__context">
          <div class="list__img">
            <img src="/static/images/gameCenter/h5.png" id="bg" v-show="1==item.field ">
            <img :src="item.gameIcon">
          </div>
          <span class="list__text">{{item.name.slice(0,4)}}</span>
        </div>
      </div>
      <div class="list__button">
        <div class="list__button--text">登录</div>
        <span class="list__button--prize">奖励<i>{{taoDou}}</i>淘豆</span>
      </div>
    </div>
    <!--登录玩过-->
    <div class="no" v-show = "dataListLogin.length>0">
      <div class="no__container" :class="{'space-between': dataListLogin.slice(0,4).length == 4}">
        <div v-for="(item, i) in dataListLogin.slice(0,4)" class="no__context" :class="{'align-center': dataListLogin.slice(0,4).length == 4}">
          <div class="no__img">
            <img src="/static/images/gameCenter/h5.png" id="bg" v-show="1==item.field">
            <img :src="item.imgUrl">
          </div>
          <span class="no__text">{{item.gameName.slice(0,4)}}</span>
        </div>
      </div>
      <div class="no__icon">
        <span class="icon-arrow-right"></span>
      </div>
    </div>
    <!--登录未玩过，使用swiper-->
    <div class="list__swiper" v-show = "dataListLogin.length==0 && !isLogin">
      <div class="swiper-container__game-icon">
        <div class="swiper-wrapper">
          <div v-for="v in images" class="swiper-slide">
            <a href="" >
              <div class="icon-container">
                <div class="swiper-slide__img">
                  <img src="/static/images/gameCenter/h5.png" id="bg" v-show="1==v.field">
                  <img  :src="v.gameIcon" alt="">
                </div>
              </div>
              <div class="game-name-container">
                {{v.name.slice(0,4)}}
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
  /*通用头*/
  .title {
    height: 84px;
    line-height: 84px;
    padding: 0 30px;
    /*border-top: 1px solid #E5E5E5;*/
    border-bottom: 1px solid #E5E5E5;
    background: white;
    margin-top: 30px;
    &__left {
      font-size: 32px;
      color: #333333;
      float: left;
    }
  }
  .list {
    display: flex;
    padding: 0 30px;
    background: #ffffff;
    justify-content: space-between;
    &__container {
      flex: 1;
      display: flex;
      justify-content: space-between;
    }
    &__context {
      display: flex;
      width: 118px;
      flex-flow:  column nowrap;
      position: relative;
    }
    &__img {
      height: 118px;
      width: 118px;
      padding: 30px 0 24px 0;
      img {
        width: 100%;
        height: 100%;
        border-radius: 20px;
      }
    }
    &__text {
      font-size: 28px;
      color: #333333;
      text-align: center;
      padding-bottom: 24px;
    }
    &__button {
      width: 196px;
    }
    &__icon {
      width: 58px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    &__button--text {
      width: 94px;
      height: 52px;
      box-sizing: border-box;
      line-height: 52px;
      text-align: center;
      border: 1px solid #E5E5E5;
      font-size: 26px;
      color: #333333;
      border-radius: 8px;
      margin-top: 70px;
      float: right;
    }
    &__button--prize {
      display: inline-block;
      width: 100%;
      height: 24px;
      font-size: 24px;
      float: right;
      text-align: right;
      padding-top: 10px;
      padding-bottom: 72px;
      color: #333333;
      i {
        color: #ff4a4a;
      }
    }
  }
  .no {
    display: flex;
    padding: 0 30px;
    background: #ffffff;
    justify-content: space-between;
    &__container {
      flex: 1;
      display: flex;
    }
    &__context:last-child{
      margin-right: 0;
    }
    &__context {
      display: flex;
      width: 108px;
      flex-flow:  column nowrap;
      position: relative;
      margin-right: 30px;
    }
    &__img {
      height: 118px;
      width: 118px;
      padding: 30px 0 24px 0;
      img {
        width: 100%;
        height: 100%;
        border-radius: 20px;
      }
    }
    &__text {
      font-size: 24px;
      color: #333333;
      text-align: center;
      padding-bottom:24px;
    }
    &__button {
      width: 196px;
    }
    &__icon {
      width: 58px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    &__button--text {
      width: 94px;
      height: 52px;
      box-sizing: border-box;
      line-height: 52px;
      text-align: center;
      border: 1px solid #E5E5E5;
      font-size: 26px;
      color: #333333;
      border-radius: 8px;
      margin-top: 58px;
      float: right;
    }
    &__button--prize {
      display: inline-block;
      width: 100%;
      height: 24px;
      font-size: 24px;
      float: right;
      text-align: right;
      padding-top: 10px;
      padding-bottom: 72px;
      color: #333333;
      i {
        color: #ff4a4a;
      }
    }
  }
  .list__swiper {
    padding-left: 30px;
    background: white;
  }
  .swiper-container__game-icon {
    overflow: hidden;
  }
  .game-name-container {
    text-align: left;
    font-size: 28px;/*px*/
    color: #333333;
    padding-bottom: 24px;
  }
  .swiper-container__game-icon .swiper-slide {
    width: 118px;
  }
  .swiper-slide__img {
    padding: 30px 0 24px 0;
  }
  .swiper-slide__img img {
    border-radius: 20px;
    width: 118px;
    height: 118px;
  }
  /**H5游戏添加图标**/
  #bg{
    position: absolute;
    width: 56px;
    height: 56px;
    border-radius: 0;
  }
  .space-between{
    justify-content: space-between;
  }
  .align-center{
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
<script>
  import Swiper from 'swiper';
  import { getMyGame, getImages, getDataList } from '../../../api/game';

  export default {
    data() {
      return {
        // 没有登录为true
        isLogin: false,
        // 未登录
        dataList: [],
        // 登录玩过游戏
        dataListLogin: [],
        // 登录未玩过游戏
        images: [],
        // 奖励淘豆数量
        taoDou: 1000,
      };
    },
    methods: {
      getMyGame() {
        const query = {
          page: 1,
          limit: 8,
          nologin: 0,
        };
        getMyGame(query).then((res) => {
          if (res.data.code === 10000) {
            if (res.data.result.length !== 0) {
              this.dataListLogin = res.data.result;
            } else {
              // 调用登录未玩过的方法
            }
          }
        });
      },
      getImages() {
        getImages().then((res) => {
          if (res.data.code === 10000) {
            this.images = res.data.result;
            // 初始化
            setTimeout(() => {
              const swiper = new Swiper('.swiper-container__game-icon', {
                direction: 'horizontal',
                slidesPerView: 4.5,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
              });
              console.log(swiper);
            }, 50);
          }
        });
      },
      getDataList() {
        // 未登录是调用,本页还需一个判断登录状态的方法
        getDataList().then((res) => {
          if (res.data.code === 10000) {
            this.dataList = res.data.result;
          }
        });
      },
    },
    mounted() {
      this.getMyGame();
      // this.getImages();
      // this.getDataList();
    },
  };
</script>
