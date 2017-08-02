<template>
  <div>
    <!--顶部-->
    <div class="header">
      <header-component :title="title"></header-component>
    </div>
    <!--游戏粗略信息-->
    <div class="game">
      <share-component :config="config" :bind-style="{ position: 'absolute', top:.15 + 'rem', right:.15 + 'rem'}"></share-component>
      <div class="game__img" v-link="{name: 'GameIntro', params: {id: pd.gameID}}">
        <img :src="pd.image">
      </div>
      <div class="game__container">
        <p class="game__name" v-link="{name: 'GameIntro', params: {id: pd.gameID}}">{{pd.gameName}}</p>
        <p class="game__msg">{{pd.name}}</p>
        <p class="game__text">{{pd.typeName}}</p>
      </div>
      <div class="game__count">
        <span>剩余
          <i>{{rent}}%</i>
        </span>
      </div>
    </div>
    <!--使用方法-->
    <div class="method">
      <div class="method__time">
        <p class="method__title">使用有效期</p>
        <p class="method__date">{{pd.startTime | formatDate ('YYYY.MM.DD')}} - {{pd.endTime | formatDate ('YYYY.MM.DD')}}</p>
      </div>
      <div class="method__time">
        <p class="method__title">礼包内容</p>
        <p class="method__date" v-html="pd.content"></p>
      </div>
      <div class="method__time">
        <p class="method__title">使用方法</p>
        <p class="method__date" v-html="pd.remark"></p>
      </div>
    </div>
    <!--按钮及分享-->
    <div class="button">
      <!--<div class="button__share">-->
      <!--<span>-->
      <!--<share-component :config="config" :bind-style="{}"></share-component>-->
      <!--</span>-->
      <!--<div class="button__text" v-touch:tap="showShare">分享</div>-->
      <!--</div>-->
      <div class="button__key">
        <app-button :btn-text="btnMsg" @button-component="button"></app-button>
      </div>
    </div>
    <!--两个按钮的弹窗-->
    <two-button-dialog :content="content" :show="isShow" :has-slot="hasSlot" :left-btn-text="leftBtnText" :right-btn-text="rightBtnText" :show-close-btn="showCloseBtn" @two-btns-dialog-component-left="left" @two-btns-dialog-component-right="right" @two-btns-dialog-component-what-some="what" :btn-text="btnText" :num="count"></two-button-dialog>
    <return-btn></return-btn>
  </div>
</template>
<style lang="scss" scoped>
@import "../../../../assets/tao-you/common.scss";
.header {
  border-bottom: 1px solid #E5E5E5;
}

.game {
  display: flex;
  background: white;
  padding: 0 .15rem;
  /*border-bottom: 1px solid #E5E5E5;*/
  &__img {
    width: .70rem;
    height: .71rem;
    padding: .15rem .09rem .15rem 0;
    border-radius: .15rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: .15rem;
    }
  }
  &__container {
    flex: 1;
  }
  &__name {
    height: .16rem;
    font-size: .16rem;
    color: #333333;
    padding: .21rem 0 .08rem 0;
    line-height: 1em;
  }
  &__msg {
    height: .13rem;
    font-size: .13rem;
    color: #a5a5a5;
    line-height: 1em;
  }
  &__text {
    height: .13rem;
    font-size: .13rem;
    color: #a5a5a5;
    padding-top: .08rem;
    line-height: 1em;
  }
  &__count {
    /*display: flex;*/
    /*align-items: center;*/
    margin-top: .62rem;
    span {
      font-size: .13rem;
      color: #333333;
      i {
        color: #ff4a4a;
      }
    }
  }
}

.method {
  padding: 0 .15rem;
  background: white;
  margin-top: .15rem;
  /*border-bottom: 1px solid #E5E5E5;*/
  /*border-top: 1px solid #E5E5E5;*/
  margin-bottom: .70rem;
  &__time {
    border-bottom: 1px solid #E5E5E5;
  }
  &__title {
    height: .15rem;
    font-size: .15rem;
    color: #333333;
    padding: .15rem 0;
  }
  &__date {
    font-size: .13rem;
    color: #333333;
    padding-bottom: .10rem;
    line-height: .22rem;
  }
}

.method .method__time:nth-last-child(1) {
  border-bottom: none;
}

