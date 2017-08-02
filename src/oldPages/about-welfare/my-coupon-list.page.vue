<template>
  <app-header :title="title"></app-header>

  <section class="count-box flex-ld">
    <span>我的淘豆:<em class="count">{{taodou | moneyWidthComma}}</em></span>
    <a v-link="{'name': '/welfare/taodou-explain'}" class="use_explain">如何获得</a>
  </section>

  <!-- 填充 -->
  <section v-if="!showHeader" class="tab bg-fff flex"></section>
  <!-- 填充 -->

  <!-- 标签页-头 -->
  <section id="J_top_fixed" class="tab bg-fff flex" :class="{'header-active': !showHeader}">
    <a class="tab-a flex-1" :class="{'active': tabIndex == 0}"  @click="tabChange(0)">我的夺宝券</a>
    <a class="tab-a flex-1" :class="{'active': tabIndex == 1}"  @click="tabChange(1)">兌换夺宝券</a>
  </section>

  <!-- 标签页-内容 -->
  <section class="record-box dbq-box" v-show="tabIndex == 0">

    <!-- 我的夺宝券 -->
    <template v-if="recordListMy.length > 0">
      <ul >
        <li v-for="ticket in recordListMy">
          <div v-if="ticket.status==0" class="ticket_unused ticket">
            <p class="ticket_value">{{ticket.prize}}</p>
            <p class="ticket_title">{{ticket.name}}</p>
            <p class="ticket_reqire">{{ticket.remark}}</p>
            <p class="ticket_date">有效期至{{ticket.endTime | formatDate 'YYYY-MM-DD HH:mm'}}</p>
            <p class="ticket_remark">可使用</p>
            <img class="ticket_bg" src="/oldStatic/images/tao-you/personal-center/unuse-bg.png">
          </div>
          <div v-else class="ticket_used ticket">
            <p class="ticket_value">{{ticket.prize}}</p>
            <p class="ticket_title">{{ticket.name}}</p>
            <p class="ticket_reqire">{{ticket.remark}}</p>
            <p class="ticket_date">有效期至{{ticket.endTime}}</p>
            <p class="ticket_remark">已过期</p>
            <img class="ticket_bg" src="/oldStatic/images/tao-you/personal-center/use-bg.png">
          </div>
        </li>
      </ul>
    </template>
    <template v-else>
      <div v-else class="no-record type2">
        当前没有可用夺宝券！
        <div class="qu" v-link = {name:"home"}>立即夺宝</div>
      </div>
    </template>
  </section>

  <!-- 兌换夺宝券 -->
  <section class="record-box dbq-box" v-show="tabIndex == 1">

    <template v-if="recordListAll.length > 0">
      <ul>
        <li v-for="ticket in recordListAll" class="ticket_unused ticket">
          <a class="ticket_exchange" @click="exchange(ticket)">兑换</a>
          <p class="ticket_title">{{ticket.name}}</p>
          <p class="ticket_reqire">{{ticket.remark}}</p>
          <p class="ticket_date">有效期至<span>{{ticket.endTime | formatDate 'YYYY-MM-DD HH:MM'}}</span></p>
          <p class="ticket_remark">需要<span>{{ticket.prize | moneyWidthComma}}淘豆</span></p>
          <p class="ticket_remark2">剩余{{ticket.last}}张</p>
          <img class="ticket_bg" src="/oldStatic/images/tao-you/personal-center/unuse-bg.png">
        </li>
      </ul>
    </template>
    <template v-else>
      <img class="norebate_img" src="/oldStatic/images/norebate.png">
      <p class="norebate_p">当前没有可兑换抵用券！</p>
    </template>
  </section>
  <!-- 返回按钮 -->
  <go-back></go-back>
</template>

