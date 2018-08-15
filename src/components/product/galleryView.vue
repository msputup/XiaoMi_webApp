<template>
    <swiper :options = 'swiperOption' class="gallery-view">
        <div href="#" class="swiper-slide" v-for="(item,index) in gallery.galleryView" :key="index">
          <img :src="item">
        </div>
      <div class="swiper-pagination" slot="pagination"></div>
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
  props: ['gallery'],

  components: {swiper, swiperSlide}

}
</script>

<style scoped>
.gallery-view {
  background: #ccc;
  width: 100%;
  height: 830px;
}

.gallery-view img {
  display: block;
  width: auto;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  transform: translate(-50%,-50%);
  position: absolute;
  left: 50%;
  top: 50%;
}
</style>
