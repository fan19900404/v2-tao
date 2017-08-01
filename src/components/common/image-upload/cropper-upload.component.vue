<!-- 界面设计稿出来后再调整 -->
<template>
  <div class="mask" v-if="show">
    <div class="container">
      <div class="content cropper-bg">
        <div class="img-container">
          <img id="oriImage" :src="image" alt="" class="cropper-hidden" style="zoom:3">
          <div class="cropper-container" :style="sizeStyle">
            <div class="cropper-wrap-box">
                <div class="cropper-canvas" :style="sizeStyle">
                    <img class="workImage" :src="image" :style="sizeStyle">
                </div>
            </div>
            <div class="cropper-drag-box cropper-modal cropper-crop"></div>
              <div id="move-box" class="cropper-crop-box" :style="cropperCropBoxStyle">
                  <span class="cropper-view-box"><img class="workImage" :src="image" :style="cropperViewBoxImageStyle"></span>
                  <span class="cropper-dashed dashed-h"></span>
                  <span class="cropper-dashed dashed-v"></span>
                  <span class="cropper-center"></span>
                  <span class="cropper-face cropper-move"></span>
                  <span class="cropper-line line-e"></span>
                  <span class="cropper-line line-n"></span>
                  <span class="cropper-line line-w"></span>
                  <span class="cropper-line line-s"></span>
                  <span class="cropper-point point-e"></span>
                  <span class="cropper-point point-n"></span>
                  <span class="cropper-point point-w"></span>
                  <span class="cropper-point point-s"></span>
                  <span class="cropper-point point-ne"></span>
                  <span class="cropper-point point-nw"></span>
                  <span class="cropper-point point-sw"></span>
                  <span class="cropper-point point-se"></span>
              </div>
            </div>
            <div>
              <img :src="previewImage" alt="">
            </div>
          </div>
        </div>
        <div class="footer">
          <a @click="selectFile" class="dialog-button" role="button">选择</a>
          <a @click="scale(1)" class="dialog-button" role="button">放大</a>
          <a @click="scale(0)" class="dialog-button" role="button">缩小</a>
          <a @click="cutHandle" class="dialog-button" role="button">剪裁</a>
          <input id="fileInput" @change="changeHandle" type="file" name="" value="" class="hidden">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  'use strict';
  import Vue from 'vue';
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        loaded: false,
        element: null,
        width: $('.content').width() / 100,
        height: $('.content').height() / 100,
        image: 'static/images/goods-1.jpg',
        previewImage: null
      }
    },
    computed: {
      sizeStyle() {
        return {
          width: this.width * 100 + 'px',
          height: this.height * 100 + 'px'
          // width: this.width + 'rem',
          // height: this.height + 'rem'
        };
      },
      cropperCropBoxStyle() {
        return {
          left: (this.width - $(this.element).width() / 100) / 2 + 'rem',
          top: (this.height - $(this.element).height() / 100) / 2 + 'rem'
        };
      },
      cropperViewBoxImageStyle() {
        return {
          // width: this.width + 'rem',
          // height: this.height + 'rem',
          width: this.width * 100 + 'px',
          height: this.height* 100 + 'px',
          marginLeft: -(this.width - $(this.element).width() / 100) / 2 + 'rem',
          marginTop: -(this.height - $(this.element).height() / 100) / 2 + 'rem',
          transform: 'none'
        };
      }
    },
    mounted() {
    },
    mounted() {
      this.$watch('show', () => {
        if (this.loaded) {
          return;
        }
        this.loaded = true;
        this.width = $('.content').width() / 100;
        this.height = $('.content').height() / 100;

        this.element = document.getElementById("move-box");
        this.element && this.drag(this.element);
      });
    },
    methods: {
      selectFile() {
        $('#fileInput').trigger('click');
      },
      scale(flag){
        var zoom = parseFloat($('.workImage').css('zoom'));
        $('.workImage').css('zoom', flag ? zoom + 0.1 : ((zoom > 1) ? zoom - 0.1 : 1));
        console.log(zoom);
      },
      changeHandle(e) {

        var that = this;
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = () => {

          // 通过 reader.result 来访问生成的 DataURL
          var url = reader.result;
          that.image = url;
        };
        reader.readAsDataURL(file);
      },
      drag(element) {
        var that = this;
        element.style.top = this.getCss(element, "top");
        element.style.left = this.getCss(element, "left");

        var image = element.querySelector("img");

        // 边界值
        var cropperWrap = $('.content');
        var point = {
          left: 0.03,
          right: (cropperWrap.offset().width - $(element).width() - 3) / 100,
          top: 0.03,
          bottom: (cropperWrap.offset().height - $(element).height() - 3) / 100
        };
        console.log(point);

        var hammer = new Hammer(element); //hammer实例
        var x = 0;
        var y = 0;
        hammer.on('panstart', function(e) {
          e.preventDefault();

          x = parseFloat($(element).css('left'));
          y = parseFloat($(element).css('top'));
          // x = parseFloat($(element).offset().left);
          // y = parseFloat($(element).offset().top);
          x = parseFloat(element.style.left);
          y = parseFloat(element.style.top);

          console.log({x,y});

          return false;
        });
        hammer.on('panmove', function(e) {
          e.preventDefault();

          var left = 0;
          var top = 0;
          var deltaX = e.deltaX / 100;
          var deltaY = e.deltaY / 100;

          // 边界检测
          if (x + deltaX < point.left) {
            left = point.left;
          } else if (x + deltaX > point.right) {
            left = point.right;
          } else {
            left = x + deltaX;
          }
          if (y + deltaY < point.top) {
            top = point.top;
          } else if (y + deltaY > point.bottom) {
            top = point.bottom;
          } else {
            top = y + deltaY;
          }

          $(element).css({
            'left': left + 'rem',
            'top': top + 'rem'
          });
          $(image).css({
            'marginTop': -top + 'rem',
            'marginLeft': -left + 'rem'
          });

          return false;
        });
        hammer.on('panend', function(e) {
          e.preventDefault();
          console.log('panend');
        });
      },
      getCss(o, key) {
        return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
      },
      cutHandle() {
        var $image = $('#oriImage');
        var src = $image.attr('src');
        var canvasdata = this.getCanvasData();
        var cropBoxData = this.getCropBoxData();

        this.convertToData(src, canvasdata, cropBoxData, (basechar) => {

          // 图片预览
          this.previewImage = basechar;
        });
      },
      getCanvasData() {
        var $container = $(this.element).parent();
        var containerWidth = $container.width();
        var containerHeight = $container.height();
        return {
          left: 0,
          top: 0,
          width: containerWidth,
          height: containerHeight
        }
      },
      getCropBoxData() {
        var $target = $(this.element);
        return {
          left: parseFloat($target.css('left')) * 100,
          top: parseFloat($target.css('top')) * 100,
          width: parseFloat($target.width()),
          height: parseFloat($target.height())
        }
      },
      convertToData(url, canvasdata, cropdata, callback) {
        var cropw = cropdata.width; // 剪切的宽
        var croph = cropdata.height; // 剪切的宽
        var imgw = canvasdata.width; // 图片缩放或则放大后的高
        var imgh = canvasdata.height; // 图片缩放或则放大后的高

        var poleft = canvasdata.left - cropdata.left; // canvas定位图片的左边位置
        var potop = canvasdata.top - cropdata.top; // canvas定位图片的上边位置

        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        canvas.width = cropw;
        canvas.height = croph;

        var img = new Image();
        img.src = url;

        img.onload = function() {
          this.width = imgw;
          this.height = imgh;

          // 这里主要是canvas与图片的裁剪之间的关系位置
          ctx.drawImage(this, poleft, potop, this.width, this.height);
          var base64 = canvas.toDataURL('image/jpg', 1); // 这里的“1”是指的是处理图片的清晰度（0-1）之间，当然越小图片越模糊，处理后的图片大小也就越小
          callback && callback(base64) // 回调base64字符串
        }
      },

      // 图片压缩
      compress() {

      },

      // post提交
      upload() {

      }
    }
  }
