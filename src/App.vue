<template>
  <div id="app">
    <div class="app-shell">
      <miHeader />
      <div class="app-view-wrapper">
        <transition :name="routerAnim">
          <router-view/>
        </transition>
      </div>
      <miFooter />
    </div>
  </div>
</template>

<script>
import miHeader from './components/MiHeader'
import miFooter from './components/MiFooter'
export default {
  data () {
    return {
      routerAnim: ''
    }
  },
  components: {
    miHeader, miFooter
  },
  watch: {
    '$route' (to, from) {
      if (to.name !== 'home') {
        this.routerAnim = 'router'
      } else {
        this.routerAnim = ''
      }
    }
  }
}
</script>

<style>

.app-shell {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.app-view-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  max-width: 750px;
  margin: 0 auto;
}

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
