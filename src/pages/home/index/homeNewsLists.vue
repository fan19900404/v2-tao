<template>
  <div class="home-news-box">
    <homeTitle title="热门资讯"></homeTitle>
    <newsList :loadNewsHot="loadNewsHot" :newsList="newsList" :loading="loading" :allLoaded="allLoaded"></newsList>
  </div>
</template>
<script>

import homeTitle from './homeTitle';
import newsList from '../../components/newsList/newsList';
import { getNewsList } from '../../../api/home';

export default {
  components: {
    homeTitle,
    newsList,
  },
  data() {
    return {
      newsList: [],
      loading: false,
      pageIndex: 1,
      allLoaded: false,
    };
  },
  methods: {
    loadNewsHot() {
      if (this.allLoaded || this.loading) {
        return;
      }
      this.loading = true;
      getNewsList({
        page: this.pageIndex,
        nologin: 1,
      }).then((res) => {
        setTimeout(() => { this.loading = false; }, 1500);
        if (res.data.code === 10000) {
          this.newsList = [...this.newsList, ...res.data.result];
          const length = res.data.result.length;
          if (length > 0) {
            this.pageIndex += 1;
          }
          if (length < 4) {
            this.allLoaded = true;
          }
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.home-news-box {
  background: #fff;
}
</style>
