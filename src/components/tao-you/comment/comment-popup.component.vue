<!-- author: dreamapple -->
<template>
  <div ref="mask" v-show="show" class="mask dr-flex">
    <div class="comment">
      <div class="comment__title dr-flex">
        <div class="comment__cancel">我也来说几句</div>
        <div class="comment__title-header flex-1">
          {{ curLength }} / {{(totallength - curLength < 0)?0:totallength - curLength }}
        </div>
        <div @click="post" class="comment__post">发表</div>
      </div>
      <div class="comment__area">
        <textarea ref="content" v-model="commentContent" class="user-comment" @keyup.prevent="onkeyupH" @change.prevent="onkeyupH" @paste.prevent="onpasteH" :placeholder="commentPlaceholder"></textarea>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // 控制弹窗显示
    show: {
      type: Boolean,
      default: false,
    },
    // 评论的内容
    commentContent: {
      type: String,
      default: '',
    },
    //
    commentPlaceholder: {
      type: String,
      default: '发表自己的见解',
    },
    // 是否开启长度验证
    lengthLimit: true,
    // 字符长度
    totallength: {
      type: Number,
      default: 400,
    },
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
    cancel(e) {
      if (this.$refs.mask !== e.target) {
        return;
      }
      this.show = false;
      this.$emit('game-comment-cancel');
    },
    post() {
      this.show = false;
      this.$emit('game-comment-post', this.commentContent, this.totallength, this.getByteLen, () => { this.commentContent = ''; });
      // this.commentContent = '';
    },
    onkeyupH() {
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
      return true;
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

.mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 30;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  justify-content: center;
  align-items: center;
}

.comment {
  z-index: 60;
  background-color: #dfdfdf;
  width: 100%;
}

.comment__title {
  height: .44rem;
  line-height: .44rem;
  color: #898989;
  font-size: .16rem;
  align-items: center;
  padding: 0 .16rem;
}

.comment__title-header {
  text-indent: .15rem;
  font-size: .12rem;
  line-height: .44rem;
  color: #cccccc;
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
  font-size: .16rem;
  color: #a5a5a5;
  line-height: .44rem;
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
  height: .86rem;
  border-radius: .05rem;
  border: 1px solid #ddd;
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