.button {
  background: #ffffff;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  border-top: 1px solid #E5E5E5;
  max-width: 640px;
  &__key {
    flex: 1;
    margin-right: .15rem;
    margin-left: .15rem;
    padding: .10rem 0;
  }
}
</style>
<script>
import HeaderComponent from "../../../../oldComponents/tao-you/layout/header.component.vue";
import AppButton from '../../../../oldComponents/tao-you/button/button.component';
import ShareComponent from '../../../../oldComponents/tao-you/share/share.component';
import TwoButtonDialog from '../../../../oldComponents/tao-you/dialog/two-buttons-link-dialog.component.vue';
import ReturnBtn from '../../../../oldComponents/tao-you/button/return.component.vue';
import { Swipe, SwipeItem, InfiniteScroll, Spinner } from 'mint-ui';
import { getUserInfo } from '../../../../vuex/actions.js';
import { user } from '../../../../vuex/getters';
export default {
  vuex: {
    getters: {
      user: user
    },
    actions: {
      getUserInfo
    }
  },
  data() {
    return {
      title: '兑换礼包',
      btnMsg: "",
      //礼包信息
      pd: [],
      //是否領取過0:未領取、1：已領取
      type: null,
      //需要多少淘豆兌換,后端传入
      count: null,
      //是否显示弹窗
      isShow: false,
      //弹窗内容
      content: "很遗憾，你的淘豆不足够兑换该礼包",
      //是否显示其他内容
      hasSlot: true,
      //弹窗左边按钮文字
      leftBtnText: "",
      //弹窗右边按钮文字
      rightBtnText: "",
      //是否显示关闭icon
      showCloseBtn: true,
      btnText: "兑换失败",
      //弹窗动作类型
      cancel: true
    }
  },
  computed: {
    rent() {
      return parseInt(this.pd.totalNumber) === 0 ? 0 : parseInt((parseInt(this.pd.totalNumber) - parseInt(this.pd.usedNumber)) / parseInt(this.pd.totalNumber) * 100);
    }
  },
  methods: {
    //获取礼包信息
    getPacks() {
      let query = {
        id: this.$route.params.id,
        nologin: 1
      };
      Vue.ClientHttp().GET(query, Vue.ClientUrl.packs_detail)
        .then((res) => {
          if (res.code === 10000) {
            if (!res.result || !res.result[0]) {
              return;
            }
            this.pd = res.result[0];
            this.type = this.pd.uID > 0 ? 1 : 0;
            this.count = parseInt(this.pd.taoDou) > 0 ? parseInt(this.pd.taoDou) : null;
            if (this.type === 0) {
              if (this.count) {
                this.btnMsg = this.count + "淘豆兑换"
              } else {
                this.title = "领取礼包"
                this.btnMsg = "领取"
              }
            } else {
              this.btnMsg = "查看"
            }
          }
        })
    },
    //按钮的动作,要区分状态type，1.查看：跳转到结果页/0.领取或兑换，其中兑换需要判断淘豆数量是否足够,在跳转
    button() {
      if (this.type === 0) {
        if (this.count) {
          //两次调用弹窗1，判断用户是否确定用淘豆兑换2，用户确定后判断用户淘豆是否足够兑换
          console.log('需要淘豆兑换');
          this.leftBtnText = "取消";
          this.rightBtnText = "兑换";
          this.showCloseBtn = false;
          this.isShow = true;
        } else {
          this.$router.push({
            name: "TaoYouPacksResult",
            params: { id: this.$route.params.id },
            query: {
              stock: this.rent,
              gameID: this.pd.gameID,
              weburl: this.pd.weburl
            }
          })
        }
      }
      if (this.type === 1) {
        this.$router.push({
          name: "TaoYouPacksResult",
          params: { id: this.$route.params.id },
          query: {
            stock: this.rent,
            gameID: this.pd.gameID,
            weburl: this.pd.weburl
          }
        })
      }
    },
    //弹窗左动作
    left() {
      console.log('左方发')
      if (this.cancel) {
        this.isShow = false;
      } else {
        this.$router.push({
          name: "TaoYouPacks"
        })
      }
    },
    //弹窗右动作
    right() {
      console.log('右边方发');
      this.isShow = false;
      if (this.cancel) {
        console.log(typeof (parseInt(this.user.taoDou)));
        console.log(this.count);
        if (this.count > parseInt(this.user.taoDou)) {
          this.hasSlot = false;
          this.btnText = "兑换失败";
          this.content = "很遗憾，你的淘豆不足够兑换该礼包";
          this.leftBtnText = "看看其他礼包";
          this.rightBtnText = "赚淘豆";
          this.isShow = true;
          this.cancel = false;
        } else {
          this.$router.push({
            name: "TaoYouPacksResult",
            params: { id: this.$route.params.id },
            query: {
              stock: this.rent,
              gameID: this.pd.gameID,
              weburl: this.pd.weburl
            }
          })
        }
      } else {
        this.$router.push({
          name: "TaoYouGameCenterReplace"
        })
      }
    },
    what() {
      this.$router.push({
        name: 'TaoYouWelfareShopWelfareMyTaodou'
      })
    },
    showShare(e) {
      this.$root.$broadcast('share', 1);
    }
  },
  components: {
    HeaderComponent,
    AppButton,
    ShareComponent,
    TwoButtonDialog,
    ReturnBtn
  },
  mounted() {
    this.getPacks();
    this.getUserInfo();
    console.log(this.user);
  }
}
</script>
