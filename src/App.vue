<template>
  <div id="app">
    <transition :name="routerAnim">
      <router-view/>
    </transition>
    <miFooter />
  </div>
</template>

<script>
import miFooter from './components/MiFooter'
export default {
  data () {
    return {
      routerAnim: ''
    }
  },
  components: {
    miFooter
  },
  watch: {
    '$route' (to, from) {
      if (to.name !== 'home') {
        this.routerAnim = 'router'
      }
    }
  }
}
</script>

<style>
.router-enter-active,.router-leave-active {
  transition: transform .3s ease-out;
}
.router-enter,.router-leave-to {
  transform: translate3d(100%,0,0)
}
.router-active {
  transform: translateZ(0)
}
</style>
