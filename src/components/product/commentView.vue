<template>
  <div class="comment-view space-top">
    <a href="" class="comment-info border-bottom-1px box-flex align-center justify-space-between entry-more">
      <div class="comment-count">用户评价({{comment.total}})</div>
      <div class="comment-degree">
        {{comment.detail.satisfy_per}}%
        <span>满意</span>
      </div>
    </a>
    <SingleComment :onecomment="comment.list[0]" />
  </div>
</template>

<script>
import SingleComment from './SingleComment'
export default {
  data () {
    return {

    }
  },
  props: ['comment'],
  components: {
    SingleComment
  }
}
</script>

<style scoped>
.comment-view {
  text-align: left;
  background: #fff;
}

.comment-view .comment-info {
  padding: 32px 0;
  margin: 0 32px;
  font-size: 24px;
}

.comment-view .comment-info:before {
    height: 1px;
    content: "";
    width: 100%;
    border-top: 1px solid #f4f4f4;
    position: absolute;
    top: 100%;
    right: 0;
    transform: scaleY(.5);
}

.comment-view .comment-count,
.comment-view .comment-degree span {
  color: rgba(0,0,0,.54);
}
.comment-view .comment-degree {
  color: #ff6700;
  text-align: right;
  margin-right: 10px;
}

.entry-more {
  position: relative;
  padding-right: 20px!important;
}
.entry-more:after {
  content: " ";
  width: 14px;
  height: 14px;
  border-top: 1px solid #ddd;
  border-right: 1px solid #ddd;
  position: absolute;
  top: 50%;
  right: 0;
  margin-top: -3.5px;
  transform: rotate(45deg);
}
</style>
