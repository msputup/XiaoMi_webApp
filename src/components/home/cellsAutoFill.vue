<template>
  <!-- 100vw = 750px 1vw = 7.5px  7.5发现布局有点不对，手动调整了下数值-->
  <div class="cells_auto_fill" :style = "{width:`${body.w/7.2}vw`,height:`${body.h/7.2}vw`}">
    <a href="#" v-for="(item,index) in body.items" :key="index" :style = "{width:`${item.w/7.2}vw`,height:`${item.h/7.2}vw`,left:`${item.x/7.2}vw`,top:`${item.y/7.2}vw`}">
      <img :src="item.img_url" :style = "{width:`${item.w/7.2}vw`,height:`${item.h/7.2}vw`}">
    </a>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },

  props: ['body']
}
</script>

<style scoped>
.cells_auto_fill{
  position: relative;
}

.cells_auto_fill a{
  display: block;
  height: auto!important;
  position: absolute;
}
</style>
