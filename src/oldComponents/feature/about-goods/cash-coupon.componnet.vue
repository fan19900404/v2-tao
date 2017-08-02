<!-- author: dreamapple -->
<template>
  <div v-show="show" class="mask dr-flex">
    <div class="cash-coupon">
      <div class="cash-coupon__title dr-flex">
        <div class="cash-coupon__title-content flex-1">{{title}}</div>
        <div class="cash-coupon__title-close dr-flex">
          <span @click="close" class="close"></span>
        </div>
      </div>
      <div class="cash-coupon__content">
        <ul class="coupon-list">
          <li @click="selectWhich($index)" class="coupon dr-flex" v-for="v of allItem">
            <div class="coupon-select">
              <input type="radio" name="coupon" class="coupon-select__radio">
              <span class="coupon-select__img" :class="{'coupon-select__img--normal': $index != selected, 'coupon-select__img--active': $index === selected}"></span>
            </div>
            <div class="coupon-info flex-1">
              <div class="coupon-info__name">{{v.money}}元代金券</div>
              <div class="coupon-info__expire">{{v.expire}}小时候过期</div>
            </div>
            <div class="coupon-value">{{v.money}}元</div>
          </li>
        </ul>
      </div>
      <div class="cash-coupon__bottom">
        <button @click="btnAction" class="cash-coupon__bottom-btn">{{btnText}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  'use strict';
  export default {
    props: {
      // 是否显示弹窗
      show: {
        type: Boolean,
        default: false
      },
      // 标题文字
      title: {
        type: String
      },
      // 按钮文字
      btnText: {
        type: String
      },
      // 选中的哪一个
      selected: {
        type: Number,
        default: 0
      },
      // 选中的项目
      selectedItem: {
        type: Object
      },
      // 所有的项目
      allItem: {
        type: Array
      }
    },
    methods: {
      close() {
        this.show = false;
        this.$dispatch('cash-coupon-close');
      },
      btnAction() {
        this.show = false;
        this.$dispatch('cash-coupon-btn-action');
      },
      selectWhich(index) {
        this.selected = index;
      }
    }
  }
</script>

<style scoped>
  .close {
    position: relative;
    display: inline-block;
    width: 1.8rem;
    height: 1.8rem;
    overflow: hidden;
  }
  .close::before, .close::after {
    content: '';
    position: absolute;
    height: 2px;
    width: 100%;
    top: 50%;
    left: 0;
    margin-top: -1px;
    background-color: #898989;
  }
  .close::before {
    transform: rotate(45deg);
  }
  .close:after {
    transform: rotate(-45deg);
  }
  .dr-flex {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }
  /* 遮罩层 */
  .mask {
    position: fixed;
    background-color: rgba(0, 0, 0, .5);
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 200;
    flex-direction: column;
    justify-content: center;
  }
  .cash-coupon {
    margin: auto 1.6rem;
    border-radius: .5rem;
    background-color: #fff;
  }
  .cash-coupon__title {
    height: 4.5rem;
    padding: 0 1.6rem;
    background-color: #f8f8f8;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    border-bottom: 1px solid #dfdfdf;
  }
  .cash-coupon__title-content {
    font-size: 1.6rem;
    text-align: center;
    margin-left: 1.8rem;
    line-height: 4.5rem;
  }
  .cash-coupon__title-close {
    align-items: center;
  }
  .cash-coupon__bottom {
    padding: 2rem 1.6rem 1.6rem 1.6rem;
    background-color: #f8f8f8;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
  }
  .cash-coupon__bottom-btn {
    display: block;
    width: 100%;
    border: none;
    outline: none;
    border-radius: .5rem;
    height: 4.5rem;
    background-color: #ff4a4a;
    line-height: 4.5rem;
    color: #fff;
    font-size: 1.6rem;
    text-align: center;
  }
  .cash-coupon__content {
  }
  .coupon-list {
    max-height: 22.8rem;
    overflow: auto;
  }
  .coupon {
    padding: 0 1.6rem;
    height: 5.7rem;
    border-bottom: 1px solid #dfdfdf;
    align-items: center;
    justify-content: center;
  }
  .coupon-value {
    width: 6rem;
    color: #898989;
    font-size: 1.4rem;
    text-align: right;
  }
  .coupon-info__name {
    color: #898989;
    font-size: 1.4rem;
  }
  .coupon-info__expire {
    color: #ff4a4a;
    font-size: 1.2rem;
  }
  .coupon-select {
    width: 2rem;
    margin-right: 1rem;
    position: relative;
  }
  .coupon-select__radio {
    display: block;
    position: absolute;
    width: 2rem;
    height: 2rem;
    top: 0;
    left: 0;
    appearance: none;
    background-color: transparent;
  }
  .coupon-select__img {
    display: block;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
  .coupon-select__img--normal {
    border: 1px solid #dfdfdf;
  }
  .coupon-select__img--active {
    background-image: url('/static/images/oldComponents/alert/checked.png');
    background-size: 100% 100%;
    background-position: center;
  }
</style>
