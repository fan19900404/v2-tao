import { InfiniteScroll, Spinner } from 'mint-ui';
import Vue from 'vue';
import $ from 'jquery';
import SearchBox from './components/search-box/search-box.component'; // 搜索框
import ProgressComponent from '../../../components/tao-you/svg-progress/svg-progress.component'; // 圆环进度条
import BackTop from '../../../components/tao-you/button/back-top.component'; // 添加回到顶部
import BackPrevious from '../../../components/tao-you/button/return.component';
import LoadList from './components/load-list/load-list';

Vue.use(InfiniteScroll);

export default {
  components: {
    SearchBox,
    InfiniteScroll,
    Spinner,
    ProgressComponent,
    BackPrevious,
    BackTop,
  },
  data() {
    return {
      // 热门搜索的词汇
      hotSearchItems: [],
      // 搜索的历史记录
      searchHistoryItems: [],
      // 搜索的结果
      searchResult: [],
      // 是否有搜索结果，默认会有搜索结果
      hasResult: true,
      // 是否在搜索
      isInSearch: false,
      // 关于搜索的对象
      searchConfig: {},
      // 搜索的类型总数
      searchTypes: [1, 2, 3],
      // load-list
      listHandler: {
        gift: null,
        game: null,
        news: null,
      },
    };
  },
  computed: {
    showSearchHistory() {
      return this.searchHistoryItems.length > 0;
    },
    searchType() {
      // 判断一个对象是否为空对象
      if (
        !(Object.keys(this.searchConfig).length === 0 && this.searchConfig.constructor === Object)
      ) {
        return this.searchConfig.searchOption.type;
      }
    },
  },
  watch: {
    'listHandler.news.list': function (newValue) {
      this.$nextTick(function () {
        const keywords = this.searchConfig.searchValue;
        const news = document.getElementsByClassName('JS-keywords-markup');
        if (news.length) {
          Array.from(news, (ele) => {
            ele.innerHTML = ele.innerHTML.replace(
              keywords,
              `<span class="keywords">${keywords}</span>`,
            );
          });
        }
      });
    },
    // 礼包关键字
    'listHandler.gift.list': function (newValue) {
      const keywords = this.searchConfig.searchValue;
      const gifts = document.getElementsByClassName('JS-keywords-markup');
      if (gifts.length) {
        Array.from(gifts, (ele) => {
          ele.innerHTML = ele.innerHTML.replace(
            keywords,
            `<span class="keywords">${keywords}</span>`,
          );
        });
      }
    },
    // 游戏关键字
    'listHandler.game.list': function (newValue) {
      const keywords = this.searchConfig.searchValue;
      const games = document.getElementsByClassName('JS-keywords-markup');
      if (games.length) {
        Array.from(games, (ele) => {
          ele.innerHTML = ele.innerHTML.replace(
            keywords,
            `<span class="keywords">${keywords}</span>`,
          );
        });
      }
    },
  },
  methods: {
    link(url){
      this.$router.push(url);
    },
    // 打开游戏
    playGame(id, name, url) {
      this.$router.push({
        name: 'TaoYouPlayMyGame',
        params: {
          id,
        },
        query: {
          gameUrl: url,
          gameName: name,
        },
      });
    },
    // 热词查询
    getHotWords() {
      const url = Vue.ClientUrl.hot_words_list;
      const data = {};
      Vue.ClientHttp().POST(data, url).then((res) => {
        if (res.code === 10000) {
          this.hotSearchItems = res.result;
        } else {
          // TODO
        }
      });
    },
    // 展示搜索的历史记录
    showHistoryRecord() {
      // 获取搜索的的历史记录
      const searchHistory = localStorage.getItem('SEARCH_HISTORY') || '';
      const searchHistoryArray = searchHistory.split(',');
      const showSearchHistoryArray = [];
      searchHistoryArray.map((value) => {
        if (value) {
          showSearchHistoryArray.push(value);
        }
      });
      this.searchHistoryItems = showSearchHistoryArray.reverse();
    },
    // 清楚搜索的历史记录
    clearHistoryRecord() {
      localStorage.setItem('SEARCH_HISTORY', '');
      this.searchHistoryItems = [];
      this.showHistoryRecord();
    },
    // 点击搜索热词
    changeSearchValue(v) {
      this.$emit('vt-click-hot-search-value', v);
    },
    // 重置请求
    resetSearch() {
      if (this.searchTypes[0] === this.searchType) {
        this.listHandler.gift.changeParam({
          name: this.searchConfig.searchValue,
        });
        this.listHandler.gift.changePageIndex();
        this.listHandler.gift.getList(null, this.judgeHasResult);
      } else if (this.searchTypes[1] === this.searchType) {
        this.listHandler.game.changeParam({
          key: this.searchConfig.searchValue,
        });
        this.listHandler.game.changePageIndex();
        this.listHandler.game.getList(null, this.judgeHasResult);
      } else if (this.searchTypes[2] === this.searchType) {
        this.listHandler.news.changeParam({
          title: this.searchConfig.searchValue,
        });
        this.listHandler.news.changePageIndex();
        this.listHandler.news.getList(null, this.judgeHasResult);
      } else {
        // TODO
      }
    },
    // 请求后的结果
    judgeHasResult(res) {
      if (res.code === 10000) {
        if (res.result.length) {
          this.hasResult = true;
        } else {
          this.hasResult = false;
        }
      }
    },
    // 开始进行搜索
    search() {
      // this.list

      this.resetSearch();
    },
    // 搜索取消
    searchCancel() {
      this.isInSearch = false;
    },
  },
  events: {
    'vt-search-value-change': function (value) {
      this.searchConfig = value;
      // 显示搜索的页面
      this.isInSearch = true;
      // 进行搜索
      this.search();
      // 更新搜索历史记录
      this.showHistoryRecord();
    },
    'vt-search-type-change': function (value) {
      this.searchConfig = value;
      // 显示搜索的页面
      this.isInSearch = true;
      // 进行搜索
      this.search();
      // 搜索的类型发生变化
      console.log('type changed!');
    },
  },
  mounted() {
        // 礼包
    this.listHandler.gift = new LoadList(Vue.ClientUrl.gifts_list, {
      limit: 10,
    });
    // 游戏
    this.listHandler.game = new LoadList(Vue.ClientUrl.game_search, {
      limit: 10,
    });
    // 资讯
    this.listHandler.news = new LoadList(Vue.ClientUrl.news_search_list, {
      limit: 10,
    });
    // 热词查询
    this.getHotWords();
    $('body').css('backgroundColor', '#f5f5f9');
    // 显示历史记录
    this.showHistoryRecord();

    //  测试数据
    console.log(
      Object.keys(this.searchConfig).length === 0 && this.searchConfig.constructor === Object,
    );
    this.hotSearchItems = ['天龙八部传奇世界天龙八部传奇世界二十一个字', '天龙八部', '幻城', '传奇世界'];
  },
};
