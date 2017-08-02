<template>
  <div class="news-comment-listbox">
    <div class="news-comment-title">
      <div>用户评论</div>
      <div class="news-comment-goto">评论</div>
    </div>
    <div v-for="(v,i) in lists" :key="i" class="news-comment-content">
      <div class="news-comment-name">
        <div class="news-comment-pic">
          <img :src="v.avatarPath" alt="">
        </div>
        <div class="news-comment-datebox">
          <div>{{v.name}}</div>
          <div class="news-comment-date">{{v.publishTime}}</div>
        </div>
      </div>
      <div class="news-comment-text">{{v.content}}</div>
    </div>
    <div v-if="count > 3" class="news-comment-look" @click="link({name: 'TaoYouHomeAllComments', params: {id: newsID, category: category}})">查看更多评论（{{count}}）</div>
    <div v-if="count == 0" class="news-comment-look">还未有评论，快来评论抢占主楼吧</div>
  </div>
</template>
<script>
import { getCommentList } from '../../../api/home';

export default {
  props: {
    newsID: Number,
  },
  data() {
    return {
      lists: [],
      count: 0,
      category: [],
    };
  },
  methods: {
    /**
     * 更新列表数据
     *
     * @returns
     */
    uplistData() {
      getCommentList({
        newsID: this.newsID,
        showType: 2,
        nologin: 1,
        fromType: 1, // 1：资讯(原创、转载、活动) 2：游戏
      }).then((res) => {
        if (res.data.code === 10000) {
          const lists = res.data.result;
          this.category = [...lists];
          if (lists.length > 3) {
            lists.length = 3;
          }
          this.lists = lists;
          this.count = Number(res.data.count);
        }
      });
    },
  },
  mounted() {
    this.uplistData();
  },
  watch: {
    newsID(val, old) {
      if (val !== old) {
        this.uplistData();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.news-comment-listbox {
  background: #fff;
  box-shadow: 0 2px 0 0 #EEEEEE;
}

.news-comment-title {
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88px;
  font-size: 32px;
  color: #333;
  box-shadow: 0 2px 0 0 #EEEEEE;
}

.news-comment-goto {
  font-size: 26px;
  color: #a5a5a5;
}

.news-comment-content {
  margin-left: 30px;
  font-size: 28px;
  line-height: 28px;
  color: #333;
}

.news-comment-content+.news-comment-content {
  box-shadow: 0 -2px 0 0 #EEEEEE;
}

.news-comment-name {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 30px 0 20px;
}

.news-comment-name .news-comment-pic {
  height: 68px;
  width: 68px;
  border-radius: 100px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
  img {
    height: 100%;
  }
}

.news-comment-name .news-comment-datebox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 68px;
}

.news-comment-datebox .news-comment-date {
  font-size: 24px;
  color: #A5A5A5;
  letter-spacing: 0;
  line-height: 24px;
}

.news-comment-text {
  letter-spacing: 0;
  line-height: 44px;
  padding: 0 30px 20px 0;
}

.news-comment-look {
  height: 88px;
  text-align: center;
  font-size: 28px;
  color: #A5A5A5;
  letter-spacing: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 -2px 0 0 #EEEEEE;
}
</style>
