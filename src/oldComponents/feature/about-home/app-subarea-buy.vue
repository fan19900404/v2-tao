<template>
  <div id="J-detail-buy-container-copy"></div>
  <div id="J-detail-buy-container" class="detail-buy-container">
    <!-- 本期正在进行 -->
    <div v-show="!done" class="detail-buy-title">
      请选择您要购买的分区
    </div>
    <div v-show="!done" class="select-section dr-bt-1">
      <div class="items dr-flex">
        <div v-for="v in innerSubarea"
             track-by="$index"
             :class="{
              'sold-out': 1 === v,
              'active': true === innerSubareaStatus[$index]
             }"
             @click="choose($index)"
             class="item">{{$index+1}}</div>
      </div>
      <div class="info dr-flex">
        <div class="rule">购买一个分区即会包断本分区内的所有号码</div>
        <div v-link="{ name: 'subarea-play-intro'}" class="question">规则说明 <i class="one-mall-iconfont one-mall-icon-shuoming"></i></div>
      </div>
    </div>
    <div v-show="!done" class="btn-section-container dr-bt-1">
      <div class="btn-section dr-flex">
        <div class="bs-info">共需付款<span class="dr-btn-color">{{totalTaoBi}}</span>淘币</div>
        <div class="join">
          <div @click="pay" class="join-btn">立即参与</div>
        </div>
      </div>
    </div>
    <!-- 本期已经结束 -->
    <div v-show="done" class="btn-section-container dr-bt-1">
      <div class="btn-section dr-flex">
        <div class="bs-info"><span>新一期正在火热进行</span></div>
        <div class="join">
          <div @click="directTo" class="join-btn">立即前往</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 'use strict';
  export default {
    props: [
      'done',
      'subarea',
      'eachSubareaNum'
    ],
    data() {
      return {
        count: 0,
        innerSubarea: [],
        innerSubareaStatus: []
      }
    },
    computed: {
      totalTaoBi(){
        return this.count * this.eachSubareaNum;
      }
    },
    mounted() {
      var that = this;
      this.$watch('subarea', function(newValue) {
        that.innerSubarea = that.subarea;
        let subLen = this.innerSubarea.length;
        for(let i = 0; i < subLen; i++) {
          if(1 === +that.innerSubarea[i]) {
            that.innerSubareaStatus.$set(i, -1);
          }
          else {
            that.innerSubareaStatus.$set(i, false);
          }
        }

        // TODO fix hide bug 修复弹出框太高遮挡住了下面内容的bug
        var buyContainerHeight = document.getElementById('J-detail-buy-container').offsetHeight;
        document.getElementById('J-detail-buy-container-copy').style.height = buyContainerHeight + 'px';
      });
    },
    methods: {
      choose(n) {
        this.count = 0;
        if('boolean' === typeof this.innerSubareaStatus[n]) {
          this.innerSubareaStatus.$set(n, !this.innerSubareaStatus[n]);
        }
        else {
          // TODO Nothing
        }
        let innerSubLen = this.innerSubareaStatus.length;
        for(let i = 0; i < innerSubLen; i++) {
          if(true === this.innerSubareaStatus[i]) {
            this.count = this.count + 1 ;
          }
        }
      },
      pay() {
        var strArr = [], str;
        for(var i = 0; i < this.innerSubareaStatus.length; i++) {
          if(true === this.innerSubareaStatus[i]) {
            strArr.push(i+1);
          }
        }
        str = strArr.join(',');
        this.$dispatch('detail-buy-action', {
            str: str,
            count: this.totalTaoBi
          }
        );
        // 清零
        console.log('clear');
        this.count = 0;
        // 清除选择状态
        for(let i = 0; i < this.innerSubareaStatus.length; i++) {
          this.innerSubareaStatus.$set(i, false);
        }
      },
      directTo() {
        this.$dispatch('detail-direct')
      }
    }
  }

</script>

<style scoped>
  .detail-buy-container {
    position: fixed;
    z-index: 200;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    font-size: 1.6rem;
  }

  .buy-action span.disable {
    color: #aaa;
    background: #f6f6f4
  }

  .btn-section-container {
    height: 6rem;
    background-color: #f8f8f8;
  }

  .btn-section {
    justify-content: space-between;
    margin: 0 1.5rem;
    height: 100%;
    align-items: center;
  }

  .btn-section .join {

  }

  .join-btn {
    font-size: 1.6rem;
    height: 3.5rem;
    width: 9.75rem;
    background-color: #ff4a4a;
    border-radius: .5rem;
    color: #fff;
    line-height: 3.5rem;
    text-align: center;
  }

  .dr-btn-color {
    color: #ff4a4a;
  }

  .dr-bt-1 {
    border-top: 1px solid #dfdfdf;
  }

  .btn-section .bs-info {
    font-size: 1.4rem;
  }

  .btn-section .join .pay {
    font-size: 1.6rem;
  }

  .select-section {
    padding: 1.6rem 2.2rem;
  }
  .select-section .items {
    box-sizing: border-box;
    flex-wrap: wrap;
    border-top: 1px solid #dfdfdf;
    border-left: 1px solid #dfdfdf;
  }
  .items .item {
    box-sizing: border-box;
    width: 20%;
    height: 4.8rem;
    text-align: center;
    line-height: 4.8rem;
    border: 1px solid #dfdfdf;
    border-top: 0;
    border-left: 0;
    font-size: 1.6rem;
    color: #898989;
  }
  .sold-out {
    background-color: #f1f1f1;
    background-image: url('/oldStatic/images/sold-out.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    color: #bbb;
  }
  .items .active {
    position: relative;
    background-color: #ff4a4a;
    color: #fff;
  }
  .items .active::after {
    position: absolute;
    content: '';
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    top: .2rem;
    right: .2rem;
    background-image: url('/oldStatic/images/subarea-buy-active.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
  }
  .detail-buy-title {
    height: 3.8rem;
    line-height: 3.8rem;
    font-size: 1.4rem;
    text-indent: 1.6rem;
    background-color: #f2f2f7;
    border-top: 1px solid #dfdfdf;
  }
  .info {
    margin-top: 1rem;
    font-size: 1rem;
    align-items: center;
    justify-content: space-between;
  }
  .info .question {
    color: #329dff;
  }
  .question i {
    color: #dfdfdf;
    font-size: 1rem;
  }

</style>
