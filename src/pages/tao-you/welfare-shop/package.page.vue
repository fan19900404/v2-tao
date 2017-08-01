<template>
  <div>
    <header-component :title="title"></header-component>
    <div class="container">
      <input type="text" placeholder="请输入礼包码" class="input" v-model="inputText">
      <button class="button" @click="exchange">提交</button>
    </div>
    <div class="outline">
      <ul class="text">
        <li class="li-spec">使用方法：</li>
        <li class="text-li">1.在上方输入框中输入礼包码</li>
        <li class="text-li">2.点击提交</li>
        <li class="text-li">3.对应礼包自动发放至我的抵扣券页面</li>
        <li class="li-spec">礼包码获取方式：</li>
        <li class="text-li">1.加QQ群：284520172</li>
        <li class="text-li">2.平台活动</li>
        <li class="text-li">3.其他活动</li>
      </ul>
      <p class="attention">注：活动最终解释权归杭州淘游科技有限公司享有</p>
    </div>
    <one-button :show.sync="show" :content="text" :btn-text="btnText" @one-btn-dialog-component="oneBtnDialogComponent" :has-action.sync="hasAction"></one-button>
    <return-btn></return-btn>
  </div>
</template>

<script>
import HeaderComponent from '../../../components/tao-you/layout/header.component';
import ReturnBtn from '../../../components/tao-you/button/return.component';
import OneButton from '../../../components/tao-you/dialog/one-button-simple-dialog.component';

export default {

  data() {
    return {
      title: '礼包兑换',
      // 输入框内容
      inputText: '',
      // 是否显示弹窗
      show: false,
      // 弹框按钮是否有动作
      hasAction: false,
      // 弹框内容
      text: '你输入的兑换码错误!请重新输入',
      // 按钮内容
      btnText: '点击查看',
      // 兑换类型
      // type:null
    };
  },
  components: {
    ReturnBtn,
    HeaderComponent,
    OneButton,
  },
  methods: {
    exchange() {
      console.log(this.inputText);
      const query = {
        code: this.inputText,
      };
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.exchange_platform_gift)
        .then((res) => {
          if (res.code === 10000) {
            this.show = true;
            this.hasAction = true;
            this.text = res.msg;
            this.btnText = '点击查看';
            // this.type = res.type;
          } else {
            this.show = true;
            this.text = res.msg;
            this.btnText = '重新输入';
          }
        });
    },
    // 弹窗确定按钮
    oneBtnDialogComponent() {
      // let link;
      // if(this.type==="1"){
      // 淘币
      // link = "TaoYouPersonalCenterTaoBi"
      // };
      // if(this.type==="2"){
      // 淘豆
      // link = "TaoYouWelfareShopWelfareMyTaodou"
      // };
      // if(this.type==="3" || this.type==="4"){
      // 抵扣劵 || 礼包
      // link = "TaoYouPersonalCenterRebate"
      // };
      // console.log(link);
      this.$router.push({
        name: 'TaoYouPersonalCenterNotice',
      });
    },
  },
  watch: {
    inputText: function () {
      if (this.inputText == '') {
        $('.button').attr('disabled', true).css({ opacity: '.5' });
        return;
      }
      $('.button').removeAttr('disabled').css({ opacity: '1' });
    },
  },
  mounted() {
    $('.button').attr('disabled', true).css({ opacity: '.5' });
    $('body').css({ background: '#ffffff' });
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/tao-you/common.scss";
.container {
  background: $white;
  border-bottom: 1px solid $primary-border;
  border-top: 1px solid $primary-border;
  display: flex;
  flex-flow: column nowrap;
}

.input {
  width: auto;
  height: .42rem;
  border: 1px solid $primary-border;
  outline: none;
  -webkit-appearance: none;
  /*去除系统默认的样式*/
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  /* 点击高亮的颜色*/
  border-radius: .05rem;
  margin: .30rem .15rem .15rem .15rem;
  vtical-align: middle;
  text-align: center;
}

.input::-webkit-input-placeholder {
  font-size: 16px;
}

.button {
  height: .44rem;
  background-color: $primary;
  font-size: 20px;
  text-align: center;
  line-height: .44rem;
  color: $white;
  border-radius: .05rem;
  margin: 0 .15rem .3rem;
  border: none;
}

.text {
  background: $white;
  padding-bottom: .1rem;
}

.text li {
  list-style: none;
  margin: 0 .15rem;
}

.li-spec {
  font-size: 16px;
  color: $dark;
  padding: .16rem 0 .055rem 0;
}

.text-li {
  font-size: 14px;
  color: $information;
  line-height: 25px;
}

.outline {
  /**border-bottom: 1px solid $primary-border;**/
}

.attention {
  margin: 0 .15rem;
  color: #a5a5a5;
  font-size: .14rem;
}
</style>
