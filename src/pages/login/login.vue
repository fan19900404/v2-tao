<template>
  <div class="container">
    <input v-model="username" type="text" placeholder="请输入登录的手机号" maxlength="20" autofocus>
    <input v-model="password" type="password" placeholder="请输入密码" maxlength="20">
    <input type="button" value="登录" @click.stop="login">
    <input type="button" value="退出" @click.stop="logout">
  </div>
</template>
<script>
import Toast from '../../components/toast/toast';
import { login, logout } from '../../api/login';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      login(this.username, this.password).then((res) => {
        console.log(res);
        if (res.data.code === 10000) {
          try {
            localStorage.setItem('login', 1);
            localStorage.setItem('uID', res.data.result.uID);
          } catch (ex) {
            console.log(ex);
          }
          Toast('登陆成功!');

          setTimeout(() => {
            const nextUrl = localStorage.getItem('Q_next_url') || '/';
            this.$router.replace(nextUrl);
          }, 1500);
        }
      });
    },
    logout() {
      logout().then((res) => {
        if (res.data.code === 10000) {
          localStorage.removeItem('login');
          localStorage.removeItem('uID');
          Toast('退出登陆');

          setTimeout(() => {
            this.$router.replace({ name: 'login' });
          }, 1500);
        }
      });
    },
  },
};
</script>
<style>
</style>
