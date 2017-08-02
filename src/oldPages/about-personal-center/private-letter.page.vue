<style scoped>
.no {
  width:100%;
  height:27rem;
  background:url("../../../oldStatic/images/personal/perbg.png") no-repeat center;
  position:absolute;
  top:50%;
  margin-top:-13rem;
  background-size:100% 68%;
}
.out {
   border-bottom:1px solid #dfdfdf;
}
.container {
  height:4.5rem;
  margin:0 1.5rem;
}
.top {
  font-size:1.4rem;
  padding:1rem 0 0 0;
}
.active {
  display:inline-block;
  width:.8rem;
  height:.8rem;
  border-radius:100%;
  background:red;
  margin-bottom: .4rem;
}
.bottom {
  color:#ababab;
  padding:.5rem 0 0 1.9rem;
}
.publishtime {
   color:#ababab;
   font-size:normal;
   float:right;
}
.center {
margin-left:.8rem;
display:inline-block;
width:90%;
}
.add {
  visibility:hidden;
}
.color {
  color:#ababab;
}
.left {
   float:left;
}
</style>

<template>
	<app-header :title="title"></app-header>
  <!--无系统消息-->
  <div  v-show = "letterlist.length<=0"  class="no"></div>
  <!--有系统消息-->
  <section v-show = "letterlist.length>0">
      <div class="out" v-for = "item in letterlist">
        <div class="container " :class = {"color":item.status!=0}   v-link = {name:"PersonalSingleLetter",params:{id:item.id}}>
          <p class="top">
            <span class="active"  :class = {"add":item.status!=0} ></span>
            <span class="center"><i class="left">系统消息</i><i class="publishtime">{{getFormatterDate(item.publishtime)}}</i> </span>
          </p>
          <p class="bottom">{{item.lettertitle}}</p>
        </div>
      </div>
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
    			title:"私信",
    			//系统消息列表
    			letterlist:[]
    		}
    	},
    	mounted() {
    		$("body").css({"background-color":"#ffffff"});
    		this.getprivate ();
    	},
    	methods: {
    	  //获取私信列表
    	  getprivate () {
    	    var query = {platForm: 0};
          Vue.OneMallHttp().POST(query,Vue.OneMallUrl.personal_private_letter).then((data)=>{
            if(data.code===10000){
              this.letterlist = data.list;
            }else {
              console.log(data.msg);
            }
          })
    	  },
    	//转换时间格式
      getFormatterDate(date) {
        return mallUtils.date.format(date * 1000, 'yyyy-MM-dd hh:mm')
         }
    	}
    }
</script>