<script>
  import Vue from 'vue';
  import AppHeader from '../../oldComponents/common/header/app-header';
  import GoBack from '../../oldComponents/feature/common/goback.component';
    export default{
      components: {
        AppHeader,
        GoBack
      },
      data() {
        return {
          title:"我的夺宝券",
          taodou:0,
          tabIndex: 0,

          type: 'My',

          // 我的夺宝券
          urlMy: Vue.OneMallUrl.personal_userticket_ticketlist,
          pageMy:1,
          limitMy: 6,
          initMy: false,
          recordListMy:[],
          recordMyLoaded:false,

          // 兌换夺宝券
          urlAll: Vue.OneMallUrl.ticket_list,
          pageAll: 1,
          limitAll: 6,
          initAll: false,
          recordListAll:[],
          recordAllLoaded:false,

          waypoint:null,
          showHeader:true
        }
      },
      mounted() {
        $("body").css({"background-color":"#f8f8f8"});

        //绑定滚动
        mallUtils.funs.scroll(this.bindScrollEvent);

        this.getTaoDou();
        this.initList('My');

        //选项卡地方滚动到头部固定
        var that = this;
        setTimeout(function(){
          that.waypoint = new Waypoint({
            element: document.getElementById('J_top_fixed'),
            handler:function(direction){
              if('down' === direction) {
                that.showHeader = false;
              }
              else if('up' === direction) {
                that.showHeader = true;
              }
            }
          })
        }, 800);
      },
     destroyed() {
      mallUtils.funs.unscroll(this.bindScrollEvent);
    },
      methods: {
        getTaoDou() {
          Vue.OneMallHttp(this).GET({}, Vue.OneMallUrl.personal_user_money_index).then((data)=> {
            if (data.code == 10000) {
              this.taodou = data.info.taoDou;
            }
          })
      },

      // 切换标签页
      tabChange(i){
        this.tabIndex = i;
        this.type = (i==1) ? 'All' : 'My';
        if (!this['init' + this.type]) {
          this.initList(this.type);
        }
      },

      // 初始化数据列表
      initList(type){
        this.getRecordList(type);
      },

      // 获取数据列表
      getRecordList(type) {
        if(this[`record${type}Loaded`]){
          return;
        }
        mallUtils.funs.unscroll(this.bindScrollEvent);

        var that = this;
        var prama = {
          page: this[`page${type}`],
          limit: this[`limit${type}`]
        };
        if (type == 'All') {
          let platFrom = 0;
          Object.assign(prama, {
            platFrom
          });
        }
        Vue.OneMallHttp(this).GET(prama, that[`url${type}`]).then((data) => {
          if (data.code == 10000) {
            if(!that[`init${type}`]){
              that[`init${type}`] = true;
            }
            var list = (type=='My')?data.list:data.result;
            that[`recordList${type}`] = that[`recordList${type}`].concat(list);
            that[`record${type}Loaded`] = (list.length < this[`limit${type}`]);
            that[`page${type}`]++;
            mallUtils.funs.scroll(that.bindScrollEvent);
          }
        });
      },

      // 绑定上拉滚动加载更多数据
      bindScrollEvent(){
        if(mallUtils.screen.height + document.body.scrollTop + 50 >= document.body.offsetHeight){
          this.getRecordList(this.type);
        }
      },

      //兑换优惠券
      exchange(item) {
        var prize = parseFloat(item.prize);
        var last = parseInt(item.last);
        if(last <= 0){
          mallUtils.layer.alert('兑换失败<br />夺宝券库存不足');
          return;
        }
        if(this.taodou < prize){
          mallUtils.layer.alert('兑换失败<br />账户淘豆数量不足');
          return;
        }
        var that = this;
        Vue.OneMallHttp(this).GET({
          tID: item.id
        }, Vue.OneMallUrl.do_exchange).then((data)=>{
          if (data.code == 10000) {
            this.taodou -= parseFloat(item.prize);
            layer.open({
              skin: 'confirm',
              content: '兑换成功!',
              btn: ['继续兑换', '立即查看'],
              yes: function() {
                layer.closeAll();
              },
              no: function() {
                that.tabIndex = 0;
                that.type = 'My';
                that.pageMy=1;
                that.initMy= false;
                that.recordListMy=[];
                that.recordMyLoaded=false;

                // 直接重新刷新
                that.getRecordList(that.type);
                // that[`recordListMy`].splice(0, 0, {
                //   name: item.name,
                //   prize: item.reduceMoney,
                //   remark: item.remark,
                //   endTime: item.endTime,
                //   status: '0'
                // });
              }
            });
          } else {
            mallUtils.layer.alert('兑换失败<br />' + data.msg);
          }
        })
      }
    }
  }
</script>

