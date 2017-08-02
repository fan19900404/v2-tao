<template>
  <div>
    <tm-header title="淘游助手" :back="false"></tm-header>
    <div class="home-block-box">
      <home-first></home-first>
    </div>
    <div class="home-block-box">
      <hot-game></hot-game>
    </div>
    <div class="home-block-box">
      <hot-gift></hot-gift>
    </div>
    <div class="home-block-box">
      <home-news-lists></home-news-lists>
    </div>
    <tm-footer selected="home"></tm-footer>
    <backTop></backTop>
  </div>
</template>

<script>
import tmHeader from '../../components/header/header';
import tmFooter from '../../components/footer/footer';
import homeFirst from './homeFirst';
import hotGame from './hotGame';
import hotGift from './hotGift';
import homeNewsLists from './homeNewsLists';
import backTop from '../../components/backTop/backTop';

export default {
  components: {
    tmHeader,
    tmFooter,
    homeFirst,
    hotGame,
    hotGift,
    homeNewsLists,
    backTop,
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.home-block-box+.home-block-box {
  margin-top: 30px;
}
</style>
