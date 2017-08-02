<template>
  <div>
    <tmHeader title="原创"></tmHeader>
    <newsList :loadNewsHot="loadNewsHot" :newsList="newsList" :loading="loading" :allLoaded="allLoaded"></newsList>
    <backTop></backTop>
    <backBefore></backBefore>
  </div>
</template>
<script>
/**
 * 本页面是  原创 页面
 */
import tmHeader from '../../components/header/header';
import newsList from '../../components/newsList/newsList';
import { getNewsList } from '../../../api/home';
import backTop from '../../components/backTop/backTop';
import backBefore from '../../components/backBefore/backBefore';

export default {
  components: {
    tmHeader,
    newsList,
    backTop,
    backBefore,
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
        fromType: 1, // 原创
        page: this.pageIndex,
        limit: 10,
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
  mounted() {
    this.loadNewsHot();
  },
};
</script>
<style lang="scss" scoped>

</style>
