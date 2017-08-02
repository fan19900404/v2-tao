<!-- author: dreamapple -->
<template>
  <div v-show="show" class="mask dr-flex">
    <div class="comment">
      <div class="comment__title dr-flex">
        <div @click="cancel" class="comment__cancel">取消</div>
        <div class="comment__title flex-1"></div>
        <div @click="post" class="comment__post">发表</div>
      </div>
      <div class="comment__area">
        <textarea v-el:content v-model="commentContent" class="user-comment" @keyup="onkeyupH" @paste.prevent="onpasteH" placeholder="发表自己的见解"></textarea>
        <p v-if="lengthLimit" class="comment__len">当前已输入{{curLength}}个字符, 您还可以输入{{(totallength - curLength<0)?0:totallength - curLength }}个字符。 </p>
      </div>
    </div>
  </div>
</template>

<script>
  'use strict';
  export default {
    props: {
      // 控制弹窗显示
      show: {
        type: Boolean,
        default: false
      },
      // 评论的内容
      commentContent: {
        type: String
      },
      // 是否开启长度验证
      lengthLimit: false,
      // 字符长度
      totallength: {
        type: Number,
        default: 300
      }
    },
    computed: {
      curLength: function () {
        if(!this.commentContent){
          return 0;
        }
        return this.getByteLen(this.commentContent);
      }
    },
    methods: {
      cancel() {
        this.show = false;
        this.$dispatch('game-comment-cancel');
      },
      post() {
        this.show = false;
        this.$dispatch('game-comment-post');
      },
      onkeyupH(e){
        if(this.getByteLen(this.commentContent) >= this.totallength){
          this.commentContent = this.cutString(this.commentContent, this.totallength);
        }
      },
      onpasteH(e){
        let pos = 0;
        let ctrl = e.target;
        if (ctrl.selectionStart || ctrl.selectionStart == '0'){
          pos = ctrl.selectionStart;
        }
        let text = (e.originalEvent || e).clipboardData.getData('text/plain');
        let unionText = this.commentContent.substring(0, pos)+ text + this.commentContent.substring(pos);
        if(this.getByteLen(unionText) > this.totallength){
          this.commentContent = this.cutString(unionText, this.totallength);
          return false;
        }
        this.commentContent = unionText;
      },
      getByteLen(val) {
        let len = 0;
        for (let i = 0; i < val.length; i++) {
          let length = val.charCodeAt(i);
          if (length >= 0 && length <= 128) {
            len += 1;
          } else {
            len += 2;
          }
        }
        return len;
      },
      cutString(val, limit){
        let len = 0;
        for (var i = 0; i < val.length; i++) {
          let length = val.charCodeAt(i);
          if (length >= 0 && length <= 128) {
            len += 1;
          } else {
            len += 2;
          }
          if(len > limit){
            return val.substring(0, i);
          }
        }
        return val.substring(0, i + 1);
      }
    },
    watch: {
      show(flag){
        if(flag){
          this.$els.content.select();
        }
      }
    }
  }
</script>

<style scoped>
  .flex-1 {
    flex: 1;
    box-flex: 1;
    -webkit-box-flex: 1;
  }

  .flex-2 {
    flex: 2;
    box-flex: 2;
    -webkit-box-flex: 2;
  }
  .dr-flex {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
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
  .comment{
    background-color: #dfdfdf;
    width: 100%;
  }
  .comment__title {
    height: 4.4rem;
    align-items: center;
    padding: 0 1.6rem;
  }
  .comment__post {
    width: 5rem;
    height: 2.4rem;
    font-size: 1.2rem;
    background-color: #31a2ee;
    color: #fff;
    text-align: center;
    line-height: 2.4rem;
  }
  .comment__cancel {
    font-size: 1.6rem;
    color: #898989;
    line-height: 4.4rem;
  }
  .comment__area {
    margin: 0 1.6rem 2.1rem 1.6rem;
  }
  .user-comment {
    display: block;
    box-sizing: border-box;
    width: 100%;
    font-size: 1.2rem;
    line-height: 1.2rem;
    padding: 1rem;
    resize: none;
    height: 8.6rem;
    border-radius: .5rem;
    border: 1px solid #ddd;
  }
  .user-comment::placeholder {
    font-size: 1.2rem;
    color: #dfdfdf;
  }
  .comment__len{
    margin-top: 0.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
    font-size: 1.2rem;
    color: #898989;
    text-align: right;
  }
</style>
