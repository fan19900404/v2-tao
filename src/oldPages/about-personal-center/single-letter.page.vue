<style scoped>
  .title {
    height:4rem;
    text-align:center;
    line-height:4rem;
    margin: 0 1.5rem;
    color:#111111;
    font-size:1.6rem;
  }
  .container {
    color:#8c8c8c;
    padding:0 1.5rem;
    font-size:1.4rem;
    line-height: 2rem;
    text-indent:2.3rem;
  }
</style>

<template>
	<app-header :title="title"></app-header>
  <!--消息标题-->
  <div class="title">{{lettertitle}}</div>
  <div class="container">
    {{{container}}}
  </div>
</template>

<script>
	import Vue from 'vue';
	import AppHeader from '../../oldComponents/common/header/app-header';
    export default{
    	components: {
    		AppHeader
    	},
    	data() {
    		return {
    			title:"系统消息",
    			lettertitle:"",
    			container:""
    		}
    	},
    	mounted() {
    		$("body").css({"background-color":"#ffffff"});
    		this.getsingle ();
    	},
    	methods: {
          //获取私信内容
          getsingle () {
    	    var query = {
    	      id:this.$route.params.id
    	    };
          Vue.OneMallHttp().GET(query,Vue.OneMallUrl.personal_single_letter).then((data)=>{
            if(data.code===10000){
              this.container = data.result.container;
              this.lettertitle = data.result.lettertitle;
            }else {
              console.log(data.msg);
            }
          })
    	  }
    	}
    }
</script>
