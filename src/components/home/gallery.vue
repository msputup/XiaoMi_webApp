<template>
<!-- "height": "0",
"width": "0",
"items": [{
  "w": 720,
  "h": 360,
  "material_id": 8604,
  "ad_position_id": 2474,
  "img_url": "//i8.mifile.cn/v1/a1/a76e370e-b66e-67b8-2b4a-9a48a1e19467.webp?bg=DCC3A3",
  "img_url_webp": "//i8.mifile.cn/v1/a1/a76e370e-b66e-67b8-2b4a-9a48a1e19467.webp?bg=DCC3A3",
  "img_url_color": "#DCC3A3",
  "action": {
    "type": "product",
    "path": "10000091",
    "log_code": "31waphomegallery001001#t=ad&act=product&page=home&pid=10000091&page_id=26&bid=3000164.1&adp=2474&adm=8604"
    // 这应该是小米拿来记录连接跳转的? 大厂就是牛逼
  }
}],
"win_prize_action": null,//不知道什么鬼
"not_win_prize_action": null,//不知道什么鬼
"margin_left": 0,
"margin_right": 0 -->
  <div>
    <div class="swiper-container gallery">
      <div class="swiper-wrapper" v-for="(item,index) in body.items" :key="index">
        <!-- 这里可能有个跳转 -->
        <a href="#" class="swiper-slide" :style="{height:`${item.w}px`,width:`${item.h}px`}">
          <img :src="item.img_url">
        </a>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'

export default {
  data () {
    return {
      gallerySwiper: null
    }
  },
  props: ['body'],

  mounted () {
    this.gallerySwiper = new Swiper('.gallery', {

      pagination: {
        el: '.swiper-pagination'
      }
    })
  }
}
</script>

<style scoped>
.gallery {
  background: #ccc;
}

.gallery .swiper-slide,
.gallery img {
  display: block;
}

.gallery img {
  width: 100%;
  height: auto;
}
</style>
