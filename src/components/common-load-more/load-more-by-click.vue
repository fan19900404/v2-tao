<!-- author: dreamapple -->
<template>
  <div>
    <slot name="list-content"></slot>
    <slot name="load-more-btn"></slot>
    <p v-show="isLoading" class="is-loading"></p>
    <p v-show="!canLoadMore" class="no-more-data">没有更多的数据了</p>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  props: {
    list: {
      type: Array,
    },
    dataUrl: {
      type: String,
    },
    query: {
      type: Object,
    },
    leftMsgCount: {
      type: Number,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    canLoadMore: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {

    };
  },
  methods: {
    // 加载数据
    loadData() {
      // 正在加载数据
      this.isLoading = true;
      Vue.ClientHttp().GET(this.query, this.dataUrl)
        .then((res) => {
          // 加载完成
          this.isLoading = false;
          if (res.code === 10000) {
            // 判断是否还有更多数据
            if (res.result.length === 0) {
              this.canLoadMore = false;
            } else {
              // 可以加载更多
              // 还有多少条没有被加载
              this.leftMsgCount = res.leftMsgCount;
              this.canLoadMore = true;
              this.list = this.list.concat(res.result);
            }
          } else {
            // TODO
          }
        });
    },
  },
  events: {
    'load-more-by-click': function () {
      if (!this.isLoading && this.canLoadMore) {
        this.query.page++;
        this.loadData();
      }
    },
    'init-load-more': function () {
      this.loadData();
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="scss" scoped>
.is-loading {
  background-image: url('/static/images/components/load-more-data/loading.gif');
  height: 3rem;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

.no-more-data {
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  color: #898989;
}
</style>
