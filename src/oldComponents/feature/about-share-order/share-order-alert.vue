<!-- dreamapple -->
<template>
  <!-- mask 遮罩层 -->
  <div v-if="showAlert" class="mask dr-flex">

    <!-- type:0-->
    <div v-if="0 === type" class="alert-container flex-1 type-0">
      <div class="alert-header">
        <div class="header-content">
          <div class="close-container">
            <span @click="closeAlert" class="close"></span>
          </div>
        </div>
      </div>
      <div class="alert-content">
        <!--<div class="alert-msg">{{alertMsg}}</div>-->
        <!--<p class="alert-status">{{alertStatus}}</p>-->
        <p class="alert-single-status">{{alertStatus}}</p>
        <div class="btns-container dr-flex">
          <div @click="cancelAlertAndDo" class="normal-btn flex-1">取消</div>
          <div @click="closeAlertAndDo" class="stress-btn flex-1 ml">去看看</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .close-container {
    position: absolute;
    width: 2rem;
    height: 2rem;
    top: 1rem;
    right: -1rem;
  }
  .close {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .close::before,
  .close::after {
    content: '';
    position: absolute;
    height: 2px;
    width: 1.6rem;
    top: 0.6rem;
    left: -1rem;
    background: #dfdfdf;
  }
  .close::after {
    transform: rotate(-45deg);
  }
  .close::before {
    transform: rotate(45deg);
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    justify-items: center;
    align-items: center;
  }
  .alert-container {
    background-color: #fff;
    margin: auto 3.9rem;
    max-width: 28rem;
    border-radius: .5rem;
  }
  .alert-header {
    height: 4rem;
    text-align: center;
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 4rem;
    border-bottom: 1px solid #dfdfdf;
  }
  .header-content {
    margin:0 1.6rem;
    height: 100%;
    position: relative;
  }
  .alert-content {
    box-sizing: border-box;
    padding: 2rem 1.6rem 3rem;
  }
  .alert-msg {
    font-size: 1.6rem;
    font-weight: 600;
    height: 3.4rem;
    line-height: 3.4rem;
    text-align: center;
  }
  .alert-status {
    font-size: 1.2rem;
    color: #cdcdcd;
    margin-bottom: 3rem;
    text-align: center;
  }
  .alert-single-status {
    font-size: 1.6rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 2rem;
  }
  .btns-container {
    width: 100%;
    height: 3.6rem;
    justify-content: space-between;
  }
  .stress-btn {
    max-width: 12rem;
    text-align: center;
    height: 3.6rem;
    color: #fff;
    font-size: 1.4rem;
    background-color: #ff4a4a;
    border-radius: .5rem;
    line-height: 3.6rem;
  }
  .normal-btn {
    max-width: 12rem;
    text-align: center;
    height: 3.6rem;
    color: #898989;
    font-size: 1.4rem;
    background-color: #f8f8f8;
    border-radius: .5rem;
    line-height: 3.6rem;
  }
  .ml {
    margin-left: 1rem;
  }

</style>

<script>
  export default {
    props: [
      'headerText',
      'type',
      'showAlert',
      'alertMsg',
      'alertStatus',
      'replaceBtnText'
    ],
    data() {
      return {
        status: false,
        innerReplaceBtnText: null
      }
    },
    methods: {
      closeAlert() {
        this.showAlert = false;
        this.$dispatch('share-order-cancel');
      },
      closeAlertAndDo() {
        this.showAlert = false;
        this.$dispatch('share-order-alert-action');
      },
      cancelAlertAndDo() {
        this.showAlert = false;
        this.$dispatch('share-order-cancel-alert-action');
      }
    },
    mounted() {
    }
  }
</script>
