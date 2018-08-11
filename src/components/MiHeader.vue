<template>
  <header class="app-header-wrapper app-shell-header" v-show="isShow">
    <div class="app-header-left">
      <a class="app-header-item">
        <i class="iconfont icon-back"></i>
      </a>
    </div>
    <div class="app-header-middle">
      <div class="app-header-title">{{$route.name|chinese}}</div>
    </div>
    <div class="app-header-right">
      <a class="app-header-item">
        <i class="iconfont icon-sousuo"></i>
      </a>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {
      showHeader: ['category', 'cart'],
      isShow: false
    }
  },
  watch: {
    '$route' (to, from) {
      if (this.showHeader.indexOf(to.name) !== -1) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  },
  filters: {
    chinese: (value) => {
      switch (value) {
        case 'home':
          return '首页'
        case 'category':
          return '分类'
        case 'cart':
          return '购物车'
        default:
          return '我的'
      }
    }
  }
  // computed: {
  //   isShow: () => {
  //     console.log($route)
  //     let routeName = this.$route.name
  //     if (this.showHeader.indexOf(routeName) !== -1) {
  //       return true
  //     }
  //   }
  // }
}
</script>

<style scoped>
.app-shell-header {
  position:fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
}

.app-header-title {
  width: 100%;
  font-size: 30px;
  font-weight: 500;
}

.iconfont {
  font-size:44px;
}
</style>
