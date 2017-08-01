<template>
  <div class="img hack"><img src="/static/images/activity/lantern/lantern1.jpg"></div>
  <!--规则-->
  <div class="img spec hack topheight">
    <img src="/static/images/activity/lantern/lantern2.jpg" style="height:100%">
    <div class="content">
      <span class="span">活动规则</span>
      <ul class="ul-con">
        <li><span class="li-span">1</span><span class="span-con">需要领取资格才可获得返利。</span></li>
        <li><span class="li-span">2</span><span class="span-con">返利奖励将以淘币的形式直接派发到你的账号中，即时生效。</span></li>
        <li><span class="li-span">3</span><span class="span-con">活动期间，购买以下商品的获得用户，即可返还当前消费金额,返还金额有红包上限。（红包上限详见下表）</span></li>
        <li><span class="li-span">4</span><span class="span-con">淘游夺宝有权扣除作弊用户通过非正常手段获得的返利。</span></li>
        <li><span class="li-span">5</span><span class="span-con">活动充值的淘币将无法进行提现。</span></li>
        <li><span class="li-span">6</span><span class="span-con">如有疑问，请联系客服咨询，本活动最终解释权归淘游夺宝所有。</span></li>
        <li class="button-bg" @click= "Alert"></li>
      </ul>
    </div>
  </div>
  <!--中间部分-->
  <!--bottom部分-->

  <!-- 列表 -->
  <div class="red-packet-list">
    <div :style="headerStyle" class="red-packet-list-header"></div>
    <div v-for="l in redPacketList"
         :class="{
          'red-packet-list-body-odd': ($index % 2 === 1) && ($index !== redPacketList.length-1),
          'red-packet-list-body-even': ($index % 2 !== 1) && ($index !== redPacketList.length-1),
          'red-packet-list-footer-odd': ($index % 2 === 1) && ($index === redPacketList.length-1),
          'red-packet-list-footer-even': ($index % 2 !== 1) && ($index === redPacketList.length-1)
         }"
         :style="bodyStyle" class="red-packet-list-body red-flex"><span>{{l.goodsName}}</span><span>{{l.maxMoney}}</span></div>
  </div>
  <!-- 列表 -->


  <div class="img spec" :style = "style">
    <img src="/static/images/activity/lantern/lantern4.jpg" style="height: 100%;vertical-align:bottom;display:block;">
    <div class="container" :style = "styleheight">
      <div class="center" v-for = "item in list.slice(1)" :style = "styleObject">
        <img :src="item.image">
        <p>{{item.goodsName}}</p>
        <a class="mall" v-link = {name:'goods-detail',params:{id:item.number}}>购买</a>
      </div>
    </div>
  </div>
  <!--弹窗-->
  <alert :show-alert="show" :type="type" :alert-status = "text"></alert>
  <!-- 返回首页 -->
  <go-back :path="'/?mID=' + mID"></go-back>
</template>

<script>
  'use strict';
  import Alert from '../../../components/common-alert/common-alert.component';
  import GoBack from '../../../components/feature/common/goback.component';
  export default {
    components: {
      Alert,
      GoBack
    },
    data() {
      return {
        mID: this.$route.query.mID || 8,
        //弹窗
        show:false,
        //弹窗内容
        text:"",
        type:0,
        // 红包列表的条数
        redPacketList: [1,2,3,4,5,6],
        // 设备的宽度
        clientWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        //商品信息
        count:0,//商品条数
        list:{},
        //当前屏幕宽度
        w:document.body.clientWidth,
        //ul的高度
        uh:0,
        dw:0,
        dh:0,
        //当前div的高度
        rh:0,
        //当前top值
        rt:0,
        dt:0,
        //当前left值
        rl:0,
        dl:0,
        //高度百分比
        hrate:0,
        dwrate:0,
        dhrate:0,
        //top百分比
        trate:0,
        dtrate:0,
        //left百分比
        lrate:0,
        dlrate:0,
        //ul高度百分比
        urate:0,
        //商品的高
        mh:0,
        //商品的宽
        mw:0,
        //商品高百分比
        mhrate:0,
        //商品宽百分比
        mwrate:0
      }
    },
    computed:{
      rh () {
        return this.w*this.hrate;
      },
      rt () {
        return this.w*this.trate;
      },
      rl () {
        return this.w*this.lrate;
      },
      uh () {
        return this.w*this.urate;
      },
      dw () {
        return this.w*this.dwrate;
      },
      dh () {
        //return this.w*this.dhrate;
        return this.count*this.mh;
      },
      dt () {
        return this.w*this.dtrate;
      },
      dl () {
        return this.w*this.dlrate;
      },
      mh () {
        return this.w*this.mhrate;
      },
      mw () {
        return this.w*this.mwrate;
      },
      styleObject () {
        return  {
          width:this.mw + 'px',
          height:this.mh + 'px'
        }
      },
      style () {
        return  {
          height:this.dh + (this.dw-this.mw*2)*(this.count - 1) + this.dt*2 + 'px'
        }
      },
      styleheight () {
       return  {
          height:this.dh + (this.dw-this.mw*2)*(this.count - 1) + 'px'
        }
      },
      // 红包列表的高度计算
      headerStyle() {
        return {
          height: this.clientWidth / 720 * 105 + 'px'
        }
      },
      bodyStyle() {
        return {
          height: this.clientWidth / 720 * 60 + 'px'
        }
      }
    },
    mounted() {
       $('body').css('background-color', '#ce0404');
       this.rate();
       //$('.content').height(this.rh).css({
            //top:this.rt,
            //left:this.rl
       //});
       //$('.ul-con').height(this.uh);
       var contentheight = $('.content').height();
            $('.topheight').height(contentheight + 75);

       //商品部分
       $('.container').width(this.dw).height(this.dh).css({
          top:this.dt,
          left:this.dl
       });
       this.getmall();
       console.log(this.mh)
       console.log(this.dh)
    },
    methods: {
      //计算数值百分比
      rate (){
        this.hrate = 200/320;
        this.trate = 55/320;
        this.lrate = 32/320;
        this.urate = 180/320;
        this.dwrate = 293/320;
        this.dhrate = 320/320;
        this.dtrate = 60/320;
        this.dlrate = 13.5/320;
        this.mhrate = 156/320;
        this.mwrate = 141.5/320;
      },
      //获取活动商品
      getmall (){
         var query = {
          pageIndex:0,
          pageSize:4,
          actID:15,
          nologin:1
         };
         Vue.OneMallHttp(this).GET(query, Vue.OneMallUrl.get_money_top)
         .then((res)=>{
            if(res.code===10000){
              this.list = res.result;
              this.redPacketList = res.result;
              this.redPacketList.splice(0, 0, {
                 goodsName:"商品名称",
                 maxMoney: "红包上限"
               });
              this.count =  Math.floor((res.result.length)/2);
              //console.log(this.count)
            }
         })
      },
      //弹窗
      Alert () {
        var query = {};
        Vue.OneMallHttp(this).GET(query, Vue.OneMallUrl.get_quota)
        .then((res)=> {
            if(res.code===10000){
              this.show = true;
              this.text = res.msg
            }else {
              this.show = true;
              this.text = res.msg
            }
        })
      }
    }
  }
