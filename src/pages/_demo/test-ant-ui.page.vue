<template>
  <div v-if="pageShow">
    <app-header></app-header>
    <toast :show="false" :toast-type="'text'" :toast-icon-type="'loading'" :toast-text="'正在加载中'"></toast>
    <br>
    <app-button v-on:button-component="say" :btn-type="btnType"></app-button>
    <one-simple-button :show="false" :content="'恭喜你中大奖了'" @one-btn-dialog-component="say" :has-slot="false">
      <!--<p class="slot" slot>qweqwe</p>-->
    </one-simple-button>
    <two-simple-button :show="false" :content="'恭喜你中大奖了'"
                       :disabled-btn="0"
                       :left-btn-text="'返回'"
                       @two-btns-dialog-component-left="say"
                       @two-btns-dialog-component-right="say"></two-simple-button>
    <br>
    <notice :content="notice_msg"></notice>
    <br>
    <service-check></service-check>

    <br>
    <p>{{12345678 | moneyWidthComma}} <span class="icon-home"></span></p>

    <scroll-notice :notices="notices" :time="1000"></scroll-notice>

    <!--<app-footer></app-footer>-->

    <comment-dialog @post-comment="alertComment"></comment-dialog>

    <a class="img-wrapper" @click.prevent="showUploadDialogHandle">图片裁剪</a>
    <cropper :show="showUploadDialog"></cropper>
  </div>
</template>

<style lang="scss" scoped>
  .slot {
    margin-top: .3rem;
    background-color: #ff00ff;
  }
</style>

<script>
  import AppHeader from '../../components/tao-you/layout/header.component';
  import Toast from '../../components/tao-you/toast/toast.component';
  import AppButton from '../../components/tao-you/button/button.component';
  import OneSimpleButton from '../../components/tao-you/dialog/one-button-simple-dialog.component';
  import TwoSimpleButton from '../../components/tao-you/dialog/two-buttons-simple-dialog.component';
  import Notice from '../../components/tao-you/notice/notice.component';
  import AppFooter from '../../components/tao-you/layout/footer.component';
  import ServiceCheck from '../../components/tao-you/notice/service-check.component';
  import ScrollNotice from '../../components/tao-you/notice/scroll-notice.component';
  import CommentDialog from '../../components/tao-you/comment/comment-dialog.component';
  import Cropper from '../../components/common/image-upload/cropper-upload.component';

  export default {
    components: {
      AppHeader,
      Toast,
      AppButton,
      OneSimpleButton,
      TwoSimpleButton,
      Notice,
      AppFooter,
      ServiceCheck,
      ScrollNotice,
      CommentDialog,
      Cropper,
    },
    data() {
      return {
        pageShow: false,
        btnType: 1,
        notice_msg: 'qwe',
        notices: [
          {}, {}, {},
        ],
        showUploadDialog: false,
      };
    },
    mounted() {
      this.pageShow = true;
    },
    methods: {
      say() {
        alert(1);
      },
      alertComment(str) {
        alert(str);
      },
      showUploadDialogHandle() {
        this.showUploadDialog = true;
      },
    },
    events: {
      'one-dialog-btn': function () {
        console.log(122);
      },
    },
  };
</script>
