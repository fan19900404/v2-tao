<template>
  <div class="search-page">
    <!-- 搜索框 -->
    <div class="search-box-container">
      <search-box :placeholder="hotSearchItems[0] && hotSearchItems[0].keyword" @vt-search-cancel="searchCancel"></search-box>
    </div>
    <!-- 开始搜索之前的内容 -->
    <div v-show="!isInSearch" class="before-search-section">
      <!-- 热门搜索 -->
      <div class="hot-search">
        <div class="hot-search-title">热门搜索</div>
        <div class="hot-search-items-wrapper">
          <span @click="changeSearchValue(v.keyword)" :key="index" class="hot-search-item" v-for="(v,index) in hotSearchItems">{{v.keyword}}</span>
        </div>
      </div>
      <!-- 历史记录 -->
      <div v-show="showSearchHistory" class="history-record-wrapper">
        <div class="history-record">
          <div class="history-record-title">搜索历史</div>
          <div class="history-record-items-wrapper">
            <div @click="changeSearchValue(v)" class="history-record-item" :key="index" v-for="(v,index) in searchHistoryItems">{{v}}</div>
          </div>
        </div>
        <!-- 清除历史记录 -->
        <div @click="clearHistoryRecord" class="clear-history-record">
          <span class="clear-logo icon-delete"></span>清除历史记录
        </div>
      </div>
    </div>
    <!-- 没有搜索的结果 -->
    <div v-if="!hasResult && isInSearch" class="after-search-no-result-section">
      <p class="tip">亲，没有找到您要的{{searchConfig.searchOption.name}}哦！</p>
    </div>
    <!-- 有搜索的结果的页面 -->
    <div v-if="hasResult && isInSearch" class="after-search-with-result-section">
      <!-- 礼包页面 -->
      <div v-if="searchTypes[0] === searchType" class="search-gifts">
        <div class="gift-show-container" v-infinite-scroll="listHandler.gift.getList" :infinite-scroll-disabled="listHandler.gift.loading  || listHandler.gift.allLoaded" infinite-scroll-immediate-check="false" infinite-scroll-distance="10">
          <div @click="link({name: 'TaoYouPacksDetails', params: {id: gift.id}})" class="gift" v-for="(gift,index) in listHandler.gift.list" :key="index">
            <img class="gift__img" :src="gift.image" alt="">
            <div class="gift__intro">
              <div class="gift__name overflow-ellipsis JS-keywords-markup">{{gift.gameName}}</div>
              <div class="gift__type overflow-ellipsis JS-keywords-markup">{{gift.name}}</div>
              <div class="gift__platform JS-keywords-markup">适用平台:{{gift.typeName}}</div>
            </div>
            <div class="gift__progress">
              <progress-component :has="+gift.uID !== 0" :progress="gift.usedNumber / gift.totalNumber * 100"></progress-component>
              <span :class="{'gift__progress-text--new': +gift.uID === 0,'gift__progress-text--old': +gift.uID !== 0}" class="gift__progress-text">
                {{+gift.uID === 0 ? (+gift.taoDou === 0 ? '领' : '兑') : '已领'}}
              </span>
            </div>
          </div>
          <p v-show="listHandler.gift.loading" class="page-infinite-loading">
            <spinner type="fading-circle"></spinner>加载中
          </p>
        </div>
      </div>
      <!-- 游戏 -->
      <div v-if="searchTypes[1] === searchType" class="search-games">
        <div class="game-show-container" v-infinite-scroll="listHandler.game.getList" :infinite-scroll-disabled="listHandler.game.loading  || listHandler.game.allLoaded" infinite-scroll-immediate-check="false" infinite-scroll-distance="10">
          <div class="list" v-for="(v,index) in listHandler.game.list" :key="index">
            <div class="list__container">
              <div class="list__img" @click="link({name:'TaoYouGameCenterGameDetails',params:{id:v.id}})">
                <img :src="v.gameIcon">
              </div>
              <div class="list__text" @click="link({name:'TaoYouGameCenterGameDetails',params:{id:v.id}})">
                <p class="p1 JS-keywords-markup">{{v.name}}</p>
                <p class="p2 JS-keywords-markup">{{v.category}}
                  <span v-show="+v.fileSize"> | {{v.fileSize}}</span>
                </p>
                <p class="p3 JS-keywords-markup overflow-ellipsis">{{v.abstract}}</p>
              </div>
              <div class="list__button">
                <a @click="playGame(v.id, v.name, v.gameUrl)">进入</a>
                <div class="list__num">
                  <span>{{v.viewNumber || 0}}</span>人在玩</div>
              </div>
            </div>
          </div>
          <p v-show="listHandler.game.loading" class="page-infinite-loading">
            <spinner type="fading-circle"></spinner>加载中
          </p>
        </div>
      </div>
      <!-- 资讯 -->
      <div v-if="searchTypes[2] === searchType" class="search-news">
        <ul class="news-list" v-infinite-scroll="listHandler.news.getList" :infinite-scroll-disabled="listHandler.news.loading  || listHandler.news.allLoaded" infinite-scroll-immediate-check="false" infinite-scroll-distance="10">
          <li class="item JS-statistics-news" v-for="(item,index) in listHandler.news.list" @click="link({name: 'TaoYouNewsDetail', params: {id: item.id}, query: {type: 0}})" :key="index">

            <!-- 上中下结构 中间大图 -->
            <div v-if="item.type == 1" class="content type1 am-flexbox">
              <div class="content__title overflow-ellipsis JS-keywords-markup">{{ item.title }}</div>
              <div class="content__picture am-flexbox">
                <img :src="item.picPath[0]" alt="">
              </div>
              <div class="content__info am-flexbox">
                <span class="content__info__source overflow-ellipsis">{{ item.source }}</span>
                <span class="content__info__publish-time 1overflow-ellipsis">{{ item.publishTime | formatDateToTimeago }}</span>
              </div>
            </div>

            <!-- 左右结构 左边是图片 右边是描述文字-->
            <div v-if="item.type == 2" class="content type2 am-flexbox">
              <div class="content__left am-flexbox 1content__picture">
                <img :src="item.picPath[0]" alt="">
              </div>
              <div class="content__right am-flexbox-item am-flexbox">
                <div class="content__title overflow-ellipsis-multiline JS-keywords-markup">{{ item.title }}</div>
                <div class="content__info am-flexbox">
                  <span class="content__info__source am-flexbox-1 overflow-ellipsis">{{ item.source }}</span>
                  <span class="content__info__publish-time 1am-flexbox-1 overflow-ellipsis">{{ item.publishTime | formatDateToTimeago }}</span>
                </div>
              </div>
            </div>

            <!-- 上中下结构 只有文字 -->
            <div v-if="item.type == 3" class="content type3 am-flexbox">
              <div class="content__title overflow-ellipsis JS-keywords-markup">{{ item.title }}</div>
              <div class="content__detail overflow-ellipsis-multiline">{{ item.desc }}</div>
              <div class="content__info am-flexbox">
                <span class="content__info__source overflow-ellipsis">{{ item.source }}</span>
                <span class="content__info__publish-time 1overflow-ellipsis">{{ item.publishTime | formatDateToTimeago }}</span>
              </div>
            </div>

            <!-- 上中下结构 中间多图 -->
            <div v-if="item.type == 4" class="content type4 am-flexbox">
              <div class="content__title overflow-ellipsis JS-keywords-markup">{{ item.title }}</div>
              <div class="content__picture am-flexbox">
                <img v-for="(subItem,index) in item.picPathList" :key="index" class="am-flexbox-item" :src="subItem" alt="">
              </div>
              <div class="content__info am-flexbox">
                <span class="content__info__source overflow-ellipsis">{{ item.source }}</span>
                <span class="content__info__publish-time 1overflow-ellipsis">{{ item.publishTime | formatDateToTimeago }}</span>
              </div>
            </div>
          </li>
          <p v-show="listHandler.news.loading" class="page-infinite-loading">
            <spinner type="fading-circle"></spinner>加载中
          </p>
        </ul>
      </div>
    </div>

    <!-- 返回按钮 -->
    <back-previous></back-previous>
    <!-- 返回顶部 -->
    <back-top></back-top>
  </div>
</template>

<script src="./search.js"></script>

<style lang="scss" scoped>
@import "search.page";
</style>
