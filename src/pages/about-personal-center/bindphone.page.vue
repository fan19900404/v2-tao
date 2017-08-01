<style scoped>
	.ipt-box {
		margin: 1.2rem 0 2rem 0;
		padding-left: 1.6rem;
		background-color: #fff;
		border-top: 1px solid #dfdfdf;
		border-bottom: 1px solid #dfdfdf;
	}

	.ipt-box .ipt-list {
		width: 100%;
	}

	.ipt-box .ipt-list > li {
		height: 5rem;
		border-top: 1px solid #dfdfdf;
		padding-right: 1.6rem;
	}

	.ipt-box .ipt-list > li:first-child {
		border-top: 0;
	}

	.ipt-box .ipt-list > li .ipt {
		line-height: 1.8rem;
		font-size: 1.4rem;
		color: #000;
		border: 0;
		outline: none;
	}

	/* .ipt-box .ipt-list > li .ipt-phone:focus + .ipt-clear {
		display: block;
	} */

	.ipt-box .ipt-list > li .ipt-clear {
		display: none;
		width: 1.5rem;
		height: 1.4rem;
		color: #fff;
		font-size: 1.4rem;
		background-color: #bbbbbb;
		text-align: center;
		line-height: 1.5rem;
		border-radius: 50%;
	}

	.ipt-box .ipt-list > li .get-verifycode {
		display: block;
		width: 6.6rem;
		height: 2.6rem;
		line-height: 2.6rem;
		text-align: center;
		font-size: 1.1rem;
		color: #ff4a4a;
		border: 1px solid #ff4a4a;
		border-radius: 1.3rem;
	}

	.ipt-box .ipt-list > li .countdown {
		display: block;
		width: 6.6rem;
		height: 2.6rem;
		line-height: 2.6rem;
		text-align: center;
		font-size: 1.1rem;
		color: #999;
		border: 1px solid #999;
		border-radius: 1.3rem;
	}

	.btn-box {
		padding: 0 1.6rem;
		text-align: center;
	}

	.btn-box .sure-btn {
		display: block;
		width: 100%;
		height: 4.3rem;
		text-align: center;
		line-height: 4.3rem;
		font-size: 1.8rem;
		color: #fff;
		background-color: #ff4a4a;
		border-radius: .5rem;
	}
</style>

<template>
	<app-header :title="'绑定手机号'" :type="type"></app-header>
	<section class="ipt-box flex-ld">
		<ul class="ipt-list">
			<li class="flex-ld">
				<input class="ipt ipt-phone flex-1" placeholder="输入手机号码" v-model="iptPhone"></input>
				<span class="ipt-clear" @click="clearPhoneIpt()">×</span>
			</li>
			<li class="flex-ld">
				<input class="ipt ipt-verify" placeholder="输入短信验证码" v-model="iptVerifyCode"></input>
				<a class="get-verifycode" v-if="sendStatus == 0" @click="sendVerifyCode()">{{verifyText}}</a>
				<span class="countdown" v-else>{{sendSecond}}S</span>
			</li>
		</ul>
	</section>
	<section class="btn-box">
		<a class="sure-btn" @click="savePhone()">确定</a>
	</section>

  <!-- 底部菜单兰 -->
  <app-bottom-bar></app-bottom-bar>
</template>

<script>
  import Vue from 'vue';
  import AppHeader from '../../components/common/header/app-header';
  import AppBottomBar from '../../components/common/footer/app-bottom-bar';
	export default {
		components: {
      AppHeader,
      AppBottomBar
		},
		data() {
			return {
				verifyText:"获取验证码",
				sendStatus:0, //发送验证码的状态 0未发送 1已发送
				sendSecond:60, //发送成功后的倒计时秒数
				iptPhone:"",
				iptVerifyCode:""
			}
		},
		mounted() {
			$("body").css("background-color","#f8f8f8");
			this.iptPhoneFocus();
		},
		methods:{
			sendVerifyCode() {
				var _this = this;
				if(_this.iptPhone === ""){
					mallUtils.layer.alert("请填写手机号");
					return;
				}
        if (!/^1\d{10}$/.test(_this.iptPhone)) {
          mallUtils.layer.alert("请输入正确的手机号");
          return;
        }
				/*var url = '/api/personal/send_verifycode';*/
				Vue.OneMallHttp(this).GET({ phone : _this.iptPhone, type: 'bind'},Vue.OneMallUrl.personal_send_bind_phone_code).then(function(data){
					if(data.code == 10000){
						_this.sendStatus = 1;
						var t = setInterval(function(){
							if(_this.sendSecond == 0){
								console.log(true);
								_this.sendSecond = 60;
								_this.sendStatus = 0;
								_this.verifyText = "重新发送";
								clearInterval(t);
							}else{
								_this.sendSecond--;
							}
						},1000);
					}else{
						mallUtils.layer.alert(data.msg);
					}
				});
			},
			savePhone() {
				var _this = this;
				if(_this.iptPhone === ""){
					mallUtils.layer.alert("请填写手机号");
					return;
				}
         if (!/^1\d{10}$/.test(_this.iptPhone)) {
          mallUtils.layer.alert("请输入正确的手机号");
          return;
        }
				if(_this.iptVerifyCode === ""){
					mallUtils.layer.alert("请填写验证码");
					return;
				}
				var params = {
					phone:_this.iptPhone,
					code:_this.iptVerifyCode
				};
				/*var url = '/api/personal/bind_phone';*/
				Vue.OneMallHttp(this).POST(params,Vue.OneMallUrl.personal_bind_phone).then(function(data){
					if(data.code == 10000){
						mallUtils.layer.alert(data.msg,2,function(elem){
							_this.$router.push('/personal/userinfo');
						})
					}else{
						mallUtils.layer.alert(data.msg);
					}
				})
			},
			clearPhoneIpt() {
				this.iptPhone = "";
				$(".ipt-clear").hide();
				$(".ipt-phone").focus();
			},
			iptPhoneFocus() {
				$(".ipt-phone").focus(function(){
					$(this).parents("li").find(".ipt-clear").show();
				});
				$(".ipt-phone").blur(function(){
					if($(this).val() == ""){
						$(this).parents("li").find(".ipt-clear").hide();
					}
				})
			}
		},
		destroyed(){
    		$("body").css({"background-color":"#fff"});
    	}
	}
</script>