</script>

<style scoped>
  .cropper-container {
    font-size: 0;
    line-height: 0;
    position: relative;
    user-select: none;
    direction: ltr !important;
  }
  .cropper-container img {
    display: block;
    width: 100%;
    min-width: 0 !important;
    max-width: none !important;
    height: 100%;
    min-height: 0 !important;
    max-height: none !important;
    image-orientation: 0deg !important;
  }
  .cropper-wrap-box, .cropper-canvas, .cropper-drag-box, .cropper-crop-box, .cropper-modal {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .cropper-wrap-box {
    overflow: hidden;
  }
  .cropper-drag-box {
    opacity: 0;
    background-color: #fff;
    filter: alpha(opacity=0);
  }
  .cropper-modal {
    opacity: .5;
    background-color: #000;
    filter: alpha(opacity=50);
  }
  .cropper-view-box {
    display: block;
    overflow: hidden;
    width: 100%;
    height: 100%;
    outline: 1px solid #39f;
    outline-color: rgba(51, 153, 255, .75);
  }
  .cropper-dashed {
    position: absolute;
    display: block;
    opacity: .5;
    border: 0 dashed #eee;
    filter: alpha(opacity=50);
  }
  .cropper-dashed.dashed-h {
    top: 33.33333%;
    left: 0;
    width: 100%;
    height: 33.33333%;
    border-top-width: 1px;
    border-bottom-width: 1px;
  }
  .cropper-dashed.dashed-v {
    top: 0;
    left: 33.33333%;
    width: 33.33333%;
    height: 100%;
    border-right-width: 1px;
    border-left-width: 1px;
  }
  .cropper-center {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 0;
    height: 0;
    opacity: .75;
    filter: alpha(opacity=75);
  }
  .cropper-center:before, .cropper-center:after {
    position: absolute;
    display: block;
    content: ' ';
    background-color: #eee;
  }
  .cropper-center:before {
    top: 0;
    left: -3px;
    width: 7px;
    height: 1px;
  }
  .cropper-center:after {
    top: -3px;
    left: 0;
    width: 1px;
    height: 7px;
  }
  .cropper-face, .cropper-line, .cropper-point {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    opacity: .1;
    filter: alpha(opacity=10);
  }
  .cropper-face {
    top: 0;
    left: 0;
    background-color: #fff;
  }
  .cropper-line {
    background-color: #39f;
  }
  .cropper-line.line-e {
    top: 0;
    right: -3px;
    width: 5px;
    cursor: e-resize;
  }
  .cropper-line.line-n {
    top: -3px;
    left: 0;
    height: 5px;
    cursor: n-resize;
  }
  .cropper-line.line-w {
    top: 0;
    left: -3px;
    width: 5px;
    cursor: w-resize;
  }
  .cropper-line.line-s {
    bottom: -3px;
    left: 0;
    height: 5px;
    cursor: s-resize;
  }
  .cropper-point {
    width: 5px;
    height: 5px;
    opacity: .75;
    background-color: #39f;
    filter: alpha(opacity=75);
  }
  .cropper-point.point-e {
    top: 50%;
    right: -3px;
    margin-top: -3px;
    cursor: e-resize;
  }
  .cropper-point.point-n {
    top: -3px;
    left: 50%;
    margin-left: -3px;
    cursor: n-resize;
  }
  .cropper-point.point-w {
    top: 50%;
    left: -3px;
    margin-top: -3px;
    cursor: w-resize;
  }
  .cropper-point.point-s {
    bottom: -3px;
    left: 50%;
    margin-left: -3px;
    cursor: s-resize;
  }
  .cropper-point.point-ne {
    top: -3px;
    right: -3px;
    cursor: ne-resize;
  }
  .cropper-point.point-nw {
    top: -3px;
    left: -3px;
    cursor: nw-resize;
  }
  .cropper-point.point-sw {
    bottom: -3px;
    left: -3px;
    cursor: sw-resize;
  }
  .cropper-point.point-se {
    right: -3px;
    bottom: -3px;
    width: 20px;
    height: 20px;
    cursor: se-resize;
    opacity: 1;
    filter: alpha(opacity=100);
  }
  .cropper-point.point-se:before {
    position: absolute;
    right: -50%;
    bottom: -50%;
    display: block;
    width: 200%;
    height: 200%;
    content: ' ';
    opacity: 0;
    background-color: #39f;
    filter: alpha(opacity=0);
  }
  @media (min-width:768px) {
    .cropper-point.point-se {
      width: 15px;
      height: 15px;
    }
  }
  @media (min-width:992px) {
    .cropper-point.point-se {
      width: 10px;
      height: 10px;
    }
  }
  @media (min-width:1200px) {
    .cropper-point.point-se {
      width: 5px;
      height: 5px;
      opacity: .75;
      filter: alpha(opacity=75);
    }
  }
  .cropper-invisible {
    opacity: 0;
    filter: alpha(opacity=0);
  }
  .cropper-bg {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
  }
  .cropper-hide {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
  }
  .cropper-hidden {
    display: none !important;
  }
  .cropper-move {
    cursor: move;
  }
  .cropper-crop {
    cursor: crosshair;
  }
  .cropper-disabled .cropper-drag-box, .cropper-disabled .cropper-face, .cropper-disabled .cropper-line, .cropper-disabled .cropper-point {
    cursor: not-allowed;
  }
  .am-dialog-mask:not([am-version]).show {
    display: block;
  }
  .mask {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    z-index: 9998;
  }
  .container {
    padding-top: .21rem;    /*max-width: 2.7rem;*/
    margin: 0 auto;
    border-radius: .07rem;
    -webkit-background-clip: padding-box;
    background-color: #fff;
    line-height: .21rem;
    width: 100%;
    margin: 0 .2rem;
    overflow-x: hidden;
    text-align: center;
  }
  .content {
    height: 2rem;    /*overflow-x: hidden;*/
  }
  .footer {
    margin-top: .15rem;
    border-top: 1px solid rgba(0, 0, 0, .05);
    display: -webkit-box;
    display: -webkit-flex;
  }
  .dialog-button {
    display: block;
    flex: 1;
    width: 100%;
    height: .5rem;
    line-height: .25rem;
    padding: .12rem 0 .13rem;
    font-size: .18rem;
    background: 0 0;
    border: 0;
    outline: 0;
    border-left: 1px solid rgba(0, 0, 0, .05);
    -webkit-appearance: none;
    color: #000;
    text-align: center;
    box-sizing: border-box;
    color: #108ee9;
  }
  .dialog-button:active {
    background-color: rgba(54, 57, 64, .05);
  }
  .cropper-crop-box {
    width: 1rem;
    height: 1rem;
  }
  .oriImage {
    width: 2.7rem;
    height: 2rem;
  }
</style>
