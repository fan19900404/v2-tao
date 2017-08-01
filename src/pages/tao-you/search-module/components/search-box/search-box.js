import Popover from '../popover/popover.component';
export default {
  props: {
    placeholder: {
      type: String
    }
  },
  components: {
    Popover
  },
  data() {
    "use strict";
    return {
      searchValue: undefined,
      searchOption: {type: 1, name: '礼包', iconName: 'icon-gift2'},
      showSearchOptions: false, // 默认不显示搜索的选项
      searchOptions: [
        {type: 1, name: '礼包', iconName: 'icon-search-gift'},
        {type: 2, name: '游戏', iconName: 'icon-search-game'},
        {type: 3, name: '资讯', iconName: 'icon-search-news'}
      ]
    }
  },
  methods: {
    searchCancel() {
      "use strict";
      this.$emit('vt-search-cancel');
      this.searchValue = undefined;
    },
    toggleSearchOptions() {
      "use strict";
      this.showSearchOptions = !this.showSearchOptions;
    },
    updateSearchOption(index) {
      "use strict";
      this.searchOption = this.searchOptions[index];
    }
  },
  mounted() {
    let type = parseInt(this.$route.query.type);
    if(type) {
      this.updateSearchOption(type);
    }
  },
  events: {
    // 接受外部的热词搜索
    'vt-click-hot-search-value': function(v) {
      "use strict";
      this.searchValue = v;
    }
  },
  mounted() {
    "use strict";
    // 监测搜索的词汇
    this.$watch('searchValue', function(newValue, oldValue) {
      if(newValue) {
        // 先判断之前受否搜索过这种类型的礼包
        let searchHistory = localStorage.getItem('SEARCH_HISTORY') || '';
        let searchHistoryArray = searchHistory.split(',');
        if(-1 === searchHistoryArray.indexOf(newValue)) {
          if(searchHistoryArray.length >= 5) {
            searchHistoryArray.shift();
          }
          searchHistoryArray.push(newValue);
          localStorage.setItem('SEARCH_HISTORY', searchHistoryArray);
        }
        this.$emit('vt-search-value-change', {searchOption: this.searchOption, searchValue: newValue});
        this.$root.$emit('vt-search-value-change', {searchOption: this.searchOption, searchValue: newValue});
      }
      else {
        if(oldValue) {
          this.$emit('vt-search-cancel');
        }
      }
    });
    // 监测搜索的类型变化
    this.$watch('searchOption', function(newValue) {
      if(newValue) {
        // 只有存在搜索的值才会进行搜索
        if(this.searchValue) {
          this.$root.$emit('vt-search-type-change', {searchOption: newValue, searchValue: this.searchValue});
        }
      }
    });
  }
}
