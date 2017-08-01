<template>
  <div>
    <!--顶部-->
    <header-component :title="title"></header-component>
    <!--领取结果-->
    <div class="result" v-if="success">
      <!--成功显示分享按钮-->
      <span v-show="success">
        <share-component :bind-style="{display: 'flex', position: 'absolute', top: '.15rem', right: '.15rem'}"></share-component>
      </span>
      <div class="result__img">
        <img src="/static/images/packs/success_03.png">
      </div>

      <div class="result__text">{{msg}}请长按复制使用</div>
      <div class="result__code" id="code">激活码:
        <span>{{no}}</span>
      </div>
    </div>
    <div class="result" v-else>
      <div class="result__img">
        <img src="/static/images/packs/fail_03.png">
      </div>
      <!--<div class="result__two" v-if="exchange">兑换失败:{{msg}}</div>-->
      <div class="result__two" v-if="exchange">{{msg}}</div>
      <div class="result__two" v-else>领取失败:{{msg}}</div>
    </div>
    <div class="btn-area">
      <app-button :btn-text="btnMsg" @button-component="beginPlay" :btn-theme="disabled?2:1"></app-button>
    </div>
    <!--推荐的礼包-->
    <!--通用头-->
    <div class="title">
      <span class="title__left">更多精彩礼包等着你~</span>
    </div>
    <section class="all" v-infinite-scroll="getMorePacks()" infinite-scroll-distance="10" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false">
      <div class="list" v-for="item in morePacks">
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
      <!-- 返回顶部 -->
      <back-top></back-top>
      <!-- 回退 -->
      <back-previous></back-previous>
    </section>
  </div>
</template>
<style lang="scss" scoped>
@import "../../../../assets/tao-you/common.scss";
.result {
  padding: 0 .15rem .12rem;
  background: #ffffff;
  /*border-bottom: 1px solid #E5E5E5;*/
  position: relative;
  &__img {
    width: 1.38rem;
    height: .96rem;
    padding: .32rem 0 .13rem 0;
    margin: 0 auto;
    img {
      height: 100%;
      height: 100%;
    }
  }
  &__text {
    height: .14rem;
    font-size: .14rem;
    color: #666666;
    padding-bottom: .09rem;
    text-align: center;
  }
  &__two {
    height: .14rem;
    font-size: .14rem;
    color: #666666;
    text-align: center;
  }
  &__three {
    width: 2.1rem;
    margin: 0 auto;
    padding-bottom: 0.06rem;
  }
  &__p1 {
    height: .14rem;
    font-size: .14rem;
    color: #666666;
    padding-bottom: 0.06rem;
    text-align: center;
    i {
      color: #ff4a4a;
    }
  }
  &__p2 {
    height: .14rem;
    font-size: .14rem;
    color: #666666;
    text-align: center;
  }
  &__code {
    font-size: .22rem;
    color: #333333;
    background: #f0f0f0;
    padding: 0 .08rem;
    text-align: center;
    user-select: text;
    span {
      word-break: break-all;
    }
  }
}


/*通用头*/

.title {
  height: .42rem;
  line-height: .42rem;
  padding: 0 .15rem;
  /*border-top: 1px solid #E5E5E5;*/
  border-bottom: 1px solid #E5E5E5;
  background: white;
  margin-top: .15rem;
  &__left {
    font-size: .16rem;
    color: #333333;
    float: left;
  }
  &__right {
    font-size: .13rem;
    color: #333333;
    float: right;
    i {
      color: #ff4a4a;
    }
  }
}


