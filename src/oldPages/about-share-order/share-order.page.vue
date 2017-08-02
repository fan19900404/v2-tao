<template>
  <app-header :title="title" @share-order="shareOrder" :action="action"></app-header>
  <!-- 晒单界面 -->
  <div class="share-order-page">
    <!-- share order words 晒单文字 -->
    <div class="share-order-words-container dr-flex">
      <div class="share-order-words flex-1 dr-flex">
        <textarea v-model="words" class="flex-1 words" placeholder="这一刻的想法......">{{words}}</textarea>
        <div class="compute-length">{{wordsNum}}/100</div>
      </div>
    </div>
    <!-- upload image 上传图片 -->
    <div id="uploader" class="img-uploader-container flex">
      <!--<div class="img-container">-->
        <!--<img class="img" src="/oldStatic/store/flow-175425-AngularJS-Logo-1024x547png.1.jpg">-->
      <!--</div>-->
      <div v-for="v of filePath" class="img-container">
        <img class="img" src="{{v}}">
      </div>

      <div class="img-uploader img-container">
        <input id="picker" class="input-uploader" type="file" accept="image/*" multiple="multiple">
      </div>
    </div>

    <div class="publish-btn-container">
      <button @click="shareOrder" :class="{'publish-btn--disabled': 0 === words.length, 'publish-btn--active': 0 !== words.length}" class="publish-btn">发布</button>
    </div>

  </div>

  <!-- 底部菜单兰 -->
  <app-bottom-bar></app-bottom-bar>

  <!-- alert 弹窗部分 -->
  <common-alert @common-alert-action="closeAlertAction"
                @cancel-alert="cancelAlert"
                @never-show="neverShow"
                :type="alertType"
                :show-alert="alertShow"
                :alert-status="alertStatus"
                :alert-msg="alertMsg">
  </common-alert>

  <share-order-alert @share-order-alert-action="shareOrderAlertAction"
                     @share-order-cancel-alert-action="shareOrderCancelAlertAction"
                     :type="TBAlertType"
                     :show-alert="TBAlertShow"
                     :alert-status="TBAlertStatus"
                     :alert-msg="alertMsg">
  </share-order-alert>
</template>

