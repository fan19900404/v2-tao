<template>
  <div>
    <!--公共头部组件-->
    <app-header :title="title"></app-header>
    <section class="container">
      <div class="info">
        {{ notice.lettertitle }}
        <div class="autor">发布人: 系统</div>
      </div>
      <div class="content" v-html="notice.container"></div>
      <div class="link" v-if="notice.content_url && notice.a_content" @click.stop="goUrl(notice.content_url)">{{notice.a_content}}</div>
    </section>
    <return-btn></return-btn>
  </div>
</template>
<script>
import Vue from 'vue';
import $ from 'jquery';
import AppHeader from '../../../components/tao-you/layout/header.component';
import ReturnBtn from '../../../components/tao-you/button/return.component';

export default {
  data() {
    return {
      title: '我的消息',
      notice: {},
    };
  },
  components: {
    AppHeader,
    ReturnBtn,
  },
  methods: {
    goUrl(url) {
      if (/^http(s*)/.test(url)) {
        location.href = url;
        return;
      }
      this.$router.push(url);
    },
    getDetail() {
      Vue.OneMallHttp().GET({
        id: this.$route.params.id,
      }, Vue.OneMallUrl.notice_detail).then((data) => {
        if (data.code === 10000) {
          this.notice = data.result;
        }
      });
    },
  },
  mounted() {
    $('body').css('background-color', '#f5f5f9');
    this.getDetail();
  },
};
</script>
<style lang="scss" scoped>
.container {
  border-top: 1px solid #eeeeee;
  background-color: white;
  user-select: text;
  .content {
    padding-left: 0.15rem;
    padding-right: 0.15rem;
    padding-bottom: .15rem;
    color: #333333;
    font-size: 0.15rem;
  }
  .autor {
    font-size: .14rem;
    color: #a5a5a5;
  }
  .info {
    padding: 0.12rem 0.15rem;
    border-bottom: 2px solid #eeeeee;
    margin-bottom: 0.12rem;
    color: #333333;
    font-size: .18rem;
  }
  .link {
    display: block;
    padding: 0.15rem;
    padding-top: 0.08rem;
    font-size: 0.14rem;
    color: #00c1b3;
    text-decoration: underline;
  }
}
</style>