<style scoped>
  body {
    background-color: #f5f5f9;
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
  .count-box .sy-tips {
    font-size: 1.2rem;
  }
  .header-active {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    border-bottom: 1px solid #dfdfdf;
  }
  .tab {
    line-height: 5.0rem;
    height: 4.4rem;
  }
  .tab > a {
    color: #000;
    font-size: 1.6rem;
    line-height: 4.4rem;
    text-align: center;
    text-decoration: none;
    position: relative;
    border-bottom: solid #e5e5e5 1px;
  }
  .tab > a.active {
    color: #ff4a4a;
    border-bottom: solid #ff4a4a 2px;
  }
  .tab > a.active .arrow-drop {
    color: #ff4a4a;
  }
  .select-section {
    height: 3.5rem;
    text-align: center;
    box-sizing: border-box;
    background-color: #fff;
  }
  .record-box {
    padding-top: 1.2rem;
  }
  .record-box .no-record {
    height: 7rem;
    text-align: center;
    font-size: 1.3rem;
    color: #898989;
    background: url(/oldStatic/images/no_dbq_bg2.png) no-repeat top center;
    padding-top: 20rem;
  }
  .record-box .no-record.type2 {
    background: url(/oldStatic/images/no_dbq_bg2.png) no-repeat top center;
    background-size: cover;
  }
  .record-box .type1 {
    background: url(/oldStatic/images/norecord_bg.png) no-repeat top center;
    background-size: cover;
  }
  .top_banner {
    overflow: hidden;
    background-color: #ff4a4a;
    height: 5.4rem;
    line-height: 5.4rem
  }
  .taodouname {
    color: #ffffff;
    margin-left: 1.6rem;
    float: left;
    font-size: 1.6rem;
  }
  .taodouval {
    font-size: 1.6rem;
    float: left;
    color: #ffff00;
  }
  .exchange_link {
    float: right;
    margin: 1.4rem 1.6rem;
    background-color: #ffff00;
    color: #ff4a4a;
    font-size: 1.4rem;
    height: 2.5rem;
    line-height: 2.5rem;
    display: block;
    width: 8.4rem;
    text-align: center;
    border-radius: 0.4rem;
    font-size: 1.3rem;
  }
  .use_explain {
    margin: 1.4rem 0 1.4rem 1.4rem;
    font-size: 1.3rem;
    color: #fff;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .use_explain:before {
    content: '\1f33e';
    font-size: 1.2rem;
    font-family: icons !important;
    margin-right: .3rem;
  }
  .norebate_img {
    width: 13rem;
    margin: 6rem auto 1.6rem auto;
    display: block;
  }
  .norebate_p {
    color: #a5a5a5;
    font-size: 1.6rem;
    text-align: center;
    margin-top: 0.8rem;
  }
  .exchange_a {
    color: #fff;
    font-size: .2rem;
    background-color: #ff4a4a;
    display: block;
    width: 2.9rem;
    height: .43rem;
    line-height: .43rem;
    margin: .36rem auto;
    text-align: center;
    border-radius: .05rem;
  }
  .ticket {
    height: 12.2rem;
    margin: 0 1.5rem 1.4rem 1.5rem;
    position: relative;
    background-size: 100% 100%;
    overflow: hidden;
  }
  .ticket_used {
    background-image: url('/oldStatic/images/tao-you/personal-center/ticket-used.png');
  }
  .ticket_unused {
    background-image: url('/oldStatic/images/tao-you/personal-center/ticket-unuse2.png');
  }
  .ticket_value {
    font-size: 2.4rem;
    position: absolute;
    right: 1.8rem;
    top: 1.35rem;
    z-index: 1;
  }
  .ticket_unused .ticket_value {
    color: #f4333c;
  }
  .ticket_used .ticket_value {
    color: #cccccc;
  }
  .ticket_unused .ticket_value:before {
    content: "\A5";
    font-size: .7rem;
    margin-right: .4rem;
  }
  .ticket_used .ticket_value:before {
    color: #cccccc;
    content: "\A5";
    font-size: .7rem;
    margin-right: .4rem;
  }
  .ticket_title {
    margin: 1.8rem 0 .6rem 2.3rem;
    font-size: 1.6rem;
    line-height: 1.2;
  }
  .ticket_unused .ticket_title {
    color: #000000;
  }
  .ticket_used .ticket_title {
    color: #a5a5a5;
  }
  .ticket_reqire {
    color: #a5a5a5;
    margin-left: 2.3rem;
    line-height: 1.6;
    font-size: 1.2rem;
  }
  .ticket_date {
    color: #a5a5a5;
    line-height: 1.6;
    margin-left: 2.3rem;
    font-size: 1.2rem;
  }
  .ticket_remark {
    color: #a5a5a5;
    margin: 1.5rem 0 0 2.3rem;
    float: left;
    font-size: 1.2rem;
  }
  .ticket_bg {
    position: absolute;
    width: 7.5rem;
  }
  .ticket_unused .ticket_bg {
    top: 3.2rem;
    right: 2rem;
  }
  .ticket_used .ticket_bg {
    top: 2.6rem;
    right: 2rem;
  }
  .ticket_exchange {
    font-size: 1.2rem;
    position: absolute;
    right: 2rem;
    top: 2.4rem;
    color: #ff4a4a;
    border: 1px solid #ff4a4a;
    width: 4.3rem;
    height: 2.4rem;
    border-radius: .4rem;
    text-align: center;
    line-height: 2.4rem;
    z-index: 2;
  }
  .ticket_remark2 {
    color: #a5a5a5;
    margin: 1.5rem 2.3rem 0 0;
    float: right;
    font-size: 1.2rem;
  }
  .qu {
    width: 15rem;
    height: 4rem;
    background: red;
    text-align: center;
    line-height: 4rem;
    color: #fff;
    font-size: 1.6rem;
    border-radius: .8rem;
    margin: 2rem auto;
  }
</style>
