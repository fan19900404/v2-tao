<template>
  <div class="tab">
    <div class="tab__con" @click="link({name:'TaoYouGameCenterReplaceRank'})">
      <span class="icon-rank"></span>
      <div class="tab__text">排行</div>
    </div>
    <div class="tab__con" @click="link({name:'TaoYouGameCenterOpenService'})">
      <span class="icon-open-service"></span>
      <div class="tab__text">开服</div>
    </div>
    <div class="tab__con" @click="link({name:'TaoYouPacks'})">
      <span class="icon-packs"></span>
      <div class="tab__text">礼包</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {

  },
  methods: {
    link(url) {
      this.$router.push(url);
    },
  },
};
</script>

<style lang="scss" scoped>
.tab {
  display: flex;
  justify-content: space-around;
  background: white;
  padding: .15rem .15rem .15rem .15rem;
  /*border-bottom: 1px solid #E5E5E5;*/
  &__con {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .icon-rank {
      color: #00C1B3;
      font-size: .21rem;
    }
    .icon-open-service {
      color: #B370FF;
      font-size: .27rem;
    }
    .icon-packs {
      color: #FF7272;
      font-size: .21rem;
    }
    span {
      text-align: center;
      padding-bottom: 0.05rem;
      font-size: .26rem;
    }
  }
  &__text {
    font-size: .13rem;
    color: #333333;
    height: .13rem;
  }
}
</style>
