<style scoped>
  .logo {
    height:8rem;
    margin:0 1.5rem;
    display:flex;
    align-items:center;
    .logo-top,.logo-cen,.logo-bottom{
      height:100%;
    }
  }
  .logo-top{
    width:4rem;
    height:4rem;
    background-color:#ff4a4a;
    border-radius:100%;
  }
  .logo-top .myimg {
      width:4rem;
      height:4rem;
      border-radius:100%;
  }
  .logo-cen {
    flex:1;
    span {
      color:#fff;
      font-size:1.4rem;
      height:2rem;
      line-height:2rem;
    }
  }
  .logo-bottom{
    width:4.2rem;
    height:2.1rem;
    font-size:1.4rem;
    line-height:2.1rem;
    background:yellow;
    text-align:center;
    border-radius:.5rem;
    color:#ff4a4a;
  }
  .outlogo {
    background-color:#ff4a4a;
  }
  .first {
    color:#fff;
    font-size:1.4rem;
    height:2rem;
    line-height:2rem;
    padding-left:1rem;
  }
  .myspan {
    color:#fff;
    font-size:1.4rem;
    height:2rem;
    line-height:2rem;
  }
  .spec {
    padding-left:1rem;
  }
   .myspan  i {
    color:#ffff00;
   }
    .border {
      width:100%;
      height:1rem;
      border:none;
      border-top:1px solid #dfdfdf;
      border-bottom:1px solid #dfdfdf;
    }
    .noborder {
      border-top:none;
    }
    .container {
      background:#fff;
    }
    .container-left {
      margin-left:1.5rem;
      border-bottom:.1rem solid #f6f6f6;
      border-size:border-box;
    }
    .container-right {
      height:4rem;
      margin-right:1.5rem;
      display:flex;
      align-items:center;
      justify-content:space-between;
    }
    .spanspec {
      margin-left:1rem;
      font-size:1.4rem;
    }
    .span-first,.span-second {
       font-size:1.4rem;
       color: #00aaee;
    }
    .span-second {
      color:#ccc;
    }
    .spe1 {
      color:#70c7b6;
    }
    .spe2 {
      color:#ee4432;
    }
    .spe3 {
      color:#fc992c;
    }
    .spe4 {
      color:#d6d6d6;
    }
    .add {
     display:flex;
     align-items:center;
    }
    .add .add-left {
      background-color:#ff4a4a;
      border-radius:100%;
      display:inline-block;
      width:1.7rem;
      height:1.7rem;
      color:#fff;
      text-align:center;
      line-height:1.7rem;
    }
    [v-cloak] {
      display: none;
    }
</style>

