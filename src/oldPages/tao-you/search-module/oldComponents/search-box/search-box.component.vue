<template>
  <div class="search-box-wrapper">
    <div class="search-box">
      <popover @popover-change-type="updateSearchOption" :menu="searchOptions" :show="showSearchOptions">
        <div @click="toggleSearchOptions" slot="popover-trigger" id="popover-trigger" class="search-option">{{searchOption.name}}</div>
      </popover>
      <span class="search-arrow"></span>
      <div class="search-input-wrapper">
        <input debounce="1000" v-model="searchValue" class="search-input" type="text" :placeholder="placeholder">
      </div>
    </div>
    <div @click="searchCancel" v-show="searchValue" class="search-cancel">取消</div>
  </div>
</template>

<script>
  'use strict';
  import SearchBox from './search-box';
  export default SearchBox;
</script>

<style lang="scss" scoped>
  @import "search-box";
</style>
