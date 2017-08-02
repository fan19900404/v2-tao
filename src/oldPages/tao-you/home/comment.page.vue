<!-- author: dreamapple -->
<template>
  <div>
    <div class="contanier dr-flex">
      <div class="comment">
        <div class="comment__title dr-flex">
          <div class="comment__cancel">我也来说几句</div>
          <div class="comment__title-header flex-1">
            {{curLength}}/{{getLength(totallength, curLength)}}
          </div>
        </div>
        <div class="comment__area">
          <textarea ref="content" v-model="commentContent" class="user-comment" @keyup.prevent="onkeyupH" @change.prevent="onkeyupH" @paste.prevent="onpasteH" :placeholder="commentPlaceholder"></textarea>
          <app-button btn-text="确定" @button-component="post"></app-button>
        </div>
      </div>
    </div>
    <return-btn></return-btn>
    <one-simple-button :show="showMsg" :content="msgContent" btn-text="确定"></one-simple-button>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import $ from 'jquery';
import Vue from 'vue';
import AppButton from '../../../oldComponents/tao-you/button/button.component';
import OneSimpleButton from '../../../oldComponents/tao-you/dialog/one-button-simple-dialog.component';
import ReturnBtn from '../../../oldComponents/tao-you/button/return.component';

export default {
  components: {
    AppButton,
    OneSimpleButton,
    ReturnBtn,
  },
  data() {
    return {
      commentContent: '',
      commentPlaceholder: '发表自己的见解',
      totallength: '400',
      bPressed: false,
      // 弹框
      showMsg: false,
      msgContent: '',
    };
  },
  computed: {
    curLength() {
      if (!this.commentContent) {
        return 0;
      }
      return this.getByteLen(this.commentContent);
    },
  },
  methods: {
    getLength(totallength, curLength) {
      return totallength - curLength < 0 ? 0 : totallength - curLength;
    },
    post() {
      let cType = this.$route.params.type;
      let param = {
        newsID: this.$route.params.newsID,
        content: this.commentContent,
        fromType: this.$route.params.category,
        type: (this.$route.params.type == '2') ? '2' : '1',
      };
      if (param.type === '2') {
        param.repliedNewsID = this.$route.query.commentID;
      }
      // 输入验证
      if (param.content.trim() === '') {
        this.msgContent = '评论失败，内容不能为空';
        this.showMsg = true;
        return;
      }
      let len = this.getByteLen(param.content);
      if (len > this.totallength) {
        this.msgContent = '评论失败，内容输入过长';
        this.showMsg = true;
        return;
      }
      if (this.bPressed) {
        return;
      }
      this.bPressed = true;
      let that = this;

      // post数据
      Vue.ClientHttp(this).POST(param, Vue.ClientUrl.do_comment)
        .then((res) => {
          if (res.code !== 10000) {
            this.bPressed = false;
            this.msgContent = res.msg || '评论失败';
            this.showMsg = true;
            return;
          }
          if (res.result) {
            Toast({ message: res.msg || '评论成功', duration: 1000 });
            setTimeout(() => {
              if (this.$route.params.category == '2') {
                this.$router.replace({ name: 'TaoYouGameCenterGameDetails', params: { id: param.newsID }, query: { tabIndex: 3 } });
                return;
              }
              switch (cType) {
                case '0':
                  this.$router.replace({ name: 'TaoYouNewsDetail', params: { id: param.newsID } });
                  break;
                case '1':
                  this.$router.replace({ name: 'TaoYouHomeAllComments', params: { id: param.newsID } });
                  break;
                case '2':
                  this.$router.replace({ name: 'TaoYouHomeAllReplies', params: { newsID: param.newsID, id: param.repliedNewsID } });
                  break;
              }
            }, 1500);
          }
        });
    },
    onkeyupH(e) {
      if (this.getByteLen(this.commentContent) >= this.totallength) {
        this.$nextTick(function () {
          this.commentContent = this.cutString(this.commentContent, this.totallength);
        });
      }
    },
    onpasteH(e) {
      let pos = 0;
      const ctrl = e.target;
      if (ctrl.selectionStart || ctrl.selectionStart == '0') {
        pos = ctrl.selectionStart;
      }
      const text = (e.originalEvent || e).clipboardData.getData('text/plain');
      const unionText = this.commentContent.substring(0, pos) + text + this.commentContent.substring(pos);
      if (this.getByteLen(unionText) > this.totallength) {
        this.commentContent = this.cutString(unionText, this.totallength);
        return false;
      }
      this.commentContent = unionText;
    },
    getByteLen(val) {
      let len = 0;
      for (let i = 0; i < val.length; i++) {
        const length = val.charCodeAt(i);
        if (length >= 0 && length <= 128) {
          len += 1;
        } else {
          len += 2;
        }
      }
      return len;
    },
    cutString(val, limit) {
      let len = 0;
      for (var i = 0; i < val.length; i++) {
        const length = val.charCodeAt(i);
        if (length >= 0 && length <= 128) {
          len += 1;
        } else {
          len += 2;
        }
        if (len > limit) {
          return val.substring(0, i);
        }
      }
      return val.substring(0, i + 1);
    },
    stopScroll(e) {
      e.preventDefault();
      return false;
    },
  },
  watch: {
    show(flag) {
      if (flag) {
        this.$refs.content.select();
      }
    },
  },
  mounted() {
    $('body').css('background-color', '#f8f8f8');
  },
};
</script>
<style lang="scss" scoped>
.flex-1 {
  flex: 1;
  box-flex: 1;
  -webkit-box-flex: 1;
}

.dr-flex {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

.contanier {
  background-color: #f5f5f9;
  justify-content: center;
  align-items: flex-start;
}

.comment {
  background-color: #fff;
  width: 100%;
  border-bottom: solid #e5e5e5 1px;
}

.comment__title {
  height: .38rem;
  line-height: .38rem;
  align-items: center;
  padding: .14rem .15rem .1rem .15rem;
  box-sizing: border-box;
}

.comment__title-header {
  text-indent: .15rem;
  font-size: .12rem;
  line-height: .38rem;
  color: #ccc;
}

.comment__post {
  width: .5rem;
  height: .24rem;
  font-size: .12rem;
  background-color: #ffffff;
  color: #000000;
  text-align: center;
  line-height: .24rem;
}

.comment__cancel {
  color: #999;
  font-size: .16rem;
  line-height: .38rem;
}

.comment__area {
  margin: 0 .16rem .21rem .16rem;
}

.user-comment {
  display: block;
  box-sizing: border-box;
  width: 100%;
  font-size: .12rem;
  line-height: .12rem;
  padding: .1rem;
  resize: none;
  height: 1.2rem;
  border-radius: .05rem;
  border: 1px solid #ddd;
  margin-bottom: 0.2rem;
  outline: none;
  -webkit-appearance: none;
}

.user-comment::placeholder {
  font-size: .12rem;
  color: #dfdfdf;
}

.comment__len {
  margin-top: 0.05rem;
  height: .15rem;
  line-height: .15rem;
  font-size: .12rem;
  color: #898989;
  text-align: right;
}
</style>