<template>
    <!--d头部信息栏-->
	  <app-header :title="title" :type="type" :personal="1"></app-header>
    <div class="outlogo">
      <div class="logo">
        <div class="logo-top" v-link="'/personal/userinfo'"><img class="myimg" :src="userInfo.avatar"></div>
        <div class="logo-cen" v-cloak>
          <p class="first">{{userInfo.username}}</p>
          <span class="myspan spec">淘豆<i>:{{userInfo.taoDou | moneyWidthComma}}</i> </span><span class="myspan">淘币<i>:{{userInfo.taoBi | moneyWidthComma}}</i></span>
        </div>
        <div class="logo-bottom" v-link = "'/personal/recharge'">充值</div>
      </div>
    </div>
    <div class="border"></div>
    <app-navbar></app-navbar>
    <div class="border noborder"></div>

    <div class="container">
      <div class="container-left" v-link = "'/personal/recharge-details'" >
          <div class="container-right">
            <p><span class="span-first icon-h1"></span><span class="spanspec">充值明细</span> </p>
            <span class="span-second  icon-guide"></span>
          </div>
      </div>
    </div>
  <div class="container">
    <div class="container-left" v-link = "{name:'TaoYouPersonalCenterExpenseStructure'}">
      <div class="container-right">
        <p><span class="span-first icon-h2"></span><span class="spanspec">消费明细</span> </p>
        <span class="span-second  icon-guide"></span>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="container-left" style="border-bottom:none;"  v-link="{name: 'shaidanshare-user',params:{id:userInfo.userId } }">
      <div class="container-right">
        <p><span class="span-first icon-h3 spe2"></span><span class="spanspec">晒单记录</span> </p>
        <span class="span-second  icon-guide"></span>
      </div>
    </div>
  </div>
  <div class="border noborder" style="border-top:1px solid #dfdfdf;"></div>
  <div class="container">
    <div class="container-left" v-link="'/welfare/my-coupon-list'">
      <div class="container-right">
        <p><span class="span-first icon-h4 spe3"></span><span class="spanspec">夺宝券</span> </p>
        <span class="span-second  icon-guide"></span>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="container-left" v-link = "'/help'">
      <div class="container-right">
        <p><span class="span-first icon-h5"></span><span class="spanspec">常见问题</span> </p>
        <span class="span-second  icon-guide"></span>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="container-left" v-link="'/personal/private-letter'">
      <div class="container-right">
        <p><span class="span-first icon-h6 spe1"></span><span class="spanspec">私信联系</span> </p>
        <p class="add"><span class="add-left" v-show = "ismessage" >{{num}}</span><span class="span-second  icon-guide"></span></p>
      </div>
    </div>
  </div>
  <div class="container">
  <div class="container-left" v-link="'/personal/service'">
    <div class="container-right">
      <p><span class="span-first icon-h7"></span><span class="spanspec">客服咨询</span> </p>
      <span class="span-second  icon-guide"></span>
    </div>
  </div>
</div>  <div class="container">
  <div class="container-left" v-link = "'/xieyi'">
    <div class="container-right">
      <p><span class="span-first icon-h8 spe3"></span><span class="spanspec">用户协议</span> </p>
      <span class="span-second icon-guide"></span>
    </div>
  </div>
</div>
  <div class="container">
    <div class="container-left" v-link="'/personal/userinfo'" style="border-bottom:none;">
      <div class="container-right">
        <p><span class="span-first icon-h9 spe4"></span><span class="spanspec">夺宝设置</span> </p>
        <span class="span-second  icon-guide"></span>
      </div>
    </div>
  </div>
  <div class="border noborder" style="border-top:1px solid #dfdfdf;"></div>
    <!-- 底部菜单兰 -->
    <app-bottom-bar></app-bottom-bar>
</template>

<script>
	import Vue from 'vue';
	import AppHeader from '../../oldComponents/common/header/app-header';
  import AppBottomBar from '../../oldComponents/common/footer/app-bottom-bar';
  import AppNavbar from '../../oldComponents/feature/about-home/app-personal-navbar';
    export default{
    	components: {
    		AppHeader,
        AppBottomBar,
        AppNavbar
    	},
    	data() {
    		return {
    			title:"个人中心",
    			//获取个人信息
    			userInfo:{
    			 taoBi:null,
                 taoDou:null,
                 username:null
    			},
    			//是否有私信
    			ismessage:false,
    			//私信条数
    			num:null
    		}
    	},
    	methods:{
        getUserInfo() {
          var query = {};
          Vue.OneMallHttp(this).GET(query,Vue.OneMallUrl.personal_userinfo).then((data)=>{
            if(data.code===10000){
              this.userInfo = data.result;
              console.log(this.userInfo);
            }else {
              console.log(data.msg);
            }
          })
        },
        //获取私信列表
    	  getprivate () {
    	    var query = {};
          Vue.OneMallHttp(this).POST(query,Vue.OneMallUrl.personal_private_letter).then((data)=>{
            if(data.code===10000){
              if(data.notRead>0){
                this.num = data.notRead;
                this.ismessage = true;
                }
            }else {
              console.log(data.msg);
            }
          })
    	  }
    	},
    	mounted() {
    		$("body").css({"background-color":"#f8f8f8"});
        this.getUserInfo();
        this.getprivate ();
    	}
    }
</script>
