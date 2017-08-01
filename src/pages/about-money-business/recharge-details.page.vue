<style lang="scss" scoped>
  [v-cloak] {
    display: none;
  }
  .top_wrapper {
    background-color:#ff4a4a;
    overflow: hidden;
    position: relative;
    padding-top: .5rem;
    padding-bottom: 4rem;
  }

  .top_left {
    float: left;
    text-align: center;
    width: 50%;
    border-right:1px solid #ff9292;
    box-sizing: border-box;
  }

  .top_right {
    width: 50%;
    float: right;
    text-align: center;
  }

  .btn_topup {
    display: block;
    font-size: 1.6rem;
    background-color:#ff4a4a;
    color: #FFFFFF;
    border: .3rem solid #FFFFFF;
    margin: -7% auto 0 auto;
    width: 62%;
    text-align: center;
    height: 4.2rem;
    line-height: 4.2rem;
    border-radius: 2.3rem;
    position: relative;
    z-index: 2;
  }

  .top_wrapper .val {
    font-size: 2rem;
    color: #FFFFFF;
    position: relative;
    line-height: 1.2;
    padding-right: 1.6rem;
    background-repeat:no-repeat;
    background-size:1.4rem;
    background-position:right .4rem;
  }
  .top_left .val{
    background-image:url('/static/images/personal/gold2.png');
  }
  .top_right .val{
    background-image:url('/static/images/personal/gold1.png');
  }

  .help_link{
    font-family: icons;
    color: #FFFFFF;
    font-size: 2rem;
    margin-left: .2rem;
    position: relative;
    top: .2rem
  }
  .help_link:after{
    content: "\e8fd";
  }
  .val_explain{
    color: #fffffe;
    padding: 0 .5rem;
  }
  .structure_wrapper{
    background-color:#FFFFFF;
    overflow: hidden;
    margin-top: 1.4rem;
  }
  .banner_title{
    width: 50%;
    float: left;
    border-top: 1px solid #dfdfdf;
    box-sizing:border-box;
    height: 4rem;
    line-height: 4rem;
    font-size: 1.4rem;
    text-align: center;
    border-bottom: 1px solid #dfdfdf;
  }
  .banner_title.active{
    border-bottom:2px solid #ff4a4a;
    color:#ff4a4a;
  }

  .empty_wrapper{
    position: relative;
  }
  .empty_wrapper img{
    width: 72%;
    display: block;
    margin: 4rem auto;
  }
  .empty_wrapper p{
    position: absolute;
    color: #898989;
    font-size: 1.2rem;
    text-align: center;
    bottom: 1rem;
    margin: 0 auto;
    left: 0;
    right: 0;
  }
  .first {
    height: 2rem;
    background: #f8f8f8;
    line-height: 2rem;
    padding-left: 1rem;
    color: #666666;
    padding-bottom: .5rem;
  }
  .container {
    border-bottom:1px solid #dfdfdf;
    background-color: #FFFFFF;
  }
  .center {
    margin: 0 1rem;
  }
  .top {
    height: 3rem;
    display: flex;
    justify-content: space-between;
  }
  .bottom {
    height: 1.6rem;
    display: flex;
    justify-content: space-between;
  }
  .top_top {
    line-height: 3rem;
    font-size: 1.6rem;
  }
  .top_bot {
    line-height: 4.5rem;
    color: #ff4a4a;
  }
  .bottom_top {
    color: #898989;
  }
</style>
<template>
  <header-component :title="title"></header-component>
  <div class="top_wrapper">
    <div class="top_left">
      <span class="val" v-cloak>{{user.taoBi | moneyWidthComma}}</span>
      <a v-link="'/recharge/explain'" class="help_link"></a>
      <p class="val_explain">我的淘币(1RMB=1淘币)</p>
    </div>
    <div class="top_right">
      <span class="val" v-cloak>{{user.taoDou | moneyWidthComma}}</span>
      <a v-link="'/welfare/taodou-explain'" class="help_link"></a>
      <p class="val_explain">我的淘豆</p>
    </div>
  </div>
  <a href="" class="btn_topup" v-link = "'/personal/recharge'">充值</a>
  <!--有充值明细-->
  <section v-show="detailList.length>0">
    <p class="first">淘币充值明细</p>
    <div class="container" v-for = "item in detailList">
        <div class="center">
          <p class="top">
            <span class="top_top">{{item.logTypeName}}￥{{item.money}}</span>
            <span class="top_bot">+ {{item.money | moneyWidthComma}}淘币</span>
          </p>
          <p class="bottom">
            <span class="bottom_top">{{getFormatterDate(item.cDate)}}</span>
          </p>
        </div>
    </div>
  </section>
  <!--没有充值明细-->
  <div class="empty_wrapper" v-show="detailList.length==0">
    <img src="/static/images/tao-you/personal-center/withourecord.png">
    <p>您还没有充值记录哦！</p>
  </div>

  <!-- 返回按钮 -->
  <go-back></go-back>
</template>
<script>
  import HeaderComponent from '../../components/common/header/app-header';
  import GoBack from '../../components/feature/common/goback.component';
  export default {
    data(){
      return {
        user:{
          taoBi:null,
          taoDou:null
        },
        title: '充值明细',
        detailList:[],
        page: 1,
        loadAll: false
        }
    },
    components: {
      HeaderComponent,
      GoBack
    },
    methods: {
      getRechargeList () {
        var _this = this;
        mallUtils.funs.unscroll(_this.bindScrollEvent);
        if (!_this.loadAll) {
          Vue.OneMallHttp(this).GET({
            page: _this.page,
            moneyType:1,
            type:1
          }, Vue.OneMallUrl.personal_recharge_details).then(function(data) {
            if (data.code == 10000) {
              if (_this.page == 1) {
                _this.detailList = data.result;
              } else {
                _this.detailList = _this.detailList.concat(data.result);
              }
              _this.loadAll = (data.isLast == 1);
              _this.page++;
              mallUtils.funs.scroll(_this.bindScrollEvent);
            }
          })
        }
      },
      bindScrollEvent() {
        if (mallUtils.screen.height + document.body.scrollTop + 50 >= document.body.offsetHeight) {
          this.getRechargeList();
        }
      },
      getUserInfo:function() {
        Vue.ClientHttp(this).GET('', Vue.ClientUrl.user_info).then(res=>{
          if(10000 !== res.code) {
            return;
          }
          this.user=res.result
        })
      },
      //转换时间
      getFormatterDate(date) {
        return mallUtils.date.format(date * 1000, 'yyyy-MM-dd hh:mm')
      }
    },
    ready:function(){
      $("body").css({"background-color":"#f5f5f5"});
      this.getUserInfo();
      mallUtils.funs.scroll(this.bindScrollEvent);
      this.getRechargeList();
    },
    destroyed() {
      mallUtils.funs.unscroll(this.bindScrollEvent);
    }
  }
</script>
