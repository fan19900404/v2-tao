<style scoped>
	.ipt-box {
		height: 5rem;
		margin: 1.2rem 0 1.6rem 0;
		padding: 0 1.6rem;
		background-color: #fff;
		border-top: 1px solid #dfdfdf;
		border-bottom: 1px solid #dfdfdf;
	}

	.ipt-box .username {
		line-height: 1.8rem;
		font-size: 1.4rem;
		color: #000;
		border: 0;
		outline: none;
	}

	/*.ipt-box .username:focus+.ipt-clear {
		display: block;
	}*/

	.ipt-box .ipt-clear {
		display: block;
		width: 1.5rem;
		height: 1.4rem;
		color: #fff;
		font-size: 1.4rem;
		background-color: #bbbbbb;
		text-align: center;
		line-height: 1.4rem;
		border-radius: 50%;
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

	.btn-box .tips {
		font-size: 1.2rem;
		color: #898989;
		line-height: 2.6rem;
	}

  ::-webkit-input-placeholder {
    font-size: 1.3rem;
    color: #d7d8dc;
  }
</style>

<template>
	 <app-header :title="'昵称修改'" :type="type"></app-header>
	<section class="ipt-box flex-ld">
		<input class="username flex-1" placeholder="1-13字符的昵称，支持中英文、数字、下划线" v-model="username" maxlength="13">
		<span class="ipt-clear" @click="clear">×</span>
	</section>
	<section class="btn-box">
		<a class="sure-btn" @click="updateUsername">确定</a>
		<p class="tips">每个用户只可以修改1次</p>
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
        username:""
      }
    },
    mounted() {
      $("body").css("background-color","#f8f8f8");
    },
    methods:{
      clear() {
        this.username = '';
      },

      updateUsername() {
        var length = this.getByteLen(this.username);
        if (!/^[0-9a-zA-Z\u4e00-\u9fa5_]{0,}$/.test(this.username) || (length < 1 || length > 13)) {
          mallUtils.layer.alert('昵称为1-13字符，支持中英文、数字、下划线')
          return;
        }
        Vue.OneMallHttp(this).POST({ username : this.username},Vue.OneMallUrl.personal_update_username).then((data) => {
          if (data.code == 10000) {
            mallUtils.layer.alert('修改成功', 2, () => {
              this.$router.push('/personal/userinfo');
            });
          } else {
            mallUtils.layer.alert(data.msg);
          }
        })
      },

      /*获取输入的字符长度*/
      getByteLen(val) {
        var len = 0;
        for (var i = 0; i < val.length; i++) {
          var length = val.charCodeAt(i);
          if (length >= 0 && length <= 128) {
            len += 1;
          } else {
            len += 2;
          }
        }
        return len;
      }
    }
  }
</script>