<script>
  'use strict';
  import AppHeader from '../../oldComponents/common/header/app-header';
  import AppBottomBar from '../../oldComponents/common/footer/app-bottom-bar';
  import CommonAlert from '../../oldComponents/common/alert/common-alert';
  import ShareOrderAlert from '../../oldComponents/feature/about-share-order/share-order-alert';
  export default {
    components: {
      AppHeader,
      CommonAlert,
      ShareOrderAlert,
      AppBottomBar
    },
    data() {
      return {
        title:'晒单',
        action:'shareOrder',
        filePath:[],
        imageId:[],
        imageIdStr:'',
        words:'',
        // 关于弹窗
        alertType: 2,
        alertShow: true,
        alertStatus: '',
        alertMsg: '',
        alertSuccess: true,

        // 晒单成功后的弹窗
        TBAlertType: 0,
        TBAlertShow: false,
        TBAlertStatus: '',

        showTips: false,
        serverShowTips: false,
        // 晒单的id
        shareOrderId: null
      }
    },
    mounted() {
      if(1 === +this.$route.query.isShow) {
        this.alertShow = true;
      }
      else {
        this.alertShow = false;
      }
    },
    methods: {
      shareOrderAlertAction() {
        // TODO 去分享圈子
        this.$router.replace('/shaidandetail/' + this.shareOrderId);
      },
      shareOrderCancelAlertAction() {
        // TODO 取消,返回确认商品
        this.$router.push({
          name: 'confirm-goods',
          params: {
            id: this.$route.params.id
          }
        })
      },
      queryShows() {
        // TODO 检验是否提示
//        this.alertType = 2;
      },
      neverShow(status) {
        this.showTips = status;
      },
      closeAlertAction() {
        // TODO 发送请求
        if((2 == this.alertType) && (this.showTips)) {
          let query = {};
          let that = this;
          Vue.OneMallHttp(this).GET(query, Vue.OneMallUrl.notice_confirm)
            .then(function(res) {
              if(10000 == res.code) {
                // TODO
              }
            })
        }
        this.alertType = 0;
      },
      cancelAlert() {
        // TODO
        this.alertType = 0;
      },
      shareOrder() {
        var that = this;
        that.imageIdStr = that.imageId.join(',') || '';
        var query = {
          numberID: that.$route.params.id,
          title: that.words,
          imageID: that.imageIdStr
        };
        Vue.OneMallHttp(this).GET(query, Vue.OneMallUrl.add_show)
          .then(function(res) {
            if(10000 === res.code) {
              that.alertSuccess = true;
              that.TBAlertShow = true;
              that.TBAlertStatus = '已成功分享到晒单圈';
              that.shareOrderId = res.showID;
            }
            else {
              that.alertSuccess = false;
              that.alertShow = true;
              that.alertMsg = '消息提示';
              that.alertStatus = '错误消息: ' + res.msg;
            }
          });
      }
    },
    computed: {
      wordsNum() {
        return this.words.length;
      }
    },
    ready: function () {
      $("body").css("background-color","#f8f8f8");

      var that = this;
      // 字数限制
      this.$watch('words', function(newValue) {
          var temp = newValue || '';
          if(temp.length >= 100) {
            that.words = temp.substring(0, 100);
          }
      });

      // 使用flow.js
      var testUploadIP = location.hostname;
      var flow = new Flow({
//        target:'http://' + testUploadIP + ':8001/upload',
//        target:Vue.OneMallUrl.upload_img,
        target:'http://p.lly800.com/Show/Index/add_image',
        query:{},
        testChunks: false,
        // 验证携带cookie
        withCredentials: true,
        // 允许重复上传
        allowDuplicateUploads: true,
        fileParameterName: 'file'
      });
      flow.assignBrowse(document.getElementById('picker'));
      flow.on('fileAdded', function(file, event){
        console.log(file, event, 'asd', file.flowObj.files);
        //that.filePath = file.flowObj.files;
        layer.open({
          content: '开始上传图片!',
          skin:'msg',
          shade: false,
          time: 2
        });
      });
      flow.on('filesSubmitted', function(array, e) {
        // 开始上传文件
        flow.upload();
      });
      flow.on('fileSuccess', function(file,message){
          layer.open({
            content: '图片上传成功!',
            skin:'msg',
            shade: false,
            time: 2
          });
          var temp = JSON.parse(message);
          that.filePath.push(temp.imageUrl);
          that.imageId.push(temp.imageId);
      });
      flow.on('fileError', function(file, message){
        console.log(file, message);
        var temp = JSON.parse(message);
        // 错误提示
        layer.open({
          content: '图片上传失败!' + temp.msg,
          skin:'msg',
          shade: false,
          time: 2
        });
      });


    },
    destroyed: function() {
//      $("body").css("background-color","#fff");
    }
  }
</script>

<style scoped>
  .share-order-page {
    background-color: #fff;
  }
  .share-order-words-container {
    height: 19.6rem;
  }
  .share-order-words {
    margin-left: 1.6rem;
    margin-top: 1rem;
    border-bottom: 1px solid #dfdfdf;
    flex-direction: column;
  }
  .words {
    box-sizing: border-box;
    font-size: 1.5rem;
    display: block;
    border: 0;
    resize: none;
    color: inherit;
    line-height: 1.41176471;
    padding-right: 1.6rem;
    outline: 0;
  }
  .compute-length {
    box-sizing: border-box;
    height: 1.5rem;
    line-height: 1.5rem;
    text-align: right;
    font-size: 1.2rem;
    color: #898989;
    padding-right: 1.6rem;
    margin-bottom: 1rem;
  }
  .img-uploader-container {
    border-bottom: 1px solid #dfdfdf;
    padding: 0 0 0 1.6rem;
    flex-wrap: wrap;
  }
  .img-container {
    height: 8rem;
    width: 8rem;
    margin: 1rem 1rem 1rem 0;
  }
  .img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .img-uploader {
    box-sizing: border-box;
    position: relative;
    border: 1px solid #d9d9d9;
  }
  .img-uploader::before,
  .img-uploader::after {
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    background-color: #d9d9d9;
  }
  .img-uploader::before {
    width: 2px;
    height: 5rem;
  }
  .img-uploader::after {
    width: 5rem;
    height: 2px;
  }
  .img-uploader .input-uploader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    height: 100%;
    opacity: 0
  }
  /* 发布按钮 */
  .publish-btn-container {
    padding-top: 1rem;
    background-color: #f8f8f8;
    text-align: right;
  }
  .publish-btn {
    border: none;
    border-radius: .5rem;
    color: #fff;
    width: 7rem;
    height: 3.5rem;
    line-height: 3.5rem;
    text-align: center;
    font-size: 1.6rem;
    margin-right: 1.6rem;
  }
  .publish-btn--disabled {
    background-color: #bbbbbb;
  }
  .publish-btn--active {
    background-color: #ff4a4a;
  }

</style>
