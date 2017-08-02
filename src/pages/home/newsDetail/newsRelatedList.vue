<template>
  <div v-if="lists.length" class="news-related-list">
    <div class="news-related-list-title">相关资讯</div>
    <ul class="news-related-list-lists">
      <li v-for="(list,index) in lists" :key="index" @click="link('/tao-you/news/' + list.id)" class="overflow-ellipsis">• {{list.title}}</li>
    </ul>
  </div>
</template>
<script>
import { getNewsRelated } from '../../../api/home';

export default {
  props: {
    newsID: Number,
  },
  data() {
    return {
      lists: [],
    };
  },
  methods: {
    link(url) {
      this.$router.push(url);
    },
    // 获取相关资讯列表
    upListData() {
      getNewsRelated({
        newsID: this.newsID,
        page: 1,
        limit: 3,
        nologin: 1,
      }).then((res) => {
        if (res.data.code === 10000) {
          this.lists = res.data.result;
        }
      });
    },
  },
  mounted() {
    this.upListData();
  },
  watch: {
    newsID(val, old) {
      if (val !== old) {
        this.upListData();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.news-related-list {
  background: #fff;
}

.news-related-list-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 32px;
  color: #333333;
  letter-spacing: 0;
  line-height: 32px;
  padding: 0 30px;
  height: 88px;
  box-shadow: 0 2px 0 0 #EEEEEE;
}

.news-related-list-lists {
  font-size: 28px;
  color: #333333;
  letter-spacing: 0;
  line-height: 28px;
  padding: 0 0 0 30px;
  margin-top: 2px;
  background: #FFFFFF;
}

.news-related-list-lists li {
  padding: 28px 30px 28px 0;
  text-align: justify;
}

.news-related-list-lists li+li {
  box-shadow: inset 0 2px 0 0 #EEEEEE;
}
</style>
