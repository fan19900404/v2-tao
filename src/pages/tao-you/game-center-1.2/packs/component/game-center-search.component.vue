<template>
  <div class="box" @click="search">
    <div class="box__search">
      <span class="icon-search">&nbsp{{name}}</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  components: {

  },
  data() {
    return {
      name: '',
    };
  },
  methods: {
    search() {
      this.$emit('game-center-search');
    },
    // 默认的关键字
    getHotWords() {
      const url = Vue.ClientUrl.hot_words_list;
      const data = { nologin: 1 };
      Vue.ClientHttp().POST(data, url)
        .then((res) => {
          if (res.code === 10000) {
            this.name = res.result[0].keyword;
          } else {
            //
          }
        });
    },
  },
  mounted() {
    // 获取搜索框关键字
    this.getHotWords();
  },
};
</script>

<style lang="scss" scoped>
.box {
  background: #ffffff;
  padding: 0.1rem .15rem;
  /*border-bottom: 1px solid #E5E5E5;
    border-top: 1px solid #E5E5E5;*/
  &__search {
    height: .29rem;
    background: #f1f1f1;
    border-radius: 0.05rem;
    text-align: center;
    line-height: .29rem;
  }
  .icon-search {
    font-size: .13rem;
    color: #a5a5a5;
  }
}
</style>
