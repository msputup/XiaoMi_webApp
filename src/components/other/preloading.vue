<template>
<transition name="loading">
  <div class="progress" v-if="isShow"></div>
</transition>

</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: ['isShow']
}
</script>

<style scoped>
.loading-leave {
  width: 0%;
}
.loading-leave-to {
  width: 0%;
}
.loading-enter {
  width: 0% ;
  opacity: 0;
}

.loading-enter-active {
  transition: all .4s
}

.loading-enter-to {
  width:100%;
  opacity: 1;
}

.progress {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    z-index: 999;
    background-color: #efc14e;
}
</style>
