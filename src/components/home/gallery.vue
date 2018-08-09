<template>
    <swiper :options = 'swiperOption' class="gallery">
        <a href="#" class="swiper-slide" v-for="(item,index) in body.items" :key="index">
          <img :src="item.img_url">
        </a>
      <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
    </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
export default {
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  props: ['body'],

  components: {swiper, swiperSlide}

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