</script>

<style scoped>
  .img {
    font-size:0;
  }
  .hack img {
    vertical-align:bottom;
    display:block;
  }
  .spec {
    position: relative;
        }
  .content {
    width:80%;
    font-size: 12px;
    position: absolute;
    top: 55px;;
    left: 32px;
        }
  .span {
    display: block;
    width: 5.5rem;
    height:1.5rem;
    line-height:1.5rem;
    text-align: center;
    border-radius: 10px;
    border: 1px solid red;
    color: #fded00;
    background:#e11200;
    font-size:1.2rem;
    margin:1rem 0 .5rem 0;
        }
  .li-span {
    display:inline-block;
    background:#e11200;
    color: #fded00;
    line-height:1.6rem;
    height:1.6rem;
    padding: 0 .55rem;
    border-radius:100%;
  }
  .span-con {
    color: #fded00;
    font-size:1.2rem;
    line-height:1.6rem;
    margin-left:.5rem;
  }
  .ul-con {
    display:flex;
    flex-flow:column;
    justify-content: space-around;
  }
  .ul-con li {
    display:flex;
    margin:.1rem 0;
  }
  .container {
    width:293px;
    height: 320px;
    font-size: 12px;
    position: absolute;
    top: 47px;
    left: 13.5px;
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
  }
  .center {
    background:white;
    height:13rem;
    width:11.8rem;
    border-radius:.5rem;
  }
  .center img {
    width:66.14%;
    height:48.6%;
    margin:7.6% 0;
  }
  .mall {
    display:block;
    width:8rem;
    height:2.3rem;
    background:red url('/static/images/activity/lantern/bg.jpg');
    background-size:normal;
    margin:0 auto;
    text-align:center;
    line-height:2.3rem;
    border-radius:15px;
    margin-top:.8rem;
    margin-bottom:.1rem;
    color:#fff;
  }
  .ul-con .button-bg {
    height:3.3rem;
    width:18.1rem;
    background:url("/static/images/activity/lantern/button_03.jpg") no-repeat center;
    background-size:cover;
    margin: 1rem auto;
  }

  /* 红包列表 */
  .red-packet-list {
    margin: 1rem 0;
  }
  .red-packet-list-header {
    background-image: url('/static/images/activity/lantern/bg-list-header.jpg');
    background-position: center;
    background-size: 100% 100%;
  }
  .red-packet-list-body-even {
    background-image: url('/static/images/activity/lantern/top2.jpg');
    background-position: center;
    background-size: 100% 100%;
  }
  .red-packet-list-body-odd {
    background-image: url('/static/images/activity/lantern/top1.jpg');
    background-position: center;
    background-size: 100% 100%;
  }
  .red-packet-list-footer-even {
    background-image: url('/static/images/activity/lantern/footer2.jpg');
    background-position: center;
    background-size: 100% 100%;
  }
  .red-packet-list-footer-odd {
    background-image: url('/static/images/activity/lantern/footer1.jpg');
    background-position: center;
    background-size: 100% 100%;
  }
  .red-flex {
    display:flex;
    align-items:center;
  }
  .red-flex span {
    flex:1;
    text-align:center;
    color:#feffa0;
  }
   .red-flex:nth-child(2) span {
     color: #fded00;
   }
</style>
