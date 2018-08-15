<template>
  <div class="comment-box">
    <div class="item">
      <div class="comment-header layout align-center">
        <div class="avatar-img-box">
          <img :src="onecomment.user_avatar">
        </div>
        <div class="user-info flex">
          <p class="name">{{onecomment.user_name}}</p>
          <p class="comment-date">{{onecomment.add_time}}</p>
        </div>
        <div class="like">
          <span>超爱</span>
        </div>
      </div>
      <div class="comment-content">
        <div class="text">{{onecomment.comment_content}}</div>
        <div class="photos p6">
          <img v-for="(img,index) in onecomment.comment_images" :key="index"  v-lazy="img">
        </div>
      </div>
      <div class="comment-reply">
        <div class="comment-replay-item official">
          <div class="text">
            <div class="avatar"></div>
            <span>官方回复：</span>
            {{onecomment.reply_content}}
          </div>
        </div>
        <div v-for="reply in onecomment.user_replys" :key="reply.reply_id" class="comment-replay-item">
          <div class="text">
            <div class="avatar">
              <img v-lazy="reply.user_avatar">
            </div>
            <span>{{reply.user_name}}：</span>
           {{reply.reply_content}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['onecomment']
}
</script>

<style scoped>
.comment-box {
  background: #fff;
  text-align: left;
}
.comment-box .item {
    padding: 24px 38px 32px;
}
.comment-box .item .comment-header .avatar-img-box {
  margin-right: 24px;
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 100%;
}
.comment-box .item .comment-header .avatar-img-box img {
  width: 100%;
}
.comment-box .item .comment-header .name {
  font-size: 26px;
}
.comment-box .item .comment-header .comment-date {
  margin-top: 5px;
  color: rgba(0,0,0,.54);
  font-size: 22px;
}
.comment-box .item .comment-header .like {
  padding-left: 50px;
  background: transparent url(../../assets/images/comment-like.png) no-repeat 0;
  background-size: auto 100%;
  width: 100px;
  height: 36px;
  line-height: 36px;
  color: #ff6700;
  font-size: 22px;
}
.comment-box .item .comment-content .text {
  padding: 32px 0;
  line-height: 40px;
  font-size: 26px;
}
.comment-box .item .comment-content .photos {
  margin-bottom: 12px;
}
.comment-box .item .comment-content .photos img {
  width: 166px;
  height: 166px;
  margin: 0 8px 8px 0;
}
.comment-box .item .comment-reply {
  padding: 16px;
  background: #f6f6f6;
}
.comment-box .item .comment-reply .comment-replay-item {
  overflow: hidden;
  padding: 5px 0;
}
.comment-box .item .comment-reply .comment-replay-item .text {
  font-size: 22px;
  line-height: 44px;
}
.comment-box .item .comment-reply .comment-replay-item.official .avatar {
  background: transparent url(../../assets/images/milogo.png) no-repeat 50%;
  background-size: cover;
}
.comment-box .item .comment-reply .comment-replay-item .avatar {
  float: left;
  width: 32px;
  height: 32px;
  overflow: hidden;
  border-radius: 100%;
  margin-right: 20px;
}
.comment-box .item .comment-reply .comment-replay-item.official span {
  color: #ff6700;
}
</style>
