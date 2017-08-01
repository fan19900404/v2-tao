<template>
  <div v-show="show" class="mask">
    <div class="rule-top"  transition="action" v-show = "isShow">
      <h3>[幸运大抽奖]活动规则</h3>
      <p>1.该游戏只限新用户参加。</p>
      <p>2.在游戏中抽到的商品仅供参考，请登录淘游夺宝查看详情。</p>
      <p>3.最终解释权归淘游夺宝团队所有。</p>

      <div @click="close" class="close-rule">
        <div class="close-rule-arrow">︿</div>
        <div class="close-rule-text">规则</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .3);
}
.rule-top{
  width:100%;
  height:17rem;
  background:rgb(255,54,54);
  position:absolute;
}
h3{
height:5rem;
font-size:2.4rem;
text-align:center;
line-height:5rem;
color:#fff;
}
p{
font-size:1.3rem;
color:#fff;
padding:1rem 0 0 1rem;
line-height:1.6;
}

  .action-transition {
    transition: all .3s linear;
    opacity: 1;
    margin-top: 0;
  }
  .action-enter {
    opacity: 0;
    margin-top: -17rem;
  }
  .action-leave {
    opacity: 0;
    margin-top: -17rem;
  }
  .close-rule{
    position: absolute;
    bottom: 0;
    right: 1.5rem;
    width: 3.9rem;
    height: 4.4rem;

  }
  .close-rule-arrow{
    text-align: center;
    font-weight: 600;
    font-size: 1.6rem;
    height: 1.7rem;
    border-top-left-radius: 3.9rem;
    border-top-right-radius: 3.9rem;
    background-color: #ff8a00;
    color: #fff;
  }
  .close-rule-text{
    text-align: center;
    height: 2.7rem;
    font-size: 1.2rem;
    line-height: 2rem;
    background-color: #ff8a00;
    color: #fff;
  }
</style>
<script>
  export default {
     props: {
      show: {
        type: Boolean,
        default: true
      },
      isShow:{
        type: Boolean,
        default: true
      }
    },
    methods:{
      close:function(){
        var that = this;
        that.isShow = false;
        setTimeout (function(){
          that.show = false;
        },400)
      }
    }
  }
</script>