/*图片/文字/右边圆环*/

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
      height: .16rem;
      font-size: .16rem;
      color: #333333;
      padding-top: .07rem;
    }
    .p2 {
      height: .14rem;
      font-size: .13rem;
      color: #a5a5a5;
      padding-top: .07rem;
    }
    .p3 {
      height: .14rem;
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

.btn-area {
  padding: 0 .15rem .15rem .15rem;
  background-color: #fff;
}
</style>
<script>
import HeaderComponent from "../../../../components/tao-you/layout/header.component.vue";
import ShareComponent from '../../../../components/tao-you/share/share.component';
import ProgressComponent from "../../../../components/tao-you/svg-progress/svg-progress.component.vue";
import { InfiniteScroll, Spinner } from 'mint-ui';
Vue.component('my-spinner', Spinner);
import BackTop from '../../../../components/tao-you/button/back-top.component'; // 添加回到顶部
import BackPrevious from '../../../../components/tao-you/button/return.component';
import AppButton from '../../../../components/tao-you/button/button.component';
export default {
  data() {
    return {
      title: '兑换结果',
      morePacks: [],
      loading: false,
      pageIndex: 1,
      pageSize: 10,
      allLoaded: false,
      //请求是否成功
      success: true,
      //后端返回的简短说明
      msg: "",
      //哪种类型 true:兑换
      exchange: true,
      //激活码
      no: "",
      //消耗的淘豆数量
      num: null,
      //是否领取过
      "isRecycle": 0,
      pd: {},
      disabled: false,
      btnMsg: '下载游戏'
    }
  },
  computed: {

  },
  methods: {
    getGameInfo() {
      var gameID = this.$route.query.gameID;
      let weburl = this.$route.query.weburl;
      if (+gameID) {
        this.doGetGameInfo(gameID);
        return;
      }
      if (!weburl) {
        this.disabled = true;
      }
    },
    doGetGameInfo(gameID) {
      let query = {
        id: gameID,
        nologin: 1
      };
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.game_detail)
        .then((res) => {
          if (res.code === 10000) {
            this.pd = res.result;
            if (this.pd.type === 1) {
              this.btnMsg = '开始游戏';
            } else {
              this.btnMsg = '下载游戏';
            }
          }
        })
    },
    beginPlay() {
      debugger;
      let item = this.pd;

      // h5直接进入游戏
      if (+item.type === 1) {

        // 如果是h5游戏直接跳转
        this.$router.push({
          name: 'TaoYouPlayMyGame',
          params: {
            id: item.gameID
          },
          query: {
            d: item.direction,
            gameUrl: item.gameUrl,
            gameName: item.gameName,
            from: 1
          }
        });
        return;
      }

      // app 官网链接可用则直接进入官网；否则，跳转游戏详情页
      let weburl = this.$route.query.weburl;
      let gameID = this.$route.query.gameID;
      if (weburl) {
        location.href = weburl;
        return;
      }
      if (+gameID) {
        this.$router.push({ name: 'GameIntro', params: { id: gameID } });
      }
    },
    //获取更多礼包，考虑无限加载
    getMorePacks() {
      if (this.allLoaded) {
        return;
      }
      this.loading = true;
      let query = {
        page: this.pageIndex,
        limit: this.pageSize
      };
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.packs_list)
        .then((res) => {
          this.loading = false;
          if (res.code === 10000) {
            this.morePacks = this.morePacks.concat(res.result);
            if (this.morePacks.length === 0) {
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
    //获取兑换码,区分状态/区分兑换、领取
    getCode() {
      /*if(!(+this.$route.query.stock)){
        this.success = false;
        this.msg = '该礼包因太火爆，已经被领完了';

        this.getMorePacks();
        return;
      }*/
      let query = {
        id: this.$route.params.id
      };
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.packs_exchange)
        .then((res) => {
          //优先判断是兑换还是领取
          //if(res.result.count){
          //this.title = "兑换结果"
          //}else{
          //this.title = "领取结果"
          //this.exchange = false;
          //};
          //请求是否有结果
          if (res.code === 10000) {
            this.no = res.result.number;
            //this.num = res.result.count;
            //this.isRecycle = res.result.isRecycle;
            this.msg = res.msg;
            //已领取/已兑换/都是在成功的前提下
            this.getMorePacks();
          } else {
            console.log('error');
            this.success = false;
            this.msg = res.msg;
            this.getMorePacks();
          }
        });
    },
    //控制兑换码的大小
    codeFont() {
      try {

      } catch (ex) { }
      //受浏览器解析最小字体的限制，iPhone5极限只能放33个
      var str = document.getElementById('code').innerText;
      var L = 0.0;
      for (var i in str) {
        L += (str.charCodeAt(i) > 255) ? 1 : 0.5;
      }
      L = Math.ceil(L);
      var width = parseInt($('#code').width());
      var mul = width;
      var font_size = Math.floor(Math.floor(mul / L) / 1.1);
      var size = font_size > 22 ? 22 : font_size
      document.getElementById('code').style.fontSize = size + 'px';
    }
  },
  components: {
    HeaderComponent,
    ShareComponent,
    InfiniteScroll,
    ProgressComponent,
    BackTop,
    BackPrevious,
    AppButton
  },
  mounted() {
    var _this = this;
    _this.getCode();
    setTimeout(function () {
      _this.codeFont();
    }, 50);

    this.getGameInfo();
  }
}
</script>
