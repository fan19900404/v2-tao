<template>
  <div class="next-term-container">
    <div class="next-term dr-flex">
      <div class="words flex-1">手气不错，要乘胜追击哦</div>
      <div @click="direct" class="btn">再次参与</div>
    </div>
  </div>
</template>

<style scoped>
  .next-term-container {
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    z-index: 200;
    width: 100%;
    height: 6rem;
    background-color: #f8f8f8;
    border-top: 1px solid #dfdfdf;
    padding: 0 1.6rem;
  }
  .next-term {
    height: 100%;
    align-items: center;
  }
  .words {
    line-height: 6rem;
    font-size: 1.4rem;
    color: #888;
  }
  .btn {
    box-sizing: border-box;
    border-radius: .5rem;
    background-color: #ff4a4a;
    color: #fff;
    text-align: center;
    height: 3.6rem;
    font-size: 1.6rem;
    padding: 1rem 1.8rem;
    line-height: 1;
  }
</style>

<script>
  export default {
    props:[
      'isSubarea',
      'id'
    ],
    methods: {
      direct() {
        if(this.isSubarea) {
          this.$router.push({
            name: 'subarea-detail',
            params: {
              id:this.id
            }
          })
        }
        else {
          this.$router.push({
            name: 'goods-detail',
            params: {
              id:this.id
            }
          })
        }
      }
    }
  }
</script>
